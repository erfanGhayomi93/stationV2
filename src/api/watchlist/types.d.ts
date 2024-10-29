interface IGetSymbolsWatchlistRes {
     bestBuyLimitPrice_1: number;
     bestBuyLimitQuantity_1: number;
     bestSellLimitPrice_1: number;
     bestSellLimitQuantity_1: number;
     closingPrice: number;
     closingPriceVarPercent: number;
     highestTradePriceOfTradingDay: number;
     insCode: number;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     lowestTradePriceOfTradingDay: number;
     symbolISIN: string;
     symbolOrderState: string;
     symbolTitle: string;
     symbolTradeState: string;
     totalNumberOfSharesTraded: number;
     totalTradeValue: number;
}
interface IGetSymbolsWatchlistReq {
     PageNumber: number;
     watchlistType: string;
}

type IAddSymbolsWatchlistRes = number;

interface IAddSymbolsWatchlistReq {
     symbolISIN: string;
     type: string;
     watchlistId?: number;
}

interface IGetSymbolInWatchlistRes {
     symbolISIN: string;
     watchlistId: number;
}

type TDeleteSymbolInWatchlistRes = boolean;

interface IDeleteSymbolInWatchlistReq {
     symbolISIN: string;
     type: string;
     watchlistId?: number;
}

interface IWatchlistsRes {
     createDate: string;
     id: number;
     isDefault: boolean;
     isEditable: boolean;
     type: string;
     watchListName: string;
}

interface ICreateWatchlistRes {
     id: number;
     isPinned: boolean;
}

interface ICreateWatchlistReq {
     watchlistName: string;
}
