import React from 'react';
import {NavLink} from "react-router-dom";

const HeaderComponent = () => {

    return (
        <div>
            <NavLink to={'/login'}>login</NavLink>
            <br/>
            <NavLink to={'/register'}>Register</NavLink>
            <hr/>

        </div>
    );
};

export {HeaderComponent};