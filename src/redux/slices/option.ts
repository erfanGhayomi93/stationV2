import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface OptionState {
    selectedSymbol: string;
}

const initialState: OptionState = {
    selectedSymbol: 'IRO1TAMN0001',
};

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setSelectedSymbol: (state, action: PayloadAction<typeof initialState.selectedSymbol>) => {
            state.selectedSymbol = action.payload;
        },
    },
});

export const { setSelectedSymbol } = optionSlice.actions;

export default optionSlice.reducer;
