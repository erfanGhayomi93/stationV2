type WathclistAction =
    | { type: 'SET_SELECTED_WATCHLIST'; value: {id : number , type : WatchlistType } }
    | { type: 'SET_SELECTED_WATCHLIST_TYPE'; value: WatchlistType }
    | { type: 'SET_SELECTED_DEFAULT_WATCHLIST'; value: IDefaultWatchlistType }
    | { type: 'TOGGLE_EDIT_MODE'; value: boolean }
    | { type: 'TOGGLE_ADD_SYMBOL_MODE'; value: boolean }
    | { type: 'CHANGE_IS_SHOW_COLUMN'; value: string[] }
    | { type: 'SET_COLUMN'; value: ColDefType<IGetWatchlistSymbol>[] }
    | { type: 'SET_PageNumber'; value: number }
    | { type: 'SET_MarketUnit_Filter'; value: string }
    | { type: 'SET_Sector_Filter'; value: { id: string; title: string } };
SET_COLUMN;
type WathclistState = {
    selectedWatchlistId: number;
    watchlistType: WatchlistType;
    editMode: boolean;
    addSymbolMode : boolean;
    selectedDefaultWatchlist: IDefaultWatchlistType;
    listShowColumn: string[];
    column: ColDefType<IGetWatchlistSymbol>[];
    PageNumber: number;
    marketUnit: string;
    sector: { id: string; title: string };
};
