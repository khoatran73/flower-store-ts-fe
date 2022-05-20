import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Dashboard from '../features/Dashboard';
import { BestSeller } from '../features/Dashboard/components/BestSeller';
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
import { ResetPassword } from '../features/reset-password/ResetPassword';
import { Contact } from './../help/Contact';
import { Help } from './../help/Help';
import { Reply } from './../help/Reply';
import Checkout from './../shared/CheckOut/Checkout';
import PrivateRoute from './PrivateRoute';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import PrivateRouteSales from './PrivateRouteSales';
import PrivateRouteWarehouse from './PrivateRouteWarehouse';

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
                        element: (
                            <PrivateRouteWarehouse>
                                <ProductManager />
                            </PrivateRouteWarehouse>
                        ),
                    },
                    {
                        path: '/dashboard/order',
                        element: (
                            <PrivateRouteSales>
                                <Orders />
                            </PrivateRouteSales>
                        ),
                    },
                    {
                        path: '/dashboard/staff',
                        element: (
                            <PrivateRouteAdmin>
                                <StaffManager />
                            </PrivateRouteAdmin>
                        ),
                    },
                    {
                        path: '/dashboard/customer',
                        element: (
                            <PrivateRouteSales>
                                <Customer />
                            </PrivateRouteSales>
                        ),
                    },
                    {
                        path: '/dashboard/report',
                        children: [
                            {
                                path: '/dashboard/report/turnover',
                                element: (
                                    <PrivateRouteAdmin>
                                        <Turnover />
                                    </PrivateRouteAdmin>
                                ),
                            },
                            {
                                path: '/dashboard/report/expense',
                                element: (
                                    <PrivateRouteAdmin>
                                        <Expense />
                                    </PrivateRouteAdmin>
                                ),
                            },
                        ],
                    },
                    {
                        path: '/dashboard/statistics',
                        children: [
                            {
                                path: '/dashboard/statistics/traffic',
                                element: (
                                    <PrivateRouteAdmin>
                                        <TrafficStatistics />
                                    </PrivateRouteAdmin>
                                ),
                            },
                            {
                                path: '/dashboard/statistics/best-seller',
                                element: (
                                    <PrivateRouteAdmin>
                                        <BestSeller />
                                    </PrivateRouteAdmin>
                                ),
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
        path: '/reset-password',
        element: <ResetPassword />,
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
