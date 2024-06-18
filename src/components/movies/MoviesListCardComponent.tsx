import React, {FC} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {PosterPreviewComponent} from "./PosterPreviewComponent";
import css from "./movies.list.card.module.css"

interface IProps {
    movie: IMovie
}

const MoviesListCardComponent: FC<IProps> = ({movie}) => {

    return (
        <div className={css.movie_card_block}>
            <div><PosterPreviewComponent movie={movie}/></div>
            <p>{movie.original_title}</p>
        </div>
    );
};

export {MoviesListCardComponent};