import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks/redux.type.hooks";
import {moviesActions} from "../../../redux/slices/moviesSlice";
import {posterBaseURL} from "../../../constants/urls";
import {useLoading} from "../../../hooks/useLoading";
import {BeatLoader} from "react-spinners";
import css from "../../../styles/movie.info.module.css"
import css_common from "../../../styles/css_common/button.module.css"
import {GenresOfMovie} from "./GenresOfMovie";
import {ScrollToTopButton} from "../../buttons/ScrollToTopButton";
import {Button} from "../../buttons/Button";
import ReactPlayer from "react-player";


const MovieInfoComponent: FC = () => {

    //===========================================================================================================

    const {movieId} = useParams<{ movieId: string }>();
    const dispatch = useAppDispatch();
    const movie = useAppSelector(state => state.movies.selectedMovie);
    const videos = useAppSelector(state => state.movies.videos);
    const status = useAppSelector(state => state.movies.status);
    const genresStatus = useAppSelector(state => state.movies.genresStatus);
    const loading = useLoading(status);


    useEffect(() => {
        if (movieId) {
            dispatch(moviesActions.getMovieDetails(movieId));
            dispatch(moviesActions.getMovieVideos(movieId));
        }
        if (genresStatus === 'idle') {
            dispatch(moviesActions.getGenres());
        }
    }, [dispatch, movieId, genresStatus]);

    if (!movie || genresStatus === 'loading') {
        return <div className={css.loading}>
            <p>Loading</p>
            <BeatLoader color="red" loading={loading} size={16}/>
        </div>;
    }

    const trailer = videos?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    const movieClip = videos?.find(video => video.type === 'Clip' && video.site === 'YouTube');

    //===========================================================================================================

    return (
        <div className={css.movie_Info_Page}>
            <Button className={css_common.generalButton}/>

            <div className={css.movie_Info_Container}>

                <div className={css.poster_info_container}>
                    <div className={css.poster_Block}>
                        <h1>{movie.title}</h1>
                        <img src={`${posterBaseURL + movie.poster_path}`} alt={movie.title}/>
                    </div>
                    <div className={css.movie_Info_Container_right}>

                        <div className={css.genres_of_movie_block}>
                            Genres: {movie.genres?.map(genre => <GenresOfMovie genre={genre} key={genre.id}/>)}
                        </div>

                        <div className={css.movie_info_block}>
                            <p>Release Date | {movie.release_date}</p>
                            <p>Rating | {movie.vote_average}</p>
                            <p>Vote count | {movie.vote_count}</p>
                            <p>Original Language |  {movie.original_language}</p>
                            <p>Popularity | {movie.popularity}</p>
                        </div>

                    </div>
                </div>

                <div className={css.overview_block}>
                    <p>Overview ...</p>
                    <br/>
                    <p>{movie.overview}</p>
                </div>
                {trailer && (
                    <div className={css.video_block}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${trailer.key}`} controls height={400}
                                     width={800}/>
                    </div>
                )}
                {movieClip && (
                    <div className={css.video_block}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${movieClip.key}`} controls height={400}
                                     width={800}/>
                    </div>
                )}
            </div>
            <ScrollToTopButton threshold={85} scrollOnMount={true} top={160}/>
        </div>
    );
};

export {MovieInfoComponent};
