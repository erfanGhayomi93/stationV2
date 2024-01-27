type ICustomerIsins = string[];
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
interface ITodayOpenOrderType {
    side?: BuySellSide;
    symbolISIN?: string;
    CustomerISIN?: string;
    GtOrderStateRequestType?: 'OnBoard' | 'Done' | 'Error';
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
    orderId: number;
    symbolISIN: string;
    symbolTitle: string;
    customerISIN: string;
    customerTitle: string;
    bourseCode: string;
    orderSide: string;
    customerType: string;
    requestDate: string;
    orderDateTime: string;
    quantity: number;
    price: number;
    totalValue: number;
    omsOrderState: string;
    sumExecuted: number;
    userName: string;
    validity: validity;
    validityDate: string | null;
    orderFrom: string;
    parentOrderId: number;
    childOrderId: number;
    lastErrorCode: string;
    clientIP: string;
    customErrorMsg: string;
}

interface IGTOrderListRequest {
    FromDate?: string;
    ToDate?: string;
    Side?: BuySellSide;
    SymbolISIN?: string[];
    CustomerISIN?: string[];
    CustomerType?: CustomerType;
    OrderStatus?: OrderStatusType;
    Validity?: validity;
    PageNumber: number;
    PageSize: number;
    MyStationOnly?: boolean;
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
    GetTradesAggregateType: 'Customer' | 'Symbol' | 'Both';
}

interface IGTTradesListResultType {
    customerISIN: string;
    customerTitle: string;
    symbolTitle: string;
    symbolISIN: string;
    bourseCode: string;
    nationalCode: string;
    orderSide: BuySellSide;
    customerType: string;
    tradeDate: string;
    tradeQuantity: number;
    tradePrice: number;
    totalPrice: number;
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
    id: number;
    traderId: number;
    bourseCode: string;
    traderTitle: string;
    cancellationRequest: boolean;
    channel: string;
    customerISIN: string;
    customerTitle: string;
    customerType: string;
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
}

interface IGTOfflineTradesResponse extends GlobalPaginatedApiResponse<IGTOfflineTradesResult[]> {}

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
