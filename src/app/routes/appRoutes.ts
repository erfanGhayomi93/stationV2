import { lazy } from 'react';
import { safeLazyImport } from 'src/utils/helpers';

const Home = lazy(() => safeLazyImport(() => import('src/pages/Home')));
const Page404 = lazy(() => safeLazyImport(() => import('src/pages/Page404')));
const Login = lazy(() => safeLazyImport(() => import('src/pages/Login')));
const Basket = lazy(() => safeLazyImport(() => import('src/pages/basket')));

const AUTHORIZED_ROUTES = [
    {
        path: '/',
        name: 'Home',
        pageTitle: 'صفحه اصلی',
        component: Home,
    },
    {
        path: '/basket',
        name: 'basket',
        pageTitle: 'سبد معامله‌گر',
        component: Basket,
    },
    {
        path: '*',
        name: 'Page404',
        pageTitle: 'صفحه ناموجود',
        component: Page404,
    },
];

const UN_AUTHORIZED_ROUTES = [
    {
        path: '/Login',
        name: 'Login',
        pageTitle: 'صفحه ورود',
        component: Login,
    },
];

export { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES };
