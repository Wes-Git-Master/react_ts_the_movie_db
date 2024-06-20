import React, {FC} from 'react';
import {useTheme} from "../../hooks/useTheme";
import css from "../../styles/theme.switcher.module.css";


const ThemeSwitcherComponent: FC = () => {

    const {theme, toggleTheme} = useTheme();

    return (
        <>
            <button onClick={toggleTheme} className={css.themeSwitcher}>
                {theme === 'light' ? 'Dark' : 'Light'}
            </button>
        </>
    );
};

export {ThemeSwitcherComponent};
