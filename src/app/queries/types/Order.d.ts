interface IOrderRequestType {
    customerISIN: string[];
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
interface IOrderGetType {
    orderId: number;
    customerISIN: string;
    symbolTitle: string;
    symbolISIN: string;
    orderSide: BuySellSide;
    price: number;
    expectedRemainingQuantity: number;
    sumExecuted: number;
    validityDate: string | null;
    quantity: number;
    value: number;
    hostOrderNumber: string;
    validity: validity;
    customerTitle: string;
    position: number;
    valuePosition: number;
    orderState : OrderStatus
}


// type OrderSideType = 'Cross' | 'Buy' | 'Sell';
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
