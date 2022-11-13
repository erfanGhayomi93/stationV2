export const WatchlistReducer = (state: WathclistState, action: WathclistAction): WathclistState => {
    switch (action.type) {
        case 'SET_SELECTED_WATCHLIST':
            return {
                ...state,
                selectedWatchlist: action.value,
            };
        case 'SET_SELECTED_DEFAULT_WATCHLIST':
            return {
                ...state,
                selectedDefaultWatchlist: action.value,
            };
        case 'TOGGLE_EDIT_MODE':
            return {
                ...state,
                editMode: action.value,
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

        default:
            return state;
    }
};
