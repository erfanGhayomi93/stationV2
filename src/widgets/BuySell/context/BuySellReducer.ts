import { BuySellInitialState } from './BuySellContext';

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
        case 'SET_DIVIDE':
            return {
                ...state,
                divide: action.value,
            };
        case 'SET_PERCENT':
            return {
                ...state,
                percent: action.value,
            };
        case 'TOGGLE_CALCULATOR':
            return {
                ...state,
                isCalculatorEnabled: action.value,
            };
        case 'SET_AMOUNT':
            return {
                ...state,
                amount: action.value,
            };
        case 'TOGGLE_BUY_SELL':
            return {
                ...state,
                side: action.value,
            };
        case 'RESET':
            return { ...BuySellInitialState, sequential: true };
        default:
            return state;
    }
};
