import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks/redux.type.hooks";
import {authActions} from "../../redux/slices/authSlice";
import {BeatLoader} from "react-spinners";
import {useLoading} from "../../hooks/useLoading";
import css from "../../styles/login.page.module.css"


const LoginComponent: FC = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {requestToken, status}
        = useAppSelector(state => state.auth)
    const {handleSubmit} = useForm();
    const navigate = useNavigate();
    const loading = useLoading(status);

    useEffect(() => {
        if (status !== 'succeeded' && status !== 'loading') {
            dispatch(authActions.getRequestToken())
        }
    }, [status, dispatch]);

    const onSubmit = () => {
        navigate(`/authenticate/${requestToken}`);
    };

    //===========================================================================================================

    return (
        <div className={css.login_page_block}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    status === 'loading' ? <div><BeatLoader color="red" loading={loading} size={10}/></div>
                        : <button type="submit">Login with TMDb</button>
                }
            </form>
        </div>
    );
};

export {LoginComponent}
