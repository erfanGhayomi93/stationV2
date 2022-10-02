type WathclistAction = { type: 'SET_SELECTED_WATCHLIST'; value: number } | { type: '....'; value: number };

type WathclistState = {
    selectedWatchlist: number | undefined;
};
