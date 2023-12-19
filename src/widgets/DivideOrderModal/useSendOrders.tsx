import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { setOrder } from 'src/app/queries/order';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';
// import { getSelectedCustomers } from 'src/redux/slices/option';
import { removeDuplicatesInArray } from 'src/utils/helpers';

const useSendOrders = (props?: { onOrderResultReceived?: (x: { [key: string]: string | null }) => void }) => {
    //
    let timer: NodeJS.Timer;
    const ORDER_SENDING_GAP = 350;

    const orderResult = useRef<{ [key: string]: string }>({});

    const [ordersLoading, setOrdersLoading] = useState(false);

    const { brokerCode } = useAppSelector(getUserData);

    const queryClient = useQueryClient();


    // const selectedCustomers = useAppSelector(getSelectedCustomers);

    const { subscribeCustomers } = useRamandOMSGateway();

    const subscribeHandler = (customers: ICustomerIsins) => {
        // const customerIsinGlobal = selectedCustomers.map(({ customerISIN }) => customerISIN)
        const customerIsinsOrder = customers
        const onboradList: IOrderGetType[] = queryClient.getQueryData(["orderList", "OnBoard"]) || []
        const customerIsinsOnboard = onboradList.map(item => item.customerISIN)
        const activeCustomerIsins = [...customerIsinsOnboard, ...customerIsinsOrder]

        subscribeCustomers(removeDuplicatesInArray(activeCustomerIsins),
            brokerCode || '',
        );
    };


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

    const refetchOrderListsWithDelay = () => {
        setTimeout(() => {
            ['Error', 'OnBoard', 'Done'].forEach((status) => {
                queryClient.invalidateQueries(['orderList', status]);
            });
        }, ORDER_SENDING_GAP);
    };

    const sendOrders = async (index: number, orders: IOrderRequestType[]) => {
        //
        if (!orders.length) return;

        const customers = orders.map(item => item.customerISIN[0])

        if (index === 0) subscribeHandler(customers);

        setOrdersLoading(true);

        const bunchOfRequests: IOrderRequestType[][] = createEachBunchOfRequests(orders);

        const ordersBunch = bunchOfRequests[index];

        const nextIndex = index + 1;

        return await Promise.allSettled(ordersBunch.map((order) => setOrder(order)))
            .then((response) => {
                const result = response.reduce((acc, { status, value }: any, index) => {
                    const order = ordersBunch[index];
                    const { id: orderID } = order;
                    const done = status === 'fulfilled';
                    if (orderID) {
                        Object.defineProperty(acc, orderID, { value: done ? { clientKey: value.successClientKeys[0] ?? '' } : { status: 'Error' } });
                    }

                    return acc;
                }, {});

                orderResult.current = result;
            })
            .finally(() => {
                props?.onOrderResultReceived?.(orderResult.current);
                if (nextIndex >= bunchOfRequests.length) {
                    clearTimeout(timer);
                    refetchOrderListsWithDelay();
                    ipcMain.send('update_customer');
                    setOrdersLoading(false);
                    return;
                }
                timer = setTimeout(() => sendOrders(nextIndex, orders), ORDER_SENDING_GAP);
            });
    };

    return {
        sendOrders,
        ordersLoading,
    };
};

export default useSendOrders;
