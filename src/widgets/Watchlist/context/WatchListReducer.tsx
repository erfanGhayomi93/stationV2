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

        default:
            return state;
    }
};