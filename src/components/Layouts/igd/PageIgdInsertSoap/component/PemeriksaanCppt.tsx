import React, { useState, useEffect } from 'react'
import { KesadaranOptionsCppt } from '../type/EnumCppt'

interface PemeriksaanCpptProps {
  onValuesChangePemeriksaanCppt: (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    spo2: string,
    gcs: string,
    kesadaran: string,
    keluhan: string,
    pemeriksaan: string,
    alergi: string,
    lingkarPerut: string,
    rtl: string,
    penilaian: string,
    instruksi: string,
    evaluasi: string,
  ) => void
}

const PemeriksaanCppt: React.FC<PemeriksaanCpptProps> = ({ onValuesChangePemeriksaanCppt }) => {
  const [suhuTubuh, setSuhuTubuh] = useState<string>('')
  const [tensi, setTensi] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [tinggi, setTinggi] = useState<string>('')
  const [berat, setBerat] = useState<string>('')
  const [spo2, setSpo2] = useState<string>('')
  const [gcs, setGcs] = useState<string>('')
  const [kesadaran, setKesadaran] = useState<string>('')
  const [keluhan, setKeluhan] = useState<string>('')
  const [pemeriksaan, setPemeriksaan] = useState<string>('')
  const [alergi, setAlergi] = useState<string>('')
  const [lingkarPerut, setLingkarPerut] = useState<string>('')
  const [rtl, setRtl] = useState<string>('')
  const [penilaian, setPenilaian] = useState<string>('')
  const [instruksi, setInstruksi] = useState<string>('')
  const [evaluasi, setEvaluasi] = useState<string>('')

  useEffect(() => {
    onValuesChangePemeriksaanCppt(
      suhuTubuh,
      tensi,
      nadi,
      respirasi,
      tinggi,
      berat,
      spo2,
      gcs,
      kesadaran,
      keluhan,
      pemeriksaan,
      alergi,
      lingkarPerut,
      rtl,
      penilaian,
      instruksi,
      evaluasi,
    )
  }, [
    suhuTubuh,
    tensi,
    nadi,
    respirasi,
    tinggi,
    berat,
    spo2,
    gcs,
    kesadaran,
    keluhan,
    pemeriksaan,
    alergi,
    lingkarPerut,
    rtl,
    penilaian,
    instruksi,
    evaluasi,
    onValuesChangePemeriksaanCppt,
  ])

  return (
    <div className='mt-3'>
      <label className='label font-inter font-bold text-xl text-[#121713]'>Pemeriksaan</label>
      <div className='grid grid-cols-6 gap-3'>
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
            <span>SPO2</span>
          </label>
          <input
            type='text'
            placeholder='-'
            onChange={(e) => setSpo2(e.target.value)}
            value={spo2}
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
            <span>Alergi</span>
          </label>
          <input
            type='text'
            placeholder='-'
            onChange={(e) => setAlergi(e.target.value)}
            value={alergi}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Lingkar Perut</span>
          </label>
          <input
            type='text'
            placeholder='-'
            onChange={(e) => setLingkarPerut(e.target.value)}
            value={lingkarPerut}
            className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
        <div className='form-control mt-6'>
          <label className='label font-semibold text-slate-700 text-md'>
            <span>Kesadaran</span>
          </label>
          <select
            onChange={(e) => setKesadaran(e.target.value)}
            value={kesadaran}
            className='input w-full input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black'
          >
            <option disabled value=''>
              Kesadaran
            </option>
            {Object.values(KesadaranOptionsCppt).map((kesadaranOption) => (
              <option key={kesadaranOption} value={kesadaranOption}>
                {kesadaranOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* batas */}
      <div className='mt-3'>
        <label className='label font-inter font-bold text-xl text-[#121713]'>SOAP</label>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='label'>Subjektif</label>
            <textarea
              onChange={(e) => setKeluhan(e.target.value)}
              value={keluhan}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='label'>Objektif</label>
            <textarea
              onChange={(e) => setPemeriksaan(e.target.value)}
              value={pemeriksaan}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='label'>Assesmen</label>
            <textarea
              onChange={(e) => setPenilaian(e.target.value)}
              value={penilaian}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='label'>Plan</label>
            <textarea
              onChange={(e) => setRtl(e.target.value)}
              value={rtl}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='label'>Instruksi</label>
            <textarea
              onChange={(e) => setInstruksi(e.target.value)}
              value={instruksi}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='label'>Evaluasi</label>
            <textarea
              onChange={(e) => setEvaluasi(e.target.value)}
              value={evaluasi}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PemeriksaanCppt
