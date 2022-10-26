import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { pushEngine } from 'src/api/pushEngine';
import { useWatchListSymbolsQuery } from 'src/app/queries/watchlist';
import Watchlists from '..';
import EditWatchlistModal from '../modal/EditWatchlistModal';
import { WatchlistReducer } from './WatchListReducer';

const initialState: WathclistState = {
    selectedWatchlist: 0,
    editMode: false,
    selectedDefaultWatchlist: 'EffectiveOnIndex',
};

type ISocketAnswerType = Pick<ISymbolType, 'lastTradedPrice' | 'closingPrice' | 'totalNumberOfSharesTraded' | 'totalTradeValue'>;

const useValue = () => useReducer(WatchlistReducer, initialState);
export const { Provider: WatchListsProvider, useTrackedState: useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useWatchListState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const WatchlistContext = () => {
    const {
        state: { selectedWatchlist },
    } = useWatchListState();

    const queryClient = useQueryClient();

    const { remove } = useWatchListSymbolsQuery<IWatchlistSymbolTableType[]>(selectedWatchlist, {
        onSuccess: (data) => {
            pushEngine.subscribe<ISocketAnswerType>({
                id: 'WatchlistSymbol',
                mode: 'MERGE',
                isSnapShot: 'yes',
                adapterName: 'RamandRLCDData',
                items: data.map((watchlist) => watchlist.symbolISIN),
                fields: ['lastTradedPrice', 'closingPrice', 'totalNumberOfSharesTraded', 'totalTradeValue'],
                onFieldsUpdate: ({ changedFields, itemName }) => {
                    queryClient.setQueryData(['getWatchListSymbols', selectedWatchlist], (oldData: IWatchlistSymbolType[] | undefined) => {
                        // //
                        if (oldData !== undefined) {
                            const updatedWatchList: IWatchlistSymbolType[] = JSON.parse(JSON.stringify(oldData));
                            const effectedSymbol = oldData.find((symbol) => symbol.symbolISIN === itemName) as IWatchlistSymbolType;
                            const inx = oldData.findIndex((symbol) => symbol.symbolISIN === itemName);
                            const updatedSymbol: IWatchlistSymbolType = {
                                ...effectedSymbol,
                                symbol: {
                                    ...effectedSymbol?.symbol,
                                    ...changedFields,
                                },
                            };

                            updatedWatchList[inx] = updatedSymbol;

                            return [...updatedWatchList];
                        }
                    });
                },
            });
        },
    });

    useEffect(() => {
        return () => {
            remove();
        };
    }, [selectedWatchlist]);

    return (
        <>
            <Watchlists />
            <EditWatchlistModal />
        </>
    );
};

const WatchlistWidget = () => (
    <WatchListsProvider>
        <WatchlistContext />
    </WatchListsProvider>
);

export default WatchlistWidget;
