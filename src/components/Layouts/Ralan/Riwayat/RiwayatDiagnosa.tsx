/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { api } from '../../../../services/api/config.api'
import { useParams } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const RiwayatDiagnosa = ({ onDataFetched }) => {
  const [data, setData] = useState([])
  //   const [sentData, setSentData] = useState([]);
  //   const [savedData, setSavedData] = useState([]);
  const { id } = useParams()
  const nmrRawat = localStorage.getItem('no_rawat')

  // const getTodayDate = () => {
  //   const today = new Date()
  //   const year = today.getFullYear()
  //   const month = String(today.getMonth() + 1).padStart(2, '0')
  //   const day = String(today.getDate()).padStart(2, '0')
  //   return `${year}-${month}-${day}`
  // }

  // const targetDate = getTodayDate()

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
      console.log('diagnosa', response.data)
      const dataDiagnosa = response.data.reverse()
      setData(dataDiagnosa)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const copyDiagnosa = async (kode, nmPenyakit) => {
    const confirmCopy = window.confirm('Copy Diagnosa?\nDiagnosa akan langsung dikirim')
    // const nmrRawat = localStorage.getItem('no_rawat')

    if (!confirmCopy) {
      return
    }

    try {
      const data = {
        noRawat: nmrRawat,
        status: 'Ralan',
        kdPenyakit: kode,
        prioritas: '1',
        statusPenyakit: 'Baru',
      }
      try {
        const response = await api.post('/api/v1/insertDiagnosaPasien', data)
        console.log('diagnosa dikirim', response.data)
      } catch (error) {
        console.log('diagnosa gagal dikirim', error)
      }
      alert('Berhasil')

      const dataP = []

      dataP.push({
        kd_penyakit: kode,
        nm_penyakit: nmPenyakit,
      })

      if (onDataFetched) {
        onDataFetched(dataP)
      }
    } catch (error) {
      console.error('Error copying data:', error)
      alert('Error copying data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (data.length === 0) {
    return <p>No data available</p>
  }

  return (
    <div className='h-[2300px] overflow-auto'>
      {data.map((item, index) => (
        <div
          key={index}
          className='min-w-fit bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300'
        >
          <div>
            <div className='p-2 border border-green-500 bg-white w-fit rounded-xl'>
              <p className=' font-bold text-sm text-[#121713] mt-2 '>DOKTER : {item?.nm_dokter}</p>
              {/* <p className=' font-bold text-sm text-[#121713] mt-2 '>PERAWAT : {riwayat.nama}</p> */}
            </div>
            <div className='ml-1 mt-2'>
              <p>Tanggal : {item?.tgl_registrasi || '-'}</p>
              <p>Nama Pasien : {item?.nm_pasien || '-'}</p>
              <p>ICD X : {item?.kd_penyakit || '-'}</p>
              <p>Nama Penyakit : {item?.nm_penyakit || '-'}</p>
              <p>Nama Dokter : {item?.nm_dokter || '-'}</p>
              <p>Kd Dokter : {item?.kd_dokter || '-'}</p>
            </div>
          </div>
          {/* Incomming */}
          <div className='mt-3 flex justify-end mr-5'>
            <button
              className='btn btn-sm'
              onClick={() => copyDiagnosa(item.kd_penyakit, item.nm_penyakit)}
            >
              Copy Diagnosa
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RiwayatDiagnosa
