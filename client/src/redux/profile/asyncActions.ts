import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile:any = createAsyncThunk('profileData/fetchProfile', async (profileId) => {
    const {data} = await axios.get(`https://reqres.in/api/users?id=${profileId}`)
    return data
})

