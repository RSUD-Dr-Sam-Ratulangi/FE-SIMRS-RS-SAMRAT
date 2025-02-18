import { useEffect, useState } from 'react'
import { api } from '../services/api/config.api'
import { spesificError, spesificSuccess } from './ToastInfo'
import { ToastContainer } from 'react-toastify'

const ProsedurSearchList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [listProsedur, setListProsedur] = useState<any[]>([])
  const [selectedProsedur, setSelectedProsedur] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const nmrRawat = localStorage.getItem('no_rawat')

  useEffect(() => {
    const handleGetProsedur = async () => {
      try {
        if (searchTerm.trim().length >= 3) {
          const response = await api.get(`/api/v1/searchIcd9?deskripsiPanjang=${searchTerm}`)
          setListProsedur(response.data)
        } else {
          setListProsedur([])
        }
      } catch (err) {
        console.log('prosedur err', err)
      }
    }

    handleGetProsedur()
  }, [searchTerm])

  const handleSelectProsedur = (kode: string, deskripsiPanjang: string) => {
    const newData = { kode, deskripsiPanjang }

    setSelectedProsedur((prev) => {
      const exists = prev.some((item) => item.kode === kode)
      return exists ? prev : [...prev, newData]
    })

    setSearchTerm('')
    setListProsedur([])
  }

  const handleSave = async () => {
    if (selectedProsedur.length === 0 || !nmrRawat) {
      return
    }

    const isConfirmed = window.confirm('Apakah Anda yakin ingin mengirim prosedur yang dipilih?')
    if (!isConfirmed) {
      return
    }

    setIsLoading(true)

    try {
      for (const prosedur of selectedProsedur) {
        const response = await api.post(
          `/api/v1/insertIcd9?noRawat=${nmrRawat}&kode=${prosedur.kode}&status=ranap&prioritas=1`,
        )
        console.log(`Prosedur ${prosedur.kode} dikirim:`, response.data)
      }

      spesificSuccess({ doneMessage: 'Data Berhasil Dikirim' })
      setSelectedProsedur([])

      setIsLoading(false)

      setTimeout(() => {
        window.close() // Menutup window popup
        window.opener?.location.reload() // Reload halaman utama
      }, 500)
    } catch (error) {
      console.error('Prosedur gagal dikirim:', error)
      spesificError({ errMessage: 'Prosedur Gagal Dikirim. Mohon Lihat log' })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-5'>
      <label className='label font-bold'>
        Cari Prosedur : {nmrRawat ? nmrRawat : 'Tidak ada nomor Rawat'}
      </label>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-96 px-3 py-2 border rounded-2xl border-slate-500 disabled:text-black'
        placeholder='Prosedur'
      />

      <div>
        {listProsedur.length > 0 && (
          <div className='mt-4'>
            <div className='h-full overflow-auto'>
              <table className='table w-full'>
                <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                  <tr>
                    <th>NO</th>
                    <th>KODE</th>
                    <th>PROSEDUR PANJANG</th>
                    <th>PROSEDUR PENDEK</th>
                  </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                  {listProsedur.map((data, index) => (
                    <tr
                      key={index}
                      className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200'
                    >
                      <td>{index + 1}</td>
                      <td>{data.kode || '-'}</td>
                      <td>{data.deskripsi_panjang || '-'}</td>
                      <td>{data.deskripsi_pendek || '-'}</td>
                      <td>
                        <button
                          className='underline'
                          onClick={() => handleSelectProsedur(data.kode, data.deskripsi_panjang)}
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* List Prosedur Terpilih */}
      {selectedProsedur.length > 0 && (
        <div className='mt-5 p-3 border border-gray-300 rounded-md'>
          <h2 className='font-bold text-lg'>Prosedur Terpilih:</h2>
          <ul>
            {selectedProsedur.map((item, index) => (
              <li key={index} className='text-sm'>
                {index + 1}. {item.kode} - {item.deskripsiPanjang}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tombol Simpan */}
      {selectedProsedur.length > 0 && (
        <button
          disabled={isLoading}
          onClick={handleSave}
          className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600'
        >
          Simpan & Kirim
        </button>
      )}
      <ToastContainer />
    </div>
  )
}

export default ProsedurSearchList
