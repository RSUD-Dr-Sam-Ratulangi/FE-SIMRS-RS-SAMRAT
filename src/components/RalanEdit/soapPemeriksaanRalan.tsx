import { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import {
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  BellIcon,
  ClockIcon,
  CheckIcon,
} from '@heroicons/react/24/solid'
import TableDataNoSearch from '../Table/TableNoSearch'

import RalanEditHeader from './RalanEditHeader'

const buttonsData = [
  {
    icon: <ArchiveBoxArrowDownIcon className='font-bold text-white h-[17px] w-[17px]' />,
    text: 'Filter',
    textColor: 'white',
    bgColor: '[#55A46B]',
  },
  {
    icon: <BellIcon className='font-bold text-disabled h-[17px] w-[17px]' />,
    text: 'ICD 10 & 9',
    textColor: 'disabled',
    bgColor: 'white',
  },
  {
    icon: <ClockIcon className='font-bold text-disabled h-[17px] w-[17px]' />,
    text: 'Riwayat',
    textColor: 'disabled',
    bgColor: 'white',
  },
  {
    icon: <CheckIcon className='font-bold text-disabled h-[17px] w-[17px]' />,
    text: 'Selesai',
    textColor: 'disabled',
    bgColor: 'white',
  },
]

const soapLabels = [
  {
    label: <label>Subjektif</label>,
    input: (
      <textarea className='w-full textarea textarea-bordered h-32 resize-none' placeholder='.-' />
    ),
  },
  {
    label: <label>Objektif</label>,
    input: (
      <textarea className='w-full textarea textarea-bordered h-32 resize-none' placeholder='.-' />
    ),
  },
  {
    label: <label>Asesmen</label>,
    input: (
      <textarea className='w-full textarea textarea-bordered h-32 resize-none' placeholder='.-' />
    ),
  },
  {
    label: <label>Plan</label>,
    input: (
      <textarea className='w-full textarea textarea-bordered h-32 resize-none' placeholder='.-' />
    ),
  },
]

const rawatPasienLabels = [
  {
    label: <label>ID Rawat</label>,
    input: <input className='input input-bordered w-full' placeholder='2023/10/9/000161' />,
  },
  {
    label: <label>Nama Pasien</label>,
    input: <input className='input input-bordered w-full' placeholder='Esthera Jackson' />,
  },
  {
    label: <label>Nomor RM</label>,
    input: <input className='input input-bordered w-full' placeholder='0000/00/00/000000' />,
  },
]

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

  return (
    <>
      <RalanEditHeader />
      <div className='w-full h-full rounded-xl shadow-soft'>
        <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
          <p className='font-sans text-xl font-bold text-[#2D3748]'>Tambah Pasien</p>
          <p className='font-sans text-base text-disabled font-normal'>
            Isi semua data di bawah ini untuk menambahkan pasien ke dalam rawat jalan
          </p>
          <div className='flex gap-6 mt-4 mb-6'>
            <div className='w-[70%]'>
              <div className='grid grid-cols-2 gap-6 p-4'>
                <div className='col-span-1 flex gap-4'>
                  <div className='w-[60%] flex flex-col '>
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
                {rawatPasienLabels.map((label, index) => (
                  <div key={index} className='flex flex-col'>
                    {label.label}
                    {label.input}
                  </div>
                ))}
              </div>

              <p className='font-sans text-xl font-bold text-[#2D3748] mt-6'>Soap</p>
              <div className='grid grid-cols-2 gap-6 p-4'>
                {soapLabels.map((label, index) => (
                  <div key={index} className='flex flex-col'>
                    {label.label}
                    {label.input}
                  </div>
                ))}
              </div>
            </div>
            <div className=' w-[30%]'>
              <div className='flex gap-1 mb-2'>
                <InformationCircleIcon className='w-6' />
                <p> Informasi</p>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='font-sans text-base text-disabled font-normal mb-4'>
                  Mohon pastikan data yang anda masukan sudah benar sebelum melanjutkan. Kesalahan
                  dalam pengisian data dapat berdampak pada perawatan pasiens
                </p>
                {buttonsData.map((button, index) => (
                  <button
                    key={index}
                    tabIndex={0}
                    className={`flex btn w-full text-${button.textColor} bg-${button.bgColor} border-2 border-${button.textColor}`}
                  >
                    {button.icon}
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white h-auto w-full p-4 mt-6 rounded-xl'>
          <p className='font-sans text-xl font-bold text-[#2D3748] mb-4'>Rincian Riwayat</p>
          <TableDataNoSearch data={data} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default SoapRalan
