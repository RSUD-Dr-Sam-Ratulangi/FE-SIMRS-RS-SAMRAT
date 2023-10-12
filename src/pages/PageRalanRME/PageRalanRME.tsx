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
      {/* <p> Hello {data.id}</p>
      <p>Tittle {data.title}</p>
      <p>Price :{data.price}</p> */}
      <div className='w-full h-screen bg-white p-3'>
        <p className='text text-lg font-bold pb-3'>Riwayat Perawatan</p>
        <p className='font-light'>Data Riwayat Perawatan Pasien</p>
        <div>
          <div className='grid grid-cols-4 gap-10'>
            <div>
              <label className='label-text-alt font-light'>NO.RM</label>
              <p className='text font-bold'>165647</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>UMUR</label>
              <p className='text font-bold'>19 Th 10 Bl 18 Hr Tahun</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>GOLONGAN DARAH</label>
              <p className='text font-bold'>-</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>AGAMA</label>
              <p className='text font-bold'>Kristen</p>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-10'>
            <div>
              <label className='label-text-alt font-light'>Alamat</label>
              <p className='text font-bold'>Ranomerut</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>Jenis Kelamin</label>
              <p className='text font-bold'>Perempuan</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>Ibu Kandung</label>
              <p className='text font-bold'>-</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>Pendidikan Terakhir</label>
              <p className='text font-bold'>-</p>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-10'>
            <div>
              <label className='label-text-alt font-light'>NO.RM</label>
              <p className='text font-bold'>165647</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>UMUR</label>
              <p className='text font-bold'>19 Th 10 Bl 18 Hr Tahun</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>GOLONGAN DARAH</label>
              <p className='text font-bold'>-</p>
            </div>
            <div>
              <label className='label-text-alt font-light'>AGAMA</label>
              <p className='text font-bold'>Kristen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
