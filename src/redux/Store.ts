import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./slices/authSlice";
import {moviesActions} from "./slices/moviesSlice";

export const store = configureStore({
    reducer: {
        auth: authActions.reducer,
        movies: moviesActions.reducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();