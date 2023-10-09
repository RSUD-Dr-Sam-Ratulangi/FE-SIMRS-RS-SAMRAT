import React, { useState, useEffect } from 'react'
import { useOutlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar' // Import the Navbar component
import DashboardLayout from './DashboardLayout' // Import the DashboardLayout component

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
        <Navbar />
        {/* Right Side */}
        <DashboardLayout activeLink={activeLink} outlet={outlet} />
      </div>
    </div>
  )
}

export default AuthLayout
