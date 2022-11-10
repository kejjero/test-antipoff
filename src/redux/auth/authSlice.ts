import {createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {initialStateForm} from "./types";
import {CLEAR_USER} from "../../utils/constants";

const initialState: initialStateForm = {
    eyeStatus: false,
    isLoggedIn: false,
    user: CLEAR_USER,
    isLoading: false,
    errorPopup: {
        status: false,
        text: '',
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEyeStatus(state) {
            state.eyeStatus = !state.eyeStatus
        },
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setErrorPopup(state, action) {
            state.errorPopup = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        }
    },
});

export const {setEyeStatus, setIsLoggedIn, setUser, setErrorPopup, setIsLoading} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.authReducer