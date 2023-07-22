type WathclistAction =
    | { type: 'SET_SELECTED_WATCHLIST'; value: number }
    | { type: 'SET_SELECTED_DEFAULT_WATCHLIST'; value: IDefaultWatchlistType }
    | { type: 'TOGGLE_EDIT_MODE'; value: boolean }
    | { type: 'CHANGE_IS_SHOW_COLUMN'; value: string[] }
    | { type: 'SET_COLUMN'; value: ColDefType<IWatchlistSymbolTableType>[] }
    | { type: 'SET_PageNumber'; value: number }
    | { type: 'SET_MarketUnit_Filter'; value: string }
    | { type: 'SET_Sector_Filter'; value: { id: string; title: string } };
SET_COLUMN;
type WathclistState = {
    selectedWatchlist: number | undefined;
    editMode: boolean;
    selectedDefaultWatchlist: IDefaultWatchlistType;
    listShowColumn: string[];
    column: ColDefType<IWatchlistSymbolTableType>[];
    PageNumber: number;
    marketUnit: string;
    sector: { id: string; title: string };
};
