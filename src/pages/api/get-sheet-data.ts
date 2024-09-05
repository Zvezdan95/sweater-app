import {google} from 'googleapis';
import {credentials, range, spreadsheetId} from "@/pages/api/credantials";
import type {NextApiRequest, NextApiResponse} from "next";
import {GetSheetDataResponse, initGetSheetDataResponse} from "@/types/GetSheetDataResponse";
import {arrayToDataRow, DataRow} from "@/types/DataRow";
import {GetSheetDataQueryParams} from "@/types/GetSheetDataQueryParams";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetSheetDataResponse>
) {
    if (req.method === 'GET') {
        const parsedQueryParams = new GetSheetDataQueryParams(req.query);

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
                const {startRowIndex, endRowIndex} = parsedQueryParams.toRowIndexRage(response.data.values.length);

                const formattedResponse: GetSheetDataResponse = response.data.values
                    .reduce((accumulator: GetSheetDataResponse, currentValue: string[], index: number) => {
                            if (index !== 0) {
                                const dataRow: DataRow = arrayToDataRow(currentValue);

                                if (index ===21){
                                    console.log("startRowIndex)", startRowIndex)
                                    console.log("endRowIndex)", endRowIndex)
                                }
                                if (parsedQueryParams.isAscending()) {
                                    if (index >= startRowIndex && index <= endRowIndex) {
                                        accumulator.rows.push(dataRow);
                                        if (index ===21){
                                            console.log(dataRow)
                                        }
                                    }
                                } else {
                                    if (index >= endRowIndex && index <= startRowIndex) {
                                        accumulator.rows.unshift(dataRow);
                                    }
                                }


                                accumulator.totalRequests++;
                                accumulator.totalLefShelf += dataRow.lefShelf;
                                accumulator.totalMiddleLefShelf += dataRow.middleLefShelf;
                                accumulator.totalMiddleRightShelf += dataRow.middleRightShelf;
                                accumulator.totalRightShelf += dataRow.rightShelf;

                                if (response.data.values.length - 1 === index) {
                                    accumulator.lastRequestCreateAt = dataRow.createdAt
                                }
                            }

                            return accumulator;
                        },
                        initGetSheetDataResponse());


                res.status(200).json(formattedResponse);

            })
            .catch((err) => {
                res.status(400).json({time: `Error fetching rows:  ${err}`})
            });
    }
}
