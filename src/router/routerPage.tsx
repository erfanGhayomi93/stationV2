import CustomerManage from '@pages/CustomersManage';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/OAuth/Login';
import Logout from '@pages/OAuth/Logout';
import Test from '@pages/Test';
import { RouterProvider } from 'react-router/dom';
import AppLayout from '../layouts';
import Basket from '@pages/Basket';
import SplashScreenWrapper from 'layouts/components/SplashScreen';
import { createBrowserRouter } from 'react-router';
import TradesReports from '@pages/Reports/TradesReports';

const routerPagePath = {
     dashboard: '/',
     login: '/login',
     logout: '/logout',
     customersManage: '/customers-manage',
     basket: '/basket',
     reports: {
          trades: '/reports/trades',
     },
};

const routerPage = createBrowserRouter(
     [
          {
               path: '/',
               element: <SplashScreenWrapper />,
               children: [
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
                                   path: routerPagePath.basket,
                              },
                              {
                                   element: <TradesReports />,
                                   path: routerPagePath.reports.trades,
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
               ],
          },
     ],
     {
          future: {
               v7_startTransition: true,
          },
     }
);

export default <RouterProvider router={routerPage} />;

export { routerPage, routerPagePath };
