import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import ls from 'localstorage-slim';
import { RootState } from '../store';

const getAndSetThemeOnLoad = (): 'light' | 'dark' => {
    //
    const defaultTheme = 'light';
    const browserTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    let toReturn: any = defaultTheme;

    try {
        const localStorageTheme: any = ls.get('ActiveTheme');
        toReturn = ['light', 'dark'].includes(localStorageTheme) ? localStorageTheme : browserTheme;
    } catch (error) {
        toReturn = browserTheme;
    }

    document.body.classList.add(toReturn);
    return toReturn;
};

interface UiState {
    theme: 'dark' | 'light';
}

const initialState: UiState = {
    theme: getAndSetThemeOnLoad(),
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAppTheme: (state, action: PayloadAction<typeof initialState.theme>) => {
            ls.set('ActiveTheme', action.payload);
            document.body.classList.add(action.payload);
            document.body.classList.remove(action.payload === 'dark' ? 'light' : 'dark');
            state.theme = action.payload;
        },
    },
});

export const { setAppTheme } = uiSlice.actions;

export default uiSlice.reducer;

export const getTheme = (state : RootState) => state.ui.theme
