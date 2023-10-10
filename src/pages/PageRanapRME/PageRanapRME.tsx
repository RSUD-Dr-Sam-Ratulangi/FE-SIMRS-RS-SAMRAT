import React from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

export default function PageRME() {
  const { id } = useParams()

  return (
    <div>
      <Breadcrumb />
      PageRME {id}
    </div>
  )
}
