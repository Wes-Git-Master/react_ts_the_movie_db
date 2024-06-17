import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../redux/Store";
import {authActions} from "../redux/slices/authSlice";


const AuthenticatedPage: FC = () => {

    //===========================================================================================================

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)

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
            navigate('/');
        }
    }, [status, navigate]);

    //===========================================================================================================

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
};

export {AuthenticatedPage};
