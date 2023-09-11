import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import Best5Row from './components/Best5Row';
import MarketDepth from './components/MarketDepth';
import MarketDepthChart from './components/MarketDepthChart';
import Kucoin from './components/Kucoin';

const OrderBook = () => {
    //
    const containerRef = useRef<HTMLDivElement>(null);

    const [orderBookViewMode, setOrderBookViewMode] = useState<'row' | 'column'>('row');
    const [isMarketDepthOpen, setIsMarketDepthOpen] = useState<boolean>(false);
    const [isDepthChartOpen, setIsDepthChartOpen] = useState<boolean>(true);

    const toggleMarketDepth = () => {
        setIsMarketDepthOpen(!isMarketDepthOpen);
        setOrderBookViewMode('row');
    };

    const toggleDepthChart = () => {
        setIsDepthChartOpen(!isDepthChartOpen);
    };

    const handleColumnView = () => {
        setOrderBookViewMode('column');
        setIsMarketDepthOpen(true);
    };

    const handleRowView = () => {
        setOrderBookViewMode('row');
    };

    useEffect(() => {
        if (isMarketDepthOpen && isDepthChartOpen && orderBookViewMode ==='row') {
            containerRef?.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }

        if(isMarketDepthOpen && !isDepthChartOpen) {
            containerRef?.current?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

    }, [isDepthChartOpen, isMarketDepthOpen, orderBookViewMode]);

    return (
        <div ref={containerRef} className={clsx('w-full h-full grid relative overflow-auto grid-rows-min-one text-1.2')}>
            <div className="sticky top-0 pt-2 z-50 bg-L-basic h-fit dark:bg-D-basic">
                <ViewController
                    orderBookViewMode={orderBookViewMode}
                    isMarketDepthOpen={isMarketDepthOpen}
                    isDepthChartOpen={isDepthChartOpen}
                    toggleMarketDepth={toggleMarketDepth}
                    toggleDepthChart={toggleDepthChart}
                    handleColumnView={handleColumnView}
                    handleRowView={handleRowView}
                />
                {orderBookViewMode === 'row' && <OrderBookHeader />}
            </div>
            <div className="flex flex-col">
                {
                orderBookViewMode === 'row' ? (
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
