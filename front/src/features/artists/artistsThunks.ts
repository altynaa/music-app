import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Artist} from "../../types";

export const fetchArtists = createAsyncThunk<Artist []>(
    'artists/fetchAll',
    async () => {
        const response = await axiosApi.get('/artists');
        return response.data
    }
);

