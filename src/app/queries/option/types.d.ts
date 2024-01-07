

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
    orderId: number,
    side: "Put" | "Call",
    canClosePosition: boolean,
    availableClosePosition: number,
    customerISIN: string,
    symbolISIN: string,
    positionCount: number,
    blockedMargin: number,
    blockedAsset: number,
    variationMargin: number,
    physicalSettlementDate: string,
    cashSettlementDate: string,
    contractSize: number,
    strikePrice: number,
    finalPrice: number,
    gainedPortfolioLoss: number,
    profitLoss_ClosingPrice: number,
    profitLoss_ClosingPricePercent: number,
    profitLoss_LastPrice: number,
    profitLoss_LastPricePercent: number,
    remainDays: number,
    symbolTitle: string,
    companyISIN: string,
}
