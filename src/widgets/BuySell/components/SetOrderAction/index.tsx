import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useUpdateDraft } from 'src/app/queries/draft';
import { setOrder, useUpdateOrders } from 'src/app/queries/order';
import { ComeFromKeepDataEnum, ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getUniqId, handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { resetByeSellData } from '../..';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { getSelectedCustomers } from 'src/redux/slices/option';
import { useTranslation } from 'react-i18next';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import Button from 'src/common/components/Buttons/Button';

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
    const queryClient = useQueryClient();
    const symbolData = queryClient.getQueryData<SymbolGeneralInfoType>(['SymbolGeneralInfo', symbolISIN])?.symbolData;
    const symbolMaxQuantity = symbolData?.maxTradeQuantity;
    const { t } = useTranslation();

    const appDispatch = useAppDispatch();

    const { sendOrders, ordersLoading } = useSendOrders();

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
    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const handleUpdateDraft = () => {
        mutateUpdateDraft({
            customers: selectedCustomers.map((item) => ({
                customerType: item.customerType,
                title: item.title,
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
                title: item.title,
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
        if (!selectedCustomers.length) {
            return onErrorNotif({ title: t('common.notCustomerSelected') });
        }
        if (!price || price <= 0) {
            return onErrorNotif({ title: t('common.invalidOrderPrice') });
        }
        if (!quantity || quantity <= 0) {
            return onErrorNotif({ title: t('common.invalidOrderQuantity') });
        }
        if (symbolMaxQuantity && symbolMaxQuantity < quantity) {
            dispatch({ type: 'SET_DIVIDE', value: true });
            return;
        }
        if (comeFrom === ComeFromKeepDataEnum.Draft) {
            handleUpdateDraft();
        } else if (comeFrom === ComeFromKeepDataEnum.OpenOrder) {
            handleUpdateOrder();
        } else {
            handleOrder();
        }
    };

    const handleOrder = () => {
        // let customerISIN: ICustomerIsins = [];
        let CustomerTagId: ICustomerIsins = [];
        let GTTraderGroupId: ICustomerIsins = [];

        const orders: IOrderRequestType[] = selectedCustomers
            .map(({ customerISIN, customerType }) => {
                if ([ICustomerTypeEnum.Legal, ICustomerTypeEnum.Natural].includes(customerType as ICustomerTypeEnum)) {
                    return {
                        id: getUniqId(),
                        customerISIN: [customerISIN],
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
                    };
                }
            })
            .filter(Boolean) as IOrderRequestType[];

        sendOrders(0, orders);
    };

    return (
        <>
            {side === 'Buy' ? (
                <Button variant="success" loading={ordersLoading} onClick={handleSubmit}>
                    {isPrimaryComeFrom(comeFrom) ? 'ارسال خرید' : 'ثبت تغییرات'}
                </Button>
            ) : (
                <Button variant="error" loading={ordersLoading} onClick={handleSubmit}>
                    {isPrimaryComeFrom(comeFrom) ? ' ارسال فروش' : 'ثبت تغییرات'}
                </Button>
            )}
        </>
    );
};

export default SetOrderAction;
