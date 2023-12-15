import React from 'react'
import { ROUTES, ROUTES_NAME } from '../../routes'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  HomeIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const handleExitClick = () => {
    // Clear all items from local storage
    localStorage.clear()
    console.log('Local storage cleared')
    navigate('/login')
  }

  const navLinks = [
    {
      to: ROUTES.PAGE_DASHBOARD,
      text: ROUTES_NAME[ROUTES.PAGE_DASHBOARD],
      icon: <HomeIcon className='w-6' />,
    },
    {
      to: ROUTES.PAGE_RAWAT_JALAN,
      text: ROUTES_NAME[ROUTES.PAGE_RAWAT_JALAN],
      icon: <HomeModernIcon className='w-6' />,
    },
    {
      to: ROUTES.PAGE_RAWAT_INAP,
      text: ROUTES_NAME[ROUTES.PAGE_RAWAT_INAP],
      icon: <BuildingOfficeIcon className='w-6' />,
    },
    {
      to: ROUTES.PAGE_PASIEN_IGD,
      text: ROUTES_NAME[ROUTES.PAGE_PASIEN_IGD],
      icon: <UsersIcon className='w-6' />,
    },
  ]

  return (
    <div className='flex flex-col justify-start gap-4 items-stretch h-full w-[288px] bg-primary-1 text-white p-4 border border-r-2'>
      {/* Sidebar Logo */}
      <div className='grid items-center justify-center p-4'>
        <img src='/assets/images/LOGORSREVISI4.png' alt='Logo' className='w-56 h-40' />
        <span className='text-3xl font-bold text-dark text-center'>SIMRS</span>
      </div>
      <hr className='stroke-[rgba(224, 225, 226, 0.00)]' />
      <div className='flex flex-col gap-4 flex-2 text-slate-600'>
        {navLinks.map((linkItem) => (
          <NavLink
            key={linkItem.to}
            to={linkItem.to}
            className={({ isActive }) =>
              `flex items-center gap-3 text-lg hover:bg-slate-200 p-2 rounded-xl  [&_div]:rounded-xl  [&_div]:p-2  [&_div]:shadow-soft ${
                isActive
                  ? 'bg-white shadow-soft [&_div]:bg-primary-500 [&_div]:text-white'
                  : '[&_div]:bg-white [&_div]:text-primary-500'
              }`
            }
          >
            <div>{linkItem.icon}</div>
            <span className='font-bold'>{linkItem.text}</span>
          </NavLink>
        ))}
      </div>
      <div className='p-4 mt-auto'>
        <button
          className='btn bg-gray-50 border border-none flex items-center gap-3 text-lg text-red-500 w-full'
          onClick={handleExitClick}
        >
          <ArrowLeftOnRectangleIcon className='w-6' />
          <span className='font-bold'>Keluar</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar