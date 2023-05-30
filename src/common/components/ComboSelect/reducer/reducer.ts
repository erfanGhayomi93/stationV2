import { ComboAction, ComboState } from '../types';

export const ComboReducer = (state: ComboState, action: ComboAction): ComboState => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                ...state,
                value: action.value,
            };
        case 'TOGGLE_SELECTED':
            return {
                ...state,
                selections: action.value,
            };
        case 'SET_ACTIVE_PANEL':
            return {
                ...state,
                showPanel: action.value,
            };
        case 'SET_MULTIPLE':
            return {
                ...state,
                multiple: action.value,
            };
        case 'SET_PANEL_CONTENT':
            return {
                ...state,
                panelContent: action.value,
            };

        default:
            return state;
    }
};
