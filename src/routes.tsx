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
import SoapRalan from './components/RalanEdit/soapPemeriksaanRalan'
import RanapSoapPemeriksaan from './components/RanapSoapPemeriksaan/RanapSoapPemeriksaan'
import RanapLayananObat from './components/RanapLayananObat/RanapLayananObat'
import RanapBerkasDigital from './components/RanapBerkasDigital/RanapBerkasDigital'
import LayananObatRalan from './components/RalanEdit/layananObatRalan'
import BerkasDigitalRalan from './components/RalanEdit/berkasDigital'
// import NewPageRalanRME from './components/RalanEdit/newPageRalanRME'

export const ROUTES = {
  HOME: '/',
  PAGE_404: '*',
  PAGE_LOGIN: '/login',
  PAGE_DASHBOARD: '/dashboard',
  PAGE_RAWAT_INAP: '/rawat-inap',
  PAGE_RAWAT_JALAN: '/rawat-jalan',
  PAGE_PASIEN: '/pasien',
  PAGE_RANAP_RME: '/rawat-inap/rme/:id',
  PAGE_RANAP_SOAP_PEMERIKSAAN: '/rawat-inap/soap-pemeriksaan/:id',
  PAGE_RANAP_LAYANAN_OBAT: '/rawat-inap/layanan-obat/:id',
  PAGE_RANAP_BERKAS_DIGITAL: '/rawat-inap/berkas-digital/:id',
  PAGE_RALAN_RME: '/rawat-jalan/rme/:id',
  PAGE_SOAP_RALAN: '/rawat-jalan/soap-pemeriksaan/:id',
  PAGE_RALAN_LAYANAN_OBAT: '/rawat-jalan/layanan-obat/:id',
  PAGE_RALAN_BERKAS_DIGITAL: '/rawat-jalan/berkas-digital/:id',
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
  [ROUTES.PAGE_RANAP_SOAP_PEMERIKSAAN]: 'Ranap SOAP & Pemeriksaan',
  [ROUTES.PAGE_RANAP_LAYANAN_OBAT]: 'Ranap Layanan & Obat',
  [ROUTES.PAGE_RANAP_BERKAS_DIGITAL]: 'Ranap Berkas Digital',
  [ROUTES.PAGE_RALAN_RME]: 'Ralan RME',
  [ROUTES.PAGE_SOAP_RALAN]: 'Soap & Pemeriksaan',
  [ROUTES.PAGE_RALAN_LAYANAN_OBAT]: 'Ralan Layanan & Obat',
  [ROUTES.PAGE_RALAN_LAYANAN_OBAT]: 'Ralan Layanan & Obat',
}

const columnsSOAPRalan = [
  {
    name: 'Tanggal',
    selector: 'tanggal',
    width: '15%',
  },
  {
    name: 'Nama Item',
    selector: 'namaItem',
    width: '15%',
  },
  {
    name: 'Provider',
    selector: 'provider',
    width: '35%',
    right: true,
    // center: true,
    style: { paddingRight: '0.5rem' },
  },
  {
    name: 'Tarif',
    selector: 'tarif',
    width: '15%',
    right: true,
    style: { marginLeft: '3rem' },
  },
  {
    name: 'Aksi',
    selector: () => <button className='btn btn-xs btn-ghost text-[#D3444A] p-0'>Hapus</button>,

    // style: { paddingRight: '2rem' },
    right: true,
  },
]

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
        element: <Navigate to={ROUTES.PAGE_LOGIN} replace={true} />,
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
        path: ROUTES.PAGE_RANAP_SOAP_PEMERIKSAAN,
        element: <RanapSoapPemeriksaan />,
      },
      {
        path: ROUTES.PAGE_RANAP_LAYANAN_OBAT,
        element: <RanapLayananObat />,
      },
      {
        path: ROUTES.PAGE_RANAP_BERKAS_DIGITAL,
        element: <RanapBerkasDigital />,
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
      {
        path: ROUTES.PAGE_SOAP_RALAN,
        element: <SoapRalan />,
      },
      {
        path: ROUTES.PAGE_RALAN_LAYANAN_OBAT,
        element: <LayananObatRalan columns={columnsSOAPRalan} />,
      },
      {
        path: ROUTES.PAGE_RALAN_BERKAS_DIGITAL,
        element: <BerkasDigitalRalan />,
      },
    ],
  },

  {
    path: ROUTES.PAGE_404,
    element: <PageError />,
  },
]

export const router = createBrowserRouter(routerList)
