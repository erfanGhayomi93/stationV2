interface IFilterFreezeUnFreeze {
    FromDate?: string;
    ToDate?: string;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    PageNumber: number;
    PageSize: number;
    Time?: string;
    RequestState ?: string;
    RequestType ?: Freeze | UnFreeze | ''
}