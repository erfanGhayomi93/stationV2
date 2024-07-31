type TCashbody = {
    id: number;
    requestCount?: number | string;
    requestForMaximum: boolean;
    countOfDone: number;
    customerISIN: string;
    symbolISIN : string;
    userName ?: string;
};

type TPhysicalbody = {
    id: number;
    requestCount?: number | string;
    requestForMaximum: boolean;
    requestForLostOrProfit: boolean;
    countOfDone: number;
    requestForMaximumApproval: boolean;
    customerISIN: string;
    symbolISIN : string;
    userName ?: string;
};

type TCashDeleteBody = {
    id: number;
    customerISIN: string;
    symbolISIN : string;
    applicant ?: string;
};

interface IReqSumPrice {
    symbolISIN: string;
    customerISIN: string;
    brokerCode: string;
    orderSide: string;
    quantity: number;
    price: number;
}

interface IReqGetSymbolBaseAssetsByOption {
    symbolISIN: string;
    customerISIN?: string;
}
interface IResponseSumPrice {
    totalBlock: number;
    optionBlock: number;
    tseBlock: number;
    orderVolume: number;
}

interface IResponseIpoGet {
    assigneeDate: string;
    canSendRequest: boolean;
    companyISIN: string;
    exchange: string;
    fromDate: string;
    fromPrice: number;
    individualFromQuantity: number;
    individualToQuantity: number;
    ipoDate: string;
    ipoFromDate: string;
    ipoFromTime: string;
    ipoToDate:string;
    ipoToTime: string;
    isActive: boolean;
    legalFromQuantity: number;
    legalToQuantity: number;
    marketUnit: MarketUnit;
    remainingSeconds: number;
    symbolISIN: string;
    symbolState: string;
    symbolTitle: string;
    toDate: string;
    toPrice: number;
}

interface IResponsiveAdditionalInfo {
    ipoFromDate: string;
    ipoFromTime: string;
    ipoToTime: string;
    fromPrice: number;
    toPrice: number;
    individualToQuantity: number;
    legalToQuantity: number;
    assigneeDate: string;
}

interface OptionGeneralInformation {
    initialMargin: number;
    maintenanceMargin: number;
    requiredMargin: number;
    openPosition: number;
    strikePrice: number;
    contractStartDate: string;
    contractEndDate: string;
    cashSettlementDate: string;
    companyISIN: string;
    maxCOP: number;
    maxCAOP: number;
    maxBOP: number;
    maxMOP: number;
    maxOrders: number;
    baseCompanyISIN: string;
    contractSize: number;
    cefo: number;
    physicalSettlementDate: string;
    closingPrice: number;
    tradeVolume: number;
    yesterdayPrice: number;
    maxPrice: number;
    minPrice: number;
    basePriceClosing: number;
    basePriceLast: number;
    openingPrice: number;
    dueDays: number;
    maxOP: number;
    maxCOP: number;
    maxCAOP: number;
}

interface IOpenPositionsRes {
    orderId: number;
    positionSide: 'Sell' | 'Buy';
    canClosePosition: boolean;
    availableClosePosition: number;
    customerISIN: string;
    symbolISIN: string;
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
    customerTitle: string;
    bourseCode :string , 
    blockCount : number , 
    blockType : string ,
    positionBlockTitle : string,
    marginBlockedValue : number
}

type TFreezeType = 'Freeze' | 'UnFreeze'

interface IRequestFreezeBody{
    symbolISIN: string[];
    type: string;
    userName: string;
    customerISIN: string;
    description?: string;
    userName ?: string;
  }

  interface IGetFreezeBody{
    customerISIN?: string[];
  }

  interface IResponseFreeze{
      symbolISIN: string,
      symbolTitle: string,
      requestType: string,
      requestState: string,
      description: string,
      confirmed: boolean,
      confirmedOn: string,
      customerISIN: string,
      customerTitle: string
  }

 type OrderSourceType = "Account" | "Portfolio" | "Position";


  interface IResponsePositionHistory{
        saveDate: string;
		customerISIN: string;
		customerTitle: string;
		symbolISIN: string
		positionSide: "Buy" | "Sell",
		positionCount: number;
		remainPositionCount: number;
		symbolTitle: string;
		actionSource: string;
		contractSize: number;
		strikePrice: number
		bepPrice: number;
		avgPrice: number;
		avgBuyPrice: number;
		avgSellPrice: number;
		dayPureValue: number;
		pandL: number;
		pandLPercent: number;
		achievedPandl: number;
		blockType: Orders.OrderSourceType;
		marginBlockedValue: number;
		blockCount: number;
		positionBlockTitle: string;
		bestSellLimitPrice_1: number;
		bestBuyLimitPrice_1: number;
		closingPrice: number;
		totalPositionCount: number;
        bourseCode :string , 
}

interface IResponseOptionPerformance {
        saveDate: string;
		contractEndDate: string;
		customerISIN: string;
        customerTitle: string;
		symbolISIN: string;
		positionSide: "Sell" | "Buy",
		positionCount: number;
		blockType: Orders.OrderSourceType,
		marginBlockedValue: number;
		blockCount: number;
		remainPositionCount: number;
		symbolTitle: string;
		contractSize: number;
		strikePrice: number;
		bepPrice: number;
		avgPrice: number;
		dayPureValue: number;
		pandL: number;
		pandLPercent: number;
		achievedPandl: number;
		actionRescource: number;
		positionBlockISIN: string;
		positionBlockTitle: string;
		sumPayment: number;
		sumReceived: number;
		sumAmount: number;
		avgBuyPrice: number;
		avgSellPrice: number;
		buyCost: number;
		sellCost: number;
		actual_Profit_Loss: number;
		total_Actual_Profit_Loss: number;
		bestBuyLimitPrice_1: number;
		bestSellLimitPrice_1: number;
		closingPrice: number;
		baseClosingPrice: number;
		baseSymbolISIN: string;
		contractType: "Put" | "Call"
        bourseCode :string , 
}


