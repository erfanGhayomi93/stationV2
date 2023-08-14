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
    customerISIN: string;
    customerTitle: string;
    symbolTitle: string;
    symbolISIN: string;
    orderSide: OrderSideType;
    state: OrderStatusType;
    price: number;
    quantity: number;
    value: number;
    orderDateTime: Date;
}

interface IGTOrderListRequest {
    FromDate?: string;
    ToDate?: string;
    Side?: OrderSideType;
    symbolISIN?: string;
    CustomerISIN?: string;
    OrderStatus?: OrderStatusType;
    PageNumber?: number;
    PageSize?: number;
}


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

interface IGTTradesResponseType extends GlobalPaginatedApiResponse<IGTTradesListResultType[]> {}