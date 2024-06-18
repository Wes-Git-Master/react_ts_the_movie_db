import React from 'react';
import {MoviesListComponent} from "../components/movies/MoviesListComponent";
import css from "./movie.page.module.css"


const MoviePage = () => {

    return (
        <div className={css.movie_page}>
            <MoviesListComponent/>
        </div>
    );
};

export {MoviePage};