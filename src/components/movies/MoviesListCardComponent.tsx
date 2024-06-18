import React, {FC} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {PosterPreviewComponent} from "./PosterPreviewComponent";

interface IProps {
    movie: IMovie
}

const MoviesListCardComponent: FC<IProps> = ({movie}) => {

    return (
        <div>
            {movie.original_title}
            <div><PosterPreviewComponent movie={movie}/></div>
        </div>
    );
};

export {MoviesListCardComponent};