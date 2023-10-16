
type ICustomerIsins = string[];
interface IOrderRequestType {
    customerISIN?: ICustomerIsins;
    CustomerTagId?: ICustomerIsins;
    GTTraderGroupId?: ICustomerIsins;
    symbolISIN: string;
    orderSide: OrderSideType;
    price: number;
    quantity: number;
    percent: number;
    validity: string;
    validityDate: string | undefined;
    orderDraftId: number | undefined;
    orderType: OrderTypeType;
    orderStrategy: string;
}
interface ITodayOpenOrderType {
    side?: OrderSideType;
    symbolISIN?: string;
    CustomerISIN?: string;
    GtOrderStateRequestType?: 'OnBoard' | 'Done' | 'Error';
}
interface IOrderGetType {
    orderId: number;
    customerISIN: string;
    symbolTitle: string;
    symbolISIN: string;
    orderSide: OrderSideType;
    price: number;
    expectedRemainingQuantity: number;
    sumExecuted: number;
    validityDate?: string;
    quantity: number;
    value: number;
    validity: string;
    customerTitle: string;
    position: number;
    valuePosition: number;
}

type IOrderSelected = {
    orderId: number;
    customerTitle: string;
    symbolTitle: string;
    orderSide: OrderSideType;
    quantity: number;
    price: number;
    value: number;
    sumExecuted: number;
    position: number;
    valuePosition: number;
    validity: string;
    validityDate?: string;
};
type OrderSideType = 'Cross' | 'Buy' | 'Sell';
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
    | 'RejectByGAP'
    | 'OnCancelingWithBroker'
    | 'TradeCancel';
interface IOrderResponseType {
    successClientKeys: string[];
    errorNumbers: number;
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
    validity: string;
    validityDate: string;
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
    Side?: OrderSideType;
    SymbolISIN?: string[];
    CustomerISIN?: string[];
    CustomerType?: CustomerType;
    OrderStatus?: OrderStatusType;
    Validity?: validity;
    PageNumber: number;
    PageSize: number;
    MyStationOnly?: boolean;
}

interface IGTOrderListResponseType extends GlobalPaginatedApiResponse<IGTOrderListResultType[]> { }

interface IGTTradesListRequest {
    FromDate?: string;
    ToDate?: string;
    Side?: OrderSideType;
    SymbolISIN?: string[];
    CustomerISIN?: string[];
    PageNumber: number;
    PageSize: number;
    Time?: string;
    CustomerType?: CustomerType;
    MyStationOnly: boolean;
}



interface IGTTradesListResultType {
    customerISIN: string;
    customerTitle: string;
    symbolTitle: string;
    symbolISIN: string;
    bourseCode: string;
    nationalCode: string;
    orderSide: OrderSideType;
    customerType: string;
    tradeDate: string;
    tradeQuantity: number;
    tradePrice: number;
    totalPrice: number;
}

interface IGTTradesResponseType extends GlobalPaginatedApiResponse<IGTTradesListResultType[]> { }


interface IGTOfflineTradesRequests {
    FromDate?: string;
    ToDate?: string;
    Side?: OrderSideType;
    SymbolISIN?: string[];
    CustomerISIN?: string[];
    RequestNo?: string;
    State?: string;
    MarketType?: string;
    MarketUnit?: string;
    CustomerType?: string;
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
    cancellationRequest: boolean,
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

interface IGTOfflineTradesResponse extends GlobalPaginatedApiResponse<IGTOfflineTradesResult[]> { }


interface IGTOfflineRequestHistoryResult {
    id: number;
    userName: string;
    dateTime: string;
    state: string;
}