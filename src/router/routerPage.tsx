import CustomerManage from '@pages/CustomersManage';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/OAuth/Login';
import Logout from '@pages/OAuth/Logout';
import Test from '@pages/Test';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layouts';
import Basket from '@pages/Basket';

const routerPagePath = {
     dashboard: '/',
     login: '/login',
     logout: '/logout',
     customersManage: '/customers-manage',
     basket: '/basket',
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
                    element: <Basket />,
                    path: routerPagePath.basket
               },
               {
                    element: <Test />,
                    path: '/test',
               },
          ],
     },
     {
          path: routerPagePath.login,
          element: <Login />,
     },
     {
          path: routerPagePath.logout,
          element: <Logout />,
     },
]);

export default <RouterProvider router={routerPage} />;

export { routerPage, routerPagePath };
