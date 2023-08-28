import clsx from 'clsx';
import { useState } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import Best5Row from './components/Best5Row';
import MarketDepth from './components/MarketDepth';
import MarketDepthChart from './components/MarketDepthChart';
import Kucoin from './components/Kucoin';

const OrderBook = () => {
    //
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

    return (
        <div className={clsx('w-full pt-2  h-full grid   grid-rows-min-one relative  text-1.2  ')}>
            <ViewController
                orderBookViewMode={orderBookViewMode}
                isMarketDepthOpen={isMarketDepthOpen}
                isDepthChartOpen={isDepthChartOpen}
                toggleMarketDepth={toggleMarketDepth}
                toggleDepthChart={toggleDepthChart}
                handleColumnView={handleColumnView}
                handleRowView={handleRowView}
            />
            <div className="flex flex-col">
                {orderBookViewMode === 'row' ? (
                    <>
                        <OrderBookHeader />
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
