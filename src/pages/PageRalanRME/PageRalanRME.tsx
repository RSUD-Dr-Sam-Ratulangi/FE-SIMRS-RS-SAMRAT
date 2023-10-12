import { useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'

type DataItem = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export default function PageRalanRME() {
  const location = useLocation()
  const data: DataItem = location.state.data

  console.log('rme ralan', data)

  return (
    <div>
      <Breadcrumb />
      <p> Hello {data.id}</p>
      <p>Tittle {data.title}</p>
      <p>Price :{data.price}</p>
    </div>
  )
}
