import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import Watchlists from '..';
import { WatchlistReducer } from './WatchListReducer';

const initialState: WathclistState = {
    selectedWatchlist: undefined,
};
const useValue = () => useReducer(WatchlistReducer, initialState);
export const { Provider: WatchListsProvider, useTrackedState: useWatchListsState, useUpdate: useWatchListsDispatch } = createContainer(useValue);

const WatchlistContext = () => {
    return <Watchlists />;
};

const WatchlistWidget = () => (
    <WatchListsProvider>
        <WatchlistContext />
    </WatchListsProvider>
);

export default WatchlistWidget;
