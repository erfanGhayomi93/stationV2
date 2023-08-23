import clsx from 'clsx';
import { useState } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import Best5Row from './components/Best5Row';
import MarketDepth from './components/MarketDepth';

const OrderBook = () => {
    //
    const [orderBookViewMode, setOrderBookViewMode] = useState<'row' | 'column'>('column');
    const [isMarketDepthOpen, setIsMarketDepthOpen] = useState<boolean>(false);
    const [isDepthChartOpen, setIsDepthChartOpen] = useState<boolean>(false);

    return (
        <div className={clsx('w-full pt-2  h-full grid   grid-rows-min-one relative  text-1.2  ')}>
            <ViewController
                orderBookViewMode={orderBookViewMode}
                isMarketDepthOpen={isMarketDepthOpen}
                isDepthChartOpen={isDepthChartOpen}
                toggleOrderBookView={() => setOrderBookViewMode((pre) => (pre === 'column' ? 'row' : 'column'))}
                toggleMarketDepth={() => setIsMarketDepthOpen(!isMarketDepthOpen)}
                toggleDepthChart={() => setIsDepthChartOpen(!isDepthChartOpen)}
            />
            <div>
                <OrderBookHeader />
                {isMarketDepthOpen ? <MarketDepth /> : <Best5Row />}
            </div>
        </div>
    );
};

export default OrderBook;
