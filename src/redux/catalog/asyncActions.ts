import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IApi} from "../../assets/types";
import {PARTNERS_API} from "../../utils/constants";

export const fetchTeam = createAsyncThunk<IApi, string>('teamData/fetchTeam', async (filterRequest: string) => {
    const {data}: IApi = await axios.get(`${PARTNERS_API}/users?${filterRequest}`)
    return data
})

