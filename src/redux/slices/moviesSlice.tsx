import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";
import {IMovie} from "../../interfaces/IMovie";
import {IMoviesAxiosResponse} from "../../interfaces/IMoviesAxiosResponse";
import {IGenre} from "../../interfaces/IGenre";

//===========================================================================================================

interface IMoviesState {
    movies: IMovie[],
    selectedMovie: IMovie | null,
    genres: IGenre[],
    genresStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    totalPages: number,
    error: string | null
}

const initialState: IMoviesState = {
    movies: [],
    selectedMovie: null,
    genres: [],
    genresStatus: 'idle',
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

const getGenres = createAsyncThunk(
    'movies/getGenres',
    async (_, thunkAPI) => {
        try {
            const response = await moviesApiService.getGenres();
            return thunkAPI.fulfillWithValue(response.genres);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error);
        }
    }
);
const getPopularMovies = createAsyncThunk(
    'movies/getPopularMovies',
    async (_, thunkAPI) => {
        try {
            const response = await moviesApiService.getPopularMovies();
            return thunkAPI.fulfillWithValue(response.results)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error)
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
            //===========================================================================================================
            .addCase(getGenres.pending, (state) => {
                state.genresStatus = 'loading';
            })
            .addCase(getGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.genresStatus = 'succeeded';
                state.genres = action.payload;
                state.error = null;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.genresStatus = 'failed';
                state.error = action.error.message || 'Failed to fetch genres';
            })
            //===========================================================================================================
            .addCase(getPopularMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPopularMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(getPopularMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch popular movies';
            })
})

export const moviesActions = {
    ...moviesSlice,
    getAllMovies,
    getMovieDetails,
    searchMovies,
    getGenres,
    getPopularMovies
}