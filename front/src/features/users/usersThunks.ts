import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {RegisterResponse, RegistrationMutation, User, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegistrationMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registrationMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registrationMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw (e);
        }
    }
);

