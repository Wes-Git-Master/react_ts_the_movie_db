import React, {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../redux/Store";
import {authActions} from "../redux/slices/authSlice";


const LoginPage: FC = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch();
    const {requestToken, status}
        = useAppSelector(state => state.auth)

    const {handleSubmit} = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (status !== 'succeeded') {
            dispatch(authActions.getRequestToken())
        }
    }, [status, dispatch]);

    const onSubmit = () => {
        navigate(`/authenticate/${requestToken}`);
    };

    //===========================================================================================================

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit">Login with TMDb</button>
                )}
            </form>
        </div>
    );
};

export {LoginPage}
