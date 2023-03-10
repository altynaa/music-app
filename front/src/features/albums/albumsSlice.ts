import {Album, ValidationError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {addAlbum, fetchAlbums, fetchOneAlbum} from "./albumsThunks";

interface AlbumsState {
    albums: Album [];
    albumsLoading: boolean;
    album: Album;
    albumLoading: boolean;
    albumAdding: boolean;
    albumError: ValidationError | null
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
    albumLoading: false,
    albumAdding: false,
    albumError: null
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

        builder.addCase(addAlbum.pending, (state) => {
            state.albumAdding = true;
        });
        builder.addCase(addAlbum.fulfilled, (state) => {
            state.albumAdding = false;
        });
        builder.addCase(addAlbum.rejected, (state, {payload: error}) => {
            state.albumAdding = false;
            state.albumError = error || null;
        });
    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;
export const selectOneAlbum = (state: RootState) => state.albums.album;
export const selectAlbumAdding = (state: RootState) => state.albums.albumAdding;
export const selectAlbumError = (state: RootState) => state.albums.albumError;