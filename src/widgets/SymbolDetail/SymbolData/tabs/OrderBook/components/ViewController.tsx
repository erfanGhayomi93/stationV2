import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { MarketDepthArrowDownIcon, MarketDepthChartIcon, MarketDepthColIcon, MarketDepthRowIcon } from 'src/common/icons';
import { useSymbolTabsDispatch, useSymbolTabsState } from '../../../context';
import React from 'react';

const ViewController = () => {
    //
    const { t } = useTranslation();
    const { isDepthChartOpen, isMarketDepthOpen, orderBookViewMode } = useSymbolTabsState();
    const dispatch = useSymbolTabsDispatch();

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
    return (
        <div className="mb-4 py-3 px-2 flex justify-start text-xs rounded bg-L-gray-100 dark:bg-D-gray-100">
            <div className="flex flex-1 gap-1 items-center justify-center border-l border-L-gray-500 dark:border-D-gray-500">
                <span className="dark:text-D-gray-700">{t('OrderBook.viewMode')}</span>
                <button onClick={handleRowView}>
                    <MarketDepthColIcon className={clsx('w-7 h-7',{ 'opacity-50': orderBookViewMode === 'Column' })} />
                </button>
                <button onClick={handleColumnView}>
                    <MarketDepthRowIcon className={clsx('w-7 h-7',{ 'opacity-50': orderBookViewMode === 'Row' })} />
                </button>
            </div>
            <button
                onClick={toggleMarketDepth}
                className="flex px-3 gap-1 justify-center items-center border-l border-L-gray-500 dark:border-D-gray-500"
            >
                <span className="dark:text-D-gray-700">{t(`OrderBook.${isMarketDepthOpen ? 'closeMarketDepth' : 'showMarketDepth'}`)}</span>
                <MarketDepthArrowDownIcon className={clsx('text-L-gray-600 dark:text-D-gray-500 w-4 h-4', { 'rotate-180': !!isMarketDepthOpen })} />
            </button>
            <button onClick={toggleDepthChart} className="flex flex-1 gap-1 items-center justify-end">
                <span className="dark:text-D-gray-700">{t(`OrderBook.${isDepthChartOpen ? 'closeDepthChart' : 'showDepthChart'}`)}</span>
                <MarketDepthChartIcon className={clsx('w-7 h-7',{ 'opacity-50': !isDepthChartOpen })} />
            </button>
        </div>
    );
};

export default React.memo(ViewController);
