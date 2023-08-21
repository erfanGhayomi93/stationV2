import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
    appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed' | 'Booting';
    userData: UserType;
}

const initialState: GlobalState = {
    appState: 'Booting',
    userData: { firstName: '', lastName: '', userName: '' , customerISIN : "" },
};

const globalSlice = createSlice({
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
