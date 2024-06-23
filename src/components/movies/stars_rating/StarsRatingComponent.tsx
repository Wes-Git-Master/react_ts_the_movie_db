import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import css from '../../../styles/stars.rating.module.css';

interface IProps {
    rating: number;
}

const StarsRatingComponent: FC<IProps> = ({rating}) => {

    //===========================================================================================================

    const stars = [];
    const starClasses = determineStarClasses(rating);

    for (let i = 1; i <= 10; i++) {
        stars.push(
            <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i <= rating ? starClasses.filled : css.starEmpty}
            />
        );
    }

    function determineStarClasses(rating: number) {
        let starClasses = {
            filled: css.starFilled,
        };

        if (rating >= 1 && rating <= 3) {
            starClasses.filled = `${starClasses.filled} ${css.rating_low}`;
        } else if (rating > 3 && rating <= 7) {
            starClasses.filled = `${starClasses.filled} ${css.rating_medium}`;
        } else if (rating > 7) {
            starClasses.filled = `${starClasses.filled} ${css.rating_high}`;
        }

        return starClasses;
    }

    //===========================================================================================================

    return <div className={css.rating}>{stars}</div>;
};

export {StarsRatingComponent};
