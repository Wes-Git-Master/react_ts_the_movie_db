import React, {FC} from 'react';
import {IGenre} from "../../../interfaces/IGenre";
import css from "../../../styles/genre.of.movie.module.css"

interface IProps {
    genre: IGenre
}

const GenresOfMovie: FC<IProps> = ({genre}) => {

    return (
        <div className={css.genre}>
            <p>{genre.name}</p>
        </div>
    );
};

export {GenresOfMovie};