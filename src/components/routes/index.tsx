import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Cart from '../features/Cart';
import Dashboard from '../features/Dashboard';
import Chart from '../features/Dashboard/components/Chart';
import Customer from '../features/Dashboard/components/Customer';
import Orders from '../features/Dashboard/components/Orders';
import Report from '../features/Dashboard/components/Report';
import Staff from '../features/Dashboard/components/Staff';
import Home from '../features/Home';
import LayoutPage from '../features/layout-page';
import Login from '../features/Login';
import { NotFound } from '../features/NotFound';
import Product from '../features/Product';
import ProductDetail from '../features/ProductDetail';
import Purchase from '../features/Purchase';
import Register from '../features/Register';
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
        path: '/',
        element: <LayoutPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/product',
                element: <Product />,
            },
            {
                path: '/product/:id',
                element: <ProductDetail />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/purchase',
                element: <Purchase />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Chart />,
                    },
                    {
                        path: '/dashboard/order',
                        element: <Orders />,
                    },
                    {
                        path: '/dashboard/staff',
                        element: <Staff />,
                    },
                    {
                        path: '/dashboard/customer',
                        element: <Customer />,
                    },
                    {
                        path: '/dashboard/report',
                        element: <Report />,
                    },
                ],
            },
            {
                path: '/*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
] as RouteObject[];

export const AppRoute = () => {
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};
