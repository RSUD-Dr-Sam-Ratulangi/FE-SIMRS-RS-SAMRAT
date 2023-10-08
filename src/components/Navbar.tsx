import React from 'react'
import { ROUTES, ROUTES_NAME } from '../routes'
import { NavLink } from 'react-router-dom'
import { HomeModernIcon, BuildingOfficeIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/solid'

const Navbar: React.FC = () => {
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
      to: ROUTES.PAGE_PASIEN,
      text: ROUTES_NAME[ROUTES.PAGE_PASIEN],
      icon: <UsersIcon className='w-6' />,
    },
  ]

  return (
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
  )
}

export default Navbar
