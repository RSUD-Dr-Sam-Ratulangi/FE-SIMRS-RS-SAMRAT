import React, { useState, useEffect } from 'react'
import { FormDataCpptPemeriksaan, KesadaranOptionsCpptRanap } from '../type/interfaceCPPTSoap'

interface PemeriksaanCpptRanapProps {
  onValuesChangePemeriksaanCpptRanap: (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    spo2: string,
    gcs: string,
    kesadaran: string,
    alergi: string,
    lingkarPerut: string,
  ) => void
}

const PemeriksaanCpptRanap: React.FC<PemeriksaanCpptRanapProps> = ({
  onValuesChangePemeriksaanCpptRanap,
}) => {
  const [formData, setFormData] = useState<FormDataCpptPemeriksaan>({
    suhuTubuh: '',
    tensi: '',
    nadi: '',
    respirasi: '',
    tinggi: '',
    berat: '',
    spo2: '',
    gcs: '',
    kesadaran: 'Compos Mentis',
    alergi: '',
    lingkarPerut: '-',
  })

  useEffect(() => {
    onValuesChangePemeriksaanCpptRanap(
      formData.suhuTubuh,
      formData.tensi,
      formData.nadi,
      formData.respirasi,
      formData.tinggi,
      formData.berat,
      formData.spo2,
      formData.gcs,
      formData.kesadaran,
      formData.alergi,
      formData.lingkarPerut,
    )
  }, [JSON.stringify(formData)])

  return (
    <div className='mt-3'>
      <label className='label font-inter font-bold text-xl text-[#121713]'>Pemeriksaan</label>
      <div className='grid grid-cols-6 gap-3'>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Suhu(C)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.suhuTubuh}
            onChange={(e) => setFormData({ ...formData, suhuTubuh: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Tensi(mmHg)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.tensi}
            onChange={(e) => setFormData({ ...formData, tensi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Nadi(/mnt)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.nadi}
            onChange={(e) => setFormData({ ...formData, nadi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>RR(/mnt)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.respirasi}
            onChange={(e) => setFormData({ ...formData, respirasi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Tinggi(cm)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.tinggi}
            onChange={(e) => setFormData({ ...formData, tinggi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Berat(kg)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.berat}
            onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>SPO2</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.spo2}
            onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>GCS(E,V,M)</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.gcs}
            onChange={(e) => setFormData({ ...formData, gcs: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Alergi</span>
          </label>
          <input
            type='Text'
            placeholder='-'
            value={formData.alergi}
            onChange={(e) => setFormData({ ...formData, alergi: e.target.value })}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Kesadaran</span>
          </label>
          <select
            className='input w-full input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black'
            value={formData.kesadaran ?? ''}
            onChange={(e) => setFormData({ ...formData, kesadaran: e.target.value })}
          >
            {Object.values(KesadaranOptionsCpptRanap).map((option) => (
              <option
                key={option}
                value={option}
                disabled={option === KesadaranOptionsCpptRanap.defaultValue}
                hidden={option === KesadaranOptionsCpptRanap.defaultValue}
                selected={option === KesadaranOptionsCpptRanap.defaultValue}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PemeriksaanCpptRanap
