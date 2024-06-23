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
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
            </div>
        </div>
    );
};

export {MovieCardComponent};
