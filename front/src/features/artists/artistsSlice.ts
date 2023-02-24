import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchArtists} from "./artistsThunks";

interface ArtistsState {
    artists: Artist [],
    artistsLoading: boolean,
}
const initialState: ArtistsState = {
    artists: [],
    artistsLoading: false
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.pending, (state) => {
            state.artistsLoading = true;
        });
        builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
            state.artists = artists;
            state.artistsLoading = false;
        });
        builder.addCase(fetchArtists.rejected, (state) => {
            state.artistsLoading = false;
        });
    }

});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
