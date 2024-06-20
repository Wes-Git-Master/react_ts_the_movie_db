import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Theme, ThemeContext} from "../hooks/useTheme";

interface IProps {
    children: ReactNode;
}


const ThemeProvider: FC<IProps> = ({children}) => {

    //===========================================================================================================

    const savedTheme = sessionStorage.getItem('theme') as Theme || 'light'
    const [theme, setTheme] = useState<Theme>(savedTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        sessionStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        sessionStorage.setItem('theme', theme)
    }, [theme])

    //===========================================================================================================

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export {ThemeProvider}

