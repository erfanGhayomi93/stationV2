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
        setSelectedCustomers: (state, action: PayloadAction<IGoMultiCustomerType>) => {
            state.selectedCustomers = [...state.selectedCustomers, action.payload];
        },
        removeSelectedCustomers: (state, action: PayloadAction<string>) => {
            state.selectedCustomers = state.selectedCustomers.filter((item) => item.customerISIN !== action.payload);
        },
        emptySelectedCustomers: (state) => {
            state.selectedCustomers = [];
        },
        toggleFavoriteSelectedCustomer: (state: OptionState, action: PayloadAction<string>) => {
            state.selectedCustomers = state.selectedCustomers.map((item) =>
                item.customerISIN === action.payload ? { ...item, isFavorite: !item.isFavorite } : item,
            );
        },
    },
});

export const { setSelectedSymbol, setSelectedCustomers, removeSelectedCustomers, toggleFavoriteSelectedCustomer, emptySelectedCustomers } =
    optionSlice.actions;

export default optionSlice.reducer;

export const getSelectedSymbol = (state: RootState) => state.option.selectedSymbol;
export const getSelectedCustomers = (state: RootState) => state.option.selectedCustomers;
