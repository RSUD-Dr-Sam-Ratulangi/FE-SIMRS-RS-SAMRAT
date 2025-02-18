import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatProsedurRanap = () => {
  const [prosedur, setProsedur] = useState([])
  const nmrRawat = localStorage.getItem('no_rawat')

  useEffect(() => {
    const fetchProsedur = async () => {
      try {
        const response = await api.get(`/api/v1/getProsedurByNoRawat?noRawat=${nmrRawat}`)
        setProsedur(response.data)
      } catch (err) {
        console.error('Error fetching prosedur:', err)
      }
    }

    if (nmrRawat) {
      fetchProsedur()
    }
  }, [nmrRawat])

  return (
    <div className='overflow-x-auto p-4 bg-white'>
      {prosedur.length > 0 ? (
        <table className='table w-full'>
          <thead>
            <tr>
              <th>No. Rawat</th>
              <th>Nama Pasien</th>
              <th>No. RM</th>
              <th>Tanggal Registrasi</th>
              <th>Kode</th>
              <th>Deskripsi</th>
              <th>Poli</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {prosedur.length > 0 ? (
              prosedur.map((item, index) => (
                <tr key={index}>
                  <td>{item.no_rawat}</td>
                  <td>{item.nm_pasien}</td>
                  <td>{item.no_rkm_medis}</td>
                  <td>{item.tgl_registrasi}</td>
                  <td>{item.kode}</td>
                  <td>{item.deskripsi_panjang}</td>
                  <td>{item.nm_poli}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='text-center p-5 text-gray-500'>
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div>
          <p className='text-center h-56'>NO DATA !</p>
        </div>
      )}
    </div>
  )
}

export default RiwayatProsedurRanap
