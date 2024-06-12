import clsx from 'clsx';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import OrderBookTable from './components/OrderBookTable';
import { useSymbolTabsState } from '../../context';
import { FC } from 'react';

const OrderBook: FC<{ isOption: boolean }> = ({isOption}) => {
    //
    const { orderBookViewMode } = useSymbolTabsState();

    return (
        <div className={clsx('w-full h-full grid relative overflow-hidden grid-rows-min-one text-1.2')}>
            <div className="sticky top-0 z-50 h-fit">
                <ViewController />
                {orderBookViewMode === 'Row' && <OrderBookHeader />}
            </div>
            <div className="overflow-auto">
                <OrderBookTable
                    isOption={isOption}
                />
            </div>
        </div>
    );
};

export default OrderBook;
