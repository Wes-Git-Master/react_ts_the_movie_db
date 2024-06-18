import React, {useEffect} from 'react';
import {MoviesListCardComponent} from "./MoviesListCardComponent";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {moviesActions} from "../../redux/slices/moviesSlice";
import css from "./movie.list.module.css"


const MoviesListComponent = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {movies} = useAppSelector(state => state.movies);

    useEffect(() => {

        dispatch(moviesActions.getAllMovies())

    }, [dispatch]);

    //===========================================================================================================

    return (
        <div>
                <div className={css.movieList}>

                {
                    movies.map(movie => <div key={movie.id}><MoviesListCardComponent movie={movie}/></div>)
                }
                </div>
        </div>
    );
};

export {MoviesListComponent};