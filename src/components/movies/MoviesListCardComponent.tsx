import React, {FC, useEffect} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {useAppDispatch, useAppSelector} from "../../redux/Store";
import {moviesActions} from "../../redux/slices/moviesSlice";
import {PosterPreviewComponent} from "./PosterPreviewComponent";

interface IProps {
    movie: IMovie
}

const MoviesListCardComponent: FC<IProps> = ({movie}) => {

    const dispatch = useAppDispatch();
    const {poster} = useAppSelector(state => state.movies);

    useEffect(() => {
        if (movie.poster_path){
            dispatch(moviesActions.getMoviePoster(movie.poster_path))
        }
    }, []);

    return (
        <div>

            <div><PosterPreviewComponent/></div>

            {movie.id}
            <br/>

            {movie.original_title}


        </div>
    );
};

export {MoviesListCardComponent};