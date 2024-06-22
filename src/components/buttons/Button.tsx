import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';

interface BackButtonProps {
    className?: string;
}

const Button: FC<BackButtonProps> = ({className}) => {

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
