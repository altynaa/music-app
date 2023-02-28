import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackHistory} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";

export const fetchTrackHistory = createAsyncThunk<TrackHistory [], void, {state: RootState}>(
    'track_history/fetchAll',
    async (_, {getState}) => {
        const user = getState().users.user;

        if (user) {
            const response = await axiosApi.get('/track_history', {headers: {'Authorization': user.token}});
            return response.data;
        } else {
            throw new Error('No user');
        }
    }
);