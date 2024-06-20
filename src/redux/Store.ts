import {configureStore} from "@reduxjs/toolkit";
import {authActions} from "./slices/authSlice";
import {moviesActions} from "./slices/moviesSlice";

export const store = configureStore({
    reducer: {
        auth: authActions.reducer,
        movies: moviesActions.reducer
    }
})

