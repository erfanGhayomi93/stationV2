import { Dispatch } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import GroupBuySell from './components/GroupBuySell/GroupBuySell';
import { useBuySellDispatch, useBuySellState } from './context/BuySellContext';
import { clearDataAction } from 'src/redux/slices/keepDataBuySell';

export const resetByeSellData = (dispatch: any, appDispatch: Dispatch) => {
    dispatch({ type: 'RESET' });
    appDispatch(clearDataAction())
}

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
                    'bg-L-success-50 outline-none border border-t-0   dark:border-D-gray-400 border-L-gray-400 dark:bg-D-success-50 text-L-gray-500 dark:text-D-gray-700',
                selectedButtonClass:
                    'text-L-success-200 outline-none  dark:text-L-success-200 bg-L-success-50 dark:bg-D-success-50 after:dark:bg-D-success-50 after:bg-L-success-50 font-semibold border-t-2  border-L-success-200 dark:border-D-success-200 border-l  dark:border-l-D-gray-400 border-l-L-gray-400',
            },
            {
                key: 'Sell',
                title: <>فروش</>,
                content: <GroupBuySell />,
                tabClass:
                    'bg-L-error-50  outline-none border   border-t-0   dark:border-D-gray-400 border-L-gray-400 dark:bg-D-error-50 text-L-gray-500 dark:text-D-gray-700',
                selectedButtonClass:
                    'text-L-error-200 outline-none   dark:text-L-error-200 bg-L-error-50 dark:bg-D-error-50 after:dark:bg-D-error-50 after:bg-L-error-101 font-semibold border-t-2  border-L-error-200 dark:border-D-error-200 border-r  dark:border-r-D-gray-400 border-r-L-gray-400',
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
                buttonClass="dark:text-D-gray-600 text-L-gray-600 border-t-2 dark:border-t-transparent border-b border-t-transparent bg-L-gray-300 dark:bg-D-gray-300  dark:border-D-gray-400 border-L-gray-400"
            />
        </>
    );
};

export default BuySell;
