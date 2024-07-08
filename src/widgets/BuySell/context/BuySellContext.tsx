import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { useMutationMultiMultiCustomer } from 'src/app/queries/customer';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getKeepDataBuySell } from 'src/redux/slices/keepDataBuySell';
import { getSelectedSymbol, setAllSelectedCustomers } from 'src/redux/slices/option';
import BuySell, { resetByeSellData } from '..';
import { BuySellReducer } from './BuySellReducer';
import DivideOrderModal from 'src/widgets/DivideOrderModal';
import useUpdateEffect from 'src/common/hooks/useUpdateEffect';

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
    comeFrom: '',
    source: "Account"
};
const useValue = () => useReducer(BuySellReducer, BuySellInitialState);


export const { Provider: BuySellProvider, useTrackedState: useBuySellState, useUpdate: useBuySellDispatch } = createContainer(useValue);


const BuySellContext = () => {
    const dataContext = useBuySellState()
    const symbolRedux = useAppSelector(getSelectedSymbol)
    const { data: dataRedux, comeFrom, customerIsin } = useAppSelector(getKeepDataBuySell)

    const appDispatch = useAppDispatch();
    const ByeSellDispatch = useBuySellDispatch();

    const { mutate: getCustomers } = useMutationMultiMultiCustomer({
        onSuccess: (selectedCustomer) => {
            appDispatch(setAllSelectedCustomers(selectedCustomer))
        },
    });

    useUpdateEffect(() => {
        dataRedux && ByeSellDispatch({
            type: 'SET_ALL',
            value: {
                ...dataContext,
                ...dataRedux,
            },
        });

    }, [dataRedux, comeFrom])

    useUpdateEffect(() => {
        !!customerIsin && getCustomers({ CustomerISINs: customerIsin });
    }, [customerIsin])

    useUpdateEffect(() => {
        !!symbolRedux && ByeSellDispatch({ type: "SET_SYMBOL", value: symbolRedux })

        if (comeFrom !== "OpenPosition" && comeFrom !== "Draft" && comeFrom !== "FailedOrder" && comeFrom !== "openOrder" && comeFrom !== "Basket") {
            ByeSellDispatch({ type: 'SET_QUANTITY', value : 0 });
            ByeSellDispatch({ type: 'SET_PRICE', value : 0 });
        }
    }, [symbolRedux])

    useEffect(() => {
        () => {
            resetByeSellData(ByeSellDispatch, appDispatch)
        }
    }, [comeFrom])


    return (
        <>
            <BuySell />
            <DivideOrderModal />
        </>
    );
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