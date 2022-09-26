import { FC } from 'react';

interface ISetDraftActionType {}

const SetDraftAction: FC<ISetDraftActionType> = ({}) => {
    return (
        <>
            <button className="flex items-center h-8 justify-center w-2/6 rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border ">
                پیش نویس
            </button>
        </>
    );
};

export default SetDraftAction;
