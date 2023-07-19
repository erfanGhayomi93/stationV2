import { useReducer } from 'react';
import { TradesReducer } from './TradesReducer';
import { createContainer } from 'react-tracked';
import Trades from '..';

const initialState = {};

const useTradesValue = () => useReducer(TradesReducer, initialState);
export const { Provider: TradesProvider, useTrackedState: useTradesState, useUpdate: useTradesDispatch } = createContainer(useTradesValue);

const TradesPage = () => {
    return (
        <TradesProvider>
            <Trades />
        </TradesProvider>
    );
};

export default TradesPage;
