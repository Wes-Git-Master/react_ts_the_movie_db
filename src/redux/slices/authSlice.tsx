import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';

const apiKEY = '645e762cf37226e58463117ce9c44f05';
const baseURL = 'https://api.themoviedb.org/3';

//===========================================================================================================

interface AuthState {
    user:any
    requestToken: string;
    sessionId: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
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
            const response = await axios.get(`${baseURL}/authentication/token/new?api_key=${apiKEY}`);
            return thunkAPI.fulfillWithValue(response.data.request_token);

        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

//===========================================================================================================

const createSession = createAsyncThunk(
    'auth/createSession',
    async (requestToken: string, thunkAPI) => {
        try {
            const response = await axios.post(`${baseURL}/authentication/session/new?api_key=${apiKEY}`, {
                request_token: requestToken,
            });
            return thunkAPI.fulfillWithValue(response.data.session_id);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

//===========================================================================================================

export const registerUser = createAsyncThunk(   //  todo
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
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.user = 'succeeded';
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
