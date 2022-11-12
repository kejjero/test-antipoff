import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store"
import {initialStateForm, popupType, userType} from "./types";
import {CLEAR_USER} from "../../utils/constants";

const initialState: initialStateForm = {
    eyeStatus: false,
    isLoggedIn: false,
    userProfile: CLEAR_USER,
    isLoading: false,
    isRegistration: false,
    errorPopup: {
        status: false,
        text: "Что-то пошло не так :("
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEyeStatus(state) {
            state.eyeStatus = !state.eyeStatus
        },
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload
        },
        setUser(state, action: PayloadAction<userType>) {
            state.userProfile = action.payload
        },
        setErrorPopup(state, action: PayloadAction<popupType>) {
            state.errorPopup = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
    },
});

export const {setEyeStatus, setIsLoggedIn, setUser, setErrorPopup, setIsLoading} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.authReducer

