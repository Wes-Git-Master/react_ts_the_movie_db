import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/Store";
import {useForm} from "react-hook-form";
import {authActions} from "../redux/slices/authSlice";

interface IProps {
    username:string,
    password: string
}

const RegisterPage:FC = () => {

    //===========================================================================================================

    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<IProps>();
    const status = useAppSelector(state => state.auth.status)

    const onSubmit = (userData: { username: string; password: string }) => {
        dispatch(authActions.registerUser(userData));
    };

    //===========================================================================================================

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input type="text" {...register('username', {required: true})} />
                    {errors.username && <span>Username is required</span>}
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" {...register('password', {required: true})} />
                    {errors.password && <span>Password is required</span>}
                </div>
                <button type="submit" disabled={status === 'loading'}>Register</button>
            </form>
        </div>
    );
};

export {RegisterPage};
