import React, {FC} from 'react';
import {IMovie} from "../../../interfaces/IMovie";
import {posterBaseURL} from "../../../constants/urls";
import css from '../../../styles/movie.card.module.css';


interface IProps {
    movie: IMovie;
}

const MovieCardComponent: FC<IProps> = ({movie}) => {

    //===========================================================================================================

    return (
        <div className={css.movieCard}>
            <img src={`${posterBaseURL}${movie.poster_path}`} alt={movie.title}/>
            <div className={css.movieDetails}>
                <p>Rating</p>
                <h2>{movie.vote_average}</h2>
            </div>
        </div>
    );
};

export {MovieCardComponent};
