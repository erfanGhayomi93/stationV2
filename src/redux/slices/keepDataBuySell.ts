import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type INitState = {
    orderId?: number;
    customerISIN?: string;
    symbolTitle: string;
    symbolISIN: string;
    orderSide?: OrderSideType;
    price: number;
    expectedRemainingQuantity?: number;
    sumExecuted?: number;
    validityDate?: string;
    quantity: number;
    value?: number;
    validity: string;
    customerTitle?: string;
    position?: number;
    valuePosition?: number;
    id?: number;
    percent?: number;
    side?: string;
    date?: string;
    customerISINs?: string;
    customers?: ICustomer[];
    orderStrategy?: string;
    orderType?: OrderTypeType;
} | {};

const initialState: INitState = {};

const keepDataBuySellSlice = createSlice({
    name: 'buySell',
    initialState: initialState,
    reducers: {
        setDataBuySellAction: (state, action: PayloadAction<any>) => {
            return action.payload;
        },
    },
});

export const { setDataBuySellAction } = keepDataBuySellSlice.actions;
export default keepDataBuySellSlice.reducer;
