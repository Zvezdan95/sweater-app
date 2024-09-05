export type DataRow ={
    lefShelf: number,
    middleLefShelf: number,
    middleRightShelf: number,
    rightShelf: number,
    ip: string,
    createdAt: number,
}


export function arrayToDataRow(arr:string[]):DataRow{
    return {
        lefShelf: parseInt(arr[0]),
        middleLefShelf: parseInt(arr[1]),
        middleRightShelf: parseInt(arr[2]),
        rightShelf: parseInt(arr[3]),
        ip: arr[4],
        createdAt: parseInt(arr[5])
    }
}