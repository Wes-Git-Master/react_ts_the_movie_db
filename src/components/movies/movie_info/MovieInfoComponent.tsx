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
        return <div className={css.loading}>
            <p>Loading</p>
            <BeatLoader color="red" loading={loading} size={16}/>
        </div>;
    }

    //===========================================================================================================

    return (
        <div className={css.movie_Info_Page}>
            <button onClick={handleBackClick} className={css_common.generalButton}>Back</button>

            <div className={css.movie_Info_Container_left}>
                <div className={css.poster_Block}>
                    <h1>{movie.title}</h1>
                    <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
                </div>

                <div className={css.movie_Info_Container_right}>
                    <p>Release Date - {movie.release_date}</p>
                    <p>{movie.overview}</p>
                </div>
            </div>

        </div>
    );
};

export {MovieInfoComponent};
