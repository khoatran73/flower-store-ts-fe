import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Cart from "../features/Cart";
import Dashboard from "../features/Dashboard";
import Home from "../features/Home";
import LayoutPage from "../features/layout-page";
import { NotFound } from "../features/NotFound";
import Product from "../features/Product";
import ProductDetail from "../features/ProductDetail";
import Purchase from "../features/Purchase";
// import { NotFound } from '~/components/Layout/NotFound';

// const { UserAliveListView } = lazyImport(
//     () => import('~/features/ums/user/components/UserAlive.ListView'),
//     'UserAliveListView',
// );

const routeList = [
    // {
    //     path: "/",
    //     element: <Navigate to={"/"} />,
    // },
    // {
    //     path: '/login',
    //     element: <LoginForm />,
    // },
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product",
                element: <Product />,
            },
            {
                path: "/product/:id",
                element: <ProductDetail />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/purchase",
                element: <Purchase />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/*",
                element: <NotFound />,
            },
        ],
    },
    // {
    //     path: "/",
    //     element: <Home />,
    // },
    // {
    //     path: "/product",
    //     element: <Product />,
    // },
    // {
    //     path: "/product/:id",
    //     element: <ProductDetail />,
    // },
    // {
    //     path: "/cart",
    //     element: <Cart />,
    // },
    // {
    //     path: "/purchase",
    //     element: <Purchase />,
    // },
    // {
    //     path: "/dashboard",
    //     element: <Dashboard />,
    // },
    // {
    //     path: "/*",
    //     element: <NotFound />,
    // },
] as RouteObject[];

export const AppRoute = () => {
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};
