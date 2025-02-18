import { useEffect, useState } from 'react'
import { api } from '../services/api/config.api'
import { spesificError, spesificSuccess } from './ToastInfo'
import { ToastContainer } from 'react-toastify'

const TindakanSearchList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [listTindakan, setlistTindakan] = useState<any[]>([])
  const [selectedTindakan, setSelectedTindakan] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const nmrRawat = localStorage.getItem('no_rawat')
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  useEffect(() => {
    const handleGetTindakan = async () => {
      try {
        if (searchTerm.trim().length >= 3) {
          const response = await api.get(`/api/v1/searchJnsPerawatan?keyword=${searchTerm}`)
          setlistTindakan(response.data)
        } else {
          setlistTindakan([])
        }
      } catch (err) {
        console.log('prosedur err', err)
      }
    }

    handleGetTindakan()
  }, [searchTerm])

  const handleSelectTindakan = (kode: string, deskripsiPanjang: string) => {
    const newData = { kode, deskripsiPanjang }

    setSelectedTindakan((prev) => {
      const exists = prev.some((item) => item.kode === kode)
      return exists ? prev : [...prev, newData]
    })

    setSearchTerm('')
    setlistTindakan([])
  }

  const handleSave = async () => {
    if (selectedTindakan.length === 0 || !nmrRawat) {
      spesificError({ errMessage: 'Mohon Memilih Setidaknya Satu Tindakan' })
      return
    }

    const isConfirmed = window.confirm('Apakah Anda yakin ingin mengirim tindakan yang dipilih?')
    if (!isConfirmed) {
      spesificError({ errMessage: 'Aborted!' })
      return
    }

    setIsLoading(true)

    for (const tindakan of selectedTindakan) {
      const data = {
        noRawat: nmrRawat,
        kdJenisPrw: tindakan.kode,
        kdDokter: nipCredentials,
        material: Math.round(50000.0 * 55) / 54,
        bhp: Math.round(0.1 * 55) / 54,
        tarifTindakandr: Math.round(150000.0 * 55) / 54,
        kso: Math.round(0.1 * 55) / 54,
        menejemen: Math.round(50000.0 * 55) / 54,
        biayaRawat: Math.round(25000.0 * 55) / 54,
        sttsBayar: 'Belum',
      }

      try {
        const response = await api.post('/api/v1/insertRawatJalanData', data)
        console.log(`Tindakan ${tindakan.kode} dikirim:`, response.data)

        spesificSuccess({ doneMessage: 'Data Tindakan Berhasil Dikirim' })
        setTimeout(() => {
          window.close()
          window.opener?.location.reload()
        }, 500)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
        setTimeout(() => {
          window.close()
          window.opener?.location.reload()
        }, 500)
      }
    }

    console.log(selectedTindakan)
  }

  return (
    <div className='p-5'>
      <label className='label font-bold'>
        Cari Tindakan : {nmrRawat ? nmrRawat : 'Tidak ada nomor Rawat'}
      </label>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-96 px-3 py-2 border rounded-2xl border-slate-500 disabled:text-black'
        placeholder='Tindakan'
      />

      <div>
        {listTindakan.length > 0 && (
          <div className='mt-4'>
            <div className='h-full overflow-auto'>
              <table className='table w-full'>
                <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                  <tr>
                    <th>NO</th>
                    <th>KODE</th>
                    <th>PROSEDUR</th>
                    <th>TARIF TINDAKAN</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                  {listTindakan.map((data, index) => (
                    <tr
                      key={index}
                      className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200'
                    >
                      <td>{index + 1}</td>
                      <td>{data.kd_jenis_prw || '-'}</td>
                      <td>{data.nm_perawatan || '-'}</td>
                      <td>{data.tarif_tindakandr || '-'}</td>
                      <td>
                        <button
                          className='underline'
                          onClick={() => handleSelectTindakan(data.kd_jenis_prw, data.nm_perawatan)}
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
      {selectedTindakan.length > 0 && (
        <div className='mt-5 p-3 border border-gray-300 rounded-md'>
          <h2 className='font-bold text-lg'>Tindakan Terpilih:</h2>
          <ul>
            {selectedTindakan.map((item, index) => (
              <li key={index} className='text-sm'>
                {index + 1}. {item.kode} - {item.deskripsiPanjang}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tombol Simpan */}
      {selectedTindakan.length > 0 && (
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

export default TindakanSearchList
