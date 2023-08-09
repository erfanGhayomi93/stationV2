import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useReducer, useRef } from 'react';
import { createContainer } from 'react-tracked';
import { pushEngine } from 'src/api/pushEngine';
// import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import Watchlists from '..';
import EditWatchlistModal from '../modal/EditWatchlistModal';
import { WatchlistReducer } from './WatchListReducer';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import { AddSymbolModal } from '../modal/AddSymbolModal';

const initialState: WathclistState = {
    selectedWatchlistId: 1,
    watchlistType: 'Market',
    editMode: false,
    addSymbolMode: false,
    selectedDefaultWatchlist: 'EffectiveOnIndex',
    column: [],
    listShowColumn: [],
    PageNumber: 1,
    marketUnit: "",
    sector: { id: "", title: "همه" }
};

// type ISocketAnswerType = Pick<ISymbolType, 'lastTradedPrice' | 'closingPrice' | 'totalNumberOfSharesTraded' | 'totalTradeValue'>;
type IQueryKeyType = [string, number | string]

const useValue = () => useReducer(WatchlistReducer, initialState);

export const { Provider: WatchListsProvider, useTrackedState: useTrackedState, useUpdate: useSetState } = createContainer(useValue);

export const useWatchListState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};

const WatchlistContext = () => {
    const {
        state: { selectedWatchlistId: watchlistId, watchlistType, sector, PageNumber, marketUnit: MarketUnit, selectedDefaultWatchlist: type },
    } = useWatchListState();

    const timer = useRef<NodeJS.Timeout | null>()

    const queryClient = useQueryClient();

    const { remove } = useWatchListSymbolsQuery(
        { watchlistId, watchlistType, type, MarketUnit, SectorCode: sector.id, PageNumber: PageNumber }, {
        onSuccess(data) {
            pushEngine.subscribe<Partial<IGetWatchlistSymbol>>({
                id: 'WatchlistSymbol',
                mode: 'MERGE',
                isSnapShot: 'yes',
                adapterName: 'RamandRLCDData',
                items: data.map((watchlist) => watchlist?.symbolISIN),
                fields: ['lastTradedPrice', 'closingPrice', 'bestSellLimitPrice_1', 'bestBuyLimitPrice_1', 'bestBuyLimitQuantity_1', 'bestSellLimitQuantity_1', 'totalNumberOfSharesTraded', 'totalTradeValue', 'highestTradePriceOfTradingDay', 'lowestTradePriceOfTradingDay', 'lastTradedPriceVarPercent', 'closingPriceVarPercent'],
                onFieldsUpdate: ({ changedFields, itemName }) => {
                    timer.current = setTimeout(() => {

                        const queryKey = watchlistType === "Market" ? MarketUnit + sector.id : watchlistType === "Ramand" ? type : ""
                        queryClient.setQueryData(['getWatchListSymbols', watchlistId + '-' + PageNumber + queryKey], (oldData: IGetWatchlistSymbol[] | undefined) => {
                            console.log("changedFields", changedFields)
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
                    }, 500);
                }
            })
        },
    }

    )


    const clearTimer = () => {
        if (!timer.current) return;

        clearTimeout(timer.current);
        timer.current = null;
    };

    // const handlePushEngineSymbol = <T extends { symbolISIN: string }>(data: T[], queryKey: IQueryKeyType) => (
    //     pushEngine.subscribe<Partial<ISymbolType>>({
    //         id: 'WatchlistSymbol',
    //         mode: 'MERGE',
    //         isSnapShot: 'yes',
    //         adapterName: 'RamandRLCDData',
    //         items: data.map((watchlist) => watchlist?.symbolISIN),
    //         fields: ['lastTradedPrice', 'closingPrice', 'bestSellLimitPrice_1', 'bestBuyLimitPrice_1', 'bestBuyLimitQuantity_1', 'bestSellLimitQuantity_1', 'totalNumberOfSharesTraded', 'totalTradeValue', 'highestTradePriceOfTradingDay', 'lowestTradePriceOfTradingDay', 'lastTradedPriceVarPercent', 'closingPriceVarPercent'],
    //         onFieldsUpdate: ({ changedFields, itemName }) => handleOnFieldsUpdate<IWatchlistSymbolType>(changedFields, itemName, queryKey)
    //     })
    // )

    //     const handleOnFieldsUpdate = <T extends { symbolISIN: string, symbol: ISymbolType }>(changedFields: Partial<ISymbolType>, itemName: string, queryKey: IQueryKeyType) => {
    //         queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
    //             console.log("oldData", oldData)
    //             if (oldData !== undefined) {
    //                 const updatedWatchList: T[] = JSON.parse(JSON.stringify(oldData));
    //                 const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName) as T;
    //                 const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);
    // 
    //                 const updatedSymbol: T = {
    //                     ...effectedSymbol,
    //                     symbol: {
    //                         ...effectedSymbol?.symbol,
    //                         ...changedFields,
    //                     },
    //                 };
    //                 updatedWatchList[inx] = updatedSymbol;
    //                 return [...updatedWatchList];
    //             }
    //         });
    //     }


    // const { remove: removeSymbolUser } = useWatchListSymbolsQuery(selectedWatchlistId, watchlistType, {
    //     onSuccess(data) { handlePushEngineSymbol<IWatchlistSymbolType>(data, ['getWatchListSymbols', selectedWatchlistId as number]); },
    // })


    // const { remove: removeSymbolMarket } = useGetMarketSymbolQuery(
    //     {
    //         SectorCode: sector.id,
    //         PageNumber: PageNumber,
    //         marketUnit: marketUnit,
    //     },
    //     watchlistType,
    //     {
    //         onSuccess(data: IResponseMarket) { handlePushEngineSymbol<IWatchlistSymbolTableType>(data.symbols, ['GetMarketSymbol', PageNumber + sector.id + marketUnit]); },
    //     }
    // )

    // const { remove: removeSymbolDefault } = useDefaultWatchlistSymbolsQuery(selectedDefaultWatchlist, watchlistType, {
    //     onSuccess(data: IWatchlistSymbolTableType[]) { handlePushEngineSymbol<IWatchlistSymbolTableType>(data, ['getDefaultWatchlistSymbols', selectedWatchlistId as number]); },
    // })




    useEffect(() => {
        return () => {
            remove();
            pushEngine.unSubscribe('WatchlistSymbol')
        };
    }, [watchlistId, MarketUnit, sector.id, type]);

    return (
        <>
            <Watchlists />
            <EditWatchlistModal />
            <AddSymbolModal />
        </>
    );
};

const WatchlistWidget = () => (
    <WatchListsProvider>
        <WatchlistContext />
    </WatchListsProvider>
);

export default WatchlistWidget;
