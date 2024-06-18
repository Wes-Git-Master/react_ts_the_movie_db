import React, {FC} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {PosterPreviewComponent} from "./PosterPreviewComponent";
import css from "./movie.list.card.module.css"

interface IProps {
    movie: IMovie
}

const MoviesListCardComponent: FC<IProps> = ({movie}) => {

    return (
        <div className={css.movie_card_block}>
            <p>{movie.original_title}</p>
            <div><PosterPreviewComponent movie={movie}/></div>
        </div>
    );
};

export {MoviesListCardComponent};