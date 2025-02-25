import React, { useState, useEffect } from 'react'
import { FormDataCpptSoap } from '../type/interfaceCPPTSoap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SoapCpptRanapProps {
  onValuesChangeSoapCpptRanap: (
    keluhan: string, // subjektif
    pemeriksaan: string, // object
    rtl: string, // plan
    penilaian: string, // Assesmen
    instruksi: string, // instuksi
    evaluasi: string, // evaluasi
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

  useEffect(() => {
    onValuesChangeSoapCpptRanap(
      formData.keluhan,
      formData.pemeriksaan,
      formData.rtl,
      formData.penilaian,
      formData.instruksi,
      formData.evaluasi,
    )
  }, [JSON.stringify(formData)])

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
        <div>
          <label className='label'>Assesmen</label>

          <div>
            <textarea
              placeholder='-'
              value={formData.penilaian}
              onChange={(e) => setFormData({ ...formData, penilaian: e.target.value })}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1 pr-10' // Tambahkan padding kanan agar tombol tidak menutupi teks
            />
          </div>
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
      <div className='flex gap-3 mt-3 items-center w-full'>
        <div>
          <button
            onClick={() => handleWindowDiagnosa('ranap')}
            className='btn bg-primary text-slate-100 flex items-center gap-2 hover:bg-primary hover:border-slate-400 hover:shadow-lg'
          >
            <MagnifyingGlassIcon width={25} height={25} />
            <span>Diagnosa (ICD 10)</span>
          </button>
        </div>
        <div>
          <button
            onClick={handleWindowProsedur}
            className='btn bg-primary flex text-slate-100 items-center gap-2 hover:bg-primary hover:border-slate-400 hover:shadow-lg'
          >
            <MagnifyingGlassIcon width={25} height={25} />
            <span>Prosedur (ICD 9)</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SoapCpptRanap
