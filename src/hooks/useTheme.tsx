import {createContext, useContext} from "react";

export type Theme = 'light' | 'dark';

interface IThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

const useTheme = (): IThemeContextType => {

    //===========================================================================================================

    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export {useTheme, ThemeContext}