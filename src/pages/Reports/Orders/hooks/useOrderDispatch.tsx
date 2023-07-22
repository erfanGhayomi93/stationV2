import { useMemo } from 'react';
import { useOrdersDispatch } from '../Context/OrdersContext';

const useOrderDispatch = () => {
    const dispatch = useOrdersDispatch();
    const setCustomer = (value: OrderCustomer) => dispatch({ type: 'SET_CUSTOMER', value });
    const setSide = (value: OrderSide) => dispatch({ type: 'SET_SIDE', value });
    const setStartDate = (value: OrderStartDate) => dispatch({ type: 'SET_START_DATE', value });
    const setTillDate = (value: OrderStartDate) => dispatch({ type: 'SET_TILL_DATE', value });
    const setStatus = (value: OrderStatus | undefined) => dispatch({ type: 'SET_STATUS', value });
    const setSymbol = (value: OrderSymbol) => dispatch({ type: 'SET_SYMBOL', value });

    const memoize = useMemo(() => {
        return {
            setCustomer,
            setSide,
            setStartDate,
            setTillDate,
            setStatus,
            setSymbol,
        };
    }, [dispatch]);

    return memoize;
};

export default useOrderDispatch;
