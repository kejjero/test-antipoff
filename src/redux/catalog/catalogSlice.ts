import {createSlice} from "@reduxjs/toolkit"
import {fetchTeam} from "./asyncActions"
import {initialStateCatalog} from "./types"
import {RootState} from "../store"

const initialState: initialStateCatalog = {
    team: [],
    statusTeam: 'loading',
    currentPage: 1,
    totalPages: 3,
}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTeam.pending, (state) => {
            state.team = [];
            state.statusTeam = 'loading';
        });

        builder.addCase(fetchTeam.fulfilled, (state, action) => {
            state.team = action.payload.data;
            state.totalPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
            state.statusTeam = 'success'
        });

        builder.addCase(fetchTeam.rejected, (state) => {
            state.statusTeam = 'error'
            state.team = [];
        });
    },
});

export const {setCurrentPage} = catalogSlice.actions;
export default catalogSlice.reducer;
export const selectCatalog = (state: RootState) => state.catalogReducer