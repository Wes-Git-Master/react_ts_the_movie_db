import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../redux/Store";
import {IMovie} from "../interfaces/IMovie";
import {moviesActions} from "../redux/slices/moviesSlice";
import {posterBaseURL} from "../constants/urls";


const MovieInfoComponent:FC = () => {

    //===========================================================================================================

    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie: IMovie | null = useAppSelector(state => state.movies.selectedMovie);

    useEffect(() => {
        if (movieId) {
            dispatch(moviesActions.getMovieDetails(movieId));
        }
    }, [dispatch, movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    //===========================================================================================================

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
        </div>
    );
};

export {MovieInfoComponent};
