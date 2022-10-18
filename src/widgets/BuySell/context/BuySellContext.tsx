import dayjs from 'dayjs';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import BuySell from '..';
import { BuySellReducer } from './BuySellReducer';
interface IBuySellWidgetType {}

export const BuySellInitialState: BuySellState = {
    price: 0,
    quantity: 0,
    validity: 'Day',
    strategy: 'normal',
    validityDate: dayjs(new Date() as any).format('YYYY-MM-DD'),
    sequential: false,
    symbolISIN: '',
    divide: false,
    isCalculatorEnabled: false,
    amount: 0,
    side: 'Buy',
};
const useValue = () => useReducer(BuySellReducer, BuySellInitialState);
export const { Provider: BuySellProvider, useTrackedState: useBuySellState, useUpdate: useBuySellDispatch } = createContainer(useValue);

const BuySellContext = () => {
    return <BuySell />;
};
const BuySellWidget = () => {
    return (
        <>
            <BuySellProvider>
                <BuySellContext />
            </BuySellProvider>
        </>
    );
};

export default BuySellWidget;
