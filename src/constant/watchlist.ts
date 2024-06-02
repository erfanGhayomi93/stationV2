

export type TParamsQueryKeyWatchlistSymbol = {
    watchlistType?: string,
    PageNumber?: number,
    MarketUnit?: string,
    SectorCode?: string,
    type?: string,
    watchlistId?: number
}

export const queryKeyWatchlistSymbol = (params: TParamsQueryKeyWatchlistSymbol) : string[] => {

    const { watchlistType, MarketUnit, PageNumber, SectorCode, type, watchlistId } = params || {};

    let key = ''

    if (watchlistType === "Market") {
        key = (MarketUnit ?? '') + SectorCode
    } else if (watchlistType === "Ramand") {
        key = (type ?? '') 
    }
    else if (watchlistType === "Pinned") {
        key = ''
    } else {
        key =  String(watchlistId)
    }

    return ['getWatchListSymbols',String(watchlistType), String(PageNumber) , key];
}