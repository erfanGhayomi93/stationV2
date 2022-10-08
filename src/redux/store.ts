import { configureStore } from '@reduxjs/toolkit';

// slices
import uiReducer from './slices/ui';
import globalReducer from './slices/global';
import optionReducer from './slices/option';
import keepDataBuySellSlice from "./slices/keepDataBuySell"

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        global: globalReducer,
        option: optionReducer,
        keepDataBuySellSlice : keepDataBuySellSlice 
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
