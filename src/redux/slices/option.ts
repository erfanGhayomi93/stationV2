import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface OptionState {
    selectedSymbol: string;
    selectedCustomers: IGoCustomerSearchResult[];
}
// IRO1TAMN0001
const initialState: OptionState = {
    selectedSymbol: 'IRO1IKCO0001',
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
