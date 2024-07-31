interface IFilterPositionHistory {
    FromDate?: string;
    ToDate?: string;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    'QueryOption.PageSize': number;
    'QueryOption.PageNumber': number;
    Time?: string;
    positionSide : string;
    blockType : string;
    actionSource : string;
}