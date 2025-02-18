import { useEffect, useState } from 'react'
import { api } from '../services/api/config.api'
import { ToastContainer } from 'react-toastify'
import { spesificSuccess } from './ToastInfo'

const DiagnosaSearchList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [listPenyakit, setListPenyakit] = useState<any[]>([])
  const [selectedDiagnosa, setSelectedDiagnosa] = useState<any[]>([]) // Data yang dipilih
  const nmrRawat = localStorage.getItem('no_rawat')
  const [isloading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleGetPenyakit = async () => {
      try {
        if (searchTerm.trim().length >= 3) {
          const response = await api.get(`/api/v1/getAllPenyakit?searchString=${searchTerm}`)
          setListPenyakit(response.data)
        } else {
          setListPenyakit([])
        }
      } catch (error) {
        console.log(error)
        setListPenyakit([])
      }
    }

    handleGetPenyakit()
  }, [searchTerm])

  const handleSelectDiagnosa = (kode: string, nmPenyakit: string) => {
    const newData = { kode, nmPenyakit }

    // Cek apakah data sudah ada di selectedDiagnosa
    setSelectedDiagnosa((prev) => {
      const exists = prev.some((item) => item.kode === kode)
      return exists ? prev : [...prev, newData]
    })

    setSearchTerm('')
    setListPenyakit([])
  }

  const postDiagnosa = async () => {
    try {
      if (selectedDiagnosa.length === 0) {
        return
      }

      const isConfirmed = window.confirm('Apakah Anda yakin ingin mengirim diagnosa yang dipilih?')

      if (!isConfirmed) {
        return
      }

      setIsLoading(true)

      for (const diagnosa of selectedDiagnosa) {
        const data = {
          noRawat: nmrRawat,
          status: 'Ralan',
          kdPenyakit: diagnosa.kode,
          prioritas: '1',
          statusPenyakit: 'Baru',
        }

        const response = await api.post('/api/v1/insertDiagnosaPasien', data)
        console.log(`Diagnosa ${diagnosa.kode} dikirim:`, response.data)
      }

      setSelectedDiagnosa([])
      spesificSuccess({ doneMessage: 'Data Berhasil Dikirim.' })
      setTimeout(() => {
        window.close()
        window.opener?.location.reload()
      }, 500)
    } catch (error) {
      console.error('Diagnosa gagal dikirim:', error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-5'>
      <label className='label font-bold'>
        Cari Diagnosa : {nmrRawat ? nmrRawat : 'Tidak ada data no rawat'}
      </label>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-96 px-3 py-2 border rounded-2xl border-slate-500 disabled:text-black'
        placeholder='Diagnosa'
      />

      <div>
        {listPenyakit.length > 0 && (
          <div className='mt-4'>
            <div className='h-full overflow-auto'>
              <table className='table w-full'>
                <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                  <tr>
                    <th>NO</th>
                    <th>KODE DIAGNOSA</th>
                    <th>NAMA DIAGNOSA</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                  {listPenyakit.map((data, index) => (
                    <tr
                      key={index}
                      className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200'
                    >
                      <td>{index + 1}</td>
                      <td>{data.kd_penyakit || '-'}</td>
                      <td>{data.nm_penyakit || '-'}</td>
                      <td>
                        <button
                          className='underline'
                          onClick={() => handleSelectDiagnosa(data.kd_penyakit, data.nm_penyakit)}
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

      {/* List Diagnosa Terpilih */}
      {selectedDiagnosa.length > 0 && (
        <div className='mt-5 p-3 border border-gray-300 rounded-md'>
          <h2 className='font-bold text-lg'>Diagnosa Terpilih:</h2>
          <ul>
            {selectedDiagnosa.map((item, index) => (
              <li key={index} className='text-sm'>
                {index + 1}. {item.kode} - {item.nmPenyakit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tombol Simpan */}
      {selectedDiagnosa.length > 0 && (
        <button
          disabled={isloading}
          onClick={postDiagnosa}
          className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600'
        >
          Simpan & Kirim
        </button>
      )}
      <ToastContainer />
    </div>
  )
}

export default DiagnosaSearchList
