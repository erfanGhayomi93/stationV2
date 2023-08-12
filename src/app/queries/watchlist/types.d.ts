type SymbolOrderState = 'OrderEntryAuthorized' | 'OrderEntryForbidden' | 'None' | null;
type SymbolTradeState = 'Reserved' | 'Suspended' | 'Open' | 'None' | 'Frozen' | null;
type GroupState =
    | 'Forbidden'
    | 'EndOfConsultation'
    | 'SurveillanceIntervention'
    | 'PostSession'
    | 'ContinuousTrading'
    | 'PreOpening'
    | 'OpeningOrClosing'
    | 'TradingAtLast'
    | null;
type IDefaultWatchlistType =
    | 'InBuyQueue'
    | 'InSellQueue'
    | 'MostVolume'
    | 'MostValue'
    | 'EffectiveOnIndex'
    | 'MaximumPrice'
    | 'MinimumPrice'
    | 'FiveDaysPositive'
    | 'FiveDaysNegative'
    | 'BuyQueueThreshold'
    | 'SellQueueThreshold';

// interface IWatchlistType {
//     id: number;
//     createDate: string;
//     watchListName: string;
//     nullable: true;
//     isPinned: boolean;
// }

type WatchlistType = 'Market' | 'Ramand' | 'Pinned' | 'User';
///new////////////////////////////////////////
interface IGetWatchlistSymbol {
    symbolISIN: string;
    symbolTitle: string;
    symbolOrderState: string;
    symbolTradeState: string;
    lastTradedPrice: number;
    closingPrice: number;
    bestSellLimitPrice_1: number;
    bestBuyLimitPrice_1: number;
    bestSellLimitQuantity_1: number;
    bestBuyLimitQuantity_1: number;
    totalNumberOfSharesTraded: number;
    totalTradeValue: number;
    highestTradePriceOfTradingDay: number;
    lowestTradePriceOfTradingDay: number;
    lastTradedPriceVarPercent: number;
    closingPriceVarPercent: number;
}

interface IRequestWatchListSymbol{
    watchlistId : number ,
    watchlistType : WatchlistType , 
    PageNumber : number
    type ?: IDefaultWatchlistType ,
    MarketUnit ?: string ,
    SectorCode ?: string
}
///////////////////////////////////////////

interface IWatchlistType {
    id: number;
    createDate: string;
    watchListName: string;
    isDefault: boolean;
    isEditable: boolean;
    type: WatchlistType;
}

interface IWatchlistSymbolType {
    symbolISIN: string;
    note: string;
    stopLoss: number;
    takeProfit: number;
    commentCount: number;
    symbol: ISymbolType;
    key: number;
}
interface IWatchlistSymbolRequestType {
    watchlistId: number;
    symbolISIN: string;
}

interface IWatchlistRequestType {
    id: number;
    watchListName: string;
}

interface ISymbolType {
    insCode: string;
    companyISIN: string;
    symbolTitle: string;
    companyName: string;
    enCompanyName: string;
    highestTradePriceOfTradingDay: number;
    lowestTradePriceOfTradingDay: number;
    closingPrice: number;
    openPrice: number;
    highThreshold: number;
    lowThreshold: number;
    totalNumberOfSharesTraded: number;
    totalNumberOfTrades: number;
    totalTradeValue: number;
    lastTradedPrice: number;
    lastTradedDate: Date;
    firstTradedPrice: number;
    preClosingPrice: number;
    lastTradedPriceVar: number;
    lastTradedPriceVarPercent: number;
    closingPriceVar: number;
    closingPriceVarPercent: number;
    symbolGroupCode: string;
    bestBuyLimitQuantity_1: number;
    bestSellLimitQuantity_1: number;
    numberOfOrdersAtBestBuy_1: number;
    numberOfOrdersAtBestSell_1: number;
    bestBuyLimitPrice_1: number;
    bestSellLimitPrice_1: number;
    sectorCode: string;
    unitCount: number;
    marketUnit: string;
    orderPriceTickSize: number;
    baseVolume: number;
    symbolOrderState: SymbolOrderState;
    symbolTradeState: SymbolTradeState;
    groupState: GroupState;
    symbolState: string;
}

interface IWatchlistSymbolTableType extends ISymbolType {
    symbolISIN: string;
}

interface ISymbolInWatchlist {
    symbolISIN: string;
    watchlistId: number;
}

interface ISectorList {
    id: string;
    title: string;
}

type IResponseMarket = {
    symbols: IWatchlistSymbolTableType[];
    totalCount: number;
};
