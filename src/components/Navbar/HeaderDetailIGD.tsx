import React from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const HeaderIgd: React.FC = () => {
  const id = useParams().id
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    { name: 'Triase', link: `/pasien-igd/triase-pasien/${id}` },
    { name: 'Assesmen Awal', link: `/pasien-igd/assesmen-awal/${id}` },
    { name: 'Assesmen Dokter', link: `/pasien-igd/assesmen-dokter/${id}` },
    { name: 'CPPT/SOAP', link: `/pasien-igd/soap-pemeriksaan/${id}` },
    { name: 'ICD 9 & 10', link: `/pasien-igd/icd9&10/${id}` },
    { name: 'Penunjang', link: `/pasien-igd/penunjang/${id}` },
    { name: 'Layanan & Obat', link: `/pasien-igd/layanan-obat/${id}` },
    { name: 'Tindakan', link: `/pasien-igd/tindakan/${id}` },
    { name: 'Resume Pulang', link: `/pasien-igd/selesai/${id}` },
  ]

  return (
    <div>
      <div className='navbar rounded-xl bg-white'>
        <div className='navbar-center hidden lg:flex'>
          <div className='menu menu-horizontal px-1 flex gap-4'>
            {links.map((link) => (
              <NavLink
                key={link.link}
                to={link.link}
                className={`text-disabled text-base font-sans font-bold ${
                  location.pathname === link.link ? 'text-primary' : ''
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className='flex text-disabled mt-4'>
        <ArrowLeftIcon className='w-4 mr-1' />
        <a className='font-sans cursor-pointer' onClick={() => navigate('/rawat-jalan')}>
          Kembali
        </a>
      </div>
      <Breadcrumb />
      {links.map((link, index) => (
        <div key={index}>
          {location.pathname === link.link && (
            <a href={link.link} className='text-[#121713] text-2xl font-sans font-bold mb-4'>
              {link.name}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default HeaderIgd
