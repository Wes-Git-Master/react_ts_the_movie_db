import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/IMovie";

//===========================================================================================================

interface IMoviesState {
    movies: IMovie[],
    poster: string | null
    error: string | null
}

const initialState: IMoviesState = {
    movies: [],
    poster: null,
    error: null
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

const getMoviePoster = createAsyncThunk(
    'movies/getMoviePoster',
    async (poster_path: string, thunkAPI) => {
        try {
            const poster = await moviesApiService.getPoster(poster_path);
            return thunkAPI.fulfillWithValue(poster)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    })


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
            .addCase(getMoviePoster.fulfilled, (state, action) => {
                state.poster = action.payload
            })
})

export const moviesActions = {
    ...moviesSlice,
    getAllMovies,
    getMoviePoster
}