import React from 'react'

interface DashboardLayoutProps {
  activeLink: string
  outlet: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ outlet }) => {
  return (
    <div className='w-full'>
      <div className='p-3'>{outlet}</div>
    </div>
  )
}

export default DashboardLayout
