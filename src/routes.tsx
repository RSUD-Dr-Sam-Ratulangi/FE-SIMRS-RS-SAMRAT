import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import AuthLayout from './utils/AuthLayout'
import PageLogin from './pages/PageLogin/PageLogin'
import PageDashboard from './pages/PageDashboard/PageDashboard'
import PageRawatInap from './pages/PageRawatInap/PageRawatInap'
import PageRawatJalan from './pages/PageRawatJalan/PageRawatJalan'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<PageLogin />} />
      <Route element={<AuthLayout />}>
        <Route path='/dashboard' element={<PageDashboard />} />
        <Route path='/rawat-inap' element={<PageRawatInap />} />
        <Route path='/rawat-jalan' element={<PageRawatJalan />} />
      </Route>
    </>,
  ),
)
