interface IPositionsCustomerReq {
     customerISIN: string[] | string;
}

interface IPositionsCustomerRes {
     orderId: number;
     customerTitle: string;
     bourseCode: string;
     positionSide: 'Buy' | 'Sell';
     contractType: 'Put' | 'Call';
     canClosePosition: boolean;
     availableClosePosition: number;
     customerISIN: string;
     symbolISIN: string;
     baseSymbolISIN: string;
     positionCount: number;
     blockedMargin: number;
     blockedAsset: number;
     variationMargin: number;
     physicalSettlementDate: string;
     cashSettlementDate: string;
     contractSize: number;
     strikePrice: number;
     finalPrice: number;
     gainedPortfolioLoss: number;
     profitLoss_ClosingPrice: number;
     profitLoss_ClosingPricePercent: number;
     profitLoss_LastPrice: number;
     profitLoss_LastPricePercent: number;
     remainDays: number;
     symbolTitle: string;
     companyISIN: string;
     isFreeze: boolean;
     isSwapped: boolean;
     blockType: 'All' | 'Account' | 'Portfolio' | 'Position';
     avgBuyPrice: number;
     avgSellPrice: number;
     closingPrice: number;
     closingPriceVarPercent: number;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     bestBuyLimitPrice_1: number;
     bestSellLimitPrice_1: number;
     positionCount: number;
     requiredMargin: number;
     highThreshold: number;
     lowThreshold: number;
}
