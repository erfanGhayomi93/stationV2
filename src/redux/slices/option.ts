import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OptionState {
    selectedSymbol: string;
    selectedCustomers: IGoMultiCustomerType[];
    symbolChartDate: SymbolChartDate,
    symbolChartType: SymbolChartType,
}
// IRO1TAMN0001
const initialState: OptionState = {
    selectedSymbol: '',
    symbolChartDate: 'Today',
    symbolChartType: 'Linear',
    selectedCustomers: [],
};

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setSelectedSymbol: (state, action: PayloadAction<typeof initialState.selectedSymbol>) => {
            state.selectedSymbol = action.payload;
        },
        setSymbolChartDate: (state, action: PayloadAction<typeof initialState.symbolChartDate>) => {
            state.symbolChartDate = action.payload
        },
        setSymbolChartType: (state, action: PayloadAction<typeof initialState.symbolChartType>) => {
            state.symbolChartType = action.payload
        },
        setSelectedCustomers: (state, action: PayloadAction<typeof initialState.selectedCustomers>) => {
            state.selectedCustomers = action.payload;
        },
    },
});

export const { setSelectedSymbol, setSelectedCustomers, setSymbolChartDate, setSymbolChartType } = optionSlice.actions;

export default optionSlice.reducer;

export const getSelectedSymbol = (state: RootState) => state.option.selectedSymbol;
