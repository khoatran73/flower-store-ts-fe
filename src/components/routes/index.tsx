import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Cart from '../features/Cart';
import Dashboard from '../features/Dashboard';
import Chart from '../features/Dashboard/components/Chart';
import Customer from '../features/Dashboard/components/Customer';
import Orders from '../features/Dashboard/components/Orders';
import ProductManager from '../features/Dashboard/components/ProductManager';
import Report from '../features/Dashboard/components/Report';
import { TrafficStatistics } from '../features/Dashboard/components/TrafficStatistics';
import StaffManager from '../features/Dashboard/components/StaffManager';
import Home from '../features/Home';
import LayoutPage from '../features/layout-page';
import Login from '../features/Login';
import { NotFound } from '../features/NotFound';
import Product from '../features/Product';
import ProductDetail from '../features/ProductDetail';
import Purchase from '../features/Purchase';
import Register from '../features/Register';
import PrivateRoute from './PrivateRoute';
import Checkout from './../shared/CheckOut/Checkout';

const routeList = [
    {
        path: '',
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
    {
        path: '/checkout/:id',
        element: <Checkout />,
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            // {
            //     path: '/dashboard',
            //     element: <Chart />,
            // },
            {
                path: '/dashboard',
                element: <ProductManager />,
            },
            {
                path: '/dashboard/order',
                element: <Orders />,
            },
            {
                path: '/dashboard/staff',
                element: <StaffManager />,
            },
            {
                path: '/dashboard/customer',
                element: <Customer />,
            },
            {
                path: '/dashboard/report',
                children: [
                    // { path: '/dashboard/report', element: <Customer /> },
                ],
            },
            {
                path: '/dashboard/statistics',
                children: [
                    {
                        path: '/dashboard/statistics/traffic',
                        element: <TrafficStatistics />,
                    },
                ],
            },
        ],
    },
    {
        path: '/*',
        element: <NotFound />,
    },
] as RouteObject[];

export const AppRoute = () => {
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};
