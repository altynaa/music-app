import {createSlice} from "@reduxjs/toolkit";
import {Track, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {addTrack, deleteTrack, fetchTracks, togglePublished} from "./tracksThunks";

interface TracksState {
    tracks: Track [];
    tracksLoading: boolean;
    trackAdding: boolean;
    trackAddingError: ValidationError | null;
    trackDeleting: boolean;
    trackToggling: boolean;
}

const initialState: TracksState = {
    tracks: [],
    tracksLoading: false,
    trackAdding: false,
    trackAddingError: null,
    trackDeleting: false,
    trackToggling: false
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.tracksLoading = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
            state.tracksLoading = false;
            state.tracks = tracks;
        });
        builder.addCase(fetchTracks.rejected, (state) => {
            state.tracksLoading = false;
        });

        builder.addCase(addTrack.pending, (state) => {
            state.trackAdding = true;
        });
        builder.addCase(addTrack.fulfilled, (state) => {
            state.trackAdding = false;
        });
        builder.addCase(addTrack.rejected, (state, {payload: error}) => {
            state.trackAdding = false;
            state.trackAddingError = error || null
        });

        builder.addCase(deleteTrack.pending, (state) => {
            state.trackDeleting = true;
        });
        builder.addCase(deleteTrack.fulfilled, (state) => {
            state.trackDeleting = false;
        });
        builder.addCase(deleteTrack.rejected, (state) => {
            state.trackDeleting = false;
        });

        builder.addCase(togglePublished.pending, (state) => {
            state.trackToggling = true;
        });
        builder.addCase(togglePublished.fulfilled, (state) => {
            state.trackToggling = false;
        });
        builder.addCase(togglePublished.rejected, (state) => {
            state.trackToggling = false;
        });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
export const selectTrackAdding = (state: RootState) => state.tracks.trackAdding;
export const selectTrackAddingError = (state: RootState) => state.tracks.trackAddingError;
export const selectTrackDeleting = (state: RootState) => state.tracks.trackDeleting;
export const selectTrackToggling = (state: RootState) => state.tracks.trackToggling;