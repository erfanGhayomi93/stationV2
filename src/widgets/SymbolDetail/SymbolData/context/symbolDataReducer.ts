export const symbolDataReducer = (state: ISymbolDataState, { type, payload }: ISymbolDataActions): ISymbolDataState => {
    switch (type) {
        case 'TOGGLE_CHART_TYPE':
            return {
                ...state,
                symbolChartType: payload
            };
        case 'TOGGLE_CHART_DATE':
            return {
                ...state,
                symbolChartDate: payload
            };
        case 'TOGGLE_ORDER_BOOK_VIEW':
            return {
                ...state,
                orderBookViewMode: payload
            };
        case 'TOGGLE_MARKET_DEPTH':
            return {
                ...state,
                isMarketDepthOpen: payload
            };
        case 'TOGGLE_DEPTH_CHART':
            return {
                ...state,
                isDepthChartOpen: payload
            };
        default:
            return state

    }
}