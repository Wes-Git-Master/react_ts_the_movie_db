import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks/redux.type.hooks";
import css from "../../styles/header.module.css"
import {ThemeSwitcherComponent} from "../theme/ThemeSwitcherComponent";
import {UserInfoComponent} from "../user/UserInfoComponent";


const HeaderComponent = () => {

    //===========================================================================================================

    const {status} = useAppSelector(state => state.auth);
    const [is_login, setLogin] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {

        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setLogin(loggedIn);

        if (status === "succeeded" && loggedIn) {
            setLogin(true);

        }
        if (status === "failed") {
            setLogin(false);
            localStorage.removeItem('isLoggedIn');
        }
    }, [status, navigate]);

    //===========================================================================================================

    return (
        <div className={css.header_links}>
            {is_login && <div className={css.header_links_block}>
                <div className={css.home}><NavLink to={'home'}>HOME</NavLink></div>
                <div className={css.movie_list}><NavLink to={'moviesList'}>Movies</NavLink></div>
            </div>}
            <div className={css.header_user_theme_block}>
                <div className={css.user}><UserInfoComponent/></div>
                <div className={css.theme}><ThemeSwitcherComponent/></div>
            </div>

        </div>
    );
};

export {HeaderComponent};
