import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

interface IProps {
    className: string;
}

const Button: FC<IProps> = ({className}) => {

    //===========================================================================================================

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} className={className}>
            Back
        </button>
    );
};

export {Button};
