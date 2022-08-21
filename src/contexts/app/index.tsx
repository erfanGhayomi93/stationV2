import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type ReducerStateType = {
    appState: keyof typeof AppStateEnum;
    userData: { firstName: string; lastName: string };
};

enum AppStateEnum {
    Loading = 'Loading',
    LoggedIn = 'LoggedIn',
    LoggedOut = 'LoggedOut',
    Crashed = 'Crashed',
}

type AppUserType = { firstName: string; lastName: string; userName: string };

const reducerInitialState = {
    appState: AppStateEnum.Loading,
    userData: { firstName: '', lastName: '' },
};

// action
export enum ReducerActionEnum {
    SET_APP_STATE = 'SET_APP_STATE',
    SET_APP_USER = 'SET_APP_USER',
}

type ReducerActionType =
    | { type: ReducerActionEnum.SET_APP_STATE; payload: keyof typeof AppStateEnum }
    | { type: ReducerActionEnum.SET_APP_USER; payload: AppUserType };

// dispatch
export type ReducerDispatchType = React.Dispatch<ReducerActionType>;

const reducer = (state: ReducerStateType, action: ReducerActionType): ReducerStateType => {
    //

    if (action.type === ReducerActionEnum.SET_APP_STATE) {
        return { ...state, appState: action.payload };
    }

    if (action.type === ReducerActionEnum.SET_APP_USER) {
        return { ...state, userData: action.payload, appState: 'LoggedIn' };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, reducerInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: AppProvider, useTrackedState: useAppValues, useUpdate: useAppDispatch } = container;
