import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from "./catalog/catalogSlice"
import baseReducer from "./base/baseSlice"
import profileReducer from "./profile/profileSlice"
import authReducer from "./auth/authSlice"

export const store = configureStore({
    reducer: {
        baseReducer,
        catalogReducer,
        profileReducer,
        authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// export const appDispatch = () => useDispatch<AppDispatch>();