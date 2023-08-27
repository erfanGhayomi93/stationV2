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
        case 'Toggle_Modal_TV':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [value as keyof typeof state.modals]: !state.modals[value as keyof typeof state.modals],
                },
            };
        case 'Set_TV_Sidebar_Status':
            return {
                ...state,
                tvSidebarStatus: value,
            };

        default:
            return state;
    }
};
