import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/IMovie";
import {IMoviesAxiosResponse} from "../../interfaces/IMoviesAxiosResponse";

//===========================================================================================================

interface IMoviesState {
    movies: IMovie[],
    selectedMovie: IMovie | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    totalPages: number,
    error: string | null
}

const initialState: IMoviesState = {
    movies: [],
    selectedMovie: null,
    status: 'idle',
    totalPages: 1,
    error: null
}

//===========================================================================================================

const getAllMovies = createAsyncThunk(
    'movies/getAllMovies',
    async ({page, genreId}: { page: string, genreId?: string }, thunkAPI) => {
        try {
            const response = await moviesApiService.getAllMovies(page, genreId);
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    })

const getMovieDetails = createAsyncThunk(
    'movies/getMovieDetails',
    async (movieId: string, thunkAPI) => {
        try {
            const response = await moviesApiService.getSingleMovieDetails(movieId);
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
        }
    }
);

const searchMovies = createAsyncThunk(
    'movies/searchMovies',
    async ({query, page}: { query: string, page: string }, thunkAPI) => {
        try {
            const response = await moviesApiService.searchMovies(query, page);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//===========================================================================================================

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllMovies.pending, (state) => {
                state.status = 'loading'
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
            //===========================================================================================================
            .addCase(getMovieDetails.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getMovieDetails.fulfilled, (state, action: PayloadAction<IMovie>) => {
                state.status = 'succeeded'
                state.selectedMovie = action.payload
            })
            .addCase(getMovieDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to show movie details';
            })
            //===========================================================================================================
            .addCase(searchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMovies.fulfilled, (state, action: PayloadAction<IMoviesAxiosResponse>) => {
                state.status = 'succeeded';
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.error = null;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to search movies';
            })
})

export const moviesActions = {
    ...moviesSlice,
    getAllMovies,
    getMovieDetails,
    searchMovies
}