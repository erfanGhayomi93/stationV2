import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useMutationSendOrderV2 } from 'src/app/queries/order';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';
import { removeDuplicatesInArray } from 'src/utils/helpers';

const useSendOrdersV2 = () => {

    const [ordersLoading, setOrdersLoading] = useState(false);

    const { brokerCode, userName, traderCode } = useAppSelector(getUserData);

    const queryClient = useQueryClient();

    const { mutate: mutateSendOrder } = useMutationSendOrderV2({});

    const { subscribeCustomers } = useRamandOMSGateway();

    const subscribeHandler = (customers: ICustomerIsins) => {
        const customerIsinsOrder = customers;
        const onboradList: IOrderGetType[] = queryClient.getQueryData(['orderList', 'OnBoard']) || [];
        const customerIsinsOnboard = onboradList.map((item) => item.customerISIN);
        const activeCustomerIsins = [...customerIsinsOnboard, ...customerIsinsOrder];

        subscribeCustomers(removeDuplicatesInArray(activeCustomerIsins), brokerCode || '');
    };

    const sendOrders = (orders: IIPOOrder) => {
        if (!orders.items.length) return;

        const customers = orders.items.map((item) => item.customerISIN);

        subscribeHandler(customers);

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
