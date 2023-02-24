import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Album} from "../../types";

export const fetchAlbums = createAsyncThunk<Album [], string>(
    'albums/fetchAll',
    async (id) => {
        const response = await axiosApi.get('/albums?artist=' + id);
        return response.data;
    }
);