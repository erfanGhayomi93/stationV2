export const ReportsReducer = (state: ReportsState, action: ReportsAction): ReportsState => {
    switch (action.type) {
        case 'SET_CUSTOMER':
            return {
                ...state,
                customerISIN: action.value,
            };
        case 'SET_SYMBOL':
            return {
                ...state,
                symbolISIN: action.value,
            };
        case 'SET_START_DATE':
            return {
                ...state,
                FromDate: action.value,
            };
        case 'SET_TILL_DATE':
            return {
                ...state,
                ToDate: action.value,
            };
        case 'SET_STATUS':
            return {
                ...state,
                status: action.value,
            };
        case 'SET_SIDE':
            return {
                ...state,
                side: action.value,
            };
        default:
            return state;
    }
};
