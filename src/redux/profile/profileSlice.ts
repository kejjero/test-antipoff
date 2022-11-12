import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchProfile} from "./asyncActions"
import {initialStateProfile} from "./types"
import {RootState} from "../store"
import {CLEAR_PROFILE} from "../../utils/constants";
import {IPartnerApi} from "../../assets/types";

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
        builder.addCase(fetchProfile.fulfilled, (state, {payload}: PayloadAction<IPartnerApi>) => {
            state.profile = {
                id: payload.id,
                firstName: payload.first_name,
                lastName: payload.last_name,
                avatar: payload.avatar,
                email: payload.email
            }
            state.statusProfile = 'success'
        });
        builder.addCase(fetchProfile.rejected, (state) => {
            state.profile = CLEAR_PROFILE;
            state.statusProfile = 'error'
        });
    },
});

export default profileSlice.reducer;
export const selectProfile = (state: RootState) => state.profileReducer