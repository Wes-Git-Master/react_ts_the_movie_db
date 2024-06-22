import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {AuthenticatedComponent} from "../components/auth/AuthenticatedComponent";
import {AuthenticateComponent} from "../components/auth/AuthenticateComponent";
import {MoviePage} from "../pages/MoviePage";
import {MovieInfoComponent} from "../components/movies/movie_info/MovieInfoComponent";

const routes: RouteObject[] = [
    {
        path: '', element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'home', element: <HomePage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'authenticate/:requestToken', element: <AuthenticateComponent/>},
            {path: 'authenticated', element: <AuthenticatedComponent/>},
            {path: 'moviesList', element: <MoviePage/>},
            {path: 'movieInfo/:movieId', element: <MovieInfoComponent/>}
        ]
    }
];

const router = createBrowserRouter(routes);

export default router