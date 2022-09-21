import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { setOrder } from 'src/app/queries/order';
import { useAppValues } from 'src/redux/hooks';
import { useBuySellState } from '../../context/BuySellContext';

interface ISetOrderActionType {}

const SetOrderAction: FC<ISetOrderActionType> = ({}) => {
    const { side, amount, divide, isCalculatorEnabled, price, quantity, sequential, strategy, symbolISIN, validity, validityDate, percent } =
        useBuySellState();
    const { mutate } = useMutation(setOrder, {
        onSuccess: () => {
            toast.info('done');
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const handleOrder = () => {
        const isins = selectedCustomers.map((c) => c.customerISIN);
        mutate({
            customerISIN: isins,
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'MarketOrder',
            percent: percent || 0,
            price: price,
            quantity: quantity,
            symbolISIN: symbolISIN,
            validity: validity,
            validityDate: validityDate,
        });
    };

    return (
        <>
            {side === 'Buy' ? (
                <button
                    onClick={handleOrder}
                    className="bg-L-success-150 h-8 dark:bg-D-success-150 rounded text-L-basic dark:text-D-basic flex items-center justify-center grow"
                >
                    ارسال خرید
                </button>
            ) : (
                <button
                    onClick={handleOrder}
                    className="bg-L-error-150 h-8 dark:bg-D-error-150 rounded text-L-basic dark:text-D-basic flex items-center justify-center grow"
                >
                    ارسال فروش
                </button>
            )}
        </>
    );
};

export default SetOrderAction;
