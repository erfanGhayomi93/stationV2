import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
    data: IDraftResponseType | IOrderGetType | undefined;
    comeFrom?: string;
}

const initialState: InitState = {
    data: undefined,
    comeFrom: "",
};

const keepDataBuySellSlice = createSlice({
    name: 'buySell',
    initialState: initialState,
    reducers: {
        setDataBuySellAction: (state, action: PayloadAction<InitState | undefined>) => {
            state.data = action?.payload ? action.payload?.data : undefined;
            state.comeFrom = action?.payload?.comeFrom ? action.payload.comeFrom : "";
        },
    },
});

export const { setDataBuySellAction } = keepDataBuySellSlice.actions;
export default keepDataBuySellSlice.reducer;
