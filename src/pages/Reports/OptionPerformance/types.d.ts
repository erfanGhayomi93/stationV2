interface IFilterOptionPerformance {
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    hasRemain : string
    'QueryOption.PageNumber': number;
    'QueryOption.PageSize': number;
}