interface IFilterPositionHistory {
    FromDate?: string;
    ToDate?: string;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    PageNumber: number;
    PageSize: number;
    Time?: string;
    side : string;
    blockType : string;
    actionSource : string;
}