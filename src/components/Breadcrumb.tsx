import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation()

  const pathnameEnum = {
    '/dashboard': 'Dashboard',
    '/rawat-jalan': 'Rawat Jalan',
    '/rawat-inap': 'Rawat Inap',
  }

  const pathParts = pathname.split('/').filter((part) => part !== '') // Split the pathname into parts

  return (
    <div className='text-sm breadcrumbs'>
      <ul>
        <li>
          <Link to='/'>Pages</Link>
        </li>
        {pathParts.map((part, index) => (
          <li key={index}>
            <Link to={`/${pathParts.slice(0, index + 1).join('/')}`}>
              {pathnameEnum[`/${part}`]}
            </Link>
          </li>
        ))}
      </ul>
      <b className='text-xl'>{pathnameEnum[pathname]}</b>
    </div>
  )
}

export default Breadcrumb
