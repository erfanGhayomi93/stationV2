import { FC, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { WorkflowReducer } from './WorkflowReducer';

interface IWorkflowWidgetType {}

export const WorkflowInitialState: WorkflowState = {
    space: ['BuySellWidget', 'PortfolioWatchlist', 'Reports', 'SymbolDetail'],
};
const useValue = () => useReducer(WorkflowReducer, WorkflowInitialState);
export const { Provider: WorkflowProvider, useTrackedState: useWorkflowState, useUpdate: useWorkflowDispatch } = createContainer(useValue);

interface IWorkflowWidgetType {
    children: JSX.Element;
}
const WorkflowWidget: FC<IWorkflowWidgetType> = ({ children }) => {
    return (
        <>
            <WorkflowProvider>{children}</WorkflowProvider>
        </>
    );
};

export default WorkflowWidget;
