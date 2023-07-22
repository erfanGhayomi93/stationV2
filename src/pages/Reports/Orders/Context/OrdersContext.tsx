import dayjs from 'dayjs';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { OrdersReducer } from './OrdersReducer';
import Orders from '..';

const initialState: OrdersState = {
    customerISIN: '',
    FromDate: dayjs().add(-7, 'day').format('YYYY-MM-DDT00:00:00'),
    symbolISIN: '',
    ToDate: dayjs().format('YYYY-MM-DDT11:59:59'),
};
const useValue = () => useReducer(OrdersReducer, initialState);
export const { Provider: OrdersProvider, useTrackedState: useOrdersState, useUpdate: useOrdersDispatch } = createContainer(useValue);

const OrdersContext = () => {
    return <Orders />;
};
const OrdersPage = () => {
    return (
        <>
            <OrdersProvider>
                <OrdersContext />
            </OrdersProvider>
        </>
    );
};

export default OrdersPage;
