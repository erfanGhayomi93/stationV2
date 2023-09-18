import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import ViewController from './components/ViewController';
import OrderBookHeader from './components/OrderBookHeader';
import OrderBookTable from './components/OrderBookTable';
import { useSymbolTabsState } from '../../context';

const OrderBook = () => {
    //
    const { orderBookViewMode } = useSymbolTabsState();

    return (
        <div className={clsx('w-full h-full grid relative overflow-hidden grid-rows-min-one text-1.2')}>
            <div className="sticky top-0 pt-2 z-50 bg-L-basic h-fit dark:bg-D-basic">
                <ViewController />
                {orderBookViewMode === 'Row' && <OrderBookHeader />}
            </div>
            <div className="max-h-full overflow-hidden">
                <OrderBookTable />
            </div>
        </div>
    );
};

export default OrderBook;
