import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store";



export interface IBuySellGroup {
    isOpen : boolean
}


const initialState = {
    isOpen : false
}



const BuySellGroupSlice = createSlice({
    name : 'BuySellGroupS' , 
    initialState , 
    reducers : {
        setIsOpenBuySellGroup : (state , action : PayloadAction<boolean>) => {
            state.isOpen = action.payload
        }
    }
})


export const { setIsOpenBuySellGroup } = BuySellGroupSlice.actions;

export const getBuySellGroup = (state : RootState) => state.BuySellGroupSlice;


export default BuySellGroupSlice.reducer;