import React, { useMemo, useState } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import { useBuySellDispatch, useBuySellState } from './context/BuySellContext';
import GroupBuySell from './components/GroupBuySell/GroupBuySell';

const BuySell = () => {
    //
    const dispatch = useBuySellDispatch();
    const { side } = useBuySellState();

    const setSide = (value: BuySellSide) => dispatch({ type: 'TOGGLE_BUY_SELL', value });

    const items: ITabItemType[] = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'Buy',
                title: <>خرید</>,
                content: <GroupBuySell />,
                tabClass:
                    'bg-L-success-50 outline-none border border-t-0  dark:border-D-gray-350 border-L-gray-350 dark:bg-D-success-50 text-L-gray-500 dark:text-D-gray-500',
                selectedButtonClass:
                    'text-L-success-150 outline-none dark:text-L-success-150 bg-L-success-50 dark:bg-D-success-50 after:dark:bg-D-success-50 after:bg-L-success-50 font-semibold border-t-2  border-L-success-150 dark:border-D-success-150 border-l  dark:border-l-D-gray-350 border-l-L-gray-350',
            },
            {
                key: 'Sell',
                title: <>فروش</>,
                content: <GroupBuySell />,
                tabClass:
                    'bg-L-error-50  outline-none border border-t-0  dark:border-D-gray-350 border-L-gray-350 dark:bg-D-error-50 text-L-gray-500 dark:text-D-gray-500',
                selectedButtonClass:
                    'text-L-error-150 outline-none dark:text-L-error-150 bg-L-error-50 dark:bg-D-error-50 after:dark:bg-D-error-50 after:bg-L-error-50 font-semibold border-t-2  border-L-error-150 dark:border-D-error-150 border-r  dark:border-r-D-gray-350 border-r-L-gray-350',
            },
        ],
        [],
    );

    return (
        <>
            <TabsList
                onChange={(idx) => setSide(idx as BuySellSide)}
                selectedIndex={side}
                items={items}
                fill
                buttonClass="dark:text-D-gray-450 text-L-gray-450 border-t-2 dark:border-t-transparent border-t-transparent bg-L-gray-150 dark:bg-D-gray-150  dark:border-D-gray-350 border-L-gray-350"
            />
        </>
    );
};

export default BuySell;
