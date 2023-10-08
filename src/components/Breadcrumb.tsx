import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTES_NAME } from '../routes'

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation()

  const pathnameEnum = Object.keys(ROUTES).reduce(
    (acc, key) => {
      acc[ROUTES[key]] = ROUTES_NAME[ROUTES[key]]
      return acc
    },
    {} as Record<string, string>,
  )

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
