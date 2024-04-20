import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ComeFromKeepDataEnum } from 'src/constant/enums';

export interface InitState {
    data: Partial<BuySellState>;
    comeFrom?: ComeFromKeepDataEnum | '';
    customerIsin?: string[];
}

const initialState: InitState = {
    data: {
        price: 0,
    },
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
            action: PayloadAction<{ data: Partial<BuySellState>; comeFrom?: ComeFromKeepDataEnum; customerIsin?: string[] }>,
        ) => {
            const prevData = state.data as BuySellState;
            const newData = action.payload?.data;
            state.data = { ...prevData, ...newData };
            state.comeFrom = action.payload.comeFrom ? action.payload.comeFrom : state.comeFrom;
            state.customerIsin = action.payload.customerIsin ? action.payload.customerIsin : state.customerIsin;
        },
        setPriceBuySellAction: (state, action: PayloadAction<number>) => {
            state.data = { price: action.payload };
        },
        setComeFromBuySellAction: (state, action: PayloadAction<ComeFromKeepDataEnum | ''>) => {
            state.comeFrom = action.payload;
        },
        clearDataAction: (state) => {
            (state.data = initialState.data), (state.comeFrom = initialState.comeFrom), (state.customerIsin = initialState.customerIsin);
        },
    },
});

export const { setDataBuySellAction, setPartDataBuySellAction, clearDataAction, setPriceBuySellAction, setComeFromBuySellAction } =
    keepDataBuySellSlice.actions;
export const getKeepDataBuySell = (state: RootState) => state.keepDataBuySellSlice;
export default keepDataBuySellSlice.reducer;
