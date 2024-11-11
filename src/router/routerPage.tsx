import CustomerManage from '@pages/CustomersManage';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/OAuth/Login';
import Logout from '@pages/OAuth/Logout';
import Test from '@pages/Test';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layouts';

const routerPagePath = {
     dashboard: '/',
     oAuth: {
          login: '/oauth/login',
          logout: '/oauth/logout',
     },
     customersManage: '/customers-manage',
};

const routerPage = createBrowserRouter([
     {
          path: '/',
          element: <AppLayout />,
          children: [
               {
                    element: <Dashboard />,
                    index: true,
               },

               {
                    element: <CustomerManage />,
                    path: routerPagePath.customersManage,
               },

               {
                    element: <Test />,
                    path: '/test',
               },
          ],
     },
     {
          path: routerPagePath.oAuth.login,
          element: <Login />,
     },
     {
          path: routerPagePath.oAuth.logout,
          element: <Logout />,
     },
]);

export default <RouterProvider router={routerPage} />;

export { routerPage, routerPagePath };
