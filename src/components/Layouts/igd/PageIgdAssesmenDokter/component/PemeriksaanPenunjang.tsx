import React, { useEffect, useState } from 'react'
import imgLokalis from '../../../../../assets/img/lokalis.png'

interface PemeriksaanPenunjangProps {
  onValueChangePemeriksaanPenunjang: (
    ketLokalis: string,
    ekg: string,
    rad: string,
    lab: string,
    diagnosis: string,
    tata: string,
  ) => void
}

const PemeriksaanPenunjang: React.FC<PemeriksaanPenunjangProps> = ({
  onValueChangePemeriksaanPenunjang,
}) => {
  const [ketLokalis, setKetLokalis] = useState<string>('')
  const [ekg, setEkg] = useState<string>('')
  const [rad, setRad] = useState<string>('')
  const [lab, setLab] = useState<string>('')
  const [diagnosis, setDiagnosis] = useState<string>('')
  const [tata, setTata] = useState<string>('')

  useEffect(() => {
    onValueChangePemeriksaanPenunjang(ketLokalis, ekg, rad, lab, diagnosis, tata)
  }, [ketLokalis, ekg, rad, lab, diagnosis, tata, onValueChangePemeriksaanPenunjang])

  return (
    <>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-full'>
        <label className='label font-bold text-lg'>Status Lokalis</label>
        <div className='grid items-center gap-3 '>
          <div className='flex justify-center'>
            <img src={imgLokalis} className='w-[1200px] h-[450px]' />
          </div>
          <div className='flex gap-3'>
            <div className='w-full'>
              <label className='label font-bold'>Keterangan</label>
              <textarea
                placeholder='-'
                onChange={(e) => setKetLokalis(e.target.value)}
                value={ketLokalis}
                className='input input-bordered text-sm h-[155px] rounded-2xl align-text-top border-disabled w-full pt-1'
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className='label font-inter font-bold text-xl text-[#121713]'>
          Pemeriksaan Penunjang
        </label>
        <div className='GRID justify-center items-center gap-3'>
          <div className='w-full'>
            <label className='text text-xl font-bold label'>EKG</label>
            <textarea
              placeholder='-'
              onChange={(e) => setEkg(e.target.value)}
              value={ekg}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div className='w-full'>
            <label className='text text-xl font-bold label'>Radiologi</label>
            <textarea
              placeholder='-'
              onChange={(e) => setRad(e.target.value)}
              value={rad}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div className='w-full'>
            <label className='text text-xl font-bold label'>Laboratorium</label>
            <textarea
              placeholder='-'
              onChange={(e) => setLab(e.target.value)}
              value={lab}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div className='w-full'>
            <label className='text text-xl font-bold label'>Diagnosis</label>
            <textarea
              placeholder='-'
              onChange={(e) => setDiagnosis(e.target.value)}
              value={diagnosis}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div className='w-full'>
            <label className='text text-xl font-bold label'>Tatalaksana</label>
            <textarea
              placeholder='-'
              onChange={(e) => setTata(e.target.value)}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default PemeriksaanPenunjang
