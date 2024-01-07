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
    } ,[customerIsin])

    useUpdateEffect(() => {
        !!symbolRedux && ByeSellDispatch({ type: "SET_SYMBOL", value: symbolRedux })
    }, [symbolRedux])


    // useUpdateEffect(() => {
    //     ByeSellDispatch({ type: 'SET_PRICE', value: 0 })
    // }, [dataContext.side])
// 
// useEffect(() => {
//   console.log("dataContext",dataContext)
// }, [dataContext])



    useEffect(() => {
        () => {
            resetByeSellData(ByeSellDispatch , appDispatch)
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

// function isDraft(keepOrder: IOrderGetType | IDraftResponseType, comeFrom?: string): keepOrder is IDraftResponseType {
//     return comeFrom === ComeFromKeepDataEnum.Draft;
// }
// function isBasket(keepOrder: IOrderGetType | IDraftResponseType | IListDetailsBasket, comeFrom?: string): keepOrder is IListDetailsBasket {
//     return comeFrom === ComeFromKeepDataEnum.Basket;
// }


//             if (comeFrom === ComeFromKeepDataEnum.Draft) {
//                 // dataMulti.CustomerISINs = dataRedux.customers.map((item) => item.customerISIN);
//                 // dataMulti.CustomerISINs = dataRedux.customers.map((item) => item.customerISIN);
//             } else if (comeFrom === ComeFromKeepDataEnum.Basket) {
//                 // dataMulti.CustomerISINs = dataRedux.customerISINs.split(',');
//                 // Add other properties if needed for the 'basket' case
//             } else {
//                 // dataMulti.CustomerISINs = [dataRedux.customerISIN];
//                 // Add other properties if needed for the default case
//             }

// ByeSellDispatch({
//     type: 'SET_ALL',
//     value: {
//         amount: 0,
//         percent: 0,
//         divide: false,
//         isCalculatorEnabled: false,
//         sequential: false,
//         price: dataRedux.price,
//         quantity: dataRedux.quantity,
//         side: dataRedux.side,
//         strategy: 'normal',
//         symbolISIN: dataRedux.symbolISIN,
//         validity: dataRedux.validity as validity,
//         validityDate: dataRedux.validityDate,
//         comeFrom,
//         id: dataRedux.id,
//     },
// });




  //     useEffect(() => {
    //         if (dataRedux?.symbolISIN) {
    //             appDispatch(setSelectedSymbol(dataRedux.symbolISIN));
    //             if (isDraft(dataRedux, comeFrom)) {
    //                 let dataMulti = {
    //                     CustomerISINs: dataRedux?.customers.map((item) => item.customerISIN),
    //                     CustomerTagTitles: dataRedux?.customerTags.map((item) => item.customerTagTitle),
    //                     GtTraderGroupId: dataRedux?.gtGroups.map((item) => item.traderGroupId),
    //                 };
    //                 getCustomers(dataMulti);
    //                 ByeSellDispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: dataRedux.price,
    //                         quantity: dataRedux.quantity,
    //                         side: dataRedux.orderSide as BuySellSide,
    //                         // strategy: dataRedux.orderStrategy as strategy,
    //                         symbolISIN: dataRedux.symbolISIN,
    //                         validity: dataRedux.validity as validity,
    //                         validityDate: dataRedux.validityDate,
    //                         percent: dataRedux.percent,
    //                         strategy: 'normal',
    //                         comeFrom,
    //                         id: dataRedux.orderId,
    //                         // FIXME:startegy not found in instanse
    //                     },
    //                 });
    //             } else if (isBasket(dataRedux, comeFrom)) {
    //                 let dataMulti = {
    //                     CustomerISINs: dataRedux?.customerISINs.split(','),
    //                 };
    //                 getCustomers(dataMulti);
    // 
    //                 ByeSellDispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         percent: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: dataRedux.price,
    //                         quantity: dataRedux.quantity,
    //                         side: dataRedux.orderSide as BuySellSide,
    //                         strategy: 'normal',
    //                         symbolISIN: dataRedux.symbolISIN,
    //                         validity: dataRedux.validity as validity,
    //                         validityDate: dataRedux.validityDate,
    //                         comeFrom,
    //                         id: dataRedux.orderId,
    //                     },
    //                 });
    //             } else {
    //                 let dataMulti = {
    //                     CustomerISINs: [dataRedux?.customerISIN],
    //                 };
    //                 getCustomers(dataMulti);
    // 
    //                 ByeSellDispatch({
    //                     type: 'SET_ALL',
    //                     value: {
    //                         amount: 0,
    //                         percent: 0,
    //                         divide: false,
    //                         isCalculatorEnabled: false,
    //                         sequential: false,
    //                         price: dataRedux.price,
    //                         quantity: dataRedux.quantity,
    //                         side: dataRedux.orderSide as BuySellSide,
    //                         strategy: 'normal',
    //                         symbolISIN: dataRedux.symbolISIN,
    //                         validity: dataRedux.validity as validity,
    //                         validityDate: dataRedux.validityDate,
    //                         comeFrom,
    //                         id: dataRedux.orderId,
    //                     },
    //                 });
    //             }
    // 
    //             appDispatch(setDataBuySellAction()); // clear saved date
    //         }
    //     }, [dataRedux?.symbolISIN]);