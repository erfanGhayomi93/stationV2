import { useQueryClient } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useUpdateDraft } from 'src/app/queries/draft';
import { setOrder, useSingleModifyOrders, useUpdateOrders } from 'src/app/queries/order';
import { ComeFromKeepDataEnum, ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getUniqId, handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { resetByeSellData } from '../..';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { getSelectedCustomers, getSelectedSymbol } from 'src/redux/slices/option';
import { useTranslation } from 'react-i18next';
import useSendOrders from 'src/widgets/DivideOrderModal/useSendOrders';
import Button from 'src/common/components/Buttons/Button';
import { getKeepDataBuySell } from 'src/redux/slices/keepDataBuySell';
// import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import AffidavitModal from './AffidavitModal';

interface ISetOrderActionType { }

const SetOrderAction: FC<ISetOrderActionType> = ({ }) => {
    const { side, amount, divide, isCalculatorEnabled, price, quantity, sequential, strategy, symbolISIN, validity, validityDate, percent, id } =
        useBuySellState();
    const dispatch = useBuySellDispatch();
    const queryClient = useQueryClient();
    const symbolData = queryClient.getQueryData<SymbolGeneralInfoType>(['SymbolGeneralInfo', symbolISIN])?.symbolData;
    const symbolMaxQuantity = symbolData?.maxTradeQuantity;
    const { t } = useTranslation();

    // const [pushNotification, setPushNotification] = useLocalStorage('PushNotificationStore', {});

    const [AffidavitModalState, setAffidavitModalState] = useState(false);

    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const { data: symbolGeneralInfo } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolTitle: data.symbolData.symbolTitle,
            hasRisk: data.alerts?.clientSideAlertEnabled,
            affModalTitle: data.alerts?.clientSideAlertTitle,
            affModalDescription: data.alerts?.clientSideAlertMessage,
        }),
    });

    const { comeFrom } = useAppSelector(getKeepDataBuySell);
    const selectedCustomers = useAppSelector(getSelectedCustomers);
    const appDispatch = useAppDispatch();

    const { sendOrders, ordersLoading } = useSendOrders();

    const { mutate: mutateUpdateOrder } = useSingleModifyOrders({
        onSuccess(result) {
            resetByeSellData(dispatch, appDispatch);

            // const storeLocal: storeLocalType = {
            //     [result.clientKey || '']: {
            //         customerTitle: selectedCustomers[0].title,
            //         symbolTitle: symbolGeneralInfo?.symbolTitle || '',
            //     },
            // };

            // const timeOut = setTimeout(() => {
            // setPushNotification({ ...pushNotification, ...storeLocal });
            // clearTimeout(timeOut);
            // }, 1000);
        },
    });

    useEffect(() => {
        console.log('isPrimaryComeFrom(comeFrom)', comeFrom)
    }, [comeFrom])


    const { mutate: mutateUpdateDraft } = useUpdateDraft({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['draftList']);
            // if (sequential)
            resetByeSellData(dispatch, appDispatch);
        },
    });

    const handleUpdateDraft = () => {
        const customerISINs = selectedCustomers.map((item) => item.customerISIN);
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
            customerTagTitles: '',
            customerTagNames: '',
            gtTraderGroupId: '',
        });
    };

    const handleUpdateOrder = () => {
        if (!id) {
            alert('it hasnt id');
            return;
        }

        mutateUpdateOrder({
            id,
            price,
            quantity,
            validity,
            validityDate,
        });
    };

    const handleSubmit = () => {
        setAffidavitModalState(false);

        if (!selectedCustomers.length) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
        } else if (!price || price <= 0) {
            onErrorNotif({ title: t('common.invalidOrderPrice') });
        } else if (!quantity || quantity <= 0) {
            onErrorNotif({ title: t('common.invalidOrderQuantity') });
        } else if (comeFrom === ComeFromKeepDataEnum.Draft) {
            handleUpdateDraft();
        } else if (comeFrom === ComeFromKeepDataEnum.OpenOrder) {
            handleUpdateOrder();
        } else if (symbolMaxQuantity && symbolMaxQuantity < quantity) {
            dispatch({ type: 'SET_DIVIDE', value: true });
        } else {
            handleOrder();
        }
    };

    const handleOrder = () => {
        let CustomerTagId: ICustomerIsins = [];
        let GTTraderGroupId: ICustomerIsins = [];

        const orders: IOrderRequestType[] = selectedCustomers
            .map(({ customerISIN, customerType, title }) => {
                if ([ICustomerTypeEnum.Legal, ICustomerTypeEnum.Natural].includes(customerType as ICustomerTypeEnum)) {
                    return {
                        id: getUniqId(),
                        customerISIN: [customerISIN],
                        customerTitle: [title],
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

        sendOrders(orders);
    };

    return (
        <>
            {side === 'Buy' ? (
                <Button
                    variant="success"
                    loading={ordersLoading}
                    onClick={() => (symbolGeneralInfo?.affModalDescription ? setAffidavitModalState(true) : handleSubmit())}
                >
                    {isPrimaryComeFrom(comeFrom) ? 'ارسال خرید' : 'ثبت تغییرات'}
                </Button>
            ) : (
                <Button
                    variant="error"
                    loading={ordersLoading}
                    onClick={() => (symbolGeneralInfo?.affModalDescription ? setAffidavitModalState(true) : handleSubmit())}
                >
                    {isPrimaryComeFrom(comeFrom) ? ' ارسال فروش' : 'ثبت تغییرات'}
                </Button>
            )}
            {AffidavitModalState && symbolGeneralInfo?.affModalDescription && (
                <AffidavitModal
                    isOpen={AffidavitModalState}
                    handleClose={() => setAffidavitModalState(false)}
                    onSubmit={handleSubmit}
                    title={symbolGeneralInfo.affModalTitle}
                    description={symbolGeneralInfo.affModalDescription}
                />
            )}
        </>
    );
};

export default SetOrderAction;
