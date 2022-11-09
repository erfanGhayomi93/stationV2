type BasketState = {
    visible?: boolean;
    id?: number;
};
type BasketAction = { type: 'SET_BUY_SELL_MODALL'; value: boolean } | { type: 'SET_ID'; value: number | undefined };
