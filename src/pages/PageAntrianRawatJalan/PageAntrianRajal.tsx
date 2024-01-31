import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dateNow } from '../../utils/DateNow'
import { api } from '../../services/api/config.api'
import './antrian.css'

const PageAntrianRajal = () => {
  const [patientName, setPatientName] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [poliName, setPoliName] = useState('')
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const tglSkrng = dateNow()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/v1/getalllpasienmendaftar?kd_poli=&tglKunjungan=${tglSkrng}&tglKunjunganAkhir=${tglSkrng}`,
        )
        const responseData = response.data
        console.log(responseData)
        setData(responseData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [tglSkrng])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedPatientName = localStorage.getItem('patientName')
      const storedDoctorName = localStorage.getItem('doctorName')
      const storedPoliName = localStorage.getItem('poliName')

      if (storedPatientName) {
        setPatientName(storedPatientName)
      }
      if (storedDoctorName) {
        setDoctorName(storedDoctorName)
      }
      if (storedPoliName) {
        setPoliName(storedPoliName)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    handleStorageChange()
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const backDashboard = () => {
    navigate('/dashboard')
    navigate(0)
  }

  const capitalizedPatientName = patientName.toUpperCase()

  return (
    <div>
      <div className='grid '>
        <div className=''>
          <div>
            <img src='/assets/images/LOGORSREVISI4.png' alt='Logo' className='w-64 h-44' />
            <h1 className='text text-lg font-bold'>RSUD SAMRATULANGI TONDANO</h1>
          </div>
          {capitalizedPatientName && (
            <>
              <div>
                <p className='font-bold text text-[120px]'>{capitalizedPatientName}</p>
              </div>
              <div>
                <p className='font-semibold text-4xl  mb-3 mt-3'>Dokter: {doctorName}</p>
                <p className='font-semibold text-4xl'>Poli: {poliName}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className='pt-14 border'>
        <div className='overflow-hidden h-[600px]'>
          <table className='table'>
            <thead>
              <tr>
                <th>
                  <p className='font-bold text-black text-xl'>Nama</p>
                </th>
                <th>
                  <p className='font-bold text-black text-xl'>Poli</p>
                </th>
                <th>
                  <p className='font-bold text-black text-xl'>Dokter</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p className='text-black font-bold text-2xl'>{item.nm_pasien}</p>
                  </td>
                  <td>{item.nm_poli}</td>
                  <td>{item.nm_dokter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a
          className='font-bold cursor-pointer mt-10 text-gray-400 '
          onClick={() => backDashboard()}
        >
          Beranda
        </a>
      </div>
    </div>
  )
}

export default PageAntrianRajal
