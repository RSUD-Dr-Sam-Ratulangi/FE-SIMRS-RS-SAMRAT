import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

export default function PageLogin() {
  return (
    <div>
      <Breadcrumb />
      PageLogin
      <a href='/dashboard' className='btn btn-primary'>
        Go To Dashboard
      </a>
    </div>
  )
}
