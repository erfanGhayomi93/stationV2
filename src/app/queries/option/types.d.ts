type TCashbody = {
    id: number;
    requestCount: number;
    customerISIN: string;
    requestForMaximum: boolean;
    countOfDone?: number | string;
    requestForMaximumApproval: boolean;
};

type TPhysicalbody = {
    id: number;
    requestCount: number;
    requestForMaximum: boolean;
    requestForLostOrProfit: boolean;
    customerISIN: string;
    countOfDone?: number | string;
    requestForMaximumApproval: boolean;
};

type TCashDeleteBody = {
    id: number;
    customerISIN: string;
};

interface IReqSumPrice {
    symbolISIN: string;
    customerISIN: string;
    brokerCode: string;
    orderSide: string;
    quantity: number;
    price: number;
}
interface IResponseSumPrice {
    totalBlock: number;
    optionBlock: number;
    tseBlock: number;
    orderVolume: number;
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
}

interface IOpenPositionsRes {
    orderId: number;
    side: 'Put' | 'Call';
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
}
