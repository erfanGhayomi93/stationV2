interface IOfflineRequestStateType extends Omit<IGTOfflineTradesRequests, 'SymbolISIN' | 'CustomerISIN'> {
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
}