import { createBrowserRouter, Navigate } from 'react-router-dom'
import PageError from './pages/PageError'
import PageDashboard from './pages/PageDashboard/PageDashboard'
import PageRawatInap from './pages/PageRawatInap/PageRawatInap'
import PageRawatJalan from './pages/PageRawatJalan/PageRawatJalan'
import PagePasienIGD from './pages/PagePasienIGD/PagePasienIGD'
import AuthLayout from './utils/AuthLayout'
import PageLogin from './pages/PageLogin/PageLogin'
import PageRanapRME from './components/Layouts/Ranap/PageRanapRME/PageRanapRME'
import PageRalanRME from './components/Layouts/Ralan/PageRalanRME/PageRalanRME'
import PageSoapRalanPemeriksaan from './components/RawatJalan/RalanSOAP/RalanSoapPemeriksaan'
import PageSoapRanapPemeriksaan from './components/RawatInap/RanapSoap/RanapSoapPemeriksaan'
import PageIgdPemeriksaan from './components/IGD/IgdSoapPemeriksaan'
import PageAntrianRajal from './pages/PageAntrianRawatJalan/PageAntrianRajal'
import PageRanapAssessmenAwal from './components/Layouts/Ranap/PageRanapAssessmenAwal/PageRanapAssessmenAwal'
import PageRanapAssessmenDokter from './components/Layouts/Ranap/PageRanapAssessmenDokter/PageRanapAssessmenDokter'
import PageRanapPenunjang from './components/Layouts/Ranap/PageRanapPenunjang/PageRanapPenunjang'
import PageRanapLayananObat from './components/Layouts/Ranap/PageRanapLayananObat/PageRanapLayananObat'
import PageRanapTindakan from './components/Layouts/Ranap/PageRanapTindakan/PageRanapTindakan'
import PageRanapSelesai from './components/Layouts/Ranap/PageRanapSelesai/PageRanapSelesai'
import PageIgdAssesmenAwal from './components/Layouts/igd/PageIgdAssesmenAwal/PageIgdAssesmenAwal'
import PageIgdAssesmenDokter from './components/Layouts/igd/PageIgdAssesmenDokter/PageIgdAssesmentDokter'
import PageIgdPenunjang from './components/Layouts/igd/PageIgdPenunjang/PageIgdPenunjang'
import PageIgdLayananObat from './components/Layouts/igd/PageIgdLayananObat/PageIgdLayananObat'
import PageIgdTindakan from './components/Layouts/igd/PageIgdTindakan/PageIgdTindakan'
import PageIgdSelesai from './components/Layouts/igd/PageIgdSelesai/PageIgdSelesai'
import PageIgdTriase from './components/Layouts/igd/PageIgdTriase/PageIgdTriase'
import PageIgdIcd from './components/Layouts/igd/PageIgdIcd/PageIgdIcd'

export const ROUTES = {
  HOME: '/',
  PAGE_404: '*',
  PAGE_LOGIN: '/login',
  PAGE_DASHBOARD: '/dashboard',
  PAGE_RAWAT_INAP: '/rawat-inap',
  PAGE_RAWAT_JALAN: '/rawat-jalan',
  PAGE_PASIEN_IGD: '/pasien-igd',
  PAGE_RANAP_RME: '/rawat-inap/rme/:id',
  PAGE_RANAP_SOAP_PEMERIKSAAN: '/rawat-inap/soap-pemeriksaan/:id',
  PAGE_RANAP_ASSESSMEN_AWAL: '/rawat-inap/assesmen-awal/:id',
  PAGE_RANAP_ASSESSMEN_DOKTER: '/rawat-inap/assesmen-dokter/:id',
  PAGE_RANAP_LAYANAN_OBAT: '/rawat-inap/layanan-obat/:id',
  PAGE_RANAP_PENUNJANG: '/rawat-inap/penunjang/:id',
  PAGE_RANAP_TINDAKAN: '/rawat-inap/tindakan/:id',
  PAGE_RANAP_SELESAI: '/rawat-inap/selesai/:id',
  PAGE_RANAP_BERKAS_DIGITAL: '/rawat-inap/berkas-digital/:id',
  PAGE_RALAN_RME: '/rawat-jalan/rme/:id',
  PAGE_SOAP_RALAN: '/rawat-jalan/soap-pemeriksaan/:id',
  PAGE_SOAP_IGD: '/pasien-igd/soap-pemeriksaan/:id',
  PAGE_IGD_ASSESSMEN_AWAL: '/pasien-igd/assesmen-awal/:id',
  PAGE_IGD_ASSESSMEN_DOKTER: 'pasien-igd/assesmen-dokter/:id',
  PAGE_IGD_PENUNJANG: '/pasien-igd/penunjang/:id',
  PAGE_IGD_ICD: '/pasien-igd/icd9&10/:id',
  PAGE_IGD_TINDAKAN: '/pasien-igd/tindakan/:id',
  PAGE_IGD_SELESAI: '/pasien-igd/selesai/:id',
  PAGE_IGD_LAYANAN_OBAT: '/pasien-igd/layanan-obat/:id',
  PAGE_IGD_TRIASE: '/pasien-igd/triase-pasien/:id',
  PAGE_RALAN_LAYANAN_OBAT: '/rawat-jalan/layanan-obat/:id',
  PAGE_RALAN_BERKAS_DIGITAL: '/rawat-jalan/berkas-digital/:id',
  PAGE_ANTRIAN_RALAN: '/antrian-ralan',
}

export const ROUTES_NAME = {
  [ROUTES.HOME]: 'Home',
  [ROUTES.PAGE_LOGIN]: 'Login',
  [ROUTES.PAGE_404]: 'Page 404',
  [ROUTES.PAGE_DASHBOARD]: 'Dashboard',
  [ROUTES.PAGE_RAWAT_INAP]: 'Rawat Inap',
  [ROUTES.PAGE_RAWAT_JALAN]: 'Rawat Jalan',
  [ROUTES.PAGE_PASIEN_IGD]: 'Pasien IGD',
  [ROUTES.PAGE_RANAP_RME]: 'Ranap RME',
  [ROUTES.PAGE_RANAP_SOAP_PEMERIKSAAN]: 'Ranap SOAP & Pemeriksaan',
  [ROUTES.PAGE_RANAP_ASSESSMEN_AWAL]: 'Ranap Assesmen Awal',
  [ROUTES.PAGE_RANAP_ASSESSMEN_DOKTER]: 'Ranap Assesmen Dokter',
  [ROUTES.PAGE_RANAP_TINDAKAN]: 'Ranap Tindakan',
  [ROUTES.PAGE_RANAP_PENUNJANG]: 'Ranap Penunjang',
  [ROUTES.PAGE_RANAP_SELESAI]: 'Ranap Selesai',
  [ROUTES.PAGE_RANAP_LAYANAN_OBAT]: 'Ranap Layanan & Obat',
  [ROUTES.PAGE_RANAP_BERKAS_DIGITAL]: 'Ranap Berkas Digital',
  [ROUTES.PAGE_RALAN_RME]: 'Ralan RME',
  [ROUTES.PAGE_SOAP_RALAN]: 'Ralan Soap & Pemeriksaan',
  [ROUTES.PAGE_RALAN_LAYANAN_OBAT]: 'Ralan Layanan & Obat',
  [ROUTES.PAGE_RALAN_LAYANAN_OBAT]: 'Ralan Layanan & Obat',
  [ROUTES.PAGE_ANTRIAN_RALAN]: 'Antrian Ralan',
  [ROUTES.PAGE_SOAP_IGD]: 'IGD Soap & Pemeriksaan',
  [ROUTES.PAGE_IGD_ASSESSMEN_AWAL]: 'IGD Assesmen Awal',
  [ROUTES.PAGE_IGD_ASSESSMEN_DOKTER]: 'IGD Assesmen Dokter',
  [ROUTES.PAGE_IGD_TINDAKAN]: 'IGD Tindakan',
  [ROUTES.PAGE_IGD_PENUNJANG]: 'IGD Penunjang',
  [ROUTES.PAGE_IGD_SELESAI]: 'IGD Selesai',
  [ROUTES.PAGE_IGD_TRIASE]: 'IGD Triase',
  [ROUTES.PAGE_IGD_LAYANAN_OBAT]: 'IGD layanan & Obat',
  [ROUTES.PAGE_IGD_ICD]: 'IGD ICD 9 & 10',
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
        path: ROUTES.PAGE_RANAP_ASSESSMEN_AWAL,
        element: <PageRanapAssessmenAwal />,
      },
      {
        path: ROUTES.PAGE_RANAP_ASSESSMEN_DOKTER,
        element: <PageRanapAssessmenDokter />,
      },
      {
        path: ROUTES.PAGE_RANAP_PENUNJANG,
        element: <PageRanapPenunjang />,
      },
      {
        path: ROUTES.PAGE_RANAP_TINDAKAN,
        element: <PageRanapTindakan />,
      },
      {
        path: ROUTES.PAGE_RANAP_SOAP_PEMERIKSAAN,
        element: <PageSoapRanapPemeriksaan />,
      },
      {
        path: ROUTES.PAGE_RANAP_LAYANAN_OBAT,
        element: <PageRanapLayananObat />,
      },
      {
        path: ROUTES.PAGE_RANAP_SELESAI,
        element: <PageRanapSelesai />,
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
        path: ROUTES.PAGE_PASIEN_IGD,
        element: <PagePasienIGD />,
      },
      {
        path: ROUTES.PAGE_SOAP_RALAN,
        element: <PageSoapRalanPemeriksaan />,
      },
      {
        path: ROUTES.PAGE_ANTRIAN_RALAN,
        element: <PageAntrianRajal />,
      },
      {
        path: ROUTES.PAGE_SOAP_IGD,
        element: <PageIgdPemeriksaan />,
      },
      {
        path: ROUTES.PAGE_IGD_ASSESSMEN_AWAL,
        element: <PageIgdAssesmenAwal />,
      },
      {
        path: ROUTES.PAGE_IGD_ASSESSMEN_DOKTER,
        element: <PageIgdAssesmenDokter />,
      },
      {
        path: ROUTES.PAGE_IGD_PENUNJANG,
        element: <PageIgdPenunjang />,
      },
      {
        path: ROUTES.PAGE_IGD_ICD,
        element: <PageIgdIcd />,
      },
      {
        path: ROUTES.PAGE_IGD_LAYANAN_OBAT,
        element: <PageIgdLayananObat />,
      },
      {
        path: ROUTES.PAGE_IGD_TINDAKAN,
        element: <PageIgdTindakan />,
      },
      {
        path: ROUTES.PAGE_IGD_SELESAI,
        element: <PageIgdSelesai />,
      },
      {
        path: ROUTES.PAGE_IGD_TRIASE,
        element: <PageIgdTriase />,
      },
    ],
  },

  {
    path: ROUTES.PAGE_404,
    element: <PageError />,
  },
]

// export const router = createBrowserRouter(routerList, {
//   basename: '/simrs',
// })
export const router = createBrowserRouter(routerList)
