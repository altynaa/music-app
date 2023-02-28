import {TrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchTrackHistory} from "./trackHistoriesThunks";

interface TrackHistoriesState {
    tracksHist: TrackHistory [];
    tracksHistLoading: boolean;
}

const initialState: TrackHistoriesState = {
    tracksHist: [],
    tracksHistLoading: false
};

export const trackHistoriesSlice = createSlice({
    name: 'trackHistories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTrackHistory.pending, (state) => {
            state.tracksHistLoading = true;
        });
        builder.addCase(fetchTrackHistory.fulfilled, (state, {payload: trackHistory}) => {
            state.tracksHistLoading = false;
            state.tracksHist = trackHistory;
        });
        builder.addCase(fetchTrackHistory.rejected, (state) => {
            state.tracksHistLoading = false;
        });
    }
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;

export const selectTrackHistories = (state: RootState) => state.tracksHistories.tracksHist;
export const selectTracksHistLoading = (state: RootState) => state.tracksHistories.tracksHistLoading;