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
    homeLayout: 'ltr' | 'rtl'
}

const initialState: UiState = {
    theme: getAndSetThemeOnLoad(),
    homeLayout: 'rtl'
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
        toggleHomeLayout: (state, action: PayloadAction<typeof initialState.homeLayout>) => {
            state.homeLayout = action.payload
        }
    },
});

export const { setAppTheme, toggleHomeLayout } = uiSlice.actions;

export default uiSlice.reducer;

export const getTheme = (state : RootState) => state.ui.theme
export const getHomeLayout = (state : RootState) => state.ui.homeLayout
