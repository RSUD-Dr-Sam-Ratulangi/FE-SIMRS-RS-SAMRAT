import { createBrowserRouter, Navigate } from 'react-router-dom'
import PageError from './pages/PageError'
import PageDashboard from './pages/PageDashboard/PageDashboard'
import PageRawatInap from './pages/PageRawatInap/PageRawatInap'
import PageRawatJalan from './pages/PageRawatJalan/PageRawatJalan'
import PagePasien from './pages/PagePasien/PagePasien'
import AuthLayout from './utils/AuthLayout'
import PageLogin from './pages/PageLogin/PageLogin'
import PageRanapRME from './pages/PageRanapRME/PageRanapRME'
import PageRalanRME from './pages/PageRalanRME/PageRalanRME'

export const ROUTES = {
  HOME: '/',
  PAGE_404: '*',
  PAGE_LOGIN: '/login',
  PAGE_DASHBOARD: '/dashboard',
  PAGE_RAWAT_INAP: '/rawat-inap',
  PAGE_RAWAT_JALAN: '/rawat-jalan',
  PAGE_PASIEN: '/pasien',
  PAGE_RANAP_RME: '/rawat-inap/rme/:id',
  PAGE_RALAN_RME: '/rawat-jalan/rme/:id',
}

export const ROUTES_NAME = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.PAGE_LOGIN]: 'Login',
  [ROUTES.PAGE_404]: 'Page 404',
  [ROUTES.PAGE_DASHBOARD]: 'Dashboard',
  [ROUTES.PAGE_RAWAT_INAP]: 'Rawat Inap',
  [ROUTES.PAGE_RAWAT_JALAN]: 'Rawat Jalan',
  [ROUTES.PAGE_PASIEN]: 'Pasien',
  [ROUTES.PAGE_RANAP_RME]: 'Ranap RME',
  [ROUTES.PAGE_RALAN_RME]: 'Ralan RME',
}

export const routerList = [
  {
    path: ROUTES.PAGE_LOGIN,
    element: <PageLogin />,
  },
  {
    path: ROUTES.HOME,
    element: <AuthLayout />,
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
      {
        path: ROUTES.PAGE_RANAP_RME,
        element: <PageRanapRME />,
      },
      {
        path: ROUTES.PAGE_RAWAT_JALAN,
        element: <PageRawatJalan />,
      },
      {
        path: ROUTES.PAGE_RALAN_RME,
        element: <PageRalanRME />,
      },
      {
        path: ROUTES.PAGE_PASIEN,
        element: <PagePasien />,
      },
    ],
  },

  {
    path: ROUTES.PAGE_404,
    element: <PageError />,
  },
]

export const router = createBrowserRouter(routerList)
