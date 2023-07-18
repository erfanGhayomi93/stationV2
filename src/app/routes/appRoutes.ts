import { lazy } from 'react';
import Help from 'src/pages/Help';
import PageCrash from 'src/pages/PageCrash';
import { safeLazyImport } from 'src/utils/helpers';

const Home = lazy(() => safeLazyImport(() => import('src/pages/Home')));
const Page404 = lazy(() => safeLazyImport(() => import('src/pages/Page404')));
const Login = lazy(() => safeLazyImport(() => import('src/pages/Login')));
const Basket = lazy(() => safeLazyImport(() => import('src/pages/basket/context/BasketContext')));
const Watchlist = lazy(() => safeLazyImport(() => import('src/pages/Watchlist')));
const ForgetPassword = lazy(() => safeLazyImport(() => import('src/pages/ForgetPassword')));
const Reports = lazy(() => safeLazyImport(() => import('src/pages/Reports/Context/ReportsContext')));

const unAuthorizedRoutes = {
    Login: {
        path: '/Login',
        name: 'Login',
        pageTitle: 'صفحه ورود',
        component: Login,
    },
    ForgetPassword: {
        path: '/forgetPassword',
        name: 'ForgetPassword',
        pageTitle: 'فراموشی رمز عبور',
        component: ForgetPassword,
    },
};

const authorizedRoutes = {
    Home: {
        path: '/',
        name: 'Home',
        pageTitle: 'صفحه اصلی',
        component: Home,
    },
    Reports: {
        path: '/Reports/:activeTab',
        name: 'Reports',
        pageTitle: 'صفحه اصلی',
        component: Reports,
    },
    Basket: {
        path: '/basket',
        name: 'basket',
        pageTitle: 'سبد معامله‌گر',
        component: Basket,
    },
    WatchList: {
        path: '/Watchlist',
        name: 'Watchlist',
        pageTitle: 'دیدبان',
        component: Watchlist,
    },
    Page404: {
        path: '*',
        name: 'Page404',
        pageTitle: 'صفحه ناموجود',
        component: Page404,
    },
    PageCrash: {
        path: '/PageCrash',
        name: 'PageCrash',
        pageTitle: 'صفحه ناموجود',
        component: PageCrash,
    },
    Help: {
        path: '/Help',
        name: 'Help',
        pageTitle: 'کمک',
        component: Help,
    },
};

const AUTHORIZED_ROUTES = Object.values(authorizedRoutes);

const UN_AUTHORIZED_ROUTES = Object.values(unAuthorizedRoutes);

export { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES, unAuthorizedRoutes };
