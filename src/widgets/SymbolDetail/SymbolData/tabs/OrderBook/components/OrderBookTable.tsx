import { useRef, useEffect } from 'react';
import { useSymbolTabsState } from '../../../context';
import Best5Row from './Best5Row';
import Kucoin from './Kucoin';
import MarketDepth from './MarketDepth';
import MarketDepthChart from './MarketDepthChart';

const OrderBookTable = () => {
    const { isDepthChartOpen, isMarketDepthOpen, orderBookViewMode } = useSymbolTabsState();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMarketDepthOpen && isDepthChartOpen && orderBookViewMode === 'Row') {
            containerRef?.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'auto',
            });
        }

        if (isMarketDepthOpen && !isDepthChartOpen) {
            containerRef?.current?.scrollTo({
                top: 0,
                behavior: 'auto',
            });
        }
    }, [isDepthChartOpen, isMarketDepthOpen, orderBookViewMode]);

    if (orderBookViewMode === 'Column') return <Kucoin isDepthChartOpen={isDepthChartOpen} />;

    return (
        <div ref={containerRef} className="flex flex-col justify-between h-full">
            <div className='overflow-auto  mb-2'>{isMarketDepthOpen ? <MarketDepth /> : <Best5Row />}</div>
            <div className='h-fit'>{isDepthChartOpen && <MarketDepthChart />}</div>
        </div>
    );
};

export default OrderBookTable;
