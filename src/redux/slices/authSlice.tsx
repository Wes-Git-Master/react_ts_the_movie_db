import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {apiKEY, baseURL} from "../../constants/urls";
import {authService} from "../../services/auth.service";

//===========================================================================================================

interface AuthState {
    requestToken: string;
    sessionId: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    requestToken: '',
    sessionId: '',
    status: 'idle',
    error: null,
};

//===========================================================================================================

const getRequestToken = createAsyncThunk(
    'auth/getRequestToken',
    async (_, thunkAPI) => {
        try {
            const response = await authService.getToken();
            return thunkAPI.fulfillWithValue(response.request_token);

        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

const createSession = createAsyncThunk(
    'auth/createSession',
    async (requestToken: string, thunkAPI) => {
        try {
            const response = await authService.createNewSession(requestToken)
            return thunkAPI.fulfillWithValue(response.sessionId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: { username: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post(`${baseURL}/register`, {
                username: userData.username,
                password: userData.password,
                api_key: apiKEY
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

//===========================================================================================================

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRequestToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getRequestToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requestToken = action.payload;
            })
            .addCase(getRequestToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            //===========================================================================================================
            .addCase(createSession.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sessionId = action.payload;
            })
            .addCase(createSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            //===========================================================================================================
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
    },
});


export const authActions = {
    ...authSlice,
    getRequestToken,
    createSession,
    registerUser
}
