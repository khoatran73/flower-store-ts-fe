import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Dashboard from '../features/Dashboard';
import Chart from '../features/Dashboard/components/Chart';
import Customer from '../features/Dashboard/components/Customer';
import { Expense } from '../features/Dashboard/components/Expense';
import Orders from '../features/Dashboard/components/Orders';
import ProductManager from '../features/Dashboard/components/ProductManager';
import StaffManager from '../features/Dashboard/components/StaffManager';
import { TrafficStatistics } from '../features/Dashboard/components/TrafficStatistics';
import { Turnover } from '../features/Dashboard/components/Turnover';
import Home from '../features/Home';
import LayoutPage from '../features/layout-page';
import Login from '../features/Login';
import { NotFound } from '../features/NotFound';
import Product from '../features/Product';
import ProductDetail from '../features/ProductDetail';
import { Profile } from '../features/Profile';
import { Cart } from '../features/Profile/components/Cart';
import { History } from '../features/Profile/components/History';
import { UserProfile } from '../features/Profile/components/UserProfile';
import Register from '../features/Register';
import { Help } from './../help/Help';
import { Reply } from './../help/Reply';
import { Contact } from './../help/Contact';
import Checkout from './../shared/CheckOut/Checkout';
import PrivateRoute from './PrivateRoute';

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
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '/reply',
                element: <Reply />,
            },
            {
                path: '/help',
                element: <Help />,
            },
            {
                path: '/profile',
                element: <Profile />,
                children: [
                    {
                        path: '/profile',
                        element: <UserProfile />,
                    },
                    {
                        path: '/profile/cart',
                        element: <Cart />,
                    },
                    {
                        path: '/profile/history',
                        element: <History />,
                    },
                ],
            },
            {
                path: '/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
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
                            {
                                path: '/dashboard/report/turnover',
                                element: <Turnover />,
                            },
                            {
                                path: '/dashboard/report/expense',
                                element: <Expense />,
                            },
                        ],
                    },
                    {
                        path: '/dashboard/statistics',
                        children: [
                            {
                                path: '/dashboard/statistics/traffic',
                                element: <TrafficStatistics />,
                            },
                            {
                                path: '/dashboard/statistics/best-seller',
                                element: <Chart />,
                            },
                        ],
                    },
                ],
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
        path: '/*',
        element: <NotFound />,
    },
] as RouteObject[];

export const AppRoute = () => {
    const elements = useRoutes(routeList);
    return <>{elements}</>;
};
