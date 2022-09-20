export const BuySellReducer = (state: BuySellState, action: BuySellAction): BuySellState => {
    switch (action.type) {
        case 'SET_PRICE':
            return {
                ...state,
                price: action.value,
            };
        case 'SET_QUANTITY':
            return {
                ...state,
                quantity: action.value,
            };
        case 'SET_VALIDITY':
            return {
                ...state,
                validity: action.value,
            };
        case 'SET_STRATEGY':
            return {
                ...state,
                strategy: action.value,
            };
        case 'SET_VALIDITY_DATE':
            return {
                ...state,
                validityDate: action.value,
            };
        case 'SET_SEQUENTIAL':
            return {
                ...state,
                sequential: action.value,
            };
        case 'SET_SYMBOL':
            return {
                ...state,
                symbolISIN: action.value,
            };

        default:
            return state;
    }
};
