import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { setOrder } from 'src/app/queries/order';

const useSendOrders = () => {
    //
    let timer: NodeJS.Timer;
    const ORDER_SENDING_GAP = 350;
    const [orderResult, setOrderResult] = useState<{ [key: string]: string | null }>({});

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

    const sendOrders = async (index: number, orders: IOrderRequestType[]) => {
        //
        if (!orders.length) return;
        const orderStepsArray: IOrderRequestType[][] = createOrderSteps(orders);
        //
        setOrderResult({});
        const orderStep = orderStepsArray[index];

        const nextIndex = index + 1;

        await Promise.all(orderStep.map((order) => setOrder(order)))
            .then((response) => {
                const result = response.reduce((acc, res, index) => {
                    const order = orderStep[index];
                    const { id: orderID } = order;
                    if (orderID && res.successClientKeys[0]) {
                        Object.defineProperty(acc, orderID, { value: res.successClientKeys[0] });
                    }

                    return acc;
                }, {});

                setOrderResult((pre) => ({ ...pre, ...result }));
            })
            .finally(() => {
                queryClient.invalidateQueries(['orderList', 'OnBoard']);
                if (nextIndex >= orderStepsArray.length) {
                    clearTimeout(timer);
                    return;
                }
                timer = setTimeout(() => sendOrders(nextIndex, orders), ORDER_SENDING_GAP);
            });

        // await setOrder(orderStep?.[0])
        //     .then((response) => {
        //         const order = orderStep[0];
        //         const { id: orderID } = order;
        //         // onSuccessNotif();
        //         // if (sequential) resetByeSellData(dispatch, appDispatch);
        //         if (response.successClientKeys[0] && orderID) {
        //             setOrderResult((pre) => ({ ...pre, [orderID]: response.successClientKeys[0] }));
        //         }
        //     })
        //     .catch(() => {
        //         onErrorNotif();

        //         // orderID && setOrderResult((pre) => ({ ...pre, [orderID]: 'Error' }));
        //     })
        //     .finally(() => {
        //         if (nextIndex >= orders.length) {
        //             clearTimeout(timer);
        //             queryClient.invalidateQueries(['orderList', 'OnBoard']);
        //             return;
        //         }

        //         timer = setTimeout(() => sendOrders(nextIndex, orders), ORDER_SENDING_GAP);
        //     });
    };

    return {
        sendOrders,
        orderResult,
    };
};

export default useSendOrders;
