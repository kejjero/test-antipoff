import {createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {initialStateBase} from "./types"

const initialState: initialStateBase = {
    activeBase: true,
}

const baseSlice = createSlice({
    name: 'base',
    initialState,
    reducers: {
        setChangeBase(state, action) {
            state.activeBase = action.payload
        },
    },
});

export const {setChangeBase} = baseSlice.actions;
export default baseSlice.reducer;
export const selectBase = (state: RootState) => state.baseReducer