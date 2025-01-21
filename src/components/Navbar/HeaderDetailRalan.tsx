import React from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const HeaderRalan: React.FC = () => {
  const id = useParams().id
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    {
      name: 'SOAP & Pemeriksaan',
      link: `/rawat-jalan/soap-pemeriksaan/${id}`,
    },
    {
      name: 'Assesmen Awal Keperawatan',
      link: `/rawat-jalan/awal-keperawatan/${id}`,
    },
    {
      name: 'Resume',
      link: `/rawat-jalan/resume/${id}`,
    },
    {
      name: 'Elektronik Rekam Medis',
      link: `/rawat-jalan/rme/${id}`,
    },
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

export default HeaderRalan
