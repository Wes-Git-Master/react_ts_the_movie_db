import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/IMovie";
import {IMoviesAxiosResponse} from "../../interfaces/IMoviesAxiosResponse";

//===========================================================================================================

interface IMoviesState {
    movies: IMovie[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    totalPages: number
}

const initialState: IMoviesState = {
    movies: [],
    status: 'idle',
    error: null,
    totalPages: 1
}

//===========================================================================================================

const getAllMovies = createAsyncThunk(
    'movies/getAllMovies',
    async (page:string, thunkAPI) => {
        try {
            const response:IMoviesAxiosResponse = await moviesApiService.getAllMovies(page);
            return thunkAPI.fulfillWithValue(response)
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
            .addCase(getAllMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.movies = action.payload.results
                state.totalPages = action.payload.total_pages

            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || null
            })
})

export const moviesActions = {
    ...moviesSlice,
    getAllMovies,
}