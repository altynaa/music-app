import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Album, ApiAlbum, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const fetchAlbums = createAsyncThunk<Album [], string | undefined>(
    'albums/fetchAll',
    async (id) => {
        if (id) {
            const response = await axiosApi.get('/albums?artist=' + id);
            return response.data;
        } else {
            const response = await axiosApi.get('/albums');
            return response.data;
        }
    }
);

export const fetchOneAlbum = createAsyncThunk<Album, string>(
    'albums/fetchOneAlbum',
    async (id) => {
        const response = await axiosApi.get('/albums/' + id);
        return response.data;
    }
);

export const addAlbum = createAsyncThunk<void, ApiAlbum, {rejectValue: ValidationError}>(
    'albums/addAlbum',
    async (album, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(album) as (keyof ApiAlbum)[];

            keys.forEach(key => {
                const value = album[key];

                if (value != null) {
                    formData.append(key, value);
                }
            });

            const response = await axiosApi.post('/albums', formData);
            return response.data.album;

        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const deleteAlbum = createAsyncThunk<void, string>(
    'albums/delete',
    async (id) => {
        await axiosApi.delete('/albums/' + id);
    }
);

export const togglePublished = createAsyncThunk<void, string>(
    'albums/toggle',
    async (id) => {
        await axiosApi.patch('/albums/' + id + '/togglePublished');
    }
);