import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatDiagnosaRanap = () => {
  const [diagnosa, setDiagnosa] = useState([])
  const nmrRawat = localStorage.getItem('no_rawat')

  const checkExistDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien?noRawat=${nmrRawat}`)
      setDiagnosa(response.data)
    } catch (err) {
      console.log('exist diagnosa error', err)
    }
  }

  useEffect(() => {
    checkExistDiagnosa()
  }, [])

  return (
    <div className='p-4 bg-white'>
      <h2 className='text-lg font-semibold mb-4'>Riwayat Diagnosa</h2>
      <div className='overflow-x-auto'>
        <table className='table w-full '>
          <thead>
            <tr className=''>
              <th className=''>No. Rawat</th>
              <th className=''>Nama Pasien</th>
              <th className=''>No. RM</th>
              <th className=''>Tanggal Registrasi</th>
              <th className=''>Kode Penyakit</th>
              <th className=''>Nama Penyakit</th>
              <th className=''>Dokter</th>
              <th className=''>Status</th>
              <th className=''>Prioritas</th>
            </tr>
          </thead>
          <tbody>
            {diagnosa.length > 0 ? (
              diagnosa.map((item, index) => (
                <tr key={index} className=''>
                  <td className=''>{item.no_rawat}</td>
                  <td className=''>{item.nm_pasien}</td>
                  <td className=''>{item.no_rkm_medis}</td>
                  <td className=''>{item.tgl_registrasi}</td>
                  <td className=''>{item.kd_penyakit}</td>
                  <td className=''>{item.nm_penyakit}</td>
                  <td className=''>{item.nm_dokter}</td>
                  <td className=''>{item.status}</td>
                  <td className=''>{item.prioritas}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className=' text-center text-gray-500'>Tidak ada data diagnosa</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RiwayatDiagnosaRanap
