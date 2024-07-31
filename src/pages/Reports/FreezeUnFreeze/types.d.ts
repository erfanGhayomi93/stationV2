interface IFilterFreezeUnFreeze {
    FromDate?: string;
    ToDate?: string;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    'QueryOption.PageNumber': number;
    'QueryOption.PageSize': number;
    Time?: string;
    RequestState ?: string;
    RequestType ?: Freeze | UnFreeze | ''
}