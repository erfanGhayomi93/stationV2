 interface ITradeStateType extends Omit<IGTTradesListRequest, 'SymbolISIN' | 'CustomerISIN'> {
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
}