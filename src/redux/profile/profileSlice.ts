import {createSlice} from "@reduxjs/toolkit"
import {fetchProfile} from "./asyncActions"
import {initialStateProfile} from "./types"
import {RootState} from "../store"
import {CLEAR_PROFILE} from "../../utils/constants";

const initialState: initialStateProfile = {
    profile: CLEAR_PROFILE,
    statusProfile: 'loading',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state) => {
            state.profile = CLEAR_PROFILE;
            state.statusProfile = 'loading';
        });

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.profile = action.payload.data;
            state.statusProfile = 'success'
        });

        builder.addCase(fetchProfile.rejected, (state) => {
            state.profile = CLEAR_PROFILE;
            state.statusProfile = 'error'
        });
    },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
export const selectProfile = (state: RootState) => state.profileReducer