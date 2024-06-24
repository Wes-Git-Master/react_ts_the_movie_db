import React, {FC} from 'react';
import {IMovie} from "../../../interfaces/IMovie";
import {PosterPreviewComponent} from "../poster/PosterPreviewComponent";
import {StarsRatingComponent} from "../stars_rating/StarsRatingComponent";
import css from "../../../styles/movies.list.card.module.css"


interface IProps {
    movie: IMovie
}

const MoviesListCardComponent: FC<IProps> = ({movie}) => {

    return (
        <div className={css.movie_card_block}>
            <PosterPreviewComponent movie={movie}/>
            <div className={css.stars_rating}>
                <StarsRatingComponent rating={movie.vote_average}/>
            </div>
            <p>{movie.original_title}</p>
        </div>
    );
};

export {MoviesListCardComponent};