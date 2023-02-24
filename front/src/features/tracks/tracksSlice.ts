import {Track} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTracks} from "./tracksThunks";

interface TracksState {
    tracks: Track [],
    tracksLoading: boolean
}

const initialState: TracksState = {
    tracks: [],
    tracksLoading: false
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
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.tracksLoading;