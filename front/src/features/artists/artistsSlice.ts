import {createSlice} from "@reduxjs/toolkit";
import {Artist} from "../../types";
import {RootState} from "../../app/store";
import {addArtist, fetchArtists, fetchOneArtist} from "./artistsThunks";

interface ArtistsState {
    artists: Artist [];
    artistsLoading: boolean;
    oneArtistLoading: boolean;
    oneArtist: Artist;
    artistAdding: boolean;
}
const initialState: ArtistsState = {
    artists: [],
    artistsLoading: false,
    oneArtistLoading: false,
    oneArtist: {
        _id: '',
        name: '',
        information: '',
        image: ''
    },
    artistAdding: false
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

        builder.addCase(fetchOneArtist.pending, (state) => {
            state.oneArtistLoading = true;
        });
        builder.addCase(fetchOneArtist.fulfilled, (state, {payload: artist}) => {
            state.oneArtistLoading = false;
            state.oneArtist = artist;
        });
        builder.addCase(fetchOneArtist.rejected, (state) => {
            state.artistsLoading = false;
        });

        builder.addCase(addArtist.pending, (state) => {
            state.artistAdding = true;
        });
        builder.addCase(addArtist.fulfilled, (state) => {
            state.artistAdding = false;
        });
        builder.addCase(addArtist.rejected, (state) => {
            state.artistAdding = false;
        });
    }

});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
export const selectOneArtist = (state: RootState) => state.artists.oneArtist;
export const selectArtistAdding = (state: RootState) => state.artists.artistAdding;

