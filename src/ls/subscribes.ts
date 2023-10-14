import { MutableRefObject } from 'react';
import { pushEngine } from './pushEngine';
import { queryClient } from 'src/app/queryClient';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { factoryQueryKey } from 'src/utils/helpers';

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

export const subscriptionCoGroupSymbol = (data: GetSameSectorResultType[], symbolISIN: string) => {
    let timer: string | number | NodeJS.Timeout | undefined;

    pushEngine.subscribe<GetSameSectorResultType>({
        id: 'CoGroupSymbol',
        mode: 'MERGE',
        isSnapShot: 'yes',
        adapterName: 'RamandRLCDData',
        items: data.map((watchlist) => watchlist?.symbolISIN),
        fields: ['lastTradedPrice', 'totalNumberOfSharesTraded', 'lastTradedPriceVarPercent', 'bestSellPrice', 'bestBuyPrice'],
        onFieldsUpdate({ changedFields, itemName }) {
            timer = setTimeout(() => {
                console.log('changedFields', changedFields);
                queryClient.setQueryData([Apis().Symbol.SameSectorSymbols, symbolISIN], (oldData: GetSameSectorResultType[] | undefined) => {
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

                clearTimeout(timer);
            }, 2000);
        },
    });
};

export const subscriptionPortfolio = (symbols: string[], params: IGTPortfolioRequestType) => {
    pushEngine.subscribe({
        id: 'portfolioSymbols',
        adapterName: 'RamandRLCDData',
        mode: 'MERGE',
        items: symbols,
        fields: ['lastTradedPrice', 'closingPrice', 'symbolState', 'lostProfitValue', 'dayValue'],
        isSnapShot: 'yes',
        onFieldsUpdate: ({ itemName, changedFields }) => {
            // console.log(itemName, changedFields);
            queryClient.setQueryData(
                ['portfolioList', factoryQueryKey(params)],
                (oldData: GlobalPaginatedApiResponse<IGTPortfolioResultType[]> | undefined) => {
                    if (!!oldData) {
                        const { result: portfolioSymbols, ...rest } = oldData;
                        const updatedPortfolio = JSON.parse(JSON.stringify(portfolioSymbols));
                        const effectedSymbol = portfolioSymbols.find((symbol) => symbol.symbolISIN === itemName);
                        const inx = portfolioSymbols.findIndex((symbol) => symbol.symbolISIN === itemName);

                        const updatedSymbol = {
                            ...effectedSymbol,
                            ...changedFields,
                        };

                        updatedPortfolio[inx] = updatedSymbol;
                        return {
                            ...rest,
                            result: updatedPortfolio,
                        };
                    }
                },
            );
        },
    });
};
