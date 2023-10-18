type TPortfolioListFilter = {
    customerType: string;
    CustomerISIN: IGoCustomerSearchResult[];
    SymbolISIN: SymbolSearchResult[];
    PageNumber: number;
    PageSize: number;
    MarketUnitType: string;
    MarketType: string;
};

type THistoryFilter = {
    time?: string;
    fromDate: string;
    toDate: string;
    type?: string;
    customerISIN?: string;
    symbolISIN?: string;
};
