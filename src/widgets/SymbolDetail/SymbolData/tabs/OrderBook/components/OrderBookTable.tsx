import { useSymbolTabsState } from '../../../context';
import Best5Row from './Best5Row';
import Kucoin from './Kucoin';
import MarketDepth from './MarketDepth';
import MarketDepthChart from './MarketDepthChart';

const OrderBookTable = () => {
    const { isDepthChartOpen, isMarketDepthOpen, orderBookViewMode } = useSymbolTabsState();

    if (orderBookViewMode === 'Column') return <Kucoin isDepthChartOpen={isDepthChartOpen} />;

    return (
        <>
            {isMarketDepthOpen ? <MarketDepth /> : <Best5Row />}
            {isDepthChartOpen && <MarketDepthChart />}
        </>
    );
};

export default OrderBookTable;
