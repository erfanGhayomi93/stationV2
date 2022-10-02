type WathclistAction = { type: 'SET_SELECTED_WATCHLIST'; value: number } | { type: 'TOGGLE_EDIT_MODE'; value: boolean };

type WathclistState = {
    selectedWatchlist: number | undefined;
    editMode: boolean;
};
