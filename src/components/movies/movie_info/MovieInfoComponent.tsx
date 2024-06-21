import React, {FC, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks/redux.type.hooks";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import {posterBaseURL} from "../../../constants/urls";
import css from "../../../styles/movie.info.module.css"
import {useLoading} from "../../../hooks/useLoading";
import {BeatLoader} from "react-spinners";


const MovieInfoComponent: FC = () => {

    //===========================================================================================================

    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(state => state.movies.selectedMovie);
    const status = useAppSelector(state => state.movies.status);
    const navigate = useNavigate();
    const loading = useLoading(status);

    useEffect(() => {
        if (movieId) {
            dispatch(moviesActions.getMovieDetails(movieId));
        }
    }, [dispatch, movieId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (!movie) {
        return <div className={css.load}>
            <p>Loading</p>
            <BeatLoader color="red" loading={loading} size={16}/>
        </div>;
    }

    //===========================================================================================================

    return (
        <div className={css.movie_info}>
            <button onClick={handleBackClick} className={css.backButton}>Back</button>
            <div className={css.movieInfoContainer}>
                <div className={css.h1_poster_Block}>
                    <h1>{movie.title}</h1>
                    <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
                </div>
                <div className={css.movie_info_block}>

                    <p>Release Date - {movie.release_date}</p>
                    <p>{movie.overview}</p>

                </div>
            </div>
        </div>
    );
};

export {MovieInfoComponent};
