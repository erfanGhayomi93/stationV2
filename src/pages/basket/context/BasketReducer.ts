export const BasketReducer = (state: BasketState, action: BasketAction): BasketState => {
    switch (action.type) {
        case 'SET_BUY_SELL_MODALL':
            return {
                ...state,
                visible: action.value,
            };
        case 'SET_ID':
            return {
                ...state,
                id: action.value,
            };

        default:
            return state;
    }
};
