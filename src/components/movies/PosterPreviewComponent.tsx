import React, {FC} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {posterBaseURL} from "../../constants/urls";
import css from "../../styles/poster.module.css"

interface IProps {
    movie: IMovie
}

const PosterPreviewComponent: FC<IProps> = ({movie}) => {

    const poster = `${posterBaseURL + movie.poster_path}  `

    //===========================================================================================================

    return (
        <div>
            <img src={poster} alt="" className={css.poster}/>
        </div>
    );
};

export {PosterPreviewComponent};