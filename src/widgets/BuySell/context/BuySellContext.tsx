import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { useMutationMultiMultiCustomer } from 'src/app/queries/customer';
import { useGlobalSetterDispatch } from 'src/common/context/globalSetterContext';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { clearDataAction, getKeepDataBuySell, setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { getSelectedSymbol, setSelectedCustomers, setSelectedSymbol } from 'src/redux/slices/option';
import BuySell from '..';
import { BuySellReducer } from './BuySellReducer';
import DivideOrderModal from 'src/widgets/DivideOrderModal';
interface IBuySellWidgetType { }

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
};
const useValue = () => useReducer(BuySellReducer, BuySellInitialState);


export const { Provider: BuySellProvider, useTrackedState: useBuySellState, useUpdate: useBuySellDispatch } = createContainer(useValue);


const BuySellContext = () => {
    const dispatchSetter = useGlobalSetterDispatch();
    const dataContext = useBuySellState()
    const symbolRedux = useAppSelector(getSelectedSymbol)

    const onSelectionChanged = (customer: IGoMultiCustomerType[]) => {
        // appDispatch(setSelectedCustomers(customer));
    };
    const { mutate: getCustomers } = useMutationMultiMultiCustomer({
        onSuccess: (selectedCustomer) => {
            console.log("selectedCustomer", selectedCustomer)
            onSelectionChanged(selectedCustomer);
        },
    });

    const appDispatch = useAppDispatch();
    const dispatch = useBuySellDispatch();

    useEffect(() => {
        const resetBuySellState = () => dispatch({ type: 'RESET' });
        dispatchSetter({ resetBuySellState: resetBuySellState });
    }, [dispatch, dispatchSetter]);

    const { data: keepData, comeFrom, customerIsin } = useAppSelector(getKeepDataBuySell)

    // function isDraft(keepOrder: IOrderGetType | IDraftResponseType, comeFrom?: string): keepOrder is IDraftResponseType {
    //     return comeFrom === ComeFromKeepDataEnum.Draft;
    // }
    // function isBasket(keepOrder: IOrderGetType | IDraftResponseType | IListDetailsBasket, comeFrom?: string): keepOrder is IListDetailsBasket {
    //     return comeFrom === ComeFromKeepDataEnum.Basket;
    // }

//     useEffect(() => {
//         console.log("keepDataRedux", keepData)
//         console.log("comeFromRedux", comeFrom)
//         console.log("customerIsinRedux", customerIsin)
//     }, [keepData, comeFrom, customerIsin])
// 
//     useEffect(() => {
//         console.log("dataContext", dataContext)
//     }, [dataContext.quantity])



    //     useEffect(() => {
    //         if (keepData?.symbolISIN) {
    //             appDispatch(setSelectedSymbol(keepData.symbolISIN));
    //             if (isDraft(keepData, comeFrom)) {
    //                 let dataMulti = {
    //                     CustomerISINs: keepData?.customers.map((item) => item.customerISIN),
    //                     CustomerTagTitles: keepData?.customerTags.map((item) => item.customerTagTitle),
    //                     GtTraderGroupId: keepData?.gtGroups.map((item) => item.traderGroupId),
    //                 };
    //                 getCustomers(dataMulti);
    //                 dispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: keepData.price,
    //                         quantity: keepData.quantity,
    //                         side: keepData.orderSide as BuySellSide,
    //                         // strategy: keepData.orderStrategy as strategy,
    //                         symbolISIN: keepData.symbolISIN,
    //                         validity: keepData.validity as validity,
    //                         validityDate: keepData.validityDate,
    //                         percent: keepData.percent,
    //                         strategy: 'normal',
    //                         comeFrom,
    //                         id: keepData.orderId,
    //                         // FIXME:startegy not found in instanse
    //                     },
    //                 });
    //             } else if (isBasket(keepData, comeFrom)) {
    //                 let dataMulti = {
    //                     CustomerISINs: keepData?.customerISINs.split(','),
    //                 };
    //                 getCustomers(dataMulti);
    // 
    //                 dispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         percent: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: keepData.price,
    //                         quantity: keepData.quantity,
    //                         side: keepData.orderSide as BuySellSide,
    //                         strategy: 'normal',
    //                         symbolISIN: keepData.symbolISIN,
    //                         validity: keepData.validity as validity,
    //                         validityDate: keepData.validityDate,
    //                         comeFrom,
    //                         id: keepData.orderId,
    //                     },
    //                 });
    //             } else {
    //                 let dataMulti = {
    //                     CustomerISINs: [keepData?.customerISIN],
    //                 };
    //                 getCustomers(dataMulti);
    // 
    //                 dispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         percent: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: keepData.price,
    //                         quantity: keepData.quantity,
    //                         side: keepData.orderSide as BuySellSide,
    //                         strategy: 'normal',
    //                         symbolISIN: keepData.symbolISIN,
    //                         validity: keepData.validity as validity,
    //                         validityDate: keepData.validityDate,
    //                         comeFrom,
    //                         id: keepData.orderId,
    //                     },
    //                 });
    //             }
    // 
    //             appDispatch(setDataBuySellAction()); // clear saved date
    //         }
    //     }, [keepData?.symbolISIN]);

    useEffect(() => {
        // appDispatch(clearDataAction()); // clear saved date
        !!symbolRedux && dispatch({ type: "SET_SYMBOL", value: symbolRedux })
        !!customerIsin && getCustomers({ CustomerISINs: customerIsin });

        const setCommonValues = () => {
            dispatch({
                type: 'SET_ALL',
                value: {
                    ...dataContext,
                    ...keepData
                },
            });
        };

        setCommonValues();

    }, [keepData]);


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

         
            //             if (comeFrom === ComeFromKeepDataEnum.Draft) {
            //                 // dataMulti.CustomerISINs = keepData.customers.map((item) => item.customerISIN);
            //                 // dataMulti.CustomerISINs = keepData.customers.map((item) => item.customerISIN);
            //             } else if (comeFrom === ComeFromKeepDataEnum.Basket) {
            //                 // dataMulti.CustomerISINs = keepData.customerISINs.split(',');
            //                 // Add other properties if needed for the 'basket' case
            //             } else {
            //                 // dataMulti.CustomerISINs = [keepData.customerISIN];
            //                 // Add other properties if needed for the default case
            //             }

               // dispatch({
            //     type: 'SET_ALL',
            //     value: {
            //         amount: 0,
            //         percent: 0,
            //         divide: false,
            //         isCalculatorEnabled: false,
            //         sequential: false,
            //         price: keepData.price,
            //         quantity: keepData.quantity,
            //         side: keepData.side,
            //         strategy: 'normal',
            //         symbolISIN: keepData.symbolISIN,
            //         validity: keepData.validity as validity,
            //         validityDate: keepData.validityDate,
            //         comeFrom,
            //         id: keepData.id,
            //     },
            // });
