import React, { useState, useEffect } from 'react'
import { FormDataCpptSoap } from '../type/interfaceCPPTSoap'
import { api } from '../../../../../services/api/config.api'

interface SoapCpptRanapProps {
  onValuesChangeSoapCpptRanap: (
    keluhan: string, // subjektif
    pemeriksaan: string, // object
    rtl: string, // plan
    penilaian: string, // Assesmen
    instruksi: string, // instuksi
    evaluasi: string, // evaluasi
    diagnosa: any[], // diagnosa
  ) => void
}

const SoapCpptRanap: React.FC<SoapCpptRanapProps> = ({ onValuesChangeSoapCpptRanap }) => {
  const [formData, setFormData] = useState<FormDataCpptSoap>({
    keluhan: '',
    pemeriksaan: '',
    rtl: '',
    penilaian: '',
    instruksi: '',
    evaluasi: '',
  })
  const [initialDiagnosa, setInitialDiagnosa] = useState<string[]>([]) // Diagnosa dari API (tidak bisa dihapus)
  const [choosenDiagnosa, setChoosenDiagnosa] = useState<string[]>([])

  const nmrRawat = localStorage.getItem('no_rawat')

  const checkExistDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien?noRawat=${nmrRawat}`)
      if (response.data.length === 0) {
        console.log('TIDAK ADA DIAGNOSA.')
      } else {
        const diagnosaList = response.data.map(
          (item: { kd_penyakit: string; nm_penyakit: string }) =>
            `${item.kd_penyakit}, ${item.nm_penyakit}`,
        )

        setInitialDiagnosa(diagnosaList) // Simpan diagnosa awal yang tidak bisa dihapus
        setFormData((prevData) => ({
          ...prevData,
          penilaian: diagnosaList.join('\n'),
        }))
      }
    } catch (err) {
      console.log('exist diagnosa error', err)
    }
  }

  useEffect(() => {
    checkExistDiagnosa()
  }, [])

  useEffect(() => {
    onValuesChangeSoapCpptRanap(
      formData.keluhan,
      formData.pemeriksaan,
      formData.rtl,
      formData.penilaian,
      formData.instruksi,
      formData.evaluasi,
      choosenDiagnosa,
    )
  }, [JSON.stringify(formData), JSON.stringify(choosenDiagnosa)])

  const handleWindowDiagnosa = () => {
    const width = Math.floor(window.screen.width * 0.5)
    const height = Math.floor(window.screen.height * 0.7)
    const left = Math.floor((window.screen.width - width) / 2)
    const top = Math.floor((window.screen.height - height) / 2)

    const popup = window.open(
      '/diagnosa-search',
      'Diagnosa',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      console.error('Popup gagal dibuka. Pastikan pop-up tidak diblokir oleh browser.')
      return
    }

    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return
      if (Array.isArray(event.data) && event.data.every((item) => item.kode && item.nmPenyakit)) {
        const newDiagnosa = event.data.map((item) => `${item.kode}, ${item.nmPenyakit}`)

        setChoosenDiagnosa((prev) => [...prev, ...newDiagnosa])

        setFormData((prevData) => ({
          ...prevData,
          penilaian: [...initialDiagnosa, ...choosenDiagnosa, ...newDiagnosa].join('\n'),
        }))
      }
    })
  }

  const handleRemoveDiagnosa = (indexToRemove: number) => {
    setChoosenDiagnosa((prev) => {
      const updatedDiagnosa = prev.filter((_, index) => index !== indexToRemove)

      // Update penilaian hanya untuk diagnosa baru yang bisa dihapus
      setFormData((prevData) => ({
        ...prevData,
        penilaian: [...initialDiagnosa, ...updatedDiagnosa].join('\n'),
      }))

      return updatedDiagnosa
    })
  }

  return (
    <div className='mt-3'>
      <label className='label font-inter font-bold text-xl text-[#121713]'>SOAP</label>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='label'>Subjektif</label>
          <textarea
            placeholder='-'
            value={formData.keluhan}
            onChange={(e) => setFormData({ ...formData, keluhan: e.target.value })}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
          />
        </div>
        <div>
          <label className='label'>Objektif</label>
          <textarea
            placeholder='-'
            value={formData.pemeriksaan}
            onChange={(e) => setFormData({ ...formData, pemeriksaan: e.target.value })}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
          />
        </div>
        <div className='relative'>
          <label className='label'>
            Assesmen (Data diagnosa yang sudah ada tidak bisa dihapus)
          </label>

          <div className='relative'>
            <textarea
              disabled
              placeholder='-'
              value={formData.penilaian}
              onChange={(e) => setFormData({ ...formData, penilaian: e.target.value })}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1 pr-10' // Tambahkan padding kanan agar tombol tidak menutupi teks
            />

            <button
              onClick={handleWindowDiagnosa}
              className='absolute bottom-2 right-2 bg-white rounded-md p-1 text-sm hover:bg-gray-200'
            >
              ??
            </button>
          </div>

          {choosenDiagnosa && choosenDiagnosa.length > 0 && (
            <table className='w-full mt-2 border-collapse border border-gray-300'>
              <thead>
                <tr className='bg-gray-100 text-left'>
                  <th className='p-2'>Diagnosa</th>
                  <th className='p-2'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {choosenDiagnosa.map((item, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='p-2'>{item}</td>
                    <td className='p-2'>
                      <button
                        onClick={() => handleRemoveDiagnosa(index)}
                        className='btn btn-ghost hover:bg-gray-200 text-red-500'
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <label className='label'>Plan</label>
          <textarea
            placeholder='-'
            value={formData.rtl}
            onChange={(e) => setFormData({ ...formData, rtl: e.target.value })}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
          />
        </div>

        <div>
          <label className='label'>Instuksi</label>
          <textarea
            placeholder='-'
            value={formData.instruksi}
            onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
          />
        </div>
        <div>
          <label className='label'>Evaluasi</label>
          <textarea
            placeholder='-'
            value={formData.evaluasi}
            onChange={(e) => setFormData({ ...formData, evaluasi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
          />
        </div>
      </div>
    </div>
  )
}

export default SoapCpptRanap
