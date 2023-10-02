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
    marketUnitTypeTitle: MarketUnit;
    asset: number;
    averagePrice: number;
    totalValue: number;
    bep: number;
    bepPrice: number;
    lastTradedPrice: number;
    dayValue: number;
    percentlostProfit: number;
    lostProfitValue: number;
    commissionPrice: number;
    symbolOrderState: string;
    symbolTradeState: string;
    closingPrice: number;
}

interface IGTPortfolioResponseType extends GlobalPaginatedApiResponse<IGTPortfolioResultType[]> { }