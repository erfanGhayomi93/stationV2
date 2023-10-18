import { FC, lazy, useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Help from 'src/pages/Help';
import PageCrash from 'src/pages/PageCrash';
import { safeLazyImport } from 'src/utils/helpers';

const Home = lazy(() => safeLazyImport(() => import('src/pages/Home')));
const Page404 = lazy(() => safeLazyImport(() => import('src/pages/Page404')));
const Login = lazy(() => safeLazyImport(() => import('src/pages/Login')));
const Basket = lazy(() => safeLazyImport(() => import('src/pages/basket/context/BasketContext')));
const Watchlist = lazy(() => safeLazyImport(() => import('src/pages/Watchlist')));
const ForgetPassword = lazy(() => safeLazyImport(() => import('src/pages/ForgetPassword')));
const Orders = lazy(() => safeLazyImport(() => import('src/pages/Reports/Orders')));
const Trades = lazy(() => safeLazyImport(() => import('src/pages/Reports/Trades')));
const TurnOver = lazy(() => safeLazyImport(() => import('src/pages/Reports/TurnOver')));
const Calender = lazy(() => safeLazyImport(() => import('src/pages/Market/calender')));
const TradingView = lazy(() => safeLazyImport(() => import('src/pages/Market/Chart/context/index')));
const Requests = lazy(() => safeLazyImport(() => import('src/pages/Reports/Requests')));
const PortfolioMain = lazy(() => safeLazyImport(() => import('src/pages/portfolio/list/index')));

import AppLayout from '../Layout';
import AuthLayout from '../Layout/AuthLayout';


const AppRoutes: FC = () => {

    const router = useMemo(() => createBrowserRouter([
        {
            path: "/",
            element: <AuthLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                    index: true,
                },
                {
                    path: '/ForgetPassword',
                    element: <ForgetPassword />,
                },
            ]
        },
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    element: <Home />,
                    index: true
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
                        {
                            path: '/Reports/requests',
                            element: <Requests />,
                        }
                    ]
                },
                {
                    path: "/portfolio",
                    children: [
                        {
                            path: "/portfolio",
                            element: <PortfolioMain />
                        }
                    ]
                },
                {
                    path: "/Market",
                    children: [
                        {
                            path: "/Market/Calender",
                            element: <Calender />
                        },
                        {
                            path: "/Market/Chart",
                            element: <TradingView />
                        }
                    ]
                }, {
                    path: "*",
                    element: <Page404 />
                }
            ]
        }
    ]
        , {
            future: {
                v7_normalizeFormMethod: true
            }
        }
    ),
        [],
    );





    return (
        <>
            <RouterProvider router={router} />
        </>
    )
};

export default AppRoutes;
