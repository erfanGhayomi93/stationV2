import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
    data?: IDraftRequsetType | IOrderGetType;
}
const initialState: InitState = {};

const keepDataBuySellSlice = createSlice({
    name: 'buySell',
    initialState: initialState,
    reducers: {
        setDataBuySellAction: (state, action: PayloadAction<IDraftRequsetType | IOrderGetType | undefined>) => {
            state.data = action.payload;
        },
    },
});

export const { setDataBuySellAction } = keepDataBuySellSlice.actions;
export default keepDataBuySellSlice.reducer;
