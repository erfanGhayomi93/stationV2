//

type SymbolData = {
    insCode: string;
    companyISIN: string;
    symbolTitle: string;
    companyName: string;
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
    oneMonthEfficiency: number;
    threeMonthEfficiency: number;
    oneYearEfficiency: number;
    marketUnit: string;
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

export type SymbolGeneralInfoType = {
    symbolData: SymbolData;
    individualLegal: IndividualLegal;
};
