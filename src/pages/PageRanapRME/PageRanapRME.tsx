import React from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'

export default function PageRanapRME() {
  const { id } = useParams()

  return (
    <div>
      <Breadcrumb />
      PageRME {id}
    </div>
  )
}
