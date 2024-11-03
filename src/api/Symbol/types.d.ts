type TMarketUnit =
     | 'Exchange'
     | 'FaraBourse'
     | 'ETFStock'
     | 'Future'
     | 'MaskanFaraBourse'
     | 'TSEFuture'
     | 'Salaf'
     | 'BourseKala'
     | 'FaraPaye'
     | 'ETFFix'
     | 'BourseKalaGovahiSekkeh'
     | 'ETFVentureCapital'
     | 'SalafEnergy'
     | 'BourseKalaGovahi'
     | 'Tabaee'
     | 'ETFMixed'
     | 'ETFZaminSakhteman'
     | 'SellOption'
     | 'Bond'
     | 'BuyOption';

type TSymbolEvents = 'Meeting' | 'InterestPayment';

type ExchangeType =
     | 'Exchange'
     | 'CommodityExchange'
     | 'Future'
     | 'Option'
     | 'BaseFaraBourse'
     | 'BaseFaraBourseNoPublish'
     | 'Bourse'
     | 'FaraBourse'
     | 'EnergyExchange';

type TSymbolStateType =
     | 'OrderEntryAuthorized_Open'
     | 'OrderEntryAuthorized_Reserved'
     | 'OrderEntryForbidden_Reserved'
     | 'OrderEntryForbidden_Open'
     | 'OrderEntryAuthorized_Frozen'
     | 'OrderEntryForbidden_Suspended';

interface ISymbolEvents {
     id: number;
     title: string;
     description: string;
     date: string;
     symbolName: string;
     symbolISIN: string;
     type: TSymbolEvents;
}

interface IOrdersData {
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

interface IIndividualLegal {
     numberOfLegalBuyers: number;
     numberOfIndividualBuyers: number;
     numberOfIndividualSellers: number;
     numberOfLegalSellers: number;
     individualBuyVolume: number;
     individualSellVolume: number;
     legalBuyVolume: number;
     legalSellVolume: number;
}

interface ISymbolData {
     insCode: string;
     companyISIN: string;
     symbolTitle: string;
     companyName: string;
     exchange: ExchangeType;
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
     marketUnit: TMarketUnit;
     symbolOrderState: string;
     symbolTradeState: string;
     groupState: TSymbolStateType;
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
     eventsWithinNextTenDays: ISymbolEvents[];
     hasRiskAnnouncement: boolean;
     isOption: boolean;
     contractSize: number;
     isIpo: boolean;
     isBaseFreezed: boolean;
     optionContractType?: 'Put' | 'Call';
     tommorowHighThreshold: number;
     tommorowLowThreshold: number;
     totalNumberOfSharesCount: number;
     oneMonthTradeVolume: number;
}

interface ISymbolGeneralInformationRes {
     alerts: {
          clientSideAlertEnabled: boolean;
          clientSideAlertMessage: string;
          clientSideAlertTitle: string;
     };
     symbolData: ISymbolData;
     individualLegal: IIndividualLegal;
     ordersData: IOrdersData;
}

interface ISymbolGeneralInformationSelectHeaderSymbol {
     clientSideAlertEnabled: boolean;
     symbolTitle: string;
     companyName: string;
     symbolState: string;
     insCode: string;
     companyCode: string;
     symbolEvents: ISymbolEvents[];
     hasRiskAnnouncement: boolean;
     exchange: ExchangeType;
     isIpo: boolean;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     closingPrice: number;
     closingPriceVarPercent: number;
}

interface ISymbolTabRes {
     id: number;
     symbolISIN: string;
     traderUserId: number;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     symbolTitle: string;
}

interface ISymbolTabSub {
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
}

// type TChildMarketDepth = [
//      string, // 0:MessageId
//      string, // 1:MarketSheetActionCode
//      'Buy' | 'Sell', // 2:OrderSide
//      string, // 3:OrderPrice
//      string, // 4:OrderQuantity
//      string, // 5:TypeOfMemberOrderOwner
//      string, // 6:OrderSequenceNumber
//      string, // 7:OrderEntryDate
//      string, // 8:TimeOfEvent
//      string, // 9:HasAnIcon \
//      string | null, // 10:ClientKey
// ];

type TBuySellRowMarketDepthItems = [number, number, number, string[][]];

interface IMarketDepthRes {
     buyRow: {
          items: TBuySellRowMarketDepthItems;
     }[];
     sellRow: {
          items: TBuySellRowMarketDepthItems;
     }[];
     lastTime: string;
}

interface ISameGroupsSub {
     bestBuyLimitPrice_1: number;
     bestSellLimitPrice_1: number;
     lastTradedPriceVarPercent: number;
     lastTradedPrice: number;
     totalNumberOfSharesTraded: number;
}

interface ISameGroupsRes {
     bestBuyPrice: number;
     bestBuyLimitPrice_1: number;
     bestSellLimitPrice_1: number;
     bestSellPrice: number;
     lastTradedPriceVarPercent: number;
     sectorCode: string;
     symbolISIN: string;
     symbolTitle: string;
     lastTradedPrice: number;
     totalNumberOfSharesTraded: number;
}

interface IOptionContractsRes {
     bestBuyPrice: number;
     bestBuyPricebestBuyLimitPrice_1: number;
     bestSellLimitPrice_1: number;
     bestSellPrice: number;
     contractEndDate: string;
     lastTradedPrice: number;
     lastTradedPriceVarPercent: number;
     sectorCode: string;
     strikePrice: number;
     symbolISIN: string;
     symbolTitle: string;
     totalNumberOfSharesTraded: number;
}
