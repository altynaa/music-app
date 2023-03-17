import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiTrack, GlobalError, Track, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchTracks = createAsyncThunk<Track[], string>(
    'tracks/fetchAll',
     async (id) => {
        const response = await axiosApi.get('/tracks?album=' + id);
        return response.data;
    }
);

export const addTrack = createAsyncThunk<void, ApiTrack, {rejectValue: ValidationError}>(
    'tracks/addTrack',
    async (track, {rejectWithValue}) => {
        try {
            const response  = await axiosApi.post('/tracks', track);
            return response.data.track;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deleteTrack = createAsyncThunk<void, string>(
    'tracks/delete',
    async (id) => {
        try {
            await axiosApi.delete('/tracks/' + id);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 403) {
                return alert(e.response.data.error as GlobalError);
            }
            throw (e);
        }
    }
);

export const togglePublished = createAsyncThunk<void, string>(
    'tracks/toggle',
    async (id) => {
        await axiosApi.patch('/tracks/' + id + '/togglePublished');
    }
);