import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import OrderBookTable from './components/OrderBookTable';
import { useSymbolTabsState } from '../../context';

const OrderBook = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { orderBookViewMode, isMarketDepthOpen, isDepthChartOpen } = useSymbolTabsState();

    useEffect(() => {
        if (isMarketDepthOpen && isDepthChartOpen && orderBookViewMode === 'Row') {
            containerRef?.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'auto'
            });
        }

        if (isMarketDepthOpen && !isDepthChartOpen) {
            containerRef?.current?.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }
    }, [isDepthChartOpen, isMarketDepthOpen, orderBookViewMode]);

    return (
        <div ref={containerRef} className={clsx('w-full h-full grid relative overflow-auto grid-rows-min-one text-1.2')}>
            <div className="sticky top-0 pt-2 z-50 bg-L-basic h-fit dark:bg-D-basic">
                <ViewController />
                {orderBookViewMode === 'Row' && <OrderBookHeader />}
            </div>
            <div className="flex flex-col">
                <OrderBookTable />
            </div>
        </div>
    );
};

export default OrderBook;
