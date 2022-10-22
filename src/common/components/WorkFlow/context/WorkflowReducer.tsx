export const WorkflowReducer = (state: WorkflowState, action: WorkflowAction): WorkflowState => {
    switch (action.type) {
        case 'SET_SPACE':
            return {
                ...state,
                space: action.value,
            };

        default:
            return state;
    }
};
