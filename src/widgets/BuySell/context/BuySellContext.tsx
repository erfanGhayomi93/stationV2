import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { setSelectedSymbol } from 'src/redux/slices/option';
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
    const appDispatch = useAppDispatch();
    const dispatch = useBuySellDispatch();

    const {
        keepDataBuySellSlice: { data: keepData },
    } = useAppValues();

    function isDraft(keepOrder: IOrderGetType | IDraftRequsetType): keepOrder is IDraftRequsetType {
        return (keepOrder as IDraftRequsetType).customerISINs !== undefined;
    }

    useEffect(() => {
        if (keepData?.symbolISIN) {
            appDispatch(setSelectedSymbol(keepData.symbolISIN));

            if (isDraft(keepData)) {
                dispatch({
                    type: 'SET_ALL',
                    value: {
                        amount: 0,
                        divide: false,
                        isCalculatorEnabled: false,
                        sequential: false,
                        price: keepData.price,
                        quantity: keepData.quantity,
                        side: keepData.side as BuySellSide,
                        strategy: keepData.orderStrategy as strategy,
                        symbolISIN: '',
                        validity: keepData.validity as validity,
                        validityDate: keepData.validityDate,
                        percent: keepData.percent,
                    },
                });
            } else {
                dispatch({
                    type: 'SET_ALL',
                    value: {
                        amount: 0,
                        percent: 0,
                        divide: false,
                        isCalculatorEnabled: false,
                        sequential: false,
                        price: keepData.price,
                        quantity: keepData.quantity,
                        side: keepData.orderSide as BuySellSide,
                        strategy: 'normal',
                        symbolISIN: '',
                        validity: keepData.validity as validity,
                        validityDate: keepData.validityDate,
                    },
                });
            }

            appDispatch(setDataBuySellAction());
        }
    }, [keepData?.symbolISIN]);

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
