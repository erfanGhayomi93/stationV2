export const WatchlistReducer = (state: WathclistState, action: WathclistAction): WathclistState => {
    switch (action.type) {
        case 'SET_SELECTED_WATCHLIST':
            return {
                ...state,
                selectedWatchlistId: action.value.id,
                watchlistType: action.value.type
            };
        case 'SET_SELECTED_RAMAND_FILTER_WATCHLIST':
            return {
                ...state,
                ramandFilterWatchlist: action.value,
            };
        case 'TOGGLE_EDIT_MODE':
            return {
                ...state,
                editMode: action.value,
            };
        case 'TOGGLE_ADD_SYMBOL_MODE':
            return {
                ...state,
                addSymbolMode: action.value,
            };
        case 'SET_COLUMN':
            return {
                ...state,
                column: action.value,
            };
        case 'CHANGE_IS_SHOW_COLUMN':
            return {
                ...state,
                listShowColumn: action.value,
            };
        case 'SET_PageNumber':
            return {
                ...state,
                PageNumber: action.value,
            };
        case 'SET_MarketUnit_Filter':
            return {
                ...state,
                PageNumber: 1,
                marketUnit: action.value,
            };
        case 'SET_Sector_Filter':
            return {
                ...state,
                PageNumber: 1,
                sector: action.value,
            };


        default:
            return state;
    }
};
