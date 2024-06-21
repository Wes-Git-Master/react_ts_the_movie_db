import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {authApiService} from "../../services/auth.api.service";

//===========================================================================================================

interface IAuthState {
    requestToken: string;
    sessionId: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: IAuthState = {
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
            const response = await authApiService.getToken();
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
            const response = await authApiService.createNewSession(requestToken)
            return thunkAPI.fulfillWithValue(response.sessionId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    });

//===========================================================================================================

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state) {
            state.status = 'succeeded';
        }
    },
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

    },
});


export const authActions = {
    ...authSlice,
    getRequestToken,
    createSession,
}
