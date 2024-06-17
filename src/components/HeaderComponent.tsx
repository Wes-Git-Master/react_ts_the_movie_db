import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../redux/Store";

const HeaderComponent = () => {

    const {status} = useAppSelector(state => state.auth);

    const [islogin, setLogin] = useState<boolean>(false);

    useEffect(() => {
        // Перевірка стану аутентифікації при завантаженні компонента
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setLogin(loggedIn);

        if (status === "succeeded") {
            setLogin(true);
            localStorage.setItem('isLoggedIn', 'true');
        } else if (status === "failed") {
            setLogin(false);
            localStorage.removeItem('isLoggedIn');
        }
    }, [status]);

    return (
        <div>
            {
                islogin ?
                    <NavLink to={''}/> :
                    <div>
                        <NavLink to={'/login'}>login</NavLink>
                        <hr/>
                    </div>
            }
        </div>
    );
};

export {HeaderComponent};
