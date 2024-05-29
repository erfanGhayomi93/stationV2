import { useState } from 'react';
import { useMutationSendOrderV2 } from 'src/app/queries/order';


const useSendOrdersV2 = () => {

    const [ordersLoading, setOrdersLoading] = useState(false);

    const { mutate: mutateSendOrder } = useMutationSendOrderV2({});



    const sendOrders = (orders: IIPOOrder) => {
        if (!orders.items.length) return;

        setOrdersLoading(true);

        async function send() {
            mutateSendOrder(orders);
        }

        send();
    };

    return {
        sendOrders,
        ordersLoading,
    };
};

export default useSendOrdersV2;
