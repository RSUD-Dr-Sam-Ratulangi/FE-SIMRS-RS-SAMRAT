import React, { useEffect, useState } from 'react'
import { AnamnesisAssesmenDokter } from '../type/EnumAssesmenDokter'

interface PemeriksaanAwalProps {
  onValueChangePemeriksaanAwal: (
    anamnesis: string,
    hubungan: string,
    keluhanUtama: string,
    rps: string,
    rpd: string,
    rpk: string,
    rpo: string,
    alergi: string,
  ) => void
}

const PemeriksaanAwal: React.FC<PemeriksaanAwalProps> = ({ onValueChangePemeriksaanAwal }) => {
  const [anamnesis, setAnamnesis] = useState<string>('')
  const [hubungan, setHubungan] = useState<string>('')
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rps, setRps] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpk, setRpk] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [alergi, setAlergi] = useState<string>('')

  useEffect(() => {
    onValueChangePemeriksaanAwal(anamnesis, hubungan, keluhanUtama, rps, rpd, rpk, rpo, alergi)
  }, [anamnesis, hubungan, keluhanUtama, rps, rpd, rpk, rpo, alergi, onValueChangePemeriksaanAwal])

  return (
    <>
      <div className='flex gap-4 items-center'>
        <div>
          <label className='label font-bold text-sm'>Anamnesis</label>
          <select
            className='select select-bordered w-56'
            onChange={(e) => setAnamnesis(e.target.value)}
          >
            <option disabled selected>
              Anamnesis
            </option>
            {Object.values(AnamnesisAssesmenDokter).map((anamnesis) => (
              <option key={anamnesis} value={anamnesis}>
                {anamnesis}
              </option>
            ))}
          </select>
        </div>
        <div className=''>
          <label className='label font-bold text-sm'>
            <span>Hubungan</span>
          </label>
          <input
            type='text'
            onChange={(e) => setHubungan(e.target.value)}
            value={hubungan}
            placeholder='Hubungan'
            className='input input-bordered text-sm rounded-2xl disabled:bg-slate-200 disabled:text-black w-full'
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5 items-center'>
        <div>
          <label className='text text-xl font-bold label'>Keluhan Utama</label>
          <textarea
            placeholder='Keluhan Utama'
            onChange={(e) => setKeluhanUtama(e.target.value)}
            value={keluhanUtama}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
        <div className='grid items-start w-full'>
          <label className='text text-sm font-bold label'>Riwayat Penyakit Sekarang</label>
          <textarea
            placeholder='Riwayat Penyakit Sekarang'
            onChange={(e) => setRps(e.target.value)}
            value={rps}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
        <div className='grid items-start w-full'>
          <label className='text text-sm font-bold label'>Riwayat Penyakit Dahulu</label>
          <textarea
            placeholder='Riwayat Penyakit Dahulu'
            onChange={(e) => setRpd(e.target.value)}
            value={rpd}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
        <div className='grid items-start w-full'>
          <label className='text text-sm font-bold label'>Riwayat Penggunaan Obat</label>
          <textarea
            placeholder='Riwayat Penggunaan Obat'
            onChange={(e) => setRpo(e.target.value)}
            value={rpo}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
        <div className='grid items-start w-full'>
          <label className='text text-sm font-bold label'>Riwayat Penyakit Keluarga</label>
          <textarea
            placeholder='Riwayat Penyakit Keluarga'
            onChange={(e) => setRpk(e.target.value)}
            value={rpk}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
        <div>
          <label className='text text-xl font-bold label'>Riwayat Alergi</label>
          <textarea
            placeholder='Riwayat Alergi'
            onChange={(e) => setAlergi(e.target.value)}
            value={alergi}
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
          />
        </div>
      </div>
    </>
  )
}

export default PemeriksaanAwal
