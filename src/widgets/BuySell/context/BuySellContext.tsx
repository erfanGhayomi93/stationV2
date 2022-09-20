import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import BuySell from '..';
import { BuySellReducer } from './BuySellReducer';
interface IBuySellWidgetType {}

const initialState: BuySellState = {
    price: 0,
    quantity: 0,
    validity: 'Day',
    strategy: 'normal',
    validityDate: undefined,
    sequential: false,
    symbolISIN: '',
    divide: false,
    isCalculatorEnabled: false,
    amount: 0,
};
const useValue = () => useReducer(BuySellReducer, initialState);
export const { Provider: BuySellProvider, useTrackedState: useBuySellState, useUpdate: useBuySellDispatch } = createContainer(useValue);

const BuySellWidget = () => {
    return (
        <>
            <BuySellProvider>
                <BuySell />
            </BuySellProvider>
        </>
    );
};

export default BuySellWidget;
