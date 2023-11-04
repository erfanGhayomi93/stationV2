import { configureStore } from '@reduxjs/toolkit';

// slices
import globalReducer from './slices/global';
import keepDataBuySellSlice from './slices/keepDataBuySell';
import optionReducer from './slices/option';
import uiReducer from './slices/ui';
import platformSetting from './slices/platformSetting';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        global: globalReducer,
        option: optionReducer,
        keepDataBuySellSlice: keepDataBuySellSlice,
        platformSetting: platformSetting
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
