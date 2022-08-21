import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type ReducerStateType = {
    isDarkMode: boolean;
};

const reducerInitialState = {
    isDarkMode: false,
};

// action
export enum ReducerActionEnum {
    SET_APP_DARK_MODE = 'SET_APP_DARK_MODE',
}

type ReducerActionType = { type: ReducerActionEnum.SET_APP_DARK_MODE; payload: boolean };

// dispatch
export type ReducerDispatchType = React.Dispatch<ReducerActionType>;

const reducer = (state: ReducerStateType, action: ReducerActionType): ReducerStateType => {
    //
    if (action.type === ReducerActionEnum.SET_APP_DARK_MODE) {
        return { ...state, isDarkMode: action.payload };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, reducerInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: ThemeProvider, useTrackedState: useThemeValues, useUpdate: useThemeDispatch } = container;
