import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
    theme: 'dark' | 'light';
}

const initialState: UiState = {
    theme: 'light',
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAppTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
            state.theme = action.payload;
        },
    },
});

export const { setAppTheme } = uiSlice.actions;

export default uiSlice.reducer;
