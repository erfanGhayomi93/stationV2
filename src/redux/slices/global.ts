import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GlobalStateTest {
    appState: 'Loading' | 'LoggedIn' | 'LoggedOut' | 'Crashed' | 'Booting';
    userData: UserType;
}

const initialState: GlobalStateTest = {
    appState: 'Booting',
    userData: {
        // customerISIN: '',
        brokerCode: '',
        credit: 0,
        nationalCode: '',
        traderCode: '',
        traderISIN: '',
        traderTitle: '',
        twoFactor: false,
        userName: '',
    },
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setAppState: (state, action: PayloadAction<typeof initialState.appState>) => {
            state.appState = action.payload;
        },
        setAppUser: (state, action: PayloadAction<UserType>) => {
            state.userData = action.payload;
            state.appState = 'LoggedIn';
        },
    },
});

export const { setAppState, setAppUser } = globalSlice.actions;
export const getUserData = (state: RootState) => state.global.userData;
export const getAppState = (state: RootState) => state.global.appState;

export default globalSlice.reducer;
