import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OptionState {
    selectedSymbol: string;
    selectedCustomers: IGoMultiCustomerType[];
}
// IRO1TAMN0001
const initialState: OptionState = {
    selectedSymbol: '',
    selectedCustomers: [],
};

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setSelectedSymbol: (state, action: PayloadAction<typeof initialState.selectedSymbol>) => {
            state.selectedSymbol = action.payload;
        },
        setSelectedCustomers: (state, action: PayloadAction<typeof initialState.selectedCustomers>) => {
            state.selectedCustomers = action.payload;
        },
    },
});

export const { setSelectedSymbol, setSelectedCustomers } = optionSlice.actions;

export default optionSlice.reducer;

export const selectedSymbolRedux = (state: RootState) => state.option.selectedSymbol;
