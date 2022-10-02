export const WatchlistReducer = (state: WathclistState, action: WathclistAction): WathclistState => {
    switch (action.type) {
        case 'SET_SELECTED_WATCHLIST':
            return {
                ...state,
                selectedWatchlist: action.value,
            };

        default:
            return state;
    }
};
