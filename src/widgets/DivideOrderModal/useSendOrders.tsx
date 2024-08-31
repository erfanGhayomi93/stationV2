import { useEffect, useState } from 'react';
import { useMutationSendOrder } from 'src/app/queries/order';
// import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { useAppDispatch } from 'src/redux/hooks';
// import { getSelectedSymbol } from 'src/redux/slices/option';
// import { resetByeSellData } from '../BuySell';
import { clearDataAction, setComeFromBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { resetByeSellData } from '../BuySell';
import { useBuySellDispatch } from '../BuySell/context/BuySellContext';

const useSendOrders = (onOrderResultReceived?: (x: { [key: string]: string }) => void) => {
    //
    const ORDER_SENDING_GAP = 400;

    // const [pushNotification, setPushNotification] = useLocalStorage("PushNotificationStore", [])
    // const selectedCustomers = useAppSelector(getSelectedCustomers)
    // const selectedSymbol = useAppSelector(getSelectedSymbol)
    // const { data: symbolTitle } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData.symbolTitle });
    const [clientIdStore, setClientIdStore] = useState({})

    const appDispatch = useAppDispatch();
    const ByeSellDispatch = useBuySellDispatch();

    useEffect(() => {
        (!!Object.keys(clientIdStore).length && !!onOrderResultReceived) && onOrderResultReceived(clientIdStore)
    }, [clientIdStore])


    const [ordersLoading, setOrdersLoading] = useState(false);



    const { mutate: mutateSendOrder } = useMutationSendOrder({
        // onSuccess(data, variables) {
        // let storeLocal: storeLocalType = {}

        // data.successClientKeys.forEach((successClientKey, ind) => {
        //     storeLocal[successClientKey] = {
        //         customerTitle: variables.customerTitle[ind],
        //         symbolTitle: !!symbolTitle ? symbolTitle : ""
        //     }
        // })


        // setPushNotification({ ...pushNotification, ...storeLocal })
        // },
    })


    const splitOrdersByCustomers = (orders: IOrderRequestType[]) => {
        return orders.reduce((acc: any, order) => {
            const ISIN = order.customerISIN?.[0];
            if (ISIN) {
                acc[ISIN] = acc[ISIN] || [];
                acc[ISIN].push(order);
            }

            return acc;
        }, {});
    };

    // We have to send orders in bunches
    const createEachBunchOfRequests = (orders: IOrderRequestType[]) => {
        const splitedOrders: { [key: string]: IOrderRequestType[] } = splitOrdersByCustomers(orders);
        const stepLength = Math.max(...Object.values(splitedOrders).map((orders) => orders.length), 0);
        return Array.from({ length: stepLength }, (_, i) =>
            Object.values(splitedOrders)
                .map((orders) => orders[i])
                .filter(Boolean),
        );
    };

    // const refetchOrderListsWithDelay = () => {
    //     setTimeout(() => {
    //         ['Error', 'OnBoard', 'Done'].forEach((status) => {
    //             queryClient.invalidateQueries(['orderList', status]);
    //         });
    //     }, ORDER_SENDING_GAP);
    // };

    const sendOrders = (orders: IOrderRequestType[]) => {
        if (!orders.length) return;

        setOrdersLoading(true);

        const bunchOfRequests: IOrderRequestType[][] = createEachBunchOfRequests(orders);

        function send() {
            for (let ind = 0; ind < bunchOfRequests.length; ind++) {
                const orderGroups = bunchOfRequests[ind];

                ind !== 0 && new Promise((resolve) => setTimeout(resolve, ORDER_SENDING_GAP));

                let order: IOrderRequestType = {
                    ...orderGroups[0],
                    customerISIN: [],
                    customerTitle: []
                };

                orderGroups.forEach((item) => {
                    order.customerISIN = [...order.customerISIN, ...item.customerISIN];
                    order.customerTitle = [...order.customerTitle, ...item.customerTitle];
                });


                let storeClientKey: { [key: string]: string } = {};

                mutateSendOrder(order, {
                    onSuccess(data) {
                        orderGroups.forEach((item, index) => {
                            storeClientKey[item.id || item.orderDraftId || item.customerISIN[0]] =
                                data.successClientKeys[index];
                        });
                        setClientIdStore(storeClientKey);
                    },
                });

            }
        }

        try {
            send();
        } catch {
            setOrdersLoading(false);
        }
        finally {
            setOrdersLoading(false);
            resetByeSellData(ByeSellDispatch, appDispatch)
        }
    };

    return {
        sendOrders,
        ordersLoading,
    };
};

export default useSendOrders;
