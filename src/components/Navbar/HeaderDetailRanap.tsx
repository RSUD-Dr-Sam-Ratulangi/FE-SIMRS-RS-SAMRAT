import React from 'react'
import { NavLink, useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import Breadcrumb from '../BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const HeaderRanap: React.FC = () => {
  const id = useParams().id
  const location = useLocation()
  const navigate = useNavigate()

  const links = [
    {
      name: 'Elektronik Rekam Medis',
      link: `/rawat-inap/rme/${id}`,
    },
    {
      name: 'SOAP & Pemeriksaan',
      link: `/rawat-inap/soap-pemeriksaan/${id}`,
    },
  ]

  return (
    <div>
      <div className='navbar rounded-xl bg-white'>
        <div className='navbar-center hidden lg:flex'>
          <div className='menu menu-horizontal px-1 flex gap-4 '>
            {links.map((link) => (
              <NavLink key={link.link} to={link.link}>
                <Link
                  to={link.link}
                  className={`text-disabled text-base font-sans font-bold ${
                    location.pathname === link.link ? 'text-primary' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className='flex text-disabled mt-4'>
        <ArrowLeftIcon className='w-4 mr-1' />
        <a className=' font-sans cursor-pointer' onClick={() => navigate('/rawat-inap')}>
          Kembali
        </a>
      </div>
      <Breadcrumb />
      {links.map((link, index) => (
        <div key={index}>
          <a
            key={index}
            href={link.link}
            className={` text-[#121713] text-2xl font-sans font-bold mb-4 ${
              location.pathname === link.link ? '' : 'hidden'
            }`}
          ></a>
        </div>
      ))}
    </div>
  )
}

export default HeaderRanap