export const BasketReducer = (state: BasketState, action: BasketAction): BasketState => {
    switch (action.type) {
        case 'SET_BUY_SELL_MODALL':
            return {
                ...state,
                visible: action.value,
            };
        case 'SET_BASKET_ID':
            return {
                ...state,
                id: action.value,
            };
        case 'SET_ORDER_ID':
            return {
                ...state,
                orderId: action.value,
            };
        case 'RESET':
            return {
                id: state.id,
            };

        default:
            return state;
    }
};
