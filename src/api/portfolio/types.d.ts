interface IPortfolioReq {
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

interface IPortfolioRes {
    symbolISIN: string;
    customerIsin: string;
    symbolTitle: string;
    marketTypeTitle: string;
    marketUnitTypeTitle: TMarketUnit;
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
    customerTitle: string;
    isFreezed: boolean;
}