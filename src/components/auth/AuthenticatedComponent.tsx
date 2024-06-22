import React, {FC, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks/redux.type.hooks";
import {authActions} from "../../redux/slices/authSlice";
import {BeatLoader} from "react-spinners";
import {useLoading} from "../../hooks/useLoading";
import css from "../../styles/authenticated.page.module.css"


const AuthenticatedComponent: FC = () => {

    //===========================================================================================================

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)
    const sessionId = useAppSelector(state => state.auth.sessionId);
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
        if (status === 'succeeded' && sessionId) {
            localStorage.setItem('sessionId', sessionId);
            navigate('/moviesList')
        }
        if (status === 'failed') {
            navigate('/login')
        }
    }, [status, navigate,sessionId]);

    //===========================================================================================================

    return (
        <div className={css.authenticated_page}>
            {status === 'loading' ?
                <div>
                    <p>Loading</p>
                    <BeatLoader color="red" loading={loading} size={16}/>
                </div> : ''}
        </div>
    )
};

export {AuthenticatedComponent};
