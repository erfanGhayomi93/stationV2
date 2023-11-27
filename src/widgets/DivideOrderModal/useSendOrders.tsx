import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { setOrder } from 'src/app/queries/order';
import ipcMain from 'src/common/classes/IpcMain';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';
import { getSelectedCustomers } from 'src/redux/slices/option';

const useSendOrders = (props?: { onOrderResultReceived?: (x: { [key: string]: string | null }) => void }) => {
    //
    let timer: NodeJS.Timer;
    const ORDER_SENDING_GAP = 350;

    const orderResult = useRef<{ [key: string]: string }>({});

    const [ordersLoading, setOrdersLoading] = useState(false);

    const { brokerCode } = useAppSelector(getUserData);

    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const { subscribeCustomers } = useRamandOMSGateway();

    const subscribeHandler = () => {
        subscribeCustomers(
            selectedCustomers.map(({ customerISIN }) => customerISIN),
            brokerCode || '',
        );
    };

    const queryClient = useQueryClient();

    const splitOrdersByCustomers = (orders: IOrderRequestType[]) => {
        return orders.reduce((acc: any, order) => {
            const ISIN = order.customerISIN?.[0];
            if (ISIN) {
                if (!acc[ISIN]) {
                    acc[ISIN] = [];
                }

                acc[ISIN].push(order);
            }

            return acc;
        }, {});
    };

    const createOrderSteps = (orders: IOrderRequestType[]) => {
        //
        let orderStep: IOrderRequestType[][] = [];

        const splitedOrders = splitOrdersByCustomers(orders);

        const getOrderStepLength = () => {
            let maxLength: number = 0;
            for (const key in splitedOrders) {
                const length = splitedOrders[key].length;
                if (length > maxLength) {
                    maxLength = length;
                }
            }

            return maxLength;
        };

        const stepLength = getOrderStepLength();

        for (let i = 0; i < stepLength; i++) {
            let group: IOrderRequestType[] = [];

            for (const key in splitedOrders) {
                if (splitedOrders[key][i]) {
                    group.push(splitedOrders[key][i]);
                }
            }
            if (group.length > 0) {
                orderStep.push(group);
            }
        }

        return orderStep;
    };

    const refetchOrderListsWithDelay = () => {
        setTimeout(() => {
            queryClient.invalidateQueries(['orderList', 'Error']);
            queryClient.invalidateQueries(['orderList', 'OnBoard']);
            queryClient.invalidateQueries(['orderList', 'Done']);
        }, ORDER_SENDING_GAP);
    };

    const sendOrders = async (index: number, orders: IOrderRequestType[]) => {
        //
        if (!orders.length) return;

        if (index === 0) subscribeHandler();

        setOrdersLoading(true);

        const orderStepsArray: IOrderRequestType[][] = createOrderSteps(orders);

        const orderStep = orderStepsArray[index];

        const nextIndex = index + 1;

        return await Promise.allSettled(orderStep.map((order) => setOrder(order)))
            .then((response) => {
                const result = response.reduce((acc, { status, value }: any, index) => {
                    const order = orderStep[index];
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
                refetchOrderListsWithDelay();
                if (nextIndex >= orderStepsArray.length) {
                    clearTimeout(timer);
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
