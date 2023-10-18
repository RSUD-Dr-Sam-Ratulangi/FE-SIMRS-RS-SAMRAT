import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const SecNavbar: React.FC = () => {
    const id = useParams().id
    const location = useLocation()
    const navigate = useNavigate()

    const links = [
        {
            name: 'Elektronik Rekam Medis',
            link: `/rawat-inap/rme/${id}`,
        },
        {
            name: 'SOAP & Pemeriksaan',
            link: `/rawat-inap/soap-pemeriksaan/${id}`,
        },
        {
            name: 'Layanan & Obat',
            link: `/rawat-inap/layanan-obat/${id}`,
        },
        {
            name: 'Berkas Digital',
            link: `/rawat-inap/berkas-digital/${id}`,
        }
    ]

  return (
    <div>
        <div className='navbar bg-white rounded-xl'>
            <div className='navbar-center hidden lg:flex'>
                <ul className='menu menu-horizontal px-1 '>
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                        href={link.link} 
                        className={`text-disabled text-base font-sans font-bold ${
                            location.pathname === link.link ? 'text-primary' : ''
                        }`}
                        >
                        {link.name}
                    </a>
                    </li>
                    ))}
                </ul>
            </div>
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
        <div className='flex text-disabled mt-4'>
            <ArrowLeftIcon className='w-4 mr-1' />
            <a
            className=' font-sans cursor-pointer'
            onClick={()=>navigate('/rawat-inap')}
            >Kembali</a>
        </div>
    </div>
    )
}

export default SecNavbar
