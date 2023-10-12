import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Rme from '../../components/Rme/Rme'

export default function PageRME() {
  const { id } = useParams()
  const location = useLocation()
  const links = [
    {
      name: 'Elektronik Rekam Medis',
      link: `/rawat-inap/rme/${id}`,
    },
    {
      name: 'SOAP & Pemeriksaan',
      link: '/rawat-inap/soap-pemeriksaan/1'
    },
    {
      name: 'Layanan & Obat',
      link: '/rawat-inap/layanan-obat/1'
    },
    {
      name: 'Berkas Digital',
      link: '/rawat-inap/berkas-digital/1'
    }
  ];

  return (
    <div className='flex-row h-screen bg-lightgray p-4'>
      <div className="navbar bg-white rounded-xl">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">
            {
              links.map((link, index)=>(
                <li key={index}>
                  <a
                    href={link.link} 
                    className={`text-disabled text-base font-sans font-bold ${
                      location.pathname === link.link ? 'text-primary' : ''
                    }`}
                  >{link.name}</a>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div>
        <div className='flex text-disabled mt-4'>
          <ArrowLeftIcon className='w-4 mr-1' />
          <p className=' font-sans'>Kembali</p>
        </div>
        <Breadcrumb />
        {
          links.map((link, index)=>(
            <div key={index}>
              <a
                key={index}
                href={link.link} 
                className={` text-[#121713] font-sans font-bold mb-4 ${
                  location.pathname === link.link ? '' : 'hidden'
                }`}
              >{link.name}</a>
            </div>
          ))
        }
        <Rme />
      </div>
    </div>
  )
}
