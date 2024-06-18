import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { removeDuplicatesCustomerISINs } from 'src/utils/helpers';

export interface OptionState {
    selectedSymbol: string;
    selectedCustomers: IGoMultiCustomerType[];
    selectedSymbolMulti: SymbolSearchResult[];
}
// IRO1TAMN0001
const initialState: OptionState = {
    selectedSymbol: '',
    selectedCustomers: [],
    selectedSymbolMulti: [],
};

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setSelectedSymbol: (state, action: PayloadAction<typeof initialState.selectedSymbol>) => {
            state.selectedSymbol = action.payload;
        },
        setPartSelectedCustomers: (state, action: PayloadAction<IGoMultiCustomerType>) => {
            state.selectedCustomers = [...state.selectedCustomers, action.payload];
        },
        setAllSelectedCustomers: (state, action: PayloadAction<IGoMultiCustomerType[]>) => {
            state.selectedCustomers = action.payload;
        },
        setAllSelectedCustomersWithPrevious: (state, action: PayloadAction<IGoMultiCustomerType[]>) => {
            state.selectedCustomers = removeDuplicatesCustomerISINs([...state.selectedCustomers, ...action.payload]);
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
        //multiSymbol
        setSelectedSymbolMulti: (state, action: PayloadAction<SymbolSearchResult>) => {
            state.selectedSymbolMulti = [...state.selectedSymbolMulti, action.payload];
        },
        removeSelectedSymbol: (state, action: PayloadAction<string>) => {
            state.selectedSymbolMulti = state.selectedSymbolMulti.filter((item) => item.symbolISIN !== action.payload);
        },
        emptySelectedSymbol: (state) => {
            state.selectedSymbolMulti = [];
        },
    },
});

export const {
    setSelectedSymbol,
    setPartSelectedCustomers,
    setAllSelectedCustomers,
    removeSelectedCustomers,
    toggleFavoriteSelectedCustomer,
    emptySelectedCustomers,
    setSelectedSymbolMulti,
    removeSelectedSymbol,
    emptySelectedSymbol,
    setAllSelectedCustomersWithPrevious
} = optionSlice.actions;

export default optionSlice.reducer;

export const getSelectedSymbol = (state: RootState) => state.option.selectedSymbol;
export const getSelectedSymbolMulti = (state: RootState) => state.option.selectedSymbolMulti;
export const getSelectedCustomers = (state: RootState) => state.option.selectedCustomers;
