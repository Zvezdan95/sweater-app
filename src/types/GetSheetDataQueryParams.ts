export {
    Sort,
    GetSheetDataQueryParams
}

enum Sort {
    Ascending,
    Descending
}

function sortToString(sort: Sort): string | null {
    switch (sort) {
        case Sort.Ascending:
            return 'ascending';
        case Sort.Descending:
            return 'descending';
        default:
            return null;
    }
}

function stringToSort(string: string): Sort | null {
    switch (string) {
        case 'ascending':
            return Sort.Ascending;
        case 'descending':
            return Sort.Descending;
        default:
            return null;
    }
}

/*Haven't touched OOP in some time, so I decided to have some fun*/
class GetSheetDataQueryParams {
    public sort: Sort;
    public page: number;
    private readonly pageSize = 10;

    constructor(props: Partial<{ [key: string]: string | string[]; }>) {
        this.sort = props.sort === "descending" ? Sort.Descending : Sort.Ascending;
        this.page = typeof props.page === "string" ? parseInt(props.page) : 1;
    }

    isAscending() {
        return this.sort == Sort.Ascending;
    }

    isDescending() {
        return this.sort == Sort.Descending;
    }

    toRowIndexRage(totalRows: number) {
        const pageSizeRanged = this.pageSize - 1;
        const pageIndexed = this.page - 1
        if (this.isDescending()) {
            const startRowIndex = this.page === 1 ? totalRows : totalRows - (pageIndexed * this.pageSize)
            return {
                startRowIndex: startRowIndex,
                endRowIndex: startRowIndex - pageSizeRanged
            };
        }

        //assume Ascending as default
        const startRowIndex = this.page === 1 ? 1 : 1 + (pageIndexed * this.pageSize);
        return {
            startRowIndex: startRowIndex,
            endRowIndex: startRowIndex + pageSizeRanged
        };
    }
}