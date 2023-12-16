import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ComeFromKeepDataEnum } from 'src/constant/enums';

// interface InitState {
//     data: IDraftResponseType | IOrderGetType | undefined;
//     comeFrom?: ComeFromKeepDataEnum | undefined;
// }
//
// const initialState: InitState = {
//     data: undefined,
//     comeFrom: ComeFromKeepDataEnum.OpenOrder,
// };
//
// const keepDataBuySellSlice = createSlice({
//     name: 'buySell',
//     initialState: initialState,
//     reducers: {
//         setDataBuySellAction: (state, action: PayloadAction<InitState | undefined>) => {
//             state.data = action?.payload ? action.payload?.data : undefined;
//             state.comeFrom = action?.payload?.comeFrom ? action.payload.comeFrom : undefined;
//         },
//         setPartDataBuySellAction: (
//             state,
//             action: PayloadAction<{ data: Partial<IDraftResponseType | IOrderGetType>; comeFrom: ComeFromKeepDataEnum }>,
//         ) => {
//             const prevData = state.data as (IDraftResponseType | IOrderGetType | undefined);
//             const newData = action.payload?.data as IDraftResponseType | IOrderGetType | undefined;
//             state.data = { ...prevData, ...newData };
//             state.comeFrom = action.payload.comeFrom;
//         },
//     },
// });
//
// export const { setDataBuySellAction, setPartDataBuySellAction } = keepDataBuySellSlice.actions;
// export const getKeepDataBuySell = (state: RootState) => state.keepDataBuySellSlice;
// export default keepDataBuySellSlice.reducer;

interface InitState {
    data?: BuySellState;
    comeFrom?: ComeFromKeepDataEnum | '';
    customerIsin?: string[];
}

const initialState: InitState = {
    data: undefined,
    comeFrom: '',
    customerIsin: [],
};

const keepDataBuySellSlice = createSlice({
    name: 'buySell',
    initialState: initialState,
    reducers: {
        setDataBuySellAction: (state, action: PayloadAction<InitState>) => {
            state.data = action.payload?.data;
            state.comeFrom = action?.payload?.comeFrom;
            state.customerIsin = action?.payload?.customerIsin;
        },
        setPartDataBuySellAction: (
            state,
            action: PayloadAction<{ data: Partial<BuySellState>; comeFrom: ComeFromKeepDataEnum; customerIsin?: string[] }>,
        ) => {
            const prevData = state.data as BuySellState;
            const newData = action.payload?.data;
            state.data = { ...prevData, ...newData };
            state.comeFrom = action.payload.comeFrom;
            state.customerIsin = action.payload.customerIsin;
        },
        clearDataAction: (state) => {
            (state.data = initialState.data), (state.comeFrom = initialState.comeFrom), (state.customerIsin = initialState.customerIsin);
        },
    },
});

export const { setDataBuySellAction, setPartDataBuySellAction, clearDataAction } = keepDataBuySellSlice.actions;
export const getKeepDataBuySell = (state: RootState) => state.keepDataBuySellSlice;
export default keepDataBuySellSlice.reducer;
