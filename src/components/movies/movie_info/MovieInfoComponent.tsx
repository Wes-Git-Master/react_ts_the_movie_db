import React, {FC, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../redux/Store";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import {posterBaseURL} from "../../../constants/urls";
import css from "../../../styles/movie.info.module.css"
import {IMovie} from "../../../interfaces/IMovie";


const MovieInfoComponent: FC = () => {

    //===========================================================================================================

    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(state => state.movies.selectedMovie);
    const navigate = useNavigate();

    useEffect(() => {
        if (movieId) {
            dispatch(moviesActions.getMovieDetails(movieId));
        }
    }, [dispatch, movieId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    //===========================================================================================================

    return (
        <div>
            <button onClick={handleBackClick} className={css.backButton}>Back</button>
            <div className={css.movieInfoContainer}>
                <div>
                    <h1>{movie.title}</h1>
                    <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
                </div>
                <div className={css.movie_overview}>
                    <p>{movie.overview}</p>
                </div>

            </div>
        </div>
    );
};

export {MovieInfoComponent};
