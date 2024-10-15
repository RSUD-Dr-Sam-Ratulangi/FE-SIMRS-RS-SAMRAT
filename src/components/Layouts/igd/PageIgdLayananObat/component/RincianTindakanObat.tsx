import React, { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'
import { RiwayatResepObat } from '../type/InterfaceObat'
import { useParams } from 'react-router-dom'

const RincianTindakanObat: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<RiwayatResepObat[]>([])
  const { id } = useParams()
  const nmrRawat = localStorage.getItem('no_rawat')

  const checkNoResep = async () => {
    try {
      const response = await api.get(
        `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${nmrRawat}`,
      )

      const noResepList = response.data

      const detailPromises = noResepList.map(async (noresep) => {
        const detailResponse = await api.get(`/api/v1/getResepDokterDetails?noResep=${noresep}`)
        return detailResponse.data
      })

      const details = await Promise.all(detailPromises)
      setPrescriptions(details)
    } catch (err) {
      console.log('check no resep error', err)
    }
  }

  useEffect(() => {
    checkNoResep()
  }, [])

  return (
    <>
      <div className='w-full h-full bg-white mt-3 p-2'>
        <div className='pt-3'>
          <label className='label font-inter font-bold text-xl text-[#121713]'>
            RINCIAN TINDAKAN
          </label>
        </div>
        <div className='border-4 rounded-3xl p-2 mb-2'>
          {prescriptions.map((prescription, index) => (
            <div key={index}>
              <h3 className='flex items-center gap-3'>
                Nomor Resep: <p className='font-bold'>{prescription[0]?.no_resep}</p>
              </h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama Obat</th>
                    <th>Aturan Pakai</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.tgl_peresepan ? item.tgl_peresepan : '-'}</td>
                      <td>{item.nama_brng}</td>
                      <td>{item.aturan_pakai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default RincianTindakanObat
