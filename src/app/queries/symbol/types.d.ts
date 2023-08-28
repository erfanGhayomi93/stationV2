//

type SymbolChartDate = 'Today' | 'Weekly' | 'Monthly' | 'Yearly';
type SymbolChartType = 'Linear' | 'Candle'

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
}

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
