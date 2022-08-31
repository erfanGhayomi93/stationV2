import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
    appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed';
    userData: { firstName: string; lastName: string; userName: string };
}

const initialState: GlobalState = {
    appState: 'Loading',
    userData: { firstName: '', lastName: '', userName: '' },
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<typeof initialState.appState>) => {
            state.appState = action.payload;
        },
        setAppUser: (state, action: PayloadAction<typeof initialState.userData>) => {
            state.userData = action.payload;
            state.appState = 'LoggedIn';
        },
    },
});

export const { setAppState, setAppUser } = globalSlice.actions;

export default globalSlice.reducer;
