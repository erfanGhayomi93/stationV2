import { MutableRefObject } from 'react';
import { pushEngine } from './pushEngine';
import { queryClient } from 'src/app/queryClient';

export const subscriptionWatchlistMinor = (
    data: IGetWatchlistSymbol[],
    timer: MutableRefObject<NodeJS.Timeout | null | undefined>,
    watchlistId: number,
) => {
    pushEngine.subscribe<Partial<IGetWatchlistSymbol>>({
        id: 'WatchlistSymbol',
        mode: 'MERGE',
        isSnapShot: 'yes',
        adapterName: 'RamandRLCDData',
        items: data.map((watchlist) => watchlist?.symbolISIN),
        fields: ['totalNumberOfSharesTraded', 'lastTradedPrice', 'lastTradedPriceVarPercent'],
        onFieldsUpdate: ({ changedFields, itemName }) => {
            timer.current = setTimeout(() => {
                queryClient.setQueryData(['getWatchListSymbols', watchlistId + '-' + 1], (oldData: IGetWatchlistSymbol[] | undefined) => {
                    if (!!oldData) {
                        const updatedWatchList = JSON.parse(JSON.stringify(oldData));
                        const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName);
                        const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);

                        const updatedSymbol = {
                            ...effectedSymbol,
                            ...changedFields,
                        };

                        updatedWatchList[inx] = updatedSymbol;
                        return [...updatedWatchList];
                    }
                });

                clearTimer();
            }, 2000);
        },
    });

    const clearTimer = () => {
        if (!timer.current) return;

        clearTimeout(timer.current);
        timer.current = null;
    };
};

export const subscriptionRecentHistory = (data: SearchSymbolType[], timer: MutableRefObject<NodeJS.Timeout | null | undefined>) => {
    pushEngine.subscribe<Partial<SearchSymbolType>>({
        id: 'RecentHistorySymbol',
        mode: 'MERGE',
        isSnapShot: 'yes',
        adapterName: 'RamandRLCDData',
        items: data.map((watchlist) => watchlist?.symbolISIN),
        fields: ['lastTradedPrice'],
        onFieldsUpdate: ({ changedFields, itemName }) => {
            timer.current = setTimeout(() => {
                queryClient.setQueryData(['userRecentSymbolHistory'], (oldData: SearchSymbolType[] | undefined) => {
                    if (!!oldData) {
                        const updatedWatchList = JSON.parse(JSON.stringify(oldData));
                        const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName);
                        const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);

                        const updatedSymbol = {
                            ...effectedSymbol,
                            ...changedFields,
                        };

                        updatedWatchList[inx] = updatedSymbol;
                        return [...updatedWatchList];
                    }
                });

                clearTimer();
            }, 2000);
        },
    });

    const clearTimer = () => {
        if (!timer.current) return;

        clearTimeout(timer.current);
        timer.current = null;
    };
};
