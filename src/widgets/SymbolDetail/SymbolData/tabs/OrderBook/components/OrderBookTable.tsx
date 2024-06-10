import { useRef, useEffect, FC } from 'react';
import { useSymbolTabsDispatch, useSymbolTabsState } from '../../../context';
import Best5Row from './Best5Row';
import Kucoin from './Kucoin';
import MarketDepth from './MarketDepth';
import MarketDepthChart from './MarketDepthChart';
import Best5RowKucoin from './Kucoin/Best5RowKucoin';
import AdditionalData from '../../AdditionalData';
import { MarketDepthArrowDownIcon } from 'src/common/icons';
import AuthorityDetails from '../../AuthorityDetails';

const OrderBookTable: FC<{ isOption: boolean }> = ({ isOption }) => {
    const { isDepthChartOpen, isMarketDepthOpen, orderBookViewMode } = useSymbolTabsState();
    const containerRef = useRef<HTMLDivElement>(null);

    const dispatch = useSymbolTabsDispatch();


    const toggleMarketDepth = () => {
        dispatch({ type: 'TOGGLE_MARKET_DEPTH', payload: !isMarketDepthOpen });
    };

    const toggleDepthChart = () => {
        dispatch({ type: 'TOGGLE_DEPTH_CHART', payload: !isDepthChartOpen });
    };

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

    if (orderBookViewMode === 'Column')
        return isMarketDepthOpen ? <Kucoin isDepthChartOpen={isDepthChartOpen} /> : <Best5RowKucoin isDepthChartOpen={isDepthChartOpen} />;

    return (
        <div ref={containerRef} className="flex flex-col justify-between h-full overflow-auto p-2">
            <div className="flex-1 mb-2">{isMarketDepthOpen ? <MarketDepth /> : <Best5Row />}</div>
            <div className='relative my-2'>
                <hr className='' />
                {isMarketDepthOpen && <MarketDepthArrowDownIcon
                    className='rotate-180 text-gray-600 absolute -top-[6px] 
                        right-1/2 translate-x-[6px] cursor-pointer'
                    onClick={toggleMarketDepth}
                />}
            </div>
            <div className="h-fit">{isDepthChartOpen && <MarketDepthChart />}</div>
            <div className='relative'>
                {isDepthChartOpen &&
                    <div className='relative my-2'>
                        <hr className='' />
                        <MarketDepthArrowDownIcon
                            className='rotate-180 text-gray-600 absolute -top-[6px] right-1/2 translate-x-[6px] cursor-pointer'
                            onClick={toggleDepthChart}
                        />
                    </div>
                }
            </div>
            <div>
                {!isOption ? <AdditionalData /> : <AuthorityDetails />}
            </div>
        </div>
    );
};

export default OrderBookTable;
