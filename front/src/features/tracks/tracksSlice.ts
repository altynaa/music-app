import {createSlice} from "@reduxjs/toolkit";
import {Track, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import {addTrack, fetchTracks} from "./tracksThunks";

interface TracksState {
    tracks: Track [];
    tracksLoading: boolean;
    trackAdding: boolean;
    trackAddingError: ValidationError | null;
}

const initialState: TracksState = {
    tracks: [],
    tracksLoading: false,
    trackAdding: false,
    trackAddingError: null
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
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;
export const selectTrackAdding = (state: RootState) => state.tracks.trackAdding;
export const selectTrackAddingError = (state: RootState) => state.tracks.trackAddingError;