import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageHome from './pages/PageHome';
import PageError from './pages/PageError';
import PageDashboard from './pages/PageDahsboard/PageDashboard';
import PageRawatInap from './pages/PageRawatInap/PageRawatInap';

export const ROUTES = {
  HOME: '/',
  PAGE_404: '*',
  PAGE_RAWAT_INAP: '/rawat-inap',
  PAGE_DASHBOARD: '/dashboard',
};

export const routerList = [
  {
    path: ROUTES.HOME,
    element: <PageHome />,
    errorElement: <PageError />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PAGE_DASHBOARD} replace={true} />,
      },
      {
        path: ROUTES.PAGE_DASHBOARD,
        element: <PageDashboard />,
      },
      {
        path: ROUTES.PAGE_RAWAT_INAP,
        element: <PageRawatInap />,
      },
    ],
  },

  {
    path: ROUTES.PAGE_404,
    element: <PageError />,
  },
];

export const router = createBrowserRouter(routerList);
