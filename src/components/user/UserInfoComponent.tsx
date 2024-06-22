import React, {FC, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks/redux.type.hooks";
import {useLoading} from "../../hooks/useLoading";
import {BeatLoader} from "react-spinners";
import css from "../../styles/header.module.css";
import {userActions} from "../../redux/slices/userSlice";

const UserInfoComponent: FC = () => {

    //===========================================================================================================

    const sessionId = localStorage.getItem('sessionId');
    const {userInfo, error} = useAppSelector(state => state.user);
    const status = useAppSelector(state => state.user.status);
    const loading = useLoading(status);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (sessionId) {
            dispatch(userActions.getUserInfo(sessionId))
        }

    }, [sessionId, dispatch]);

    if (!sessionId) {
        return (
            <div className={css.header_links_block}>
                <div className={css.home}><NavLink to="/home">Home</NavLink></div>
                <div className={css.movie_list}><NavLink to="/login">Login</NavLink></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return (
            <div>
                Loading... <br/>
                <BeatLoader color="green" loading={loading} size={6}/>
            </div>
        );
    }

    return (
        <div>
            <p>{userInfo.username}</p>
        </div>
    );
};

export {UserInfoComponent};
