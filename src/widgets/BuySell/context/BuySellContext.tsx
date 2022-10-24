import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { useMutationMultiMultiCustomer } from 'src/app/queries/customer';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { setSelectedCustomers, setSelectedSymbol } from 'src/redux/slices/option';
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
    const onSelectionChanged = (customer: IGoMultiCustomerType[]) => {
        appDispatch(setSelectedCustomers(customer));
    };
    const { mutate: getCustomers } = useMutationMultiMultiCustomer({
        onSuccess: (selectedCustomer) => {
            onSelectionChanged(selectedCustomer);
        },
    });

    const appDispatch = useAppDispatch();
    const dispatch = useBuySellDispatch();

    const {
        keepDataBuySellSlice: { data: keepData },
    } = useAppValues();

    function isDraft(keepOrder: IOrderGetType | IDraftResponseType): keepOrder is IDraftResponseType {
        return (keepOrder as IDraftResponseType).customerISINs !== undefined;
    }

    useEffect(() => {
        if (keepData?.symbolISIN) {
            appDispatch(setSelectedSymbol(keepData.symbolISIN));
            if (isDraft(keepData)) {
                getCustomers(keepData.customerISINs.split(','));
                dispatch({
                    type: 'SET_ALL',
                    value: {
                        amount: 0,
                        divide: false,
                        isCalculatorEnabled: false,
                        sequential: false,
                        price: keepData.price,
                        quantity: keepData.quantity,
                        side: keepData.orderSide as BuySellSide,
                        // strategy: keepData.orderStrategy as strategy,
                        symbolISIN: '',
                        validity: keepData.validity as validity,
                        validityDate: keepData.validityDate,
                        percent: keepData.percent,
                        strategy: 'normal',
                        // FIXME:startegy not found in instanse
                    },
                });
            } else {
                getCustomers([keepData.customerISIN]);

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

            appDispatch(setDataBuySellAction()); // clear saved date
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
