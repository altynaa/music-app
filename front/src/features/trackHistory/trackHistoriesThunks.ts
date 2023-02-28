import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, HistoryMutation, TrackHistory} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const addTrackHistory = createAsyncThunk<void, HistoryMutation, {state: RootState, rejectValue: GlobalError}>(
    'track_history/add',
    async (track, {getState, rejectWithValue}) => {
        try {
            const user = getState().users.user;
            if (user) {
                await axiosApi.post('/track_history', track, {headers: {'Authorization': user.token}});
            }
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            } throw (e);
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
