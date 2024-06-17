import React from 'react';
import {HeaderComponent} from "../components/HeaderComponent";
import {Outlet} from "react-router-dom";

const MainLayout = () => {

    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};