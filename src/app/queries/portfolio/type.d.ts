interface IGTPortfolioRequestType {
    CustomerISIN?: string;
    SymbolISIN?: string;
    MarketType?: string;
    MarketUnitType?: string;
    FromQuantity?: number;
    ToQuantity?: number;
}

interface IGTPortfolioResultType {
    symbolISIN: string;
    customerIsin: string;
    symbolTitle: string;
    marketTypeTitle: string;
    marketUnitTypeTitle: string;
    asset: number;
    averagePrice: number;
    totalValue: number;
    bep: number;
    lastTradedPrice: number;
    dayValue: number;
    percentlostProfit: number;
    lostProfitValue: number;
    commissionPrice: number;
}

interface IGTPortfolioResponseType extends GlobalApiResponseType<IGTPortfolioResultType[]> { }