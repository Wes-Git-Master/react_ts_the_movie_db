import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks/redux.type.hooks";
import {useNavigate} from 'react-router-dom';
import {moviesActions} from "../redux/slices/moviesSlice";
import {MovieCardComponent} from "../components/movies/movie_card/MovieCardComponent";
import css from '../styles/home.module.css';
import css_common from "../styles/css_common/button.module.css";

const HomePage = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {movies, status}
        = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(moviesActions.getPopularMovies());
    }, [dispatch]);

    const handleNavigateToMovies = () => {
        navigate('/moviesList');
    };

    return (
        <div className={css.homePage}>
            <h1 className={css.welcome}>Welcome to Movie Database</h1>
            <p className={css.description}>
                Discover the latest movies, find your favorite genres, and explore new releases. Start your cinematic
                journey now!
            </p>
            <button onClick={handleNavigateToMovies} className={css_common.generalButton}>
                Explore
            </button>
            <h2 className={css.popularMoviesHeading}>Popular Movies</h2>
            <div className={css.popularMovies}>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (
                    movies.slice(0, 10).map(movie => (
                        <MovieCardComponent key={movie.id} movie={movie}/>
                    ))
                )}
            </div>
        </div>
    );
};

export {HomePage};
