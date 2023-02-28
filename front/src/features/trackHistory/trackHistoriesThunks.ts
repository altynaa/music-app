import {createAsyncThunk} from "@reduxjs/toolkit";
import {HistoryMutation, TrackHistory} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";



export const addTrackHistory = createAsyncThunk<void, HistoryMutation, {state: RootState}>(
    'track_history/add',
    async (track, {getState}) => {
        const user = getState().users.user;

        if (user) {
            console.log(track);
             await axiosApi.post('/track_history', track, {headers: {'Authorization': user.token}});
            // return response.data
            // console.log(user.token);
            // await axiosApi.post('/track_history', {headers: {'Authorization': user.token}});
        }
    }
);

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
