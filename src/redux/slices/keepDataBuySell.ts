import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ComeFromKeepDataEnum } from 'src/constant/enums';

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
            action: PayloadAction<{ data: Partial<BuySellState>; comeFrom?: ComeFromKeepDataEnum; customerIsin?: string[] }>,
        ) => {
            const prevData = state.data as BuySellState;
            const newData = action.payload?.data;
            state.data = { ...prevData, ...newData };
            state.comeFrom = action.payload.comeFrom ? action.payload.comeFrom : state.comeFrom;
            state.customerIsin = action.payload.customerIsin ? action.payload.customerIsin : state.customerIsin;
        },
        setSideBuySellAction: (state, action: PayloadAction<BuySellSide>) => {
            if (state.data && state.data.side) {
                state.data.side = action.payload;
            }
        },
        clearDataAction: (state) => {
            (state.data = initialState.data), (state.comeFrom = initialState.comeFrom), (state.customerIsin = initialState.customerIsin);
        },
    },
});

export const { setDataBuySellAction, setPartDataBuySellAction, setSideBuySellAction, clearDataAction } = keepDataBuySellSlice.actions;
export const getKeepDataBuySell = (state: RootState) => state.keepDataBuySellSlice;
export default keepDataBuySellSlice.reducer;
