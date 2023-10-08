import React from 'react'
import { Link } from 'react-router-dom'
import { HomeModernIcon, BuildingOfficeIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/solid'

interface NavbarProps {
  activeLink: string
  setActiveLink: (link: string) => void
}

// Define an array of navigation links and their corresponding icons
const navLinks = [
  { to: '/dashboard', text: 'Dasbor', icon: <HomeIcon className='w-6' /> },
  { to: '/rawat-jalan', text: 'Rawat Jalan', icon: <HomeModernIcon className='w-6' /> },
  { to: '/rawat-inap', text: 'Rawat Inap', icon: <BuildingOfficeIcon className='w-6' /> },
  { to: '/pasien', text: 'Pasien', icon: <UsersIcon className='w-6' /> },
]

const Navbar: React.FC<NavbarProps> = ({ activeLink, setActiveLink }) => {
  return (
    <div className='flex flex-col gap-4 flex-2 text-slate-600'>
      {navLinks.map((linkItem) => (
        <Link
          key={linkItem.to}
          to={linkItem.to}
          onClick={() => setActiveLink(linkItem.to)}
          className={`flex items-center gap-3 text-lg hover:bg-slate-200 p-2 rounded-xl ${
            activeLink === linkItem.to ? 'bg-white shadow-soft' : ''
          }`}
        >
          <div
            className={`${
              activeLink === linkItem.to ? 'bg-primary-500 text-white' : 'bg-white text-primary-500'
            } rounded-xl p-2 shadow-soft`}
          >
            {linkItem.icon}
          </div>
          <span className='font-bold'>{linkItem.text}</span>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
