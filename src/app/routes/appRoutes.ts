import { lazy } from 'react';
import PageCrash from 'src/pages/PageCrash';
import { safeLazyImport } from 'src/utils/helpers';

const Home = lazy(() => safeLazyImport(() => import('src/pages/Home')));
const Page404 = lazy(() => safeLazyImport(() => import('src/pages/Page404')));
const Login = lazy(() => safeLazyImport(() => import('src/pages/Login')));
const ForgetPassword = lazy(() => safeLazyImport(() => import('src/pages/ForgetPassword')));

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
    Page404: {
        path: '*',
        name: 'Page404',
        pageTitle: 'صفحه ناموجود',
        component: Page404,
    },
    PageCrash: {
        path: 'PageCrash',
        name: 'PageCrash',
        pageTitle: 'صفحه ناموجود',
        component: PageCrash,
    },
};

const AUTHORIZED_ROUTES = Object.values(authorizedRoutes);

const UN_AUTHORIZED_ROUTES = Object.values(unAuthorizedRoutes);

export { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES, unAuthorizedRoutes };
