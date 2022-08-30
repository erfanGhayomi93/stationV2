import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type GlobalStateType = {
    appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed';
    userData: { firstName: string; lastName: string; userName: string };
};

const globalInitialState: GlobalStateType = {
    appState: 'Loading',
    userData: { firstName: '', lastName: '', userName: '' },
};

// action
export enum GlobalActionEnum {
    SET_APP_STATE = 'SET_APP_STATE',
    SET_APP_USER = 'SET_APP_USER',
}

type GlobalActionType =
    | { type: GlobalActionEnum.SET_APP_STATE; payload: typeof globalInitialState.appState }
    | { type: GlobalActionEnum.SET_APP_USER; payload: typeof globalInitialState.userData };

// dispatch
export type GlobalDispatchType = React.Dispatch<GlobalActionType>;

const reducer = (state: GlobalStateType, action: GlobalActionType): GlobalStateType => {
    //

    if (action.type === GlobalActionEnum.SET_APP_STATE) {
        return { ...state, appState: action.payload };
    }

    if (action.type === GlobalActionEnum.SET_APP_USER) {
        return { ...state, userData: action.payload, appState: 'LoggedIn' };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, globalInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: GlobalProvider, useTrackedState: useGlobalValues, useUpdate: useGlobalDispatch } = container;
