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

type SymbolGeneralInfoType = {
    symbolData: SymbolData;
    individualLegal: IndividualLegal;
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



type ICustomerTypeType = "Total" | "Customer" | "Group" | "Mine";
interface IGoCustomerResult {
    type: ICustomerTypeType
    searchResult: PaginatedSearchResult
    typeCounts: TypeCount[];
}

interface PaginatedSearchResult {

    errors: null | string[];
    hasNextPage: boolean
    hasPreviousPage: boolean
    pageNumber: number
    pageSize: number
    result: IGoCustomerSearchResult[]
    succeeded: boolean
    totalCount: number
    totalPages: number
}
interface IGoCustomerSearchResult {
    customerTitle: string;
    customerISIN: string;
    balance: number;
    bourseCode: string;
    nationalCode: string;
    groupName: string;
    groupId: number;
}

interface TypeCount {
    type: ICustomerTypeType
    count: number;
}


interface IGoCustomerResponse extends IGlobalResponseType<IGoCustomerResult> {

}

interface IGoCustomerRequest extends IPaginateRequest {
    term?: string
    type?: ICustomerTypeType
}



