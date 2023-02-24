import {Album} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchAlbums, fetchOneAlbum} from "./albumsThunks";

interface AlbumsState {
    albums: Album [],
    albumsLoading: boolean,
    album: Album;
    albumLoading: boolean
}

const initialState: AlbumsState = {
    albums: [],
    albumsLoading: false,
    album: {
        _id: '',
        title: '',
        artist: {
            _id: '',
            name: '',
            information: '',
            image: ''
        },
        releasedAt: 0,
        image: ''
    },
    albumLoading: false
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
        });

        builder.addCase(fetchOneAlbum.pending, (state) => {
            state.albumLoading = true
        });
        builder.addCase(fetchOneAlbum.fulfilled, (state, {payload: album}) => {
            state.albumLoading = false;
            state.album = album
        });
        builder.addCase(fetchOneAlbum.rejected, (state) => {
            state.albumLoading = false;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;
export const selectOneAlbum = (state: RootState) => state.albums.album;