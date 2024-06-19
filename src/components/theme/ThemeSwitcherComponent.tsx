import React, {FC, useEffect, useState} from 'react';
// import css from "../../styles/theme.switcher.module.css";

const ThemeSwitcherComponent:FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <button onClick={toggleTheme} >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
};

export { ThemeSwitcherComponent };
