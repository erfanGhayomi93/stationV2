import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState: PlatformSettingResultTypes = {
    userId: 0,
    theme: '',
    layoutId: 0,
    hotKeyEnabled: false,
    openBuyWindowHotKey: '',
    openSellWindoHotKey: '',
    symbolSearchHotKey: '',
    showPortfolioWindowHotKey: '',
    depositHotKey: '',
    withdrawHotKey: '',
    settingsHotKey: '',
    sendOrderHotKey: '',
    defaultBuyVolume: '',
    defaultSellVolume: '',
    confirmBeforeOrderDelete: true,
    surveillanceMessages: false,
    confirmBeforeSendingOrder: false,
    bestPriceFromTopOrder: false,
    symbolInfoOnSendOrder: false,
    showOrderSplit: true,
    plusKeyBehaviorOn: false,
    multipleOrderModal: false,
    showIntroGuideOnLogin: false,
    alertType: '',
    alertPosition: '',
}

const platformSettingSlice = createSlice({
    name: 'platformSlice',
    initialState,
    reducers: {
        updatePlatformSetting: (state, action: PayloadAction<Partial<typeof initialState>>) => {
            Object.assign(state, action.payload);
        }
    },
})

export const {
    updatePlatformSetting
} = platformSettingSlice.actions

export const getPlatformSettings = (state: RootState) => state.platformSetting;

export default platformSettingSlice.reducer