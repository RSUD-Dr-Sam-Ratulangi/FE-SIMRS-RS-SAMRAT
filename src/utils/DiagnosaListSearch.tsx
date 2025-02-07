import { useEffect, useState } from 'react'
import { api } from '../services/api/config.api'

const DiagnosaSearchList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [listPenyakit, setListPenyakit] = useState<any[]>([])
  const [selectedDiagnosa, setSelectedDiagnosa] = useState<any[]>([]) // Data yang dipilih

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

  const handleSave = () => {
    if (window.opener) {
      window.opener.postMessage(selectedDiagnosa, window.location.origin)
      window.close()
    }
  }

  return (
    <div className='p-5'>
      <label className='label font-bold'>Cari Diagnosa :</label>
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
          onClick={handleSave}
          className='mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600'
        >
          Simpan & Kirim
        </button>
      )}
    </div>
  )
}

export default DiagnosaSearchList
