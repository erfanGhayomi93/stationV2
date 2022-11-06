import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { useMutationMultiMultiCustomer } from 'src/app/queries/customer';
import { useGlobalSetterDispatch } from 'src/common/context/globalSetterContext';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
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
    comeFrom : ""
};
const useValue = () => useReducer(BuySellReducer, BuySellInitialState);
export const { Provider: BuySellProvider, useTrackedState: useBuySellState, useUpdate: useBuySellDispatch } = createContainer(useValue);
const BuySellContext = () => {
    const dispatchSetter = useGlobalSetterDispatch();

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

    useEffect(() => {
        const resetBuySellState = () => dispatch({ type: 'RESET' });

        dispatchSetter({ resetBuySellState: resetBuySellState });
    }, [dispatch, dispatchSetter]);

    const {
        keepDataBuySellSlice: { data: keepData, comeFrom },
    } = useAppValues();

    function isDraft(keepOrder: IOrderGetType | IDraftResponseType, comeFrom?: string): keepOrder is IDraftResponseType {
        return comeFrom === ComeFromKeepDataEnum.Draft;
    }

    useEffect(() => {
        if (keepData?.symbolISIN) {
            appDispatch(setSelectedSymbol(keepData.symbolISIN));
            if (isDraft(keepData, comeFrom)) {
                let dataMulti = {
                    CustomerISINs: keepData?.customers.map((item) => item.customerISIN),
                    CustomerTagTitles: keepData?.customerTags.map((item) => item.customerTagTitle),
                    GtTraderGroupId: keepData?.gtGroups.map((item) => item.traderGroupId),
                };
                getCustomers(dataMulti);
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
                        symbolISIN: keepData.symbolISIN,
                        validity: keepData.validity as validity,
                        validityDate: keepData.validityDate,
                        percent: keepData.percent,
                        strategy: 'normal',
                        comeFrom
                        // FIXME:startegy not found in instanse
                    },
                });
            } else {
                let dataMulti = {
                    CustomerISINs: [keepData?.customerISIN],
                };
                getCustomers(dataMulti);

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
                        symbolISIN: keepData.symbolISIN,
                        validity: keepData.validity as validity,
                        validityDate: keepData.validityDate,
                        comeFrom
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