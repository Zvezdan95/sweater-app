import {DataRow} from "@/types/DataRow";

export type GetSheetDataResponse = {
    rows: DataRow[],
    totalRequests: number,
    totalLefShelf: number,
    totalMiddleLefShelf: number,
    totalMiddleRightShelf: number,
    totalRightShelf: number,
    lastRequestCreateAt: number | null,
}

export const initGetSheetDataResponse: () => GetSheetDataResponse = () => {
    return {
        rows: [],
        totalRequests: 0,
        totalLefShelf: 0,
        totalMiddleLefShelf: 0,
        totalMiddleRightShelf: 0,
        totalRightShelf: 0,
        lastRequestCreateAt: null,
    }
}