import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { MarketDepthArrowDownIcon, MarketDepthChartIcon, MarketDepthColIcon, MarketDepthRowIcon } from 'src/common/icons';

interface IControllerProps {
    orderBookViewMode?: 'row' | 'column';
    toggleOrderBookView?: () => void;
    isMarketDepthOpen?: boolean;
    toggleMarketDepth?: () => void;
    isDepthChartOpen?: boolean;
    toggleDepthChart?: () => void;
}

const ViewController = ({
    orderBookViewMode,
    isMarketDepthOpen,
    toggleMarketDepth,
    isDepthChartOpen,
    toggleDepthChart,
    toggleOrderBookView,
}: IControllerProps) => {
    //
    const { t } = useTranslation();
    return (
        <div className="mb-4 py-3 px-2 flex justify-start text-xs rounded bg-L-gray-100 dark:bg-D-gray-100">
            <div className="flex flex-1 gap-1 items-center justify-center border-l border-L-gray-500 dark:border-D-gray-500">
                <span className="dark:text-D-gray-700">{t('OrderBook.viewMode')}</span>
                <button onClick={toggleOrderBookView}>
                    <MarketDepthColIcon className={clsx({ 'opacity-50': orderBookViewMode === 'column' })} />
                </button>
                <button onClick={toggleOrderBookView}>
                    <MarketDepthRowIcon className={clsx({ 'opacity-50': orderBookViewMode === 'row' })} />
                </button>
            </div>
            <button
                onClick={toggleMarketDepth}
                className="flex px-3 gap-1 justify-center items-center border-l border-L-gray-500 dark:border-D-gray-500"
            >
                <span className="dark:text-D-gray-700">{t(`OrderBook.${isMarketDepthOpen ? 'closeMarketDepth' : 'showMarketDepth'}`)}</span>
                <MarketDepthArrowDownIcon className={clsx('text-L-gray-600 dark:text-D-gray-500', { 'rotate-180': !!isMarketDepthOpen })} />
            </button>
            <button onClick={toggleDepthChart} className="flex flex-1 gap-1 items-center justify-end">
                <span className="dark:text-D-gray-700">{t(`OrderBook.${isDepthChartOpen ? 'closeDepthChart' : 'showDepthChart'}`)}</span>
                <MarketDepthChartIcon className={clsx({ 'opacity-50': !isDepthChartOpen })} />
            </button>
        </div>
    );
};

export default ViewController;
