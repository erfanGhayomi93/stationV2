import { useState } from 'react';
import { createContainer } from 'react-tracked';

interface GlobalSetterState {
    resetBuySellState: () => void;
}

export const GlobalSetterInitialState: GlobalSetterState = { resetBuySellState: () => {} };

const useValue = () => useState<GlobalSetterState>(GlobalSetterInitialState);


export const {
    Provider: GlobalSetterProvider,
    useTrackedState: useGlobalSetterState,
    useUpdate: useGlobalSetterDispatch,
} = createContainer(useValue);
