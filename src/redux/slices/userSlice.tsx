import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/IUser";
import userApiService from "../../services/user.api.service";
import {AxiosError} from "axios";

interface IUserState {
    userInfo: IUser | null,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null
}

const initialState: IUserState = {
    userInfo: null,
    status: "idle",
    error: null
};

const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async (sessionId: string | null, thunkAPI) => {
        try {
            const response = await userApiService.getUserInfo(sessionId)
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error)
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.userInfo = action.payload
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message || null
            });
    },
});

export const userActions = {
    ...userSlice,
    getUserInfo
}
