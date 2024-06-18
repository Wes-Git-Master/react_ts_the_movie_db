import React from 'react';
import {MoviesListComponent} from "../components/movies/MoviesListComponent";
import css from "./movie.page.module.css"
import {useAppSelector} from "../redux/Store";


const MoviePage = () => {

    const {status} = useAppSelector(state => state.auth);

    return (
        <div className={css.movie_page}>

            {status === 'succeeded' ? <MoviesListComponent/> : (<div>login !!!</div>)}

        </div>
    );
};

export {MoviePage};