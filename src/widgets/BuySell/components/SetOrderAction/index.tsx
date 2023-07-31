import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { useUpdateDraft } from 'src/app/queries/draft';
import { setOrder, useUpdateOrders } from 'src/app/queries/order';
import { queryClient } from 'src/app/queryClient';
import { ComeFromKeepDataEnum, ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { resetByeSellData } from '../..';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface ISetOrderActionType {}

const SetOrderAction: FC<ISetOrderActionType> = ({}) => {
    const {
        side,
        amount,
        divide,
        isCalculatorEnabled,
        price,
        quantity,
        sequential,
        strategy,
        symbolISIN,
        validity,
        validityDate,
        percent,
        comeFrom,
        id,
    } = useBuySellState();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const { mutate } = useMutation(setOrder, {
        onSuccess: () => {
            onSuccessNotif();
            if (sequential) resetByeSellData(dispatch, appDispatch);
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const { mutate: mutateUpdateOrder } = useUpdateOrders({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['orderList', 'OnBoard']);
            if (sequential) resetByeSellData(dispatch, appDispatch);
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const { mutate: mutateUpdateDraft } = useUpdateDraft({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['draftList']);
            if (sequential) resetByeSellData(dispatch, appDispatch);
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const handleUpdateDraft = () => {
        mutateUpdateDraft({
            customers: selectedCustomers.map((item) => ({
                customerType: item.customerType,
                customerTitle: item.customerTitle,
                customerISIN: item.customerISIN,
            })),
            id,
            symbolISIN,
            orderSide: side,
            price,
            quantity,
            percent,
            validity: handleValidity(validity),
            validityDate: validityDate,
            orderType: 'LimitOrder ',
            orderStrategy: 'Normal',
        });
    };

    const handleUpdateOrder = () => {
        mutateUpdateOrder({
            customers: selectedCustomers.map((item) => ({
                customerType: item.customerType,
                customerTitle: item.customerTitle,
                customerISIN: item.customerISIN,
            })),
            id,
            symbolISIN,
            orderSide: side,
            price,
            quantity,
            percent,
            validity: handleValidity(validity),
            validityDate: validityDate,
            orderType: 'LimitOrder ',
            orderStrategy: 'Normal',
        });
    };

    const handleSubmit = () => {
        if (comeFrom === ComeFromKeepDataEnum.Draft) {
            handleUpdateDraft();
        } else if (comeFrom === ComeFromKeepDataEnum.OpenOrder) {
            handleUpdateOrder();
        } else {
            handleOrder();
        }
    };

    const handleOrder = () => {
        let customerISIN: ICustomerIsins = [];
        let CustomerTagId: ICustomerIsins = [];
        let GTTraderGroupId: ICustomerIsins = [];
        selectedCustomers.forEach((c: IGoMultiCustomerType) => {
            if (c.customerType === ICustomerTypeEnum.Legal || c.customerType === ICustomerTypeEnum.Natural) customerISIN.push(c.customerISIN);
            else if (c.customerType === ICustomerTypeEnum.CustomerTag) CustomerTagId.push(c.customerTitle);
            else if (c.customerType === ICustomerTypeEnum.TraderGroup) GTTraderGroupId.push(c.customerISIN);
        });
        mutate({
            customerISIN,
            CustomerTagId,
            GTTraderGroupId,
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'LimitOrder',
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
                    onClick={handleSubmit}
                    className="bg-L-success-200 h-8 dark:bg-D-success-200 rounded text-L-basic flex items-center justify-center grow"
                >
                    {isPrimaryComeFrom(comeFrom) ? 'ارسال خرید' : 'ثبت تغییرات'}
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="bg-L-error-200 h-8 dark:bg-D-error-200 rounded text-L-basic flex items-center justify-center grow"
                >
                    {isPrimaryComeFrom(comeFrom) ? ' ارسال فروش' : 'ثبت تغییرات'}
                </button>
            )}
        </>
    );
};

export default SetOrderAction;
