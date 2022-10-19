import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { setOrder } from 'src/app/queries/order';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface ISetOrderActionType {}

const SetOrderAction: FC<ISetOrderActionType> = ({}) => {
    const { side, amount, divide, isCalculatorEnabled, price, quantity, sequential, strategy, symbolISIN, validity, validityDate, percent } =
        useBuySellState();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const { mutate } = useMutation(setOrder, {
        onSuccess: () => {
            onSuccessNotif();
            if (!sequential) {
                dispatch({ type: 'RESET' });
                appDispatch(setSelectedCustomers([]));
            }
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const handleOrder = () => {
        const isins = selectedCustomers.map((c: any) => c.customerISIN);
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
            validity: handleValidity(validity),
            validityDate: validityDate,
        });
    };

    return (
        <>
            {side === 'Buy' ? (
                <button
                    onClick={handleOrder}
                    className="bg-L-success-150 h-8 dark:bg-D-success-150 rounded text-L-basic flex items-center justify-center grow"
                >
                    ارسال خرید
                </button>
            ) : (
                <button
                    onClick={handleOrder}
                    className="bg-L-error-150 h-8 dark:bg-D-error-150 rounded text-L-basic flex items-center justify-center grow"
                >
                    ارسال فروش
                </button>
            )}
        </>
    );
};

export default SetOrderAction;
