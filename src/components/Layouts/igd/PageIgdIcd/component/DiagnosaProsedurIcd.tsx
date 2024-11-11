import React, { useState, useEffect } from 'react'
import { api } from '../../../../../services/api/config.api'
import { DiagnosaIcd, ProsedurIcd, RiwayatDiagnosaIcd } from '../type/InterfaceIcd'
import { useParams } from 'react-router-dom'

const DiagnosaProsedurIcd: React.FC = () => {
  const [diagnosaData, setDiagnosaData] = useState<DiagnosaIcd[]>([])
  const [diagnosaKode, setDiagnosaKode] = useState<string>('')
  const [riwayatDiagnosa, setRiwayatDiagnosa] = useState<RiwayatDiagnosaIcd[]>([])
  const [prosedurData, setProsedurData] = useState<ProsedurIcd[]>([])
  const [prosedurKode, setProsedurKode] = useState<string>('')
  const [loading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams()

  const fetchDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getAllPenyakit?searchString=${diagnosaKode}`)
      setDiagnosaData(response.data)
    } catch (err) {
      console.log('failed search diagnosa', err)
    }
  }

  const fetchRiwayatDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
      setRiwayatDiagnosa(response.data)
      console.log(response.data)
    } catch (err) {
      console.log('err Riwaya Diagnosa', err)
    }
  }

  const fetchProsedure = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/api/v1/icd9/all')
      console.log('prosedur', response.data)
      setProsedurData(response.data)
    } catch (err) {
      console.log('failed get prosedur data', err)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (diagnosaKode.length > 2) {
      fetchDiagnosa()
    } else {
      setDiagnosaData([])
    }
  }, [diagnosaKode])

  useEffect(() => {
    fetchProsedure()
    fetchRiwayatDiagnosa()
  }, [])

  const filteredProsedur =
    prosedurKode.length >= 3
      ? prosedurData.filter(
          (prosedur) =>
            prosedur.kode.toLowerCase().includes(prosedurKode.toLowerCase()) ||
            prosedur.deskripsi_panjang.toLowerCase().includes(prosedurKode.toLowerCase()) ||
            prosedur.deskripsi_pendek.toLowerCase().includes(prosedurKode.toLowerCase()),
        )
      : []

  return (
    <>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <div className='grid gap-3'>
            <div className='grid gap-3'>
              <label className='label font-bold text-xl'>Diagnosa</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
              />
              <input
                type='text'
                placeholder='Cari Diagnosa'
                onChange={(e) => setDiagnosaKode(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
              {diagnosaData.length > 0 ? (
                <div className='border rounded-2xl h-56 overflow-auto'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Kode Penyakit</th>
                        <th>Nama Penyakit</th>
                        <th>Ciri-Ciri</th>
                        <th>Keterangan</th>
                        <th>Kode Kategori</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diagnosaData.map((diagnosa, index) => (
                        <tr key={index}>
                          <td>{diagnosa.kd_penyakit}</td>
                          <td>{diagnosa.nm_penyakit}</td>
                          <td>{diagnosa.ciri_ciri}</td>
                          <td>{diagnosa.keterangan}</td>
                          <td>{diagnosa.kd_ktg}</td>
                          <td>{diagnosa.status}</td>
                          <td>
                            <button className='text-red-400'>Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
            <div>
              <div className='border rounded-2xl h-56 overflow-auto'>
                <label className='label font-bold text-xl'>Riwayat Diagnosa</label>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Nama Penyakit</th>
                      <th>Status</th>
                      <th>Prioritas</th>
                      <th>Nama Dokter</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatDiagnosa
                      .map((diagnosa) => (
                        <tr key={diagnosa.no_rawat}>
                          <td>{diagnosa.tgl_registrasi}</td>
                          <td>{diagnosa.nm_penyakit}</td>
                          <td>{diagnosa.status_penyakit}</td>
                          <td>{diagnosa.prioritas}</td>
                          <td>{diagnosa.nm_dokter}</td>
                          <td>
                            <button className='text-red-400'>Hapus</button>
                          </td>
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
            <div className='grid gap-3'>
              <label className='label font-bold text-xl'>Prosedur</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
              />
              <input
                type='text'
                placeholder={loading ? 'SEDANG MEMUAT DATA' : 'Cari prosedur'}
                onChange={(e) => setProsedurKode(e.target.value)}
                disabled={loading}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
              {filteredProsedur.length > 0 ? (
                <div className='border rounded-2xl h-56 overflow-auto'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Kode</th>
                        <th>Deskripsi Panjang</th>
                        <th>Deskripsi Pendek</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProsedur.map((prosedur, index) => (
                        <tr key={index}>
                          <td>{prosedur.kode}</td>
                          <td>{prosedur.deskripsi_panjang}</td>
                          <td>{prosedur.deskripsi_pendek}</td>
                          <td>
                            <button className='text-red-400'>Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
            <div>
              <div className='border rounded-2xl h-56 overflow-auto'>
                <label className='label font-bold text-xl'>Riwayat Prosedur</label>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Kode</th>
                      <th>Deskripsi Panjang</th>
                      <th>Deskripsi Pendek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-08-15</td>
                      <td>Energen 800mg</td>
                      <td>2x1 Pagi</td>
                    </tr>
                    <tr>
                      <td>2024-08-15</td>
                      <td>Energen 800mg</td>
                      <td>2x1 Pagi</td>
                    </tr>
                    <tr>
                      <td>2024-08-15</td>
                      <td>Energen 800mg</td>
                      <td>2x1 Pagi</td>
                    </tr>
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
