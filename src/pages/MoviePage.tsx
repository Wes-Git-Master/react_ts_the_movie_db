import React from 'react';
import {MoviesListComponent} from "../components/movies/movies_list/MoviesListComponent";
import css from "../styles/movie.page.module.css"
import {LoginComponent} from "../components/login/LoginComponent";


const MoviePage = () => {

    const login = localStorage.getItem('isLoggedIn');

    return (
        <div className={css.movie_page}>

            {login ? <MoviesListComponent/> : <LoginComponent/>}

        </div>
    );
};

export {MoviePage};