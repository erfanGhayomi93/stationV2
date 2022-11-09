import { useState } from 'react';
import { createContainer } from 'react-tracked';

interface GlobalSetterState {
    resetBuySellState: () => void;
    setBuySellModalExtra: <T = unknown>(value: T) => void;
}

export const GlobalSetterInitialState: GlobalSetterState = { resetBuySellState: () => {}, setBuySellModalExtra: () => {} };
const useValue = () => useState<GlobalSetterState>(GlobalSetterInitialState);
export const {
    Provider: GlobalSetterProvider,
    useTrackedState: useGlobalSetterState,
    useUpdate: useGlobalSetterDispatch,
} = createContainer(useValue);
