// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { ROUTES, ROUTES_NAME } from '../../routes'

// const Breadcrumb: React.FC = () => {
//   const { pathname } = useLocation()

//   const pathnameEnum = Object.keys(ROUTES).reduce(
//     (acc, key) => {
//       acc[ROUTES[key]] = ROUTES_NAME[ROUTES[key]]
//       return acc
//     },
//     {} as Record<string, string>,
//   )

//   const pathParts = pathname.split('/').filter((part) => part !== '')

//   return (
//     <div className='text-sm breadcrumbs'>
//       <ul>
//         <li>
//           <Link to='/'>Pages</Link>
//         </li>
//         {pathParts.map((part, index) => (
//           <li key={index}>
//             <Link to={`/${pathParts.slice(0, index + 1).join('/')}`}>
//               {pathnameEnum[`/${part}`]}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <b className='text-xl'>{pathnameEnum[pathname]}</b>
//     </div>
//   )
// }

// export default Breadcrumb

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, ROUTES_NAME } from '../../routes'

const Breadcrumb: React.FC = () => {
  const { pathname } = useLocation()

  // Split the current pathname into parts
  const pathParts = pathname.split('/').filter((part) => part !== '')
  const currentPageName = ROUTES_NAME[pathname] || pathParts[pathParts.length - 1]

  return (
    <div className='text-sm breadcrumbs'>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        {pathParts.map((part, index) => {
          // Generate the path up to the current part
          const pathSlice = `/${pathParts.slice(0, index + 1).join('/')}`

          // Use ROUTES_NAME to get the breadcrumb name
          const breadcrumbName = ROUTES_NAME[pathSlice] || part

          return (
            <li key={index}>
              <Link to={pathSlice}>{breadcrumbName}</Link>
            </li>
          )
        })}
      </ul>
      <b className='text-xl'>{currentPageName}</b>
    </div>
  )
}

export default Breadcrumb
