import { useState } from 'react';
import { setOrder } from 'src/app/queries/order';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch } from 'src/redux/hooks';
import { resetByeSellData } from 'src/widgets/BuySell';
import { useBuySellDispatch, useBuySellState } from 'src/widgets/BuySell/context/BuySellContext';

const useSendOrders = () => {
    //
    let timer: NodeJS.Timer;
    const ORDER_SENDING_GAP = 350;
    const [orderResult, setOrderResult] = useState<{ [key: string]: string | null }>({});

    const appDispatch = useAppDispatch();
    const dispatch = useBuySellDispatch();
    const { sequential } = useBuySellState();

    const sendOrders = async (index: number, orders: IOrderRequestType[]) => {
        //
        if(!orders.length) return;
        setOrderResult({})
        const order = orders[index];
        const { id: orderID, status } = order || {};
        const nextIndex = index + 1;

        if (status && nextIndex <= orders.length) {
            sendOrders(nextIndex, orders);
        }

        await setOrder(order)
            .then((response) => {
                // onSuccessNotif();
                // if (sequential) resetByeSellData(dispatch, appDispatch);
                if (response.successClientKeys[0] && orderID) {
                    setOrderResult((pre) => ({ ...pre, [orderID]: response.successClientKeys[0] }));
                }
            })
            .catch(() => {
                onErrorNotif();

                orderID && setOrderResult((pre) => ({ ...pre, [orderID]: 'Error' }));
            })
            .finally(() => {
                if (nextIndex >= orders.length) {
                    clearTimeout(timer);
                    return;
                }

                timer = setTimeout(() => sendOrders(nextIndex, orders), ORDER_SENDING_GAP);
            });
    };

    return {
        sendOrders,
        orderResult,
    };
};

export default useSendOrders;
