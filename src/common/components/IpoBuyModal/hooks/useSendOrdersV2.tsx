import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMutationSendOrderV2 } from 'src/app/queries/order';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { removeDuplicatesInArray } from 'src/utils/helpers';
import { setComeFromBuySellAction } from 'src/redux/slices/keepDataBuySell';

const useSendOrdersV2 = (onOrderResultReceived?: (x: { [key: string]: string }) => void) => {
    //
    const ORDER_SENDING_GAP = 400;

    // const [pushNotification, setPushNotification] = useLocalStorage('PushNotificationStore', []);
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    // const { data: symbolTitle, refetch } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData.symbolTitle, enabled: false });
    const [clientIdStore, setClientIdStore] = useState({});
    
    const appDispatch = useAppDispatch();

    useEffect(() => {
        !!Object.keys(clientIdStore).length && !!onOrderResultReceived && onOrderResultReceived(clientIdStore);
    }, [clientIdStore]);

    const [ordersLoading, setOrdersLoading] = useState(false);

    const { brokerCode } = useAppSelector(getUserData);

    const queryClient = useQueryClient();

    const { mutate: mutateSendOrder } = useMutationSendOrderV2({
        onSuccess(data, variables) {
            let storeLocal: storeLocalType = {};

            // data.successClientKeys.forEach((successClientKey, ind) => {
            //     storeLocal[successClientKey] = {
            //         customerTitle: variables.customerTitle[ind],
            //         symbolTitle: !!symbolTitle ? symbolTitle : '',
            //     };
            // });

            // setPushNotification({ ...pushNotification, ...storeLocal });
        },
    });

    const { subscribeCustomers } = useRamandOMSGateway();

    const subscribeHandler = (customers: ICustomerIsins) => {
        const customerIsinsOrder = customers;
        const onboradList: IOrderGetType[] = queryClient.getQueryData(['orderList', 'OnBoard']) || [];
        const customerIsinsOnboard = onboradList.map((item) => item.customerISIN);
        const activeCustomerIsins = [...customerIsinsOnboard, ...customerIsinsOrder];

        subscribeCustomers(removeDuplicatesInArray(activeCustomerIsins), brokerCode || '');
    };

    const splitOrdersByCustomers = (orders: IIPOOrder['items']) => {
        return orders.reduce((acc: any, order) => {
            const ISIN = order.customerISIN;
            if (ISIN) {
                acc[ISIN] = acc[ISIN] || [];
                acc[ISIN].push(order);
            }

            return acc;
        }, {});
    };

    // We have to send orders in bunches
    const createEachBunchOfRequests = (orders: IIPOOrder['items']) => {
        const splitedOrders: { [key: string]: IOrderRequestType[] } = splitOrdersByCustomers(orders);
        const stepLength = Math.max(...Object.values(splitedOrders).map((orders) => orders.length), 0);
        return Array.from({ length: stepLength }, (_, i) =>
            Object.values(splitedOrders)
                .map((orders) => orders[i])
                .filter(Boolean),
        );
    };

    const sendOrders = (orders: IIPOOrder) => {
        if (!orders.items.length) return;

        const customers = orders.items.map((item) => item.customerISIN);

        subscribeHandler(customers);

        setOrdersLoading(true);

        // const bunchOfRequests: IOrderRequestType[][] = createEachBunchOfRequests(orders.items);

        async function send() {
            // for (let ind = 0; ind < bunchOfRequests.length; ind++) {
            //     const orderGroups = bunchOfRequests[ind];

            //     ind !== 0 && (await new Promise((resolve) => setTimeout(resolve, ORDER_SENDING_GAP)));

            // orderGroups.forEach((item) => {
            //     order.customerISIN = [...order.customerISIN, ...item.customerISIN];
            //     order.customerTitle = [...order.customerTitle, ...item.customerTitle];
            // });

            // let storeClientKey: { [key: string]: string } = {};
            // console.log(order);
            mutateSendOrder(orders, {
                onSuccess(data) {
                    // orderGroups.forEach((item, index) => {
                    //     storeClientKey[item.id || item.orderDraftId || item.customerISIN[0]] =
                    //         data.successClientKeys[index];
                    // });
                    // setClientIdStore(storeClientKey);
                },
            });

            // if (orderGroups.length === ind + 1) {
            //     setOrdersLoading(false);
            //     appDispatch(setComeFromBuySellAction(""))
            // }
            // }
        }

        send();
    };

    return {
        sendOrders,
        ordersLoading,
    };
};

export default useSendOrdersV2;
