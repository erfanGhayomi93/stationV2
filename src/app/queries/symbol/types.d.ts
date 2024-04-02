//

type SymbolChartDate = 'Today' | 'Weekly' | 'Monthly' | 'Yearly';
type SymbolChartType = 'Linear' | 'Candle';
type SymbolEventsType = 'Meeting' | 'InterestPayment';

type SymbolEvents = {
    id: number;
    title: string;
    description: string;
    date: string;
    symbolName: string;
    symbolISIN: string;
    type: SymbolEventsType;
};

type SymbolData = {
    insCode: string;
    companyISIN: string;
    symbolTitle: string;
    companyName: string;
    exchange: string;
    enCompanyName?: any;
    highestTradePriceOfTradingDay: number;
    lowestTradePriceOfTradingDay: number;
    closingPrice: number;
    openPrice: number;
    yesterdayClosingPrice: number;
    highThreshold: number;
    lowThreshold: number;
    totalNumberOfSharesTraded: number;
    totalNumberOfTrades: number;
    totalTradeValue: number;
    lastTradedPrice: number;
    lastTradedDate: Date;
    lastTradeDateTime: Date;
    firstTradedPrice: number;
    preClosingPrice: number;
    lastTradedPriceVar: number;
    lastTradedPriceVarPercent: number;
    closingPriceVar: number;
    closingPriceVarPercent: number;
    symbolGroupCode?: any;
    bestBuyLimitQuantity: number;
    bestSellLimitQuantity: number;
    minTradeQuantity: number;
    maxTradeQuantity: number;
    numberOfOrdersAtBestBuy: number;
    numberOfOrdersAtBestSell: number;
    bestBuyPrice: number;
    bestSellPrice: number;
    sectorCode: string;
    unitCount: number;
    orderPriceTickSize: number;
    orderQuantityTickSize: number;
    baseVolume: number;
    floatFree: number;
    pe: number;
    eps: number;
    oneMonthEfficiency: number;
    threeMonthEfficiency: number;
    oneYearEfficiency: number;
    marketUnit: MarketUnit;
    symbolOrderState: string;
    symbolTradeState: string;
    groupState: string;
    symbolState: string;
    companyCode: string;
    tickPrice: number;
    tickQuantity: number;
    sectorPE?: any;
    floatingStock?: any;
    estimatedEPS?: any;
    fiscalYear?: any;
    symbolType: string;
    bourseKey: string;
    eventsWithinNextTenDays: SymbolEvents[];
    hasRiskAnnouncement: boolean;
    isOption: boolean;
    contractSize: number;
    isIpo: boolean;
};

type OrdersData = {
    bestBuyLimitPrice_1: number;
    bestSellLimitPrice_1: number;
    bestBuyLimitQuantity_1: number;
    bestSellLimitQuantity_1: number;
    numberOfOrdersAtBestBuy_1: number;
    numberOfOrdersAtBestSell_1: number;
    bestBuyLimitPrice_2: number;
    bestSellLimitPrice_2: number;
    bestBuyLimitQuantity_2: number;
    bestSellLimitQuantity_2: number;
    numberOfOrdersAtBestBuy_2: number;
    numberOfOrdersAtBestSell_2: number;
    bestBuyLimitPrice_3: number;
    bestSellLimitPrice_3: number;
    bestBuyLimitQuantity_3: number;
    bestSellLimitQuantity_3: number;
    numberOfOrdersAtBestBuy_3: number;
    numberOfOrdersAtBestSell_3: number;
    bestBuyLimitPrice_4: number;
    bestSellLimitPrice_4: number;
    bestBuyLimitQuantity_4: number;
    bestSellLimitQuantity_4: number;
    numberOfOrdersAtBestBuy_4: number;
    numberOfOrdersAtBestSell_4: number;
    bestBuyLimitPrice_5: number;
    bestSellLimitPrice_5: number;
    bestBuyLimitQuantity_5: number;
    bestSellLimitQuantity_5: number;
    numberOfOrdersAtBestBuy_5: number;
    numberOfOrdersAtBestSell_5: number;
};

type IndividualLegal = {
    numberOfLegalBuyers: number;
    numberOfIndividualBuyers: number;
    numberOfIndividualSellers: number;
    numberOfLegalSellers: number;
    individualBuyVolume: number;
    individualSellVolume: number;
    legalBuyVolume: number;
    legalSellVolume: number;
};

type SymbolGeneralInfoType = {
    alerts: { clientSideAlertEnabled: boolean; clientSideAlertMessage: string; clientSideAlertTitle: string };
    symbolData: SymbolData;
    individualLegal: IndividualLegal;
    ordersData: OrdersData;
};

type SymbolSearchResult = {
    symbolISIN: string;
    companyISIN: string;
    symbolTitle: string;
    companyName: string;
    highPrice: number;
    lowPrice: number;
    closingPrice: number;
    openPrice: number;
    highThreshold: number;
    lowThreshold: number;
    lastTradedPrice: number;
    symbolGroupCode: string;
    sectorCode: string;
    marketCode: string;
    marketUnit: string;
    tradePriceVarPreviousTradePercent: number;
    yesterdayClosingPrice: number;
    closingPriceVarReferencePrice: number;
    closingPriceVarReferencePricePercent: number;
    symbolOrderState: string;
    symbolTradeState: string;
    groupState: string;
    isInWatchList: boolean;
    symbolState: string;
    companyCode: string;
    symbolTag: string;
};

interface bestPriceBuySell {
    bestBuyLimitPrice_1: number;
    bestSellLimitPrice_1: number;
}

interface GetSameSectorRequest {
    symbolISIN: string;
}

interface GetSameSectorResultType {
    bestBuyPrice: number;
    bestBuyPricebestBuyLimitPrice_1: number;
    bestSellLimitPrice_1: number;
    bestSellPrice: number;
    lastTradedPriceVarPercent: number;
    sectorCode: string;
    symbolISIN: string;
    symbolTitle: string;
    lastTradedPrice: number;
    totalNumberOfSharesTraded: number;
}

interface IGetOptionContract {
    symbolISIN: string;
    sectorCode: string;
    symbolTitle: string;
    totalNumberOfSharesTraded: number;
    lastTradedPriceVarPercent: number;
    bestBuyPrice: number;
    bestBuyPricebestBuyLimitPrice_1: number;
    bestSellPrice: number;
    bestSellLimitPrice_1: number;
    lastTradedPrice: number;
}

interface GetChartSymbolType {
    o: number;
    h: number;
    l: number;
    c: number;
    x: number;
    v: number;
}

interface IMarketUnitType {
    id: number;
    type: string;
    code: string;
    title: string;
    nscGroup: string;
    checkSubSectorCode: boolean;
    sortOrder: number;
}

interface RecentSymbolHistoryRequest {
    type: 'TradingView' | 'GeneralSearch';
}

// interface GetSameSectorResultType {
//     insCode: string;
//     companyISIN: string;
//     symbolTitle: string;
//     symbolISIN: string;
//     marketCode: string;
//     companyName: string;
//     enCompanyName: string;
//     highestTradePriceOfTradingDay: number;
//     lowestTradePriceOfTradingDay: number;
//     closingPrice: number;
//     openPrice: number;
//     yesterdayClosingPrice: number;
//     highThreshold: number;
//     lowThreshold: number;
//     totalNumberOfSharesTraded: number;
//     totalNumberOfTrades: number;
//     totalTradeValue: number;
//     lastTradedPrice: number;
//     lastTradedDate: string;
//     lastTradeDateTime: string;
//     firstTradedPrice: number;
//     preClosingPrice: number;
//     lastTradedPriceVar: number;
//     lastTradedPriceVarPercent: number;
//     closingPriceVar: number;
//     closingPriceVarPercent: number;
//     symbolGroupCode: string;
//     bestBuyLimitQuantity: number;
//     bestSellLimitQuantity: number;
//     minTradeQuantity: number;
//     maxTradeQuantity: number;
//     numberOfOrdersAtBestBuy: number;
//     numberOfOrdersAtBestSell: number;
//     bestBuyPrice: number;
//     bestBuyLimitPrice_1: number;
//     bestSellPrice: number;
//     bestSellLimitPrice_1: number;
//     sectorCode: string;
//     unitCount: number;
//     orderPriceTickSize: number;
//     baseVolume: number;
//     floatFree: number;
//     pe: number;
//     oneMonthEfficiency: number;
//     sixMonthEfficiency: number;
//     threeMonthEfficiency: number;
//     oneYearEfficiency: number;
//     eps: number;
//     threeMonthTradeVolume: number;
//     ps: number;
//     marketUnit: string;
//     symbolOrderState: string;
//     symbolTradeState: string;
//     groupState: string;
//     symbolState: string;
//     companyCode: string;
//     tickPrice: number;
//     tickQuantity: number;
//     sectorPE: string;
//     floatingStock: string;
//     estimatedEPS: string;
//     fiscalYear: string;
//     symbolType: string;
//     bourseKey: string;
//     exchange: string;
//     isOption: boolean;
//     symbolTag: string;
//     navIssueDate: string;
//     navIssuePrice: number;
//     navCancellationPrice: number;
//     contractSize: number;
//     isValid: boolean;
//
// }

interface GetSameSectorResponseType extends GlobalApiResponseType<GetSameSectorResultType[]> {}
