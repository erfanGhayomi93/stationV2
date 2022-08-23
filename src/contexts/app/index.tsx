import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type AppStateType = {
    appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed';
    userData: { firstName: string; lastName: string; userName: string };
};

const appInitialState: AppStateType = {
    appState: 'Loading',
    userData: { firstName: '', lastName: '', userName: '' },
};

// action
export enum AppActionEnum {
    SET_APP_STATE = 'SET_APP_STATE',
    SET_APP_USER = 'SET_APP_USER',
}

type AppActionType =
    | { type: AppActionEnum.SET_APP_STATE; payload: typeof appInitialState.appState }
    | { type: AppActionEnum.SET_APP_USER; payload: typeof appInitialState.userData };

// dispatch
export type AppDispatchType = React.Dispatch<AppActionType>;

const reducer = (state: AppStateType, action: AppActionType): AppStateType => {
    //

    if (action.type === AppActionEnum.SET_APP_STATE) {
        return { ...state, appState: action.payload };
    }

    if (action.type === AppActionEnum.SET_APP_USER) {
        return { ...state, userData: action.payload, appState: 'LoggedIn' };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, appInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: AppProvider, useTrackedState: useAppValues, useUpdate: useAppDispatch } = container;
