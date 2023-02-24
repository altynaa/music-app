import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbums} from "./albumsThunks";

interface AlbumsState {
    albums: Album [],
    albumsLoading: boolean
}

const initialState: AlbumsState = {
    albums: [],
    albumsLoading: false
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.pending, (state) => {
            state.albumsLoading = true;
        });
        builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
            state.albums = albums;
            state.albumsLoading = false;
        });
        builder.addCase(fetchAlbums.rejected, (state) => {
            state.albumsLoading = false;
        })
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;