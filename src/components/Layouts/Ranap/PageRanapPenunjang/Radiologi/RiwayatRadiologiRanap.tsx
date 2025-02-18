import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatRadiologiRanap = () => {
  const [radiologyData, setRadiologyData] = useState<any | null>(null)
  const [imageData, setImageData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showTable, setShowTable] = useState<boolean>(false)
  const nmrRawat = localStorage.getItem('no_rawat')

  useEffect(() => {
    const fetchRadiologyData = async () => {
      try {
        const resultResponse = await api.get(`/api/v1/radiology-results?noRawat=${nmrRawat}`)
        const imagesResponse = await api.get(`/api/v1/radiology-images?noRawat=${nmrRawat}`)

        setRadiologyData(resultResponse.data || null)
        setImageData(imagesResponse.data || [])
      } catch (err) {
        setError('Failed to fetch data.')
      } finally {
        setLoading(false)
      }
    }

    fetchRadiologyData()
  }, [])

  const toggleTable = () => {
    setShowTable(!showTable)
  }

  return (
    <div>
      {error ? null : (
        <div className='flex items-center justify-between p-4'>
          {' '}
          {showTable ? <h2 className='text-lg font-bold mb-4'>Riwayat Radiologi Ranap</h2> : null}
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

      {/* Display the table if showTable is true */}
      {showTable && !loading && !error && radiologyData && (
        <div>
          <div>
            <table className='w-full border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='border p-2'>No</th>
                  <th className='border p-2'>Tanggal Periksa</th>
                  <th className='border p-2'>Jam</th>
                  <th className='border p-2'>Hasil</th>
                </tr>
              </thead>
              <tbody>
                <tr className='hover:bg-gray-100'>
                  <td className='border p-2 text-center'>1</td>
                  <td className='border p-2'>{radiologyData.tgl_periksa}</td>
                  <td className='border p-2'>{radiologyData.jam}</td>
                  <td className='border p-2'>{radiologyData.hasil || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            {imageData.length > 0 && (
              <div className='mt-6'>
                <h3 className='text-lg font-bold mb-2'>Gambar Radiologi</h3>
                <div className='grid grid-cols-2 gap-4 rounded-lg'>
                  {imageData.map((image, index) => (
                    <div key={index} className='border p-2'>
                      <img
                        src={`${process.env.REACT_APP_PUBLIC_URL}/webapps/radiologi/${image.lokasi_gambar}`}
                        alt={`Radiology Image ${index + 1}`}
                        className='w-full h-auto'
                      />
                      <p className='mt-3 text-sm text-center'>
                        {image.tgl_periksa} - {image.jam}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RiwayatRadiologiRanap
