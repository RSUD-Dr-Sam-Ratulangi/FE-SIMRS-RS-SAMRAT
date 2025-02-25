import React, { useState, useEffect } from 'react'
import { api } from '../../../../../services/api/config.api'
import { RiwayatDiagnosaIcd, RiwayatProsedurIcd } from '../type/InterfaceIcd'
import { useParams } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const DiagnosaProsedurIcd: React.FC = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  const [riwayatDiagnosa, setRiwayatDiagnosa] = useState<RiwayatDiagnosaIcd[]>([])
  const [riwayatProsedur, setRiwayatProsedur] = useState<RiwayatProsedurIcd[]>([])
  const { id } = useParams()

  const fetchRiwayatDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
      setRiwayatDiagnosa(response.data)
      console.log(response.data)
    } catch (err) {
      console.log('err Riwaya Diagnosa', err)
    }
  }

  const fetchRiwayatProsedur = async () => {
    try {
      const response = await api.get(`/api/v1/getProsedurByNoRawat?noRawat=${nmrRawat}`)
      setRiwayatProsedur(response.data)
      console.log(response.data)
    } catch (err) {
      console.log('err Riwayat prosedut', err)
    }
  }

  useEffect(() => {
    fetchRiwayatDiagnosa()
    fetchRiwayatProsedur()
  }, [])

  const handleWindowDiagnosa = (id: string) => {
    const width = Math.floor(window.screen.width * 0.5)
    const height = Math.floor(window.screen.height * 0.7)
    const left = Math.floor((window.screen.width - width) / 2)
    const top = Math.floor((window.screen.height - height) / 2)

    const popup = window.open(
      `/diagnosa-search/${id}`,
      'Diagnosa',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      console.error('Popup gagal dibuka. Pastikan pop-up tidak diblokir oleh browser.')
      return
    }
  }

  const handleWindowProsedur = () => {
    const width = Math.floor(window.screen.width * 0.5)
    const height = Math.floor(window.screen.height * 0.7)
    const left = Math.floor((window.screen.width - width) / 2)
    const top = Math.floor((window.screen.height - height) / 2)

    const popup = window.open(
      '/prosedur-search',
      'prosedur',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      console.error('Popup gagal dibuka. Pastikan pop-up tidak diblokir oleh browser.')
      return
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <div className='grid gap-3'>
            <div className='flex gap-3 mt-3 items-center w-full'>
              <div>
                <button
                  onClick={() => handleWindowDiagnosa('ralan')}
                  className='btn bg-primary text-slate-100 flex items-center gap-2 hover:bg-primary hover:border-slate-400 hover:shadow-lg'
                >
                  <MagnifyingGlassIcon width={25} height={25} />
                  <span>Diagnosa (ICD 10)</span>
                </button>
              </div>
            </div>
            <div>
              <div className='border rounded-2xl h-56 overflow-auto'>
                <label className='label font-bold text-xl'>Riwayat Diagnosa</label>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Tanggal</th>
                      <th>Nama Penyakit</th>

                      <th>Status</th>
                      <th>Prioritas</th>
                      <th>Nama Dokter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatDiagnosa
                      .map((diagnosa) => (
                        <tr key={diagnosa.no_rawat}>
                          <td>{diagnosa.kd_penyakit}</td>
                          <td>{diagnosa.tgl_registrasi}</td>
                          <td>{diagnosa.nm_penyakit}</td>
                          <td>{diagnosa.status_penyakit}</td>
                          <td>{diagnosa.prioritas}</td>
                          <td>{diagnosa.nm_dokter}</td>
                        </tr>
                      ))
                      .reverse()}
                    {riwayatDiagnosa.length === 0 && (
                      <tr>
                        <td colSpan={6} className='text-center'>
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* BATAS */}
        <div>
          <div className='grid gap-3'>
            <div className='flex gap-3 mt-3 items-center w-full'>
              <div>
                <button
                  onClick={handleWindowProsedur}
                  className='btn bg-primary text-slate-100 flex items-center gap-2 hover:bg-primary hover:border-slate-400 hover:shadow-lg'
                >
                  <MagnifyingGlassIcon width={25} height={25} />
                  <span>Prosedur (ICD 9)</span>
                </button>
              </div>
            </div>
            <div>
              <div className='border rounded-2xl h-56 overflow-auto'>
                <label className='label font-bold text-xl'>Riwayat Prosedur</label>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Nama Penyakit</th>
                      <th>Status</th>
                      <th>Prioritas</th>
                      <th>Nama Pasien</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatProsedur
                      .map((prosedur) => (
                        <tr key={prosedur.no_rawat}>
                          <td>{prosedur.kode}</td>
                          <td>{prosedur.deskripsi_panjang}</td>
                          <td>{prosedur.prioritas}</td>

                          <td>{prosedur.nm_pasien}</td>
                        </tr>
                      ))
                      .reverse()}
                    {riwayatProsedur.length === 0 && (
                      <tr>
                        <td colSpan={6} className='text-center'>
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiagnosaProsedurIcd
