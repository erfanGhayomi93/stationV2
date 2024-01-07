import { FC, lazy, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Help from 'src/pages/Help';
import PageCrash from 'src/pages/PageCrash';
import { safeLazyImport } from 'src/utils/helpers';

const Home = lazy(() => safeLazyImport(() => import('src/pages/Home')));
const Page404 = lazy(() => safeLazyImport(() => import('src/pages/Page404')));
const Login = lazy(() => safeLazyImport(() => import('src/pages/oAuth/Login')));
const Basket = lazy(() => safeLazyImport(() => import('src/pages/basket/context/BasketContext')));
const Watchlist = lazy(() => safeLazyImport(() => import('src/pages/Watchlist')));
const ForgetPassword = lazy(() => safeLazyImport(() => import('src/pages/oAuth/ForgetPassword')));
const ValidationForgetPassword = lazy(() => safeLazyImport(() => import('src/pages/oAuth/ForgetPassword/validation')));
const ForgetPasswordChangePassword = lazy(() => safeLazyImport(() => import('src/pages/oAuth/ForgetPassword/changePassword')));
const ChangePassword = lazy(() => safeLazyImport(() => import('src/pages/oAuth/ChangePassword')));
const Orders = lazy(() => safeLazyImport(() => import('src/pages/Reports/Orders')));
const Trades = lazy(() => safeLazyImport(() => import('src/pages/Reports/Trades')));
const TurnOver = lazy(() => safeLazyImport(() => import('src/pages/Reports/TurnOver')));
const Calender = lazy(() => safeLazyImport(() => import('src/pages/Market/calender')));
const TradingView = lazy(() => safeLazyImport(() => import('src/pages/Market/Chart/context/index')));
const Requests = lazy(() => safeLazyImport(() => import('src/pages/Reports/Requests')));
const PortfolioMain = lazy(() => safeLazyImport(() => import('src/pages/portfolio/list/index')));
const Setting = lazy(() => safeLazyImport(() => import('src/pages/Setting')));

const OptionSettlement = lazy(() => safeLazyImport(() => import('src/pages/optionSettlement')));

import AppLayout from '../Layout';
import AuthLayout from '../Layout/AuthLayout';
import SetPasswordChangePassword from 'src/pages/oAuth/ChangePassword/setPassword';

const AppRoutes: FC = () => {
    const router = useMemo(
        () =>
            createBrowserRouter(
                [
                    {
                        path: '/',
                        element: <AuthLayout />,
                        children: [
                            {
                                path: '/login',
                                element: <Login />,
                                index: true,
                            },
                            {
                                path: '/forgetPassword',
                                // element: <ForgetPassword />,
                                children: [
                                    {
                                        element: <ForgetPassword />,
                                        index: true,
                                    },
                                    {
                                        element: <ValidationForgetPassword />,
                                        path: 'validation',
                                    },
                                    {
                                        element: <ForgetPasswordChangePassword />,
                                        path: 'changePassword',
                                    },
                                ],
                            },
                            {
                                path: '/changePassword',
                                // element: <ForgetPassword />,
                                children: [
                                    {
                                        element: <ChangePassword />,
                                        index: true,
                                    },
                                    {
                                        element: <SetPasswordChangePassword />,
                                        path: 'setPassword',
                                    },
                                    // {
                                    //     element: <ForgetPasswordChangePassword />,
                                    //     path: "setPassword",
                                    // },
                                ],
                            },
                        ],
                    },
                    {
                        path: '/',
                        element: <AppLayout />,
                        children: [
                            {
                                element: <Home />,
                                index: true,
                            },
                            {
                                path: '/basket',
                                element: <Basket />,
                            },
                            {
                                path: '/Watchlist',
                                element: <Watchlist />,
                            },
                            {
                                path: '/PageCrash',
                                element: <PageCrash />,
                            },
                            {
                                path: '/Help',
                                element: <Help />,
                            },
                            {
                                path: '/Requests',
                                children: [
                                    {
                                        path: '/Requests/Offline',
                                        element: <Requests />,
                                    },
                                    {
                                        path: '/Requests/OptionSettlement',
                                        element: <OptionSettlement />,
                                    },
                                ],
                            },
                            {
                                path: '/Reports',
                                // element: <Reports />,
                                children: [
                                    {
                                        path: '/Reports/orders',
                                        element: <Orders />,
                                    },
                                    {
                                        path: '/Reports/trades',
                                        element: <Trades />,
                                    },
                                    {
                                        path: '/Reports/turnover',
                                        element: <TurnOver />,
                                    },
                                ],
                            },
                            {
                                path: '/portfolio',
                                children: [
                                    {
                                        path: '/portfolio',
                                        element: <PortfolioMain />,
                                    },
                                ],
                            },
                            {
                                path: '/setting',
                                element: <Setting />,
                            },
                            {
                                path: '/Market',
                                children: [
                                    {
                                        path: '/Market/Calender',
                                        element: <Calender />,
                                    },
                                    {
                                        path: '/Market/Chart',
                                        element: <TradingView />,
                                    },
                                ],
                            },
                            {
                                path: '*',
                                element: <Page404 />,
                            },
                        ],
                    },
                ],
                {
                    future: {
                        v7_normalizeFormMethod: true,
                    },
                },
            ),
        [],
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default AppRoutes;
