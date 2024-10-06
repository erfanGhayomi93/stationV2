import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '@pages/Dashboard';
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
          ],
     },
]);

export default <RouterProvider router={routerPage} />;
