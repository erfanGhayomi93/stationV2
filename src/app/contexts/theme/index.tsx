import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type ThemeStateType = {
    isDarkMode: boolean;
};

const themeInitialState: ThemeStateType = {
    isDarkMode: false,
};

// action
export enum ThemeActionEnum {
    SET_APP_DARK_MODE = 'SET_APP_DARK_MODE',
}

type ThemeActionType = { type: ThemeActionEnum.SET_APP_DARK_MODE; payload: typeof themeInitialState.isDarkMode };

const reducer = (state: ThemeStateType, action: ThemeActionType): ThemeStateType => {
    //
    if (action.type === ThemeActionEnum.SET_APP_DARK_MODE) {
        return { ...state, isDarkMode: action.payload };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, themeInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: ThemeProvider, useTrackedState: useThemeValues, useUpdate: useThemeDispatch } = container;
