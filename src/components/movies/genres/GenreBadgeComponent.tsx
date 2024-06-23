import React, {FC} from 'react';
import {IGenre} from "../../../interfaces/IGenre";
import css from "../../../styles/genre.of.movie.module.css"
import {NavLink} from "react-router-dom";


interface IProps {
    genre: IGenre
}

const GenreBadgeComponent: FC<IProps> = ({genre}) => {

    return (
        <div className={css.genre}>
            <NavLink to={`/moviesList?genre=${genre.id}`} className={css.genreLink}>
                <p>{genre.name}</p>
            </NavLink>
        </div>
    );
};

export {GenreBadgeComponent};