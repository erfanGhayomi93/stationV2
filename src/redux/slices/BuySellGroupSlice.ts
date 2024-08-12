import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../store";



export interface IBuySellGroup {
    isOpen : boolean , 
    mode : 'EDIT' | 'DELETE'
}


const initialState : IBuySellGroup = {
    isOpen : false , 
    mode : "EDIT"
}



const BuySellGroupSlice = createSlice({
    name : 'BuySellGroup' , 
    initialState , 
    reducers : {
        setIsOpenBuySellGroup : (state , action : PayloadAction<IBuySellGroup> ) => {
            state.isOpen = action.payload.isOpen;
            state.mode = action.payload.mode;
        }
    }
})


export const { setIsOpenBuySellGroup } = BuySellGroupSlice.actions;

export const getBuySellGroup = (state : RootState) => state.BuySellGroupSlice;


export default BuySellGroupSlice.reducer;