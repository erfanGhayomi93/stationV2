import { useEffect, useRef, useState } from 'react';
// import { useAppDispatch } from 'src/redux/hooks';
// import { useBuySellDispatch } from '../BuySell/context/BuySellContext';
import { useMutationSendOrder } from '@api/order';
import useBuySellStore from 'common/widget/buySellWidget/context/buySellContext';
import { useCustomerStore } from '@store/customer';

const useSendOrders = (onOrderResultReceived?: (x: { [key: string]: string }) => void) => {
    const ORDER_SENDING_GAP = 450;

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // UseRef with proper type

    const [clientIdStore, setClientIdStore] = useState({})
    const { isKeepForm, reset } = useBuySellStore()
    const { removeAllSelectedCustomers } = useCustomerStore()

    // const appDispatch = useAppDispatch();
    // const ByeSellDispatch = useBuySellDispatch();

    useEffect(() => {
        (!!Object.keys(clientIdStore).length && !!onOrderResultReceived) && onOrderResultReceived(clientIdStore)
    }, [clientIdStore])

    const { mutate: mutateSendOrder, status } = useMutationSendOrder()


    const [ordersLoading, setOrdersLoading] = useState(false);


    useEffect(() => {
        if (status === 'pending') {
            setOrdersLoading(true);
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        }
        else {
            timerRef.current = setTimeout(() => {
                setOrdersLoading(false);
            }, 500);
            return () => {
                if (timerRef.current !== null) {
                    clearTimeout(timerRef.current); // Cleanup timer on unmount
                    timerRef.current = null;
                }
            }
        }
    }, [status]);


    const splitOrdersByCustomers = (orders: ICreateOrderReq[]) => {
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
    const createEachBunchOfRequests = (orders: ICreateOrderReq[]) => {
        const splitedOrders: { [key: string]: ICreateOrderReq[] } = splitOrdersByCustomers(orders);
        const stepLength = Math.max(...Object.values(splitedOrders).map((orders) => orders.length), 0);
        return Array.from({ length: stepLength }, (_, i) =>
            Object.values(splitedOrders)
                .map((orders) => orders[i])
                .filter(Boolean),
        );
    };


    const sendOrders = (orders: ICreateOrderReq[]) => {
        if (!orders.length) return;

        // setOrdersLoading(true);

        const bunchOfRequests: ICreateOrderReq[][] = createEachBunchOfRequests(orders);

        const send = async () => {
            for (const orderGroups of bunchOfRequests) {
                bunchOfRequests.length !== 1 && await new Promise((resolve) => setTimeout(resolve, ORDER_SENDING_GAP))

                const order: ICreateOrderReq = {
                    ...orderGroups[0],
                    customerISIN: [],
                    customerTitle: []
                };

                orderGroups.forEach((item) => {
                    order.customerISIN = [...order.customerISIN, ...item.customerISIN];
                    order.customerTitle = [...order.customerTitle, ...item.customerTitle];
                });

                const storeClientKey: { [key: string]: string } = {};

                mutateSendOrder(order, {
                    onSuccess(data) {
                        orderGroups.forEach((item, index) => {
                            storeClientKey[item?.id || item?.orderDraftId || item?.customerISIN[0]] =
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
            //
        }
        finally {
            if (!isKeepForm) {
                reset();
                removeAllSelectedCustomers()
            }
        }
    };

    return {
        sendOrders,
        ordersLoading: ordersLoading,
    };
};

export default useSendOrders;
