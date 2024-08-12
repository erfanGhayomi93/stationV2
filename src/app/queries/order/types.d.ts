type ICustomerIsins = string[];

type IAggregate = '' | 'Customer' | 'Symbol' | 'Both';
interface IOrderRequestType {
    id?: string;
    status?: string;
    customerISIN: ICustomerIsins;
    customerTitle: ICustomerIsins; //for show in notification
    CustomerTagId?: ICustomerIsins;
    GTTraderGroupId?: ICustomerIsins;
    symbolISIN: string;
    orderSide: BuySellSide;
    price: number;
    quantity: number;
    percent: number;
    validity: validity;
    validityDate: string | null;
    orderDraftId: number | undefined;
    orderType: OrderTypeType;
    orderStrategy: string;
}

interface IDoneTradesDetailsReq {
    customerISIN?: string;
    symbolISIN?: string;
    orderSide?: BuySellSide;
}
interface ITodayOpenOrderType {
    side?: BuySellSide;
    symbolISIN?: string;
    CustomerISIN?: string | string[];
    GtOrderStateRequestType?: 'All' | 'OnBoard' | 'Done' | 'Error';
}
interface IOrderGetType {
    clientKey: string;
    orderId: number;
    customerISIN: string;
    symbolTitle: string;
    symbolISIN: string;
    orderSide: BuySellSide;
    price: number;
    expectedRemainingQuantity: number;
    sumExecuted: number;
    validityDate?: string;
    quantity: number;
    value: number;
    validity: validity;
    customerTitle: string;
    position: number;
    valuePosition: number;
    status?: OrderStatusType | 'OnBoard' | 'Done' | 'Error';
    iterationCount?: number;
    bourseCode?: string;
    RemainingQuantity : string;
    orderFrom?: string;
    remainingQuantity : number ;
    requestDate : string ;
    lastErrorCode : string;
    tradeDate : string;
    totalPrice : number;
    commission : number;
    orderPlaceInPrice: number
}

type TTodayDoneTrades = {
    customerISIN: string;
    customerTitle: string;
    symbolISIN: string;
    symbolTitle: string;
    orderSide: string;
    price: number;
    quantity: number;
    totalPrice: number;
    tradeDate: string;
    commission?: number;
};

type IOrderSelected = {
    orderId: number;
    customerTitle: string;
    symbolTitle: string;
    orderSide: BuySellSide;
    quantity: number;
    price: number;
    value: number;
    sumExecuted: number;
    position: number;
    valuePosition: number;
    validity: validity;
    validityDate: string | null;
};
// type BuySellSide = 'Cross' | 'Buy' | 'Sell' | '';
type OrderTypeType = 'MarketOrder' | 'LimitOrder' | 'MarketToLimitOrder' | 'MarketOnOpeningOrder' | 'StopOrder';
type OrderStatusType =
    | 'InOMSQueue'
    | 'OnSending'
    | 'Error'
    | 'DeleteByEngine'
    | 'OnBoard'
    | 'Canceled'
    | 'OnModifyFrom'
    | 'OnModifyTo'
    | 'Modified'
    | 'OnBoardModify'
    | 'PartOfTheOrderDone'
    | 'OrderDone'
    | 'OnCanceling'
    | 'OnModifyError'
    | 'OnCancelError'
    | 'Expired'
    | 'draft'
    | 'RejectByGAP'
    | 'OnCancelingWithBroker'
    | 'TradeCancel'
    | 'Contract_InCremental_DisAllowed_FromTSE'
    | '';
interface IOrderResponseType {
    successClientKeys: string[];
    errorNumbers: number;
}

interface ISingleDeleteOrderResult {
    clientKey: string | null;
    orderId: number;
    response: string;
    succeeded: boolean;
}

interface ISingleModifyOrderReq {
    price: number;
    quantity: number;
    validity: validity;
    validityDate: string | null;
    id: number;
}

interface IGTOrderListResultType {
    symbolTitle: string;
    customerISIN: string;
    customerTitle: string;
    orderSide: string;
    customerType: string;
    orderDateTime: string;
    quantity: number;
    price: number;
    totalValue: number;
    omsOrderState: string;
    userName: string;
    iteratedCount: number;
    orderValue: number;
    idOfTrader: string;
    symbolISIN: string;
    validity?: validity;
    orderId  : string
    remainingQuantity : number
}

interface IOrderListDetail {
    orderDateTime: string,
    price: number,
    quantity: number,
    omsOrderState: OrderStatusType
}

interface IGTOrderListRequest {
    FromDate?: string;
    ToDate?: string;
    Side?: BuySellSide;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    CustomerType?: CustomerType;
    OrderStatus?: OrderStatusType;
    Validity?: validity;
    PageNumber: number;
    PageSize: number;
    AggregateType: 'None' | 'Customer' | 'Symbol' | 'Both';
    MyStationOnly?: boolean;
    Time: string;
}

interface IGTOrderListResponseType extends GlobalPaginatedApiResponse<IGTOrderListResultType[]> {}

interface IGTTradesListRequest {
    FromDate?: string;
    ToDate?: string;
    Side?: BuySellSide;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    PageNumber: number;
    PageSize: number;
    Time?: string;
    CustomerType?: CustomerType;
    MyStationOnly: boolean;
    GetTradesAggregateType: 'Customer' | 'Symbol' | 'Both' | 'None';
}

interface IGTTradesListResultType {
    orderId : string;
    customerISIN: string;
    customerTitle: string;
    bourseCode: string;
    nationalCode: string;
    customerType: string;
    symbolISIN: string;
    symbolTitle: string;
    orderSide: string;
    tradeDate: string;
    tradeQuantity: number;
    tradePrice: number;
    totalPrice: number;
    totalCommission: number;
    iterationCount: number;
    orderFrom : string
}

interface IGTTradesResponseType extends GlobalPaginatedApiResponse<IGTTradesListResultType[]> {}

interface IGTOfflineTradesRequests {
    FromDate?: string;
    ToDate?: string;
    Side?: BuySellSide;
    SymbolISIN?: string[];
    CustomerISIN?: string[];
    RequestNo?: string;
    State?: string;
    MarketType?: string;
    MarketUnit?: string;
    CustomerType?: CustomerType;
    Channel?: string;
    MyStationOnly?: boolean;
    PageSize: number;
    PageNumber: number;
}

interface IGTOfflineTradesResult {
    bourseCode: string;
    customerISIN: string;
    customerTitle: string;
    customerType: string;
    id: number;
    orderValue: number;
    price: string;
    priceType: string;
    quantity: string;
    quantityType: string;
    requestDate: string;
    requestExpiration: string;
    side: string;
    state: string;
    symbolISIN: string;
    symbolTitle: string;
}

interface IGTOfflineTradesResponse extends GlobalPaginatedApiResponse<IGTOfflineTradesResult[]> {}

interface OpentRequestsHistory {
    symbolISIN: string;
    date: string;
    state: string;
    action: string;
}

interface IGTOfflineRequestHistoryResult {
    id: number;
    userName: string;
    dateTime: string;
    state: string;
}

interface IDeleteRequest {
    result: boolean;
    succeeded: boolean;
    errors: any;
}

interface IGetOfflineRequestsParams {
    CustomerSearchTerm?: string;
    SymbolSearchTerm?: string;
    // InputState?: 'All' | 'SendError' | 'Registration' | 'Send';
    InputState?: string;
    PageNumber?: number;
    PageSize?: number;
}

interface IGetOfflineRequestsParamsPaginated {
    Time?: string;
    FromDate?: string;
    ToDate?: string;
    State?: string;
    SymbolISIN: SymbolSearchResult[];
    CustomerISIN: IGoCustomerSearchResult[];
    RequestNo?: string;
    MyStationOnly?: boolean;
    MarketType?: string;
    Channel?: string;
    CustomerType?: string;
    MarketUnit?: string;
    PageNumber: number;
    PageSize: number;
}
interface IOfflineRequestsPaginatedResponse {
    bourseCode: string;
    cancellationRequest: boolean;
    channel: string;
    customerISIN: string;
    customerTitle: string;
    customerType: string;
    executingStationId: number;
    executingStationName: null;
    formNo: number;
    fund: number;
    id: number;
    marketType: string;
    marketUnit: string;
    orderValue: number;
    price: string;
    priceType: string;
    quantity: string;
    quantityType: string;
    remainingFund: number;
    remainingVolume: number;
    requestDate: string;
    requestExpiration: string;
    requestNo: string;
    requestType: null;
    side: string;
    state: string;
    symbolISIN: string;
    symbolTitle: string;
    traderCode: string;
    traderTitle: string;
    volume: string;
}

interface IGetOpenRequestsResponse {
    id: number;
    bourseCode: string;
    traderTitle: string;
    traderCode: string;
    cancellationRequest: boolean;
    channel: string;
    customerISIN: string;
    customerTitle: string;
    executingStationId: number;
    executingStationName: string;
    formNo: number;
    marketType: string;
    fund: number;
    price: number;
    remainingVolume: number;
    remainingFund: number;
    requestExpiration: string;
    requestDate: string;
    requestNo: string;
    requestType: string;
    symbolISIN: string;
    state: string;
    side: string;
    symbolTitle: string;
    volume: number;
    customerType: string;
    marketUnit: string;
}

interface buySellRequestParams extends IGetOfflineRequestsParams {
    ids: number[];
    sendAllRequests: boolean;
    symbolISIN?: SymbolSearchResult[];
    customerISIN?: IGoCustomerSearchResult[];
    marketType?: string;
    marketUnit?: string;
    fromDate?: string;
    toDate?: string;
    side?: string;
    customerType?: string;
    requestNo?: string;
}
