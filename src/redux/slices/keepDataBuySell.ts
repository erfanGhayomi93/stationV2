import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const keepDataBuySellSlice = createSlice({
    name: 'buySell',
    initialState: {},
    reducers: {
        setDataBuySellAction: (state, action: PayloadAction<any>) => {
            return action.payload;
        },
    },
});

export const { setDataBuySellAction } = keepDataBuySellSlice.actions;
export default keepDataBuySellSlice.reducer;
