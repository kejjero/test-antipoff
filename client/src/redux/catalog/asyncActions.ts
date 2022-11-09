import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeam:any = createAsyncThunk('teamData/fetchTeam', async (filterRequest) => {
    const {data} = await axios.get(`https://reqres.in/api/users?${filterRequest}`)
    return data
})

