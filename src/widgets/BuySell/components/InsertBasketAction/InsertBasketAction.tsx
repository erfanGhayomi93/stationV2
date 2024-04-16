import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useCreateDetailsBasket, useEditDetailsBasket } from 'src/app/queries/basket';
import { useGlobalSetterState } from 'src/common/context/globalSetterContext';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useBasketDispatch, useBasketState } from 'src/pages/basket/context/BasketContext';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { emptySelectedCustomers, getSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';

interface IInsertBasketActionType { }

const InsertBasketAction: FC<IInsertBasketActionType> = ({ }) => {
    const { id, orderId } = useBasketState();
    const { t } = useTranslation()

    const basketDispatch = useBasketDispatch();
    const { resetBuySellState } = useGlobalSetterState();
    const selectedCustomers = useAppSelector(getSelectedCustomers)


    const resetSelectedCustomer = () => {
        appDispatch(emptySelectedCustomers());
    };

    const setBuySellModalInVisible = () => {
        basketDispatch({ type: 'RESET' });
        resetBuySellState();
        resetSelectedCustomer();
    };

    const { side, price, quantity, sequential, symbolISIN, validity, validityDate, percent } = useBuySellState() as {
        extra: IBuySellExtra;
    } & BuySellState;

    const queryClient = useQueryClient();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();

    const { mutate: mutateCreateDetailBasket } = useCreateDetailsBasket({
        onSuccess: () => {
            onSuccessNotif({ title: 'سفارش با موفقیت به سبد اضافه شد' });
            queryClient.invalidateQueries(['BasketDetailsList', id]);
            setBuySellModalInVisible();
            dispatch({ type: 'RESET' });
            if (!sequential) {
                dispatch({ type: 'RESET' });
                appDispatch(emptySelectedCustomers());
            }
        }
    });
    const { mutate: mutateDetailBasket } = useEditDetailsBasket({
        onSuccess: () => {
            onSuccessNotif({ title: 'سفارش با موفقیت ویرایش شد' });
            queryClient.invalidateQueries(['BasketDetailsList', id]);
            setBuySellModalInVisible();
            dispatch({ type: 'RESET' });
            if (!sequential) {
                dispatch({ type: 'RESET' });
                appDispatch(emptySelectedCustomers());
            }
        }
    });

    const handleSetBasket = () => {
        if (selectedCustomers.length === 0) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
            return
        }

        let isins = selectedCustomers.map((c: IGoMultiCustomerType) => c.customerISIN);
        let isinsCommaSeparator = String(isins);

        const result = {
            cartID: id,
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            percent: percent,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate || null,
            customerISIN: isinsCommaSeparator,
            orderStrategy: 'Normal',
        };
        mutateCreateDetailBasket(result);
    };

    const handleEditBasket = () => {
        if (selectedCustomers.length === 0) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
            return
        }

        const isins = selectedCustomers.map((c: IGoMultiCustomerType) => c.customerISIN);
        const isinsCommaSeparator = String(isins);

        mutateDetailBasket({
            id: orderId as number,
            cartID: id as number,
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            percent: percent as number,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate || null,
            customerISIN: isinsCommaSeparator,
            orderStrategy: 'Normal',
            orderType: 'LimitOrder',
        });
    };

    return (
        <>
            {orderId ? (
                <button
                    onClick={handleEditBasket}
                    className="w-full py-2 bg-L-primary-100 dark:bg-D-primary-100 border border-L-primary-50 text-L-primary-50  dark:border-D-primary-50 dark:text-D-primary-50 rounded-sm"
                >
                    ویرایش
                </button>
            ) : (
                <Tippy content={'تعداد یا قیمت نمیتواند صفر باشد '} disabled={!!price && !!quantity}>
                    <div className="w-full">
                        <button
                            disabled={!price || !quantity}
                            onClick={handleSetBasket}
                            className="w-full py-2 bg-L-primary-100 dark:bg-D-primary-100 border border-L-primary-50 text-L-primary-50  dark:border-D-primary-50 dark:text-D-primary-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ثبت در سبد
                        </button>
                    </div>
                </Tippy>
            )}
        </>
    );
};

export default InsertBasketAction;
