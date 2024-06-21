import React, {FC, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks/redux.type.hooks";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import {posterBaseURL} from "../../../constants/urls";
import {useLoading} from "../../../hooks/useLoading";
import {BeatLoader} from "react-spinners";
import css from "../../../styles/movie.info.module.css"
import css_common from "../../../styles/css_common/button.module.css"


const MovieInfoComponent: FC = () => {

    //===========================================================================================================

    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(state => state.movies.selectedMovie);
    const status = useAppSelector(state => state.movies.status);
    const genresStatus = useAppSelector(state => state.movies.genresStatus);
    const navigate = useNavigate();
    const loading = useLoading(status);

    useEffect(() => {
        if (movieId) {
            dispatch(moviesActions.getMovieDetails(movieId));
        }
        if (genresStatus === 'idle') {
            dispatch(moviesActions.getGenres());
        }
    }, [dispatch, movieId, genresStatus]);

    const handleBackClick = () => {
        navigate(-1);
    };


    if (!movie || genresStatus === 'loading') {
        return <div className={css.loading}>
            <p>Loading</p>
            <BeatLoader color="red" loading={loading} size={16}/>
        </div>;
    }


    //===========================================================================================================

    return (
        <div className={css.movie_Info_Page}>
            <button onClick={handleBackClick} className={css_common.generalButton}>Back</button>

            <div className={css.movie_Info_Container}>
                <div className={css.poster_Block}>
                    <h1>{movie.title}</h1>
                    <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
                </div>

                <div className={css.movie_Info_Container_right}>
                    Genres <div>{movie.genres?.map(genre => <div key={genre.id}>{genre.name}</div>)}</div>
                    <p>Release Date - {movie.release_date}</p>
                    <p>Rating - {movie.vote_average}</p>
                    <p>Vote count - {movie.vote_count}</p>
                    <p>Original Language - {movie.original_language}</p>
                    <p>Popularity - {movie.popularity}</p>
                    <p>Overview : <br/>{movie.overview}</p>
                </div>
            </div>

        </div>
    );
};

export {MovieInfoComponent};
