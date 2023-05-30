type WathclistAction =
    | { type: 'SET_SELECTED_WATCHLIST'; value: number }
    | { type: 'SET_SELECTED_DEFAULT_WATCHLIST'; value: IDefaultWatchlistType }
    | { type: 'TOGGLE_EDIT_MODE'; value: boolean }
    | { type: 'CHANGE_IS_SHOW_COLUMN'; value: string[] }
    | { type: 'SET_COLUMN'; value: ColDefType<IWatchlistSymbolTableType>[] }
    | { type: 'SET_PageNumber'; value: number }
    SET_COLUMN
type WathclistState = {
    selectedWatchlist: number | undefined;
    editMode: boolean;
    selectedDefaultWatchlist: IDefaultWatchlistType;
    listShowColumn : string[]
    column : ColDefType<IWatchlistSymbolTableType>[]
    PageNumber : number
}
