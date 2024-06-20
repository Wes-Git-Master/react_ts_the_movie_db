import React, {FC} from 'react';
import {IMovie} from "../../../interfaces/IMovie";
import {useNavigate} from "react-router-dom";
import {posterBaseURL} from "../../../constants/urls";
import css from "../../../styles/poster.module.css"

interface IProps {
    movie: IMovie
}

const PosterPreviewComponent: FC<IProps> = ({movie}) => {

    //===========================================================================================================

    const navigate = useNavigate();
    const poster = `${posterBaseURL + movie.poster_path}`

    const handlePosterClick = () => {
        navigate(`/movieInfo/${movie.id}`);
    };

    //===========================================================================================================

    return (
        <div onClick={handlePosterClick} className={css.posterContainer}>

            <img src={poster} alt="" className={css.poster}/>
        </div>
    );
};

export {PosterPreviewComponent};