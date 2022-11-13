type BasketState = {
    visible?: boolean;
    id?: number;
    orderId?: number;
};
type BasketAction =
    | { type: 'SET_BUY_SELL_MODALL'; value: boolean }
    | { type: 'SET_BASKET_ID'; value: number | undefined }
    | { type: 'SET_ORDER_ID'; value: number | undefined }
    | { type: 'RESET' };
