import Dashboard from '@pages/Dashboard';
import Test from '@pages/Test';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../layouts';

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
                    element: <Test />,
                    path: '/test',
               },
          ],
     },
]);

export default <RouterProvider router={routerPage} />;
