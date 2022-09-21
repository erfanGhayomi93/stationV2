import { FC } from 'react';
import { useBuySellState } from '../../context/BuySellContext';

interface ISetOrderActionType {}

const SetOrderAction: FC<ISetOrderActionType> = ({}) => {
    const { side } = useBuySellState();

    return (
        <>
            {side === 'BUY' ? (
                <button className="bg-L-success-150 h-8 dark:bg-D-success-150 rounded text-L-basic dark:text-D-basic flex items-center justify-center grow">
                    ارسال خرید
                </button>
            ) : (
                <button className="bg-L-error-150 h-8 dark:bg-D-error-150 rounded text-L-basic dark:text-D-basic flex items-center justify-center grow">
                    ارسال فروش
                </button>
            )}
        </>
    );
};

export default SetOrderAction;
