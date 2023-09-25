interface ITurnOverStateType extends Omit<IGetCustomerTurnOverRequestType, 'SymbolISIN' | 'CustomerISIN'> {
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoMultiCustomerType[];
}