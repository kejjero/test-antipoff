import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeam = createAsyncThunk('teamData/fetchTeam', async (filterRequest) => {
    const {data} = await axios.get(`https://reqres.in/api/users?${filterRequest}`)
    return data
})

