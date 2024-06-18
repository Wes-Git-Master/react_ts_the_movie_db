import React, {FC} from 'react';
import {IMovie} from "../../interfaces/IMovie";
import {posterBaseURL} from "../../constants/urls";

interface IProps {
    movie: IMovie
}

const PosterPreviewComponent: FC<IProps> = ({movie}) => {

    const poster = `${posterBaseURL + movie.poster_path}  `

    //===========================================================================================================

    return (
        <div>
            <img src={poster} alt=""/>
        </div>
    );
};

export {PosterPreviewComponent};