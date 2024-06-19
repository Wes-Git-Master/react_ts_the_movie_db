import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {AuthenticatedPage} from "../pages/AuthenticatedPage";
import {AuthenticatePage} from "../pages/AuthenticatePage";
import {MoviePage} from "../pages/MoviePage";
import {MovieInfoComponent} from "../components/MovieInfoComponent";

const routes: RouteObject[] = [
    {
        path: '', element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'home', element: <HomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'authenticated', element: <AuthenticatedPage/>},
            {path: 'authenticate/:requestToken', element: <AuthenticatePage/>},
            {path: 'moviesList', element: <MoviePage/>},
            {path: 'movieInfo/:movieId', element: <MovieInfoComponent/>}
        ]
    }
];

const router = createBrowserRouter(routes);

export default router