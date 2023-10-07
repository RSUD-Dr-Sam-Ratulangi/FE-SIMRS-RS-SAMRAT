import { createBrowserRouter, Navigate } from 'react-router-dom';
import PageHome from './pages/PageHome';
import PageError from './pages/PageError';
import PageRawatInap from './pages/PageRawatInap/PageRawatInap';

export const ROUTES = {
  HOME: '/',
  PAGE_404: '*',
  PAGE_RAWAT_INAP: '/rawat-inap',
};

export const routerList = [
  {
    path: ROUTES.HOME,
    element: <PageHome />,
    errorElement: <PageError />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PAGE_RAWAT_INAP} replace={true} />,
      },
      {
        path: ROUTES.PAGE_RAWAT_INAP,
        element: <PageRawatInap />,
      },
    ],
  },
];

export const router = createBrowserRouter(routerList);
