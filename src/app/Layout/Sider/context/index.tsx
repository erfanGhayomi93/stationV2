import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const itialStateSldier: SLiderStateType = {
    isShowSupervisorMessage: false,
};

const reducer = (state: SLiderStateType, action) => {
    return state;
};

const useMyReducerSlider = () => useReducer();

const container = createContainer();
