import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import Best5Row from './components/Best5Row';
import MarketDepth from './components/MarketDepth';
import MarketDepthChart from './components/MarketDepthChart';
import Kucoin from './components/Kucoin';
import { useSymbolDataDispatch, useSymbolDataState } from '../../context';

const OrderBook = () => {
     
    const containerRef = useRef<HTMLDivElement>(null);
    const { isDepthChartOpen, isMarketDepthOpen, orderBookViewMode } = useSymbolDataState();
    const dispatch = useSymbolDataDispatch();

    const toggleMarketDepth = () => {
        dispatch({ type: 'TOGGLE_MARKET_DEPTH', payload: !isMarketDepthOpen });
        dispatch({ type: 'TOGGLE_ORDER_BOOK_VIEW', payload: 'Row' });
    };

    const toggleDepthChart = () => {
        dispatch({ type: 'TOGGLE_DEPTH_CHART', payload: !isDepthChartOpen });
    };

    const handleColumnView = () => {
        dispatch({ type: 'TOGGLE_ORDER_BOOK_VIEW', payload: 'Column' });
        dispatch({ type: 'TOGGLE_MARKET_DEPTH', payload: true });
    };

    const handleRowView = () => {
        dispatch({ type: 'TOGGLE_ORDER_BOOK_VIEW', payload: 'Row' });
    };

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
                <ViewController/>
                {orderBookViewMode === 'Row' && <OrderBookHeader />}
            </div>
            <div className="flex flex-col">
                {orderBookViewMode === 'Row' ? (
                    <>
                        {isMarketDepthOpen ? <MarketDepth /> : <Best5Row />}
                        {isDepthChartOpen && <MarketDepthChart />}
                    </>
                ) : (
                    <Kucoin isDepthChartOpen={isDepthChartOpen} />
                )}
            </div>
        </div>
    );
};

export default OrderBook;
