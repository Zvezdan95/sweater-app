import {google} from 'googleapis';
import {credentials, range, spreadsheetId} from "@/pages/api/credantials";
import type {NextApiRequest, NextApiResponse} from "next";

type ResponseData = {
    time: (string | null)
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            credentials: credentials
        });

        const request = {
            spreadsheetId: spreadsheetId,
            range: 'Sheet1!A1:Z1000000',
            auth: auth,
        };
        const sheets = google.sheets({version: 'v4'});
        sheets.spreadsheets.values.get(request)
            .then((response) => {
                const lastUpdateTime = findFromEnd(response?.data?.values ?? [], (row: string[]) => {
                    return row[4] === userIp?.toString();
                });

                res.status(200).json({time: lastUpdateTime ? lastUpdateTime[5] : null})

            })
            .catch((err) => {
                res.status(400).json({time: `Error fetching rows:  ${err}`})
            });
    }
}


function findFromEnd<T>(arr: T[], testingFunction: (element: T) => boolean): T | null {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (testingFunction(arr[i])) {
            return arr[i];
        }
    }
    return null;
}