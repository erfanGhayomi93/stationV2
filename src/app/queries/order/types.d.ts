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
type IOrderSelected = {
    customerTitle: string;
    symbolTitle: string;
    orderSide: string;
    quantity: number;
    price: number;
    value: number;
    sumExecuted: number;
    position: number;
    valuePosition: number;
    validity: string;
    validityDate: string;
};
type OrderSideType = 'Cross' | 'None' | 'Buy' | 'Sell';
type OrderTypeType = 'MarketOrder' | 'LimitOrder' | 'MarketToLimitOrder' | 'MarketOnOpeningOrder' | 'StopOrder';

interface IOrderResponseType {
    successClientKeys: string[];
    errorNumbers: number;
}
