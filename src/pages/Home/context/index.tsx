import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

// state
type HomePageStateType = {
    x: boolean;
};

const homePageInitialState: HomePageStateType = {
    x: false,
};

// action
export enum HomePageActionEnum {
    SET_X = 'SET_X',
}

type HomePageActionType = { type: HomePageActionEnum.SET_X; payload: typeof homePageInitialState.x };

const reducer = (state: HomePageStateType, action: HomePageActionType): HomePageStateType => {
    //
    if (action.type === HomePageActionEnum.SET_X) {
        return { ...state, x: action.payload };
    }

    return state;
};

// react-tracked container
const useMyReducer = () => useReducer(reducer, homePageInitialState);
const container = createContainer(useMyReducer);

// change names and export
export const { Provider: HomePageProvider, useTrackedState: useHomePageValues, useUpdate: useHomePageDispatch } = container;
