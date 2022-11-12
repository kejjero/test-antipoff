import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IPartnerApi} from "../../assets/types";
import {PARTNERS_API} from "../../utils/constants";

export const fetchProfile = createAsyncThunk<IPartnerApi, string>('profileData/fetchProfile', async (profileId: string) => {
    const {data} = await axios.get(`${PARTNERS_API}/users?id=${profileId}`)
    return data.data
})
