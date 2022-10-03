import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import Watchlists from '..';
import EditWatchlistModal from '../modal/EditWatchlistModal';
import { WatchlistReducer } from './WatchListReducer';

const initialState: WathclistState = {
    selectedWatchlist: undefined,
    editMode: false,
};
const useValue = () => useReducer(WatchlistReducer, initialState);
export const { Provider: WatchListsProvider, useTrackedState: useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useWatchListState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const WatchlistContext = () => {
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
