export class DataTable {
    size = 20;
    totalElements = 1;
    totalPages = 0;
    pageNumber = 1;
    data: any;
    search: Search[];
    order: any;
    searchsort: SearchSort[];
}

export class Search {
    key: any;
    value: any;
}

export class Order {
    dataname: any;
    sorttype: any;
}

export class SearchSort {
    key: any;
    value: any;
    data: any;
    type: any;
}
