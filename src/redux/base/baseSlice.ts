import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {initialStateBase} from "./types"

const initialState: initialStateBase = {
    activeBase: true,
    width: 1280,
}

const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setChangeBase(state, action: PayloadAction<boolean>) {
            state.activeBase = action.payload
        },
        getCurrentWidth(state, action: PayloadAction<number>) {
            state.width = action.payload
        }
    },
});

export const {setChangeBase, getCurrentWidth} = baseSlice.actions;
export default baseSlice.reducer;
export const selectBase = (state: RootState) => state.baseReducer
export const selectWidth = (state: RootState) => state.baseReducer.width