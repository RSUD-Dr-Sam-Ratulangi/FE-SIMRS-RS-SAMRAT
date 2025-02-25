import { useState, useEffect } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatTindakanIgd = () => {
  const [tindakanData, setTindakanData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const nmrRawat = localStorage.getItem('no_rawat')

  const fetchTindakanIgd = async () => {
    try {
      const response = await api.get(`/api/v1/getRawatJlDrDetailsByNoRawat?noRawat=${nmrRawat}`)
      if (response.data.length === 0) {
        setError('Tidak ada data')
      } else {
        setTindakanData(response.data)
        setError(null)
      }
    } catch (error) {
      setError('Terjadi kesalahan saat mengambil data')
      console.error('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchTindakanIgd()
  }, [nmrRawat])

  return (
    <div>
      <label className='label font-inter font-bold text-xl text-[#121713]'>
        {error ? null : 'Rincian Tindakan'}
      </label>
      {error ? (
        <div className='text-red-500'>Tidak ada data tindakan</div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nama Tindakan</th>
              <th>Nama Dokter</th>
              <th>Biaya</th>
            </tr>
          </thead>
          <tbody>
            {tindakanData.map((tindakan) => (
              <tr key={tindakan.no_rawat}>
                <td>{tindakan.tgl_perawatan}</td>
                <td>{tindakan.nm_perawatan}</td>
                <td>{tindakan.nm_dokter}</td>
                <td>Rp.{tindakan.biaya_rawat.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RiwayatTindakanIgd
