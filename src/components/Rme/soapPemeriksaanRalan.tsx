import { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { NavLink, useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  BellIcon,
  ClockIcon,
  CheckIcon,
} from '@heroicons/react/24/solid'
import TableDataNoSearch from '../Table/TableNoSearch'
import { ROUTES } from '../../routes'

const SoapRalan = () => {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users')
        console.log(response.data.users)
        setData(response.data.users)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  type DataItem = {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: {
      color: string
      type: string
    }
    domain: string
    ip: string
  }

  const columns = [
    { name: 'ID', selector: (row: DataItem) => row.id, sortable: true },
    { name: 'First Name', selector: (row: DataItem) => row.firstName, sortable: true },
    {
      name: 'Last Name',
      selector: (row: DataItem) => row.lastName,
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row: DataItem) => (
        <p className='text-white btn btn-xs text-center text-[10px] bg-[#48BB78] rounded-xl'>
          {row.age}
        </p>
      ),
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row: DataItem) => row.gender,
      sortable: true,
    },
    { name: 'Email', selector: (row: DataItem) => row.email, sortable: true },
    { name: 'Birth Date', selector: (row: DataItem) => row.birthDate, sortable: true },
    // make button to edit and redirect
  ]
  const links = [
    {
      name: 'Elektronik Rekam Medis',
      link: ROUTES.PAGE_RALAN_RME,
      to: ROUTES.PAGE_RALAN_RME,
    },
    {
      name: 'SOAP & Pemeriksaan',
      link: ROUTES.PAGE_SOAP_RALAN,
      to: ROUTES.PAGE_SOAP_RALAN,
    },
    {
      name: 'Layanan & Obat',
      link: '/rawat-jalan/layanan-obat/1',
      to: ROUTES.PAGE_SOAP_RALAN,
    },
    {
      name: 'Berkas Digital',
      link: '/rawat-jalan/berkas-digital/1',
      to: ROUTES.PAGE_SOAP_RALAN,
    },
  ]

  const location = useLocation()

  return (
    <>
      <div className='w-full h-full p-3 rounded-xl shadow-soft'>
        <div className='navbar rounded-xl'>
          <div className='navbar-center hidden lg:flex'>
            <div className='menu menu-horizontal px-1 flex gap-4 '>
              {links.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  <a
                    href={link.link}
                    className={`text-disabled text-base font-sans font-bold ${
                      location.pathname === link.link ? 'text-primary' : ''
                    }`}
                  >
                    {link.name}
                  </a>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className='flex text-disabled mt-4'>
          <ArrowLeftIcon className='w-4 mr-1' />
          <p className=' font-sans'>Kembali</p>
        </div>
        <Breadcrumb />
        {links.map((link, index) => (
          <div key={index}>
            <a
              key={index}
              href={link.link}
              className={` text-[#121713] text-2xl font-sans font-bold mb-4 ${
                location.pathname === link.link ? '' : 'hidden'
              }`}
            >
              {link.name}
            </a>
          </div>
        ))}

        <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
          <p className='font-sans text-xl font-bold text-[#2D3748]'>Tambah Pasien</p>
          <p className='font-sans text-base text-disabled font-normal'>
            Isi semua data di bawah ini untuk menambahkan pasien ke dalam rawat jalan
          </p>
          <div className='flex gap-6 mt-4 mb-6'>
            <div className='w-[70%]'>
              <div className='flex gap-6 mb-4'>
                <div className='flex gap-4 w-[50%] '>
                  <div className='w-[60%] flex flex-col'>
                    <label>Tanggal</label>
                    <input type='date' className='input input-bordered w-full' />
                  </div>
                  <div className='relative w-[40%] flex flex-col'>
                    <label>Jam</label>
                    <input type='time' className='input input-bordered w-full' />
                    <div className='absolute -translate-y-1/2 right-1 top-12'>
                      <ClockIcon className='w-6 mr-1 text-[#55A46B]' />
                    </div>
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>ID Rawat</label>
                    <input className='input input-bordered w-full' placeholder='1111111111111' />
                  </div>
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Nama Pasien</label>
                    <input className='input input-bordered w-full' placeholder='Esthera Jackson' />
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Nomor RIM</label>
                    <input
                      className='input input-bordered w-full'
                      placeholder='00000/00000/00000'
                    />
                  </div>
                </div>
              </div>
              <p className='font-sans text-xl font-bold text-[#2D3748] mt-6'>Soap</p>
              <div className='flex gap-6 mb-4'>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Subjektif</label>
                    <input className='input input-bordered w-full h-32' placeholder='.-' />
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Objektif</label>
                    <input className='input input-bordered w-full h-32' placeholder='.-' />
                  </div>
                </div>
              </div>
              <div className='flex gap-6 '>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Asesmen</label>
                    <input className='input input-bordered w-full h-32' placeholder='.-' />
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div className='flex flex-col'>
                    <label>Plan</label>
                    <input className='input input-bordered w-full h-32' placeholder='.-' />
                  </div>
                </div>
              </div>
            </div>
            <div className=' w-[30%]'>
              <div className='flex gap-1'>
                <InformationCircleIcon className='w-6' />
                <p> Informasi</p>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='font-sans text-base text-disabled font-normal mb-4'>
                  Mohon pastikan data yang anda masukan sudah benar sebelum melanjutkan. Kesalahan
                  dalam pengisian data dapat berdampak pada perawatan pasiens
                </p>
                <button tabIndex={0} className='flex btn w-full text-white bg-[#55A46B]'>
                  <ArchiveBoxArrowDownIcon className='font-bold text-white h-[17px] w-[17px]' />
                  Filter
                </button>
                <button
                  tabIndex={0}
                  className='flex btn w-full text-disabled bg-white border-2 border-disabled'
                >
                  <BellIcon className='font-bold text-disabled h-[17px] w-[17px]' />
                  ICD 10 & 9
                </button>
                <button
                  tabIndex={0}
                  className='flex btn w-full text-disabled bg-white border-2 border-disabled'
                >
                  <ClockIcon className='font-bold text-disabled h-[17px] w-[17px]' />
                  Riwayat
                </button>
                <button
                  tabIndex={0}
                  className='flex btn w-full text-disabled bg-white border-2 border-disabled'
                >
                  <CheckIcon className='font-bold text-disabled h-[17px] w-[17px]' />
                  Selesai
                </button>
              </div>
            </div>
          </div>
          <p className='font-sans text-base font-bold text-[#2D3748]'>Rincian riwayat</p>
          <TableDataNoSearch data={data} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default SoapRalan
