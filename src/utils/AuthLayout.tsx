import React, { useState, useEffect } from 'react'
import { useOutlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar' // Import the Navbar component
import DashboardLayout from './DashboardLayout' // Import the DashboardLayout component
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

const AuthLayout: React.FC = () => {
  const outlet = useOutlet()
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  return (
    <div className='flex flex-col items-stretch h-screen overflow-hidden'>
      <div className='relative flex flex-row items-start h-full overflow-hidden'>
        {/* Left Side */}
        <div className='flex flex-col justify-start gap-4 items-stretch h-full w-[288px] bg-primary-1 text-white p-4'>
          {/* Sidebar Logo */}
          <div className='p-4 flex justify-center items-center'>
            <img src='/assets/images/logo.png' alt='Logo' className='w-10 h-10' />
            <span className='text-dark font-bold text-3xl'>SIMRS</span>
          </div>
          <hr className='stroke-[rgba(224, 225, 226, 0.00)]' />
          {/* Navbar Links */}
          <Navbar />
          {/* Logout Button */}
          <div className='mt-auto p-4'>
            <button className='flex items-center gap-3 text-lg text-red-500'>
              <ArrowLeftOnRectangleIcon className='w-6' />
              <span className='font-bold'>Keluar</span>
            </button>
          </div>
        </div>
        {/* Right Side */}
        <DashboardLayout activeLink={activeLink} outlet={outlet} />
      </div>
    </div>
  )
}

export default AuthLayout
