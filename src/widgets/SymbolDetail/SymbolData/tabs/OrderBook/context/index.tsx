import { createContainer } from 'react-tracked';
import useMarketDepth from '../components/MarketDepth/useMarketDepth';
import { useAppValues } from 'src/redux/hooks';
import { useEffect, useState } from 'react';
import OrderBook from '..';

const initialState: IMarketDepthTypes = {
    bids: {
        data: {},
        totalQuantity: 0,
    },
    asks: {
        data: {},
        totalQuantity: 0
    },
    isLoading: false,
};

const useValue = () => useState(initialState);

export const { Provider, useTrackedState, useUpdate } = createContainer(useValue);
export const useMarketDepthState = () => {
    const marketDepthData = useTrackedState();
    return { marketDepthData };
};

const MarketDepthContext = () => {
    //
    const setMarketDepthData = useUpdate();
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const {
        data,
        actions: { fetch, subscribe, unsubscribe, reset },
    } = useMarketDepth();

    useEffect(() => {
        fetch(selectedSymbol).then(subscribe);

        return () => {
            reset();
            unsubscribe();
        };
    }, [selectedSymbol]);

    useEffect(() => {
        setMarketDepthData(data);
    }, [data]);

    return <OrderBook />;
};

const OrderBookWidget = () => {
    return (
        <Provider>
            <MarketDepthContext />
        </Provider>
    );
};

export default OrderBookWidget;
