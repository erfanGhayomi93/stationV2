import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import {
    COuntNumberSupervisorAction,
    COuntNumberSupervisorEnum,
    REadSupervisorAction,
    REadSupervisorEnum,
    SLiderActionEnum,
    SLiderActionType,
    SLiderStateType,
} from './types';

const initStateSldier: SLiderStateType = {
    isShowSupervisorMessage: false,
    countNumberSupervisorMessage: 0,
};

type ACtion = SLiderActionType | COuntNumberSupervisorAction | REadSupervisorAction;

const reducer = (state: SLiderStateType, { type, payload }: ACtion) => {
    if (type === SLiderActionEnum.TOGGLE_MESSAGE_MODAL) {
        return {
            ...state,
            isShowSupervisorMessage: !state.isShowSupervisorMessage,
        };
    }
    if (type === COuntNumberSupervisorEnum.COUNT_NUMBER) {
        return {
            ...state,
            countNumberSupervisorMessage: payload,
        };
    }
    if (type === REadSupervisorEnum.READ_MESSAGE) {
        return {
            ...state,
            countNumberSupervisorMessage: state.countNumberSupervisorMessage - 1,
        };
    }
    return state;
};

const useMyReducerSlider = ({ initState }: { initState?: Partial<SLiderStateType> }) => useReducer(reducer, { ...initStateSldier, ...initState });

const container = createContainer(useMyReducerSlider);

export const { Provider: ProviderSlider, useTrackedState: useSliderValue, useUpdate: useSliderDispatch } = container;
