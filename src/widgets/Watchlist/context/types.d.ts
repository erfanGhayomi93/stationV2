type WathclistAction =
    | { type: 'SET_SELECTED_WATCHLIST'; value: number }
    | { type: 'SET_SELECTED_DEFAULT_WATCHLIST'; value: IDefaultWatchlistType }
    | { type: 'TOGGLE_EDIT_MODE'; value: boolean };

type WathclistState = {
    selectedWatchlist: number | undefined;
    editMode: boolean;
    selectedDefaultWatchlist: IDefaultWatchlistType;
};
