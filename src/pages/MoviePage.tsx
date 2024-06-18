import React from 'react';
import {MoviesListComponent} from "../components/movies/MoviesListComponent";
import css from "./movie.page.module.css"


const MoviePage = () => {

    const login = localStorage.getItem('isLoggedIn');

    return (
        <div className={css.movie_page}>

            {login ? <MoviesListComponent/> : (<div>login !!!</div>)}

        </div>
    );
};

export {MoviePage};