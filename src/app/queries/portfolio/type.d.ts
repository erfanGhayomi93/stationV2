interface IGTPortfolioRequestType {
    CustomerISIN?: string[];
    SymbolISIN?: string[];
    MarketType?: string;
    MarketUnitType?: string;
    FromQuantity?: number;
    ToQuantity?: number;
    CustomerType?: string;
    pageSize?: number;
    pageNumber?: number;
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
    customerTitle : string
    isFreezed : boolean
}

interface ICardexPortfolioResult {
    bepPrice: number;
    id: number;
    date: string;
    customerIsin: string;
    symbolISIN: string;
    type: string;
    quantity: number;
    asset: number;
    price: number;
    averagePrice: number;
    commissionPrice: number;
    dayValue: number;
    profit: number;
    bep: number;
    totalValue: number;
}

// interface IGTPortfolioResponseType extends GlobalPaginatedApiResponse<IGTPortfolioResultType[]> { }
