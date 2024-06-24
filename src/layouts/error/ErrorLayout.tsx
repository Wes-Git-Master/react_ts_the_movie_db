import React from 'react';
import {HeaderComponent} from "../../components/header/HeaderComponent";
import {ErrorComponent} from "../../components/error/ErrorComponent";

const ErrorLayout = () => {

    return (
        <div>
            <HeaderComponent/>
            <ErrorComponent/>
        </div>
    );
};

export {ErrorLayout};