import { forwardRef, useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';
import { WidgetActionEnum, WidgetActionType, WidgetStateType } from './types';

// initial state
const widgetInitialState: WidgetStateType = {
    selectedSymbol: 'IRO1TAMN0001',
};

// reducer
const reducer = (state: WidgetStateType, action: WidgetActionType): WidgetStateType => {
    //

    if (action.type === WidgetActionEnum.SET_WIDGET_SELECTED_SYMBOL) {
        return { ...state, selectedSymbol: action.payload };
    }

    return state;
};

// controller hook
const useMyReducer = ({ initialState }: { initialState?: Partial<WidgetStateType> }) =>
    useReducer(reducer, { ...widgetInitialState, ...initialState });

// react-tracked container
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: WidgetProvider, useTrackedState: useWidgetValues, useUpdate: useWidgetDispatch } = container;
