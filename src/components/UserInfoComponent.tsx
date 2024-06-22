import React, {FC, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {IUser} from "../interfaces/IUser";
import {authApiService} from "../services/auth.api.service";
import {useAppSelector} from "../hooks/reduxHooks/redux.type.hooks";
import {useLoading} from "../hooks/useLoading";
import {BeatLoader} from "react-spinners";

const UserInfoComponent: FC = () => {

    //===========================================================================================================

    const sessionId = localStorage.getItem('sessionId');
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [error, setError] = useState<string | null>(null);
    const status = useAppSelector(state => state.auth.status);
    const loading = useLoading(status);

    useEffect(() => {
        const axiosUserInfo = async () => {
            if (sessionId) {
                try {
                    const userInfo = await authApiService.getUserInfo(sessionId);
                    setUserInfo(userInfo);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                }
            }
        };

        axiosUserInfo().then();
    }, [sessionId]);

    if (!sessionId) {
        return (
            <div>
                <NavLink to="/login">Login</NavLink>
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
