export const TradingViewReducer = (state: initStateType, action: tradingViewAction): initStateType => {
    const { value, type } = action;
    switch (type) {
        case 'Set_Selected_Symbol':
            return {
                ...state,
                selectedSymbol: value,
            };
        case 'Set_Active_Layout':
            return {
                ...state,
                tvChartActiveLayout: value,
            };
        case 'Toggle_Modal_Tv':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [value as keyof typeof state.modals]: !state.modals[value as keyof typeof state.modals],
                },
            };

        default:
            return state;
    }
};
