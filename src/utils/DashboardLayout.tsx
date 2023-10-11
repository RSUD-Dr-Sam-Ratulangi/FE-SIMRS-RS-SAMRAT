import React from 'react'

interface DashboardLayoutProps {
  activeLink: string
  outlet: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ activeLink, outlet }) => {
  return (
    <div
      className={`h-full overflow-auto ${
        activeLink === '/login' ? 'w-full' : 'w-[calc(100%-288px)]'
      } fixed right-0`}
    >
      <div className='p-3'>{outlet}</div>
    </div>
  )
}

export default DashboardLayout
