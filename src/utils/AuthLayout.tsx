import React, { useState, useEffect, useRef } from 'react'
import { useOutlet } from 'react-router-dom'
import Navbar from '../components/Navbar/SideNavbar' // Import the Navbar component
import DashboardLayout from './DashboardLayout' // Import the DashboardLayout component

const AuthLayout: React.FC = () => {
  const outlet = useOutlet()
  const [activeLink, setActiveLink] = useState('')
  const [showLeftSide, setShowLeftSide] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleMouseMove = (event: MouseEvent) => {
      const buffer = 5
      if (event.clientX < 15 + buffer) {
        setShowLeftSide(true)
        clearTimeout(timer)
        timer = setTimeout(() => {
          setShowLeftSide(false)
        }, 3000) // TUTUP JIKA SUDAH 3 DETIK (NOT WORKING)
      } else if (
        event.clientX > 135 &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setShowLeftSide(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className='flex items-stretch h-screen'>
      <div
        ref={navbarRef}
        className={`transition-all duration-700  ${
          showLeftSide ? 'min-w-min' : 'w-0'
        } overflow-hidden`}
      >
        {/* Left Side */}
        <Navbar />
      </div>
      <div className='w-full h-screen overflow-auto'>
        <DashboardLayout activeLink={activeLink} outlet={outlet} />
      </div>
    </div>
  )
}

export default AuthLayout
