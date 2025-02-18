import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatLaborRanap = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showTable, setShowTable] = useState<boolean>(false)
  const nmrRawat = localStorage.getItem('no_rawat')

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const response = await api.get(`/api/v1/detailPeriksaLab?noRawat=${nmrRawat}`)
        setData(response.data || [])
      } catch (err) {
        setError('Gagal mengambil data.')
      } finally {
        setLoading(false)
      }
    }

    fetchRiwayat()
  }, [])

  const toggleTable = () => {
    setShowTable(!showTable) // Toggle status tabel
  }

  return (
    <div>
      {error ? null : (
        <div className='flex items-center justify-between p-4'>
          {' '}
          {showTable ? <h2 className='text-lg font-bold mb-4'>Riwayat Labor Ranap</h2> : null}
          <button
            onClick={toggleTable}
            className='bg-primary-600 text-white px-3 py-1 rounded mb-4'
          >
            {showTable ? 'Tutup Tabel Riwayat' : 'Lihat Riwayat'}
          </button>
        </div>
      )}

      {loading && <p>Memuat data...</p>}
      {error && <p className='text-red-500'>Tidak ada data riwayat</p>}

      {/* Tampilkan tabel jika showTable bernilai true */}
      {showTable && !loading && !error && (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border p-2'>No</th>
              <th className='border p-2'>Tanggal Periksa</th>
              <th className='border p-2'>Jam</th>
              <th className='border p-2'>Pemeriksaan</th>
              <th className='border p-2'>Satuan</th>
              <th className='border p-2'>Nilai Rujukan</th>
              <th className='border p-2'>Keterangan</th>
              <th className='border p-2'>Perawatan</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                  <td className='border p-2 text-center'>{index + 1}</td>
                  <td className='border p-2'>{item.tgl_periksa}</td>
                  <td className='border p-2'>{item.jam}</td>
                  <td className='border p-2'>{item.Pemeriksaan}</td>
                  <td className='border p-2'>{item.satuan || '-'}</td>
                  <td className='border p-2'>{item.nilai_rujukan || '-'}</td>
                  <td className='border p-2'>{item.keterangan || '-'}</td>
                  <td className='border p-2'>{item.nm_perawatan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='border p-2 text-center'>
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RiwayatLaborRanap
