import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TFreezeUnFreezeProps {
isOpen : boolean;
}

export interface IModalReducer {
    FreezeUnFreeze : TFreezeUnFreezeProps
}

const initialState : IModalReducer = {
    FreezeUnFreeze : {
        isOpen : false
    }
}


const ModalReducer = createSlice({
    name : 'ModalReducer' , 
    initialState , 
    reducers : {
        freezeUnfreezeAction : (state , action : PayloadAction<TFreezeUnFreezeProps>) => {
            state.FreezeUnFreeze = action.payload
        }
    }
})

export const { freezeUnfreezeAction } = ModalReducer.actions;
export const freezeUnfreezeRedux = (state : RootState) => state.ModalReducer.FreezeUnFreeze;

export default ModalReducer.reducer;