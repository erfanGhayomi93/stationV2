import { FC } from 'react';
import { FlowIcon } from 'src/common/icons';
import { useWorkflowDispatch, useWorkflowState } from '../../context/WorkflowContext';

interface IWorkflowChangerType {}

const WorkflowChanger: FC<IWorkflowChangerType> = ({}) => {
    const dispatch = useWorkflowDispatch();
    const { space } = useWorkflowState();
    const handleChangeWorkflow = () => {
        space[0] === 'PortfolioWatchlist'
            ? dispatch({ type: 'SET_SPACE', value: ['BuySellWidget', 'PortfolioWatchlist', 'Reports', 'SymbolDetail'] })
            : dispatch({ type: 'SET_SPACE', value: ['PortfolioWatchlist', 'BuySellWidget', 'Reports', 'SymbolDetail'] });
    };
    return (
        <button
            onClick={handleChangeWorkflow}
            className="text-L-gray-400 dark:text-D-gray-400 justify-between items-center flex hover:text-L-primary-50 hover:dark:text-D-primary-100"
        >
            <FlowIcon />
        </button>
    );
};

export default WorkflowChanger;
