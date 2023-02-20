import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import Dashboard from './pages/Dashboard';

// ----------------------------------------------------------------------

export default function Router() {
   return useRoutes([
      {
         path: '/',
         element: <DashboardLayout />,
         children: [
            {
               path: '/',
               element: <Dashboard />,
            },
            {
               path: '*',
               element: <Navigate to='/' />,
            }
         ],
      }
   ]);
}
