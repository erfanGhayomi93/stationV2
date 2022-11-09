import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useCreateDetailsBasket } from 'src/app/queries/basket';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IInsertBasketActionType {}

const InsertBasketAction: FC<IInsertBasketActionType> = ({}) => {
    const { side, price, quantity, sequential, symbolISIN, validity, validityDate, percent, extra } = useBuySellState() as {
        extra: IBuySellExtra;
    } & BuySellState;

    const queryClient = useQueryClient();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const { mutate: mutateCreateDetailBasket } = useCreateDetailsBasket({
        onSuccess: () => {
            onSuccessNotif({ title: 'مشتری با موفقیت به سبد اضافه شد' });
            queryClient.invalidateQueries(['draftList']);
            queryClient.invalidateQueries(['BasketDetailsList', extra.id]);

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

    const handleSetBasket = () => {
        let isins = selectedCustomers.map((c: any) => c.customerISIN);
        let isinsCommaSeparator = String(isins);
        const result = {
            cartID: extra.id,
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            percent: percent,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate,
            customerISINs: isinsCommaSeparator,
            orderStrategy: 'Normal',
        };
        mutateCreateDetailBasket(result);
    };

    return (
        <>
            <button
                onClick={handleSetBasket}
                className="w-full py-2 bg-L-primary-100 dark:bg-D-primary-100 border border-L-primary-50 text-L-primary-50  dark:border-D-primary-50 dark:text-D-primary-50 rounded-sm"
            >
                ثبت در سبد
            </button>
        </>
    );
};

export default InsertBasketAction;
