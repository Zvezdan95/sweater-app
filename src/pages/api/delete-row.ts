import {google} from 'googleapis';
import {credentials, range, spreadsheetId} from "@/pages/api/credantials";
import type {NextApiRequest, NextApiResponse} from "next";
import {DataRow} from "@/types/DataRow";

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'DELETE') {
        const {rowIndex, } = req.body;

        if (rowIndex === undefined) {
            res.status(400).send({message: "no value"})
        }

        const auth = new google.auth.GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            credentials: credentials
        });

        const request = {
            spreadsheetId: spreadsheetId,
            auth: auth,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: 0,
                                dimension: "ROWS",
                                startIndex: rowIndex,
                                endIndex: rowIndex + 1,
                            },
                        },
                    },
                ],
            },
        };
        const sheets = google.sheets({version: 'v4'});
        sheets.spreadsheets.batchUpdate(request)
            .then((response) => {
                res.status(200).json({message: `row delete successfully`})
            })
            .catch((err) => {
                res.status(400).json({message: `Error appending rows:  ${err}`})
            });
    }
}

