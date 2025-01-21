import React, { useEffect, useState } from 'react'

interface KeadaanUmumProps {
  onValuesChangeKeadaanUmum: (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    bmi: string,
    gcs: string,
  ) => void
}

const KeadaanUmum: React.FC<KeadaanUmumProps> = ({ onValuesChangeKeadaanUmum }) => {
  const [suhuTubuh, setSuhuTubuh] = useState<string>('')
  const [tensi, setTensi] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [tinggi, setTinggi] = useState<string>('')
  const [berat, setBerat] = useState<string>('')
  const [bmi, setBmi] = useState<string>('')

  const [gcs, setGcs] = useState<string>('')

  useEffect(() => {
    onValuesChangeKeadaanUmum(suhuTubuh, tensi, nadi, respirasi, tinggi, berat, bmi, gcs)
  }, [suhuTubuh, tensi, nadi, respirasi, tinggi, berat, bmi, gcs, onValuesChangeKeadaanUmum])

  return (
    <>
      <div className='border rounded-2xl p-2'>
        <label className='font-inter font-bold text-lg text-[#121713]'>
          I. KEADAAN UMUM & STATUS NUTRISI
        </label>
        <div className='grid grid-cols-5 gap-3'>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Suhu(C)</span>
            </label>
            <input
              type='text'
              placeholder='Suhu'
              onChange={(e) => setSuhuTubuh(e.target.value)}
              value={suhuTubuh}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Tensi(mmHg)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setTensi(e.target.value)}
              value={tensi}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Nadi(/mnt)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setNadi(e.target.value)}
              value={nadi}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>RR(/mnt)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setRespirasi(e.target.value)}
              value={respirasi}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>GCS(E,V,M)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setGcs(e.target.value)}
              value={gcs}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Tinggi(cm)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setTinggi(e.target.value)}
              value={tinggi}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Berat(kg)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setBerat(e.target.value)}
              value={berat}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
          <div className='form-control mt-6'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>BMI(kg/m2)</span>
            </label>
            <input
              type='text'
              placeholder='-'
              onChange={(e) => setBmi(e.target.value)}
              value={berat}
              className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default KeadaanUmum
