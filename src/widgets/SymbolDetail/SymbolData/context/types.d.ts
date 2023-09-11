interface ISymbolDataState {
    symbolChartType: SymbolChartType,
    symbolChartDate: SymbolChartDate,
    orderBookViewMode: 'Row' | 'Column',
    isMarketDepthOpen: boolean,
    isDepthChartOpen: boolean,
}

type ISymbolDataActions =
    | { type: 'TOGGLE_CHART_TYPE', payload: SymbolChartType }
    | { type: 'TOGGLE_CHART_DATE', payload: SymbolChartDate }
    | { type: 'TOGGLE_ORDER_BOOK_VIEW', payload: ISymbolDataState['orderBookViewMode'] }
    | { type: 'TOGGLE_MARKET_DEPTH', payload: boolean }
    | { type: 'TOGGLE_DEPTH_CHART', payload: boolean }