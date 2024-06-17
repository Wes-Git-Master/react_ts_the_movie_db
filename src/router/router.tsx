import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import {AuthenticatedPage} from "../pages/AuthenticatedPage";
import {RegisterPage} from "../pages/RegisterPage";
import {AuthenticatePage} from "../pages/AuthenticatePage";

const routes: RouteObject[] = [
    {
        path: '', element: <MainLayout/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: '/login', element: <LoginPage/>},
            {path: '/register', element: <RegisterPage/>},   // todo
            {path: '/authenticated', element: <AuthenticatedPage/>},
            {path: '/authenticate/:requestToken', element: <AuthenticatePage/>},
        ]
    }
];

const router = createBrowserRouter(routes);

export default router