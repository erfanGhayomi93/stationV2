import { FC } from 'react';
import { ModalBasketIcon } from 'src/common/icons';

interface ISetBasketActionType {}

const SetBasketAction: FC<ISetBasketActionType> = ({}) => {
    return (
        <>
            <button className="flex items-center h-8 justify-center w-[32px] bg-L-primary-100  rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border">
                <ModalBasketIcon />
            </button>
        </>
    );
};

export default SetBasketAction;
