import {createSlice} from "@reduxjs/toolkit"
import {fetchTeam} from "./asyncActions"
import {initialStateCatalog} from "./types"
import {RootState} from "../store"
import {getFavoritePartners} from "../../utils/getFavoritePartners";

const initialState: initialStateCatalog = {
    partners: [],
    favoritePartners: getFavoritePartners(),
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
        postFavoritePartner(state, actions) {
            state.favoritePartners = [...state.favoritePartners, actions.payload]
        },
        deleteFavoritePartner(state, actions) {
            state.favoritePartners = actions.payload
        },
        resetFavorites(state) {
            state.favoritePartners = []
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTeam.pending, (state) => {
            state.partners = [];
            state.statusTeam = 'loading';
        });

        builder.addCase(fetchTeam.fulfilled, (state, action) => {
            state.partners = action.payload.data;
            state.totalPages = action.payload.total_pages;
            state.currentPage = action.payload.page;
            state.statusTeam = 'success'
        });

        builder.addCase(fetchTeam.rejected, (state) => {
            state.statusTeam = 'error'
            state.partners = [];
        });
    },
});

export const {setCurrentPage, postFavoritePartner, deleteFavoritePartner, resetFavorites} = catalogSlice.actions;
export default catalogSlice.reducer;
export const selectCatalog = (state: RootState) => state.catalogReducer