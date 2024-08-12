import React, { useState, useEffect } from 'react'
import { api } from '../../../../services/api/config.api'
import { useParams } from 'react-router-dom'

const RiwayatDiagnosa = () => {
  const [data, setData] = useState([])
  //   const [sentData, setSentData] = useState([]);
  //   const [savedData, setSavedData] = useState([]);
  const { id } = useParams()

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const targetDate = getTodayDate()

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
      const filteredData = response.data.filter((item) => item.tgl_registrasi === targetDate)
      console.log('diagnosa', filteredData)
      setData(filteredData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  // const copyDiagnosa = async () => {
  //   const confirmCopy = window.confirm('Copy Diagnosa?\nDiagnosa akan langsung dikirim')
  //   const nmrRawat = localStorage.getItem('no_rawat')

  //   if (!confirmCopy) {
  //     return
  //   }

  //   try {
  //     const uniquePenyakit = new Set()
  //     const sentItems = []
  //     const savedItems = []
  //     const promises = data.map(async (item) => {
  //       if (!uniquePenyakit.has(item.kd_penyakit)) {
  //         uniquePenyakit.add(item.kd_penyakit)
  //         const payload = {
  //           noRawat: nmrRawat,
  //           status: 'Ralan',
  //           kdPenyakit: item.kd_penyakit,
  //           prioritas: '1',
  //           statusPenyakit: 'Baru',
  //         }
  //         sentItems.push(item) // Add item to sentItems
  //         try {
  //           await api.post('/api/v1/insertDiagnosaPasien', payload)
  //           savedItems.push(item) // Add item to savedItems upon successful POST
  //         } catch (postError) {
  //           console.error('Error posting data:', postError)
  //         }
  //       }
  //     })

  //     await Promise.all(promises)
  //     //   setSentData(sentItems);
  //     //   setSavedData(savedItems);
  //     alert('Berhasil')

  //     data.forEach((item) => {
  //       console.log(`kd_penyakit: ${item.kd_penyakit}, nm_penyakit: ${item.nm_penyakit}`)
  //     })
  //   } catch (error) {
  //     console.error('Error copying data:', error)
  //     alert('Error copying data')
  //   }
  // }

  useEffect(() => {
    fetchData()
  }, [])

  if (data.length === 0) {
    return <p>No data available</p>
  }

  return (
    <>
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
              <p>Nama Pasien : {item?.nm_pasien || '-'}</p>
              <p>Nama Penyakit : {item?.kd_penyakit || '-'}</p>
              <p>Nama Penyakit : {item?.nm_penyakit || '-'}</p>
              <p>Nama Dokter : {item?.nm_dokter || '-'}</p>
              <p>Kd Dokter : {item?.kd_dokter || '-'}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Incomming */}
      {/* <div className='mt-3 flex justify-end mr-5'>
        <button className='btn btn-sm' onClick={copyDiagnosa}>
          Copy Diagnosa
        </button>
      </div> */}
    </>
  )
}

export default RiwayatDiagnosa
