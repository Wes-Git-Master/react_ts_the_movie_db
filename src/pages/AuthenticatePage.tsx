import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getAuthUrl} from "../helpers/url.helpers";
import {useAppSelector} from "../hooks/reduxHooks/redux.type.hooks";
import {BeatLoader} from "react-spinners";
import {useLoading} from "../hooks/useLoading";
import css from "../styles/authenticate.module.css"

const AuthenticatePage: FC = () => {

    //===========================================================================================================

    const {requestToken} = useParams<{ requestToken: string }>();
    const authUrl = requestToken ? getAuthUrl(requestToken) : '';
    const status = useAppSelector(state => state.auth.status)
    const loading = useLoading(status);

    useEffect(() => {
        window.location.href = authUrl;
    }, [authUrl]);

    //===========================================================================================================

    return (
        <div className={css.authenticate_page_block}>
            <h1>Redirecting...</h1>
            <BeatLoader color="red" loading={loading} size={16}/>
        </div>
    );
};

export {AuthenticatePage};
