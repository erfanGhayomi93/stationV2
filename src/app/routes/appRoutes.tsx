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
                        }
                    ]
                },
                {
                    path: "/Market",
                    children: [
                        {
                            path: "/Market/Calender",
                            element: <Calender />
                        }
                    ]
                },{
                    path:"*" ,
                    element : <Page404 />
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

// const unAuthorizedRoutes = {
//     Login: {
//         path: '/Login',
//         name: 'Login',
//         pageTitle: 'صفحه ورود',
//         component: Login,
//     },
//     ForgetPassword: {
//         path: '/forgetPassword',
//         name: 'ForgetPassword',
//         pageTitle: 'فراموشی رمز عبور',
//         component: ForgetPassword,
//     },
// };

// const authorizedRoutes = {
//     Home: {
//         path: '/',
//         name: 'Home',
//         pageTitle: 'صفحه اصلی',
//         component: Home,
//     },
//     Reports: {
//         path: '/Reports/:activeTab',
//         name: 'Reports',
//         pageTitle: 'صفحه اصلی',
//         component: Reports,
//         children : [
//
//         ]
//
//     },
//     Basket: {
//         path: '/basket',
//         name: 'basket',
//         pageTitle: 'سبد معامله‌گر',
//         component: Basket,
//     },
//     WatchList: {
//         path: '/Watchlist',
//         name: 'Watchlist',
//         pageTitle: 'دیدبان',
//         component: Watchlist,
//     },
//     Page404: {
//         path: '*',
//         name: 'Page404',
//         pageTitle: 'صفحه ناموجود',
//         component: Page404,
//     },
//     PageCrash: {
//         path: '/PageCrash',
//         name: 'PageCrash',
//         pageTitle: 'صفحه ناموجود',
//         component: PageCrash,
//     },
//     Help: {
//         path: '/Help',
//         name: 'Help',
//         pageTitle: 'کمک',
//         component: Help,
//     },
// };

// const AUTHORIZED_ROUTES = Object.values(authorizedRoutes);

// const UN_AUTHORIZED_ROUTES = Object.values(unAuthorizedRoutes);

// export { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES, unAuUN_AUTHORIZED_ROUTESthorizedRoutes };
