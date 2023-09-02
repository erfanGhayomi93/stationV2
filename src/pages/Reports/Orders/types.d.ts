interface IOrdersListStateType extends Omit<IGTOrderListRequest, 'SymbolISIN' | 'CustomerISIN'> {
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
}