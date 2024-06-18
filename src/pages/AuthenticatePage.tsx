import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import css from "./authenticate.module.css"

const AuthenticatePage: FC = () => {

    //===========================================================================================================

    const {requestToken} = useParams<{ requestToken: string }>();
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/authenticated`;

   useEffect(() => {
        window.location.href = authUrl;
    }, [authUrl]);

    //===========================================================================================================

    return (
        <div className={css.authenticate_page_block}>
            <h1>Redirecting...</h1>
        </div>
    );
};

export {AuthenticatePage};
