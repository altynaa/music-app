import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiArtist, Artist} from "../../types";

export const fetchArtists = createAsyncThunk<Artist []>(
    'artists/fetchAll',
    async () => {
        const response = await axiosApi.get('/artists');
        return response.data
    }
);

export const fetchOneArtist = createAsyncThunk<Artist, string>(
    'artists/fetchOneArtist',
    async (id) => {
        const response = await axiosApi.get('/artists/' + id);
        return response.data
    }
);

export const addArtist = createAsyncThunk<void, ApiArtist>(
    'artists/addArtist',
    async (artist) => {
        const formData = new FormData();
        const keys = Object.keys(artist) as (keyof ApiArtist)[];
        keys.forEach(key => {
            const value = artist[key];

            if (value != null) {
                formData.append(key, value);
            }
        })

        await axiosApi.post('/artists', formData);
    }
);

export const deleteArtist = createAsyncThunk<void, string>(
    'artists/delete',
    async (id) => {
        await axiosApi.delete('/artists/' + id);
    }
);

export const togglePublished = createAsyncThunk<void, string>(
    'artists/toggle',
    async (id) => {
        await axiosApi.patch('/artists/' + id + '/togglePublished');
    }
);