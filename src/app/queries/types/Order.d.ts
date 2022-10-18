interface IOrderRequestType {
    customerISIN: string[];
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
type OrderStatus =
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
