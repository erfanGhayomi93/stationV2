interface SearchSymbol {
     symbolISIN: string;
     symbolTitle: string;
     companyISIN: string;
     isOption: boolean;
     isFreeze?: boolean;
     marketUnit?: TMarketUnit;
     companyName: string;
     insCode: null | string;
     symbolTradeState: Symbol.TradeState;
     lastTradedPrice: number;
     lastTradedPriceVar: number;
}
