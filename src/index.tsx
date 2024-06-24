import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import {store} from "./redux/Store";
import {useTheme} from "./hooks/useTheme";
import {useEffect} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import './styles/global_css/index.css';


const Root = () => {
    const {theme} = useTheme()

    useEffect(() => {
        document.body.className = theme
    }, [theme]);

    return <RouterProvider router={router}/>
}

//===========================================================================================================

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <Root/>
        </ThemeProvider>
    </Provider>
);
