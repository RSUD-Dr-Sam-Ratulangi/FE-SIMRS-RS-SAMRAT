import React from 'react'
import { useParams } from 'react-router-dom'

export default function PageRanapRME() {
  const { id } = useParams()

  return <div>PageRME {id}</div>
}
