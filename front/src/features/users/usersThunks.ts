import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {GlobalError, LoginMutation, UserResponse, RegistrationMutation, User, ValidationError} from "../../types";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegistrationMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registrationMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<UserResponse>('/users', registrationMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw (e);
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<UserResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw (e);
        }
    }
);
