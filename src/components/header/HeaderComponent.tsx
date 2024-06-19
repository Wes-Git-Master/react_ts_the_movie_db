import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../redux/Store";
import css from "../../styles/header.module.css"

const HeaderComponent = () => {

    //===========================================================================================================

    const {status} = useAppSelector(state => state.auth);
    const [is_login, setLogin] = useState<boolean>(false);

    useEffect(() => {

        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setLogin(loggedIn);

        if (status === "succeeded") {
            setLogin(true);
            localStorage.setItem('isLoggedIn', 'true');
        }
        if (status === "failed") {
            setLogin(false);
            localStorage.removeItem('isLoggedIn');
        }
    }, [status]);

    //===========================================================================================================

    return (
        <div className={css.header}>
            <div><NavLink to={'home'}>HOME</NavLink></div>
            {is_login && <div><NavLink to={'moviesList'}>MOVIES</NavLink></div>}
        </div>
    );
};

export {HeaderComponent};
