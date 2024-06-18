import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/IMovie";

//===========================================================================================================

interface IMoviesState {
    movies: IMovie[],
    error: string | null,
}

const initialState: IMoviesState = {
    movies: [],
    error: null,
}

//===========================================================================================================

const getAllMovies = createAsyncThunk(
    'movies/getAllMovies',
    async (_, thunkAPI) => {
        try {
            const response = await moviesApiService.getAllMovies();
            return thunkAPI.fulfillWithValue(response.results)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    })

//===========================================================================================================

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder

            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.movies = action.payload
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.error = action.error.message || null
            })
})

export const moviesActions = {
    ...moviesSlice,
    getAllMovies,
}