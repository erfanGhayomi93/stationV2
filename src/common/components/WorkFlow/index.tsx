import { FC } from 'react';
import { FlowIcon } from 'src/common/icons';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getHomeLayout, toggleHomeLayout } from 'src/redux/slices/ui';

interface IWorkflowChangerType {}

const WorkflowChanger: FC<IWorkflowChangerType> = ({}) => {
    const dispatch = useAppDispatch();
    const homeLayout = useAppSelector(getHomeLayout);
    const handleChangeWorkflow = () => {
        dispatch(toggleHomeLayout(homeLayout === 'ltr' ? 'rtl' : 'ltr'));
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
