import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {fetchTeam} from "./asyncActions"
import {initialStateCatalog} from "./types"
import {RootState} from "../store"
import {getFavoritePartners} from "../../utils/getFavoritePartners";
import {IApi, IPartner, IPartnerApi} from "../../assets/types";

const initialState: initialStateCatalog = {
    partners: [],
    favoritePartners: getFavoritePartners(),
    statusTeam: 'loading',
    currentPage: 1,
    totalPages: 1,
}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        postFavoritePartner(state, action: PayloadAction<IPartner>) {
            state.favoritePartners = [...state.favoritePartners, action.payload]
        },
        deleteFavoritePartner(state, action: PayloadAction<IPartner>) {
            state.favoritePartners = action.payload
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

        builder.addCase(fetchTeam.fulfilled, (state,{payload}: PayloadAction<IApi>) => {
            state.partners = payload.data.map((item: IPartnerApi) => (
                {
                    id: item.id,
                    firstName: item.first_name,
                    lastName: item.last_name,
                    avatar: item.avatar,
                    email: item.email
                }
            ))
            state.totalPages = payload.total_pages;
            state.currentPage = payload.page;
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