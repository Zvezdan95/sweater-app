import {google} from 'googleapis';
import {credentials, range, spreadsheetId} from "@/pages/api/credantials";
import type {NextApiRequest, NextApiResponse} from "next";
type ResponseData = {
    message: string
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const { values } = req.body;
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (!values){
            res.status(400).send({message: "no value"})
        }

        if (!userIp){
            res.status(400).send({message: "ip problem"});
        }

        console.log(userIp);
        values.push(userIp)
        values.push(Date.now().toString())

        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            credentials: credentials
        });

        const request = {
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [values],
            },
            auth: auth,
        };
        const sheets = google.sheets({ version: 'v4' });
        sheets.spreadsheets.values.append(request)
            .then((response) => {
                console.log(`${response.data.updates?.updatedCells} cells appended.`);
                res.status(200).json({ message: `${response.data.updates?.updatedCells} cells appended.` })

            })
            .catch((err) => {
                res.status(400).json({ message: `Error appending rows:  ${err}` })
            });
    }
}


