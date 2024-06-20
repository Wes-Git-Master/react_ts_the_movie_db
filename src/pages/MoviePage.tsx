import React from 'react';
import {MoviesListComponent} from "../components/movies/movies_list/MoviesListComponent";
import css from "../styles/movie.page.module.css"


const MoviePage = () => {

    const login = localStorage.getItem('isLoggedIn');

    return (
        <div className={css.movie_page}>

            {login ? <MoviesListComponent/> : (<div>login !!!</div>)}

        </div>
    );
};

export {MoviePage};