import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useUpdateDraft } from 'src/app/queries/draft';
import { setOrder, useSingleModifyOrders, useUpdateOrders } from 'src/app/queries/order';
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
import { getKeepDataBuySell } from 'src/redux/slices/keepDataBuySell';

interface ISetOrderActionType { }

const SetOrderAction: FC<ISetOrderActionType> = ({ }) => {
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
        id,
    } = useBuySellState();
    const dispatch = useBuySellDispatch();
    const queryClient = useQueryClient();
    const symbolData = queryClient.getQueryData<SymbolGeneralInfoType>(['SymbolGeneralInfo', symbolISIN])?.symbolData;
    const symbolMaxQuantity = symbolData?.maxTradeQuantity;
    const { t } = useTranslation();

    const { comeFrom } = useAppSelector(getKeepDataBuySell)
    const selectedCustomers = useAppSelector(getSelectedCustomers);
    const appDispatch = useAppDispatch();

    const { sendOrders, ordersLoading } = useSendOrders();

    // const { mutate } = useMutation(setOrder, {
    //     onSuccess: () => {
    //         onSuccessNotif();
    //         if (sequential) resetByeSellData(dispatch, appDispatch);
    //     },
    //     onError: () => {
    //         onErrorNotif();
    //     },
    // });

    // const { mutate: mutateUpdateOrder } = useUpdateOrders({
    //     onSuccess: () => {
    //         onSuccessNotif();
    //         queryClient.invalidateQueries(['orderList', 'OnBoard']);
    //         // if (sequential) 
    //         resetByeSellData(dispatch, appDispatch);
    //     },
    //     onError: () => {
    //         onErrorNotif();
    //     },
    // });

    const { mutate: mutateUpdateOrder } = useSingleModifyOrders()

    const { mutate: mutateUpdateDraft } = useUpdateDraft({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['draftList']);
            // if (sequential)
            resetByeSellData(dispatch, appDispatch);
        }
    });


    const handleUpdateDraft = () => {
        const customerISINs = selectedCustomers.map(item => item.customerISIN)
        mutateUpdateDraft({
            customerISINs: String(customerISINs),
            id: String(id),
            symbolISIN,
            side: side,
            price,
            quantity,
            percent: percent || 0,
            validity: handleValidity(validity),
            validityDate: validityDate,
            orderType: 'MarketOrder',
            orderStrategy: 'Normal',
            customerTagTitles: "",
            customerTagNames: "",
            gtTraderGroupId: ""
        });
    };

    const handleUpdateOrder = () => {
        
        if (!id) {
            alert("it hasnt id")
            return
        }

        mutateUpdateOrder({
            id,
            price,
            quantity,
            validity,
            validityDate
        })
        
        // mutateUpdateOrder({
        //     customers: selectedCustomers.map((item) => ({
        //         customerType: item.customerType,
        //         title: item.title,
        //         customerISIN: item.customerISIN,
        //     })),
        //     id,
        //     symbolISIN,
        //     orderSide: side,
        //     price,
        //     quantity,
        //     percent,
        //     validity: handleValidity(validity),
        //     validityDate: validityDate,
        //     orderType: 'LimitOrder',
        //     orderStrategy: 'Normal',
        // });
    };

    const handleSubmit = () => {
        if (!selectedCustomers.length) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
        }
        else if (!price || price <= 0) {
            onErrorNotif({ title: t('common.invalidOrderPrice') });
        }
        else if (!quantity || quantity <= 0) {
            onErrorNotif({ title: t('common.invalidOrderQuantity') });
        }
        else if (comeFrom === ComeFromKeepDataEnum.Draft) {
            handleUpdateDraft();
        } else if (comeFrom === ComeFromKeepDataEnum.OpenOrder) {
            handleUpdateOrder();
        }
        else if (symbolMaxQuantity && symbolMaxQuantity < quantity) {
            dispatch({ type: 'SET_DIVIDE', value: true });
        }
        else {
            handleOrder();
        }
    };

    const handleOrder = () => {
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
