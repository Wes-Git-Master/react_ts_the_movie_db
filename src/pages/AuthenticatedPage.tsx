import React, {FC, useEffect} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/Store";
import {authActions} from "../redux/slices/authSlice";
import {BeatLoader} from "react-spinners";
import css from "../styles/authenticated.page.module.css"
import {useLoading} from "../hooks/useLoading";


const AuthenticatedPage: FC = () => {

    //===========================================================================================================

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)
    const loading = useLoading(status);

    useEffect(() => {

        const axiosSessionId = async () => {
            const params = new URLSearchParams(location.search);
            const requestToken = params.get('request_token');
            if (requestToken) {
                dispatch(authActions.createSession(requestToken));
            }
        };

        axiosSessionId().then();
    }, [location, dispatch]);

    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/moviesList');
        }
    }, [status, navigate]);

    //===========================================================================================================

    return (

        <div className={css.authenticated_page}>
            <h3>Please</h3>
            <div>
                <BeatLoader color="red" loading={loading} size={10}/>
            </div>
            <NavLink to={'/login'}>login</NavLink>
        </div>
    )
};

export {AuthenticatedPage};
