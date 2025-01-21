import React, { useEffect, useState } from 'react'

interface PengkajianKeperawatanProps {
  onValuesChangeRiwayatKesehatan: (
    keluhanUtama: string,
    rpd: string,
    rpo: string,
    rpk: string,
    riwayatAlergi: string,
  ) => void
}

const PengkajianKeperawatan: React.FC<PengkajianKeperawatanProps> = ({
  onValuesChangeRiwayatKesehatan,
}) => {
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [rpk, setRpk] = useState<string>('')
  const [riwayatAlergi, setRiwayatAlergi] = useState<string>('')

  useEffect(() => {
    onValuesChangeRiwayatKesehatan(keluhanUtama, rpd, rpo, rpk, riwayatAlergi)
  }, [keluhanUtama, rpd, rpo, rpk, riwayatAlergi, onValuesChangeRiwayatKesehatan])

  return (
    <>
      <div className='mt-4'>
        <div>
          <label className='font-inter font-bold text-lg text-[#121713]'>
            II. RIWAYAT KESEHEATAN
          </label>
        </div>
        <div className='flex items-start w-full'>
          <div className='grid items-center gap-5 w-full'>
            <div className='grid gap-2'>
              <div className='grid grid-cols-2 gap-3 w-full border rounded-2xl p-2'>
                <div className='w-full'>
                  <label className='text text-xl label'>
                    Riwayat Penyakit Sekarang (keluhan_utama)
                  </label>
                  <textarea
                    placeholder='-'
                    onChange={(e) => setKeluhanUtama(e.target.value)}
                    value={keluhanUtama}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl label'>Riwayat Penyakit Dahulu (RPD)</label>
                  <textarea
                    placeholder='-'
                    onChange={(e) => setRpd(e.target.value)}
                    value={rpd}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl label'>Riwayat Pengobatan Sebelumnya (RPO)</label>
                  <textarea
                    placeholder='-'
                    onChange={(e) => setRpo(e.target.value)}
                    value={rpo}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl label'>Riwayat Penyakit Keluar</label>
                  <textarea
                    placeholder='-'
                    onChange={(e) => setRpk(e.target.value)}
                    value={rpo}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
              </div>
              <div className='form-control mt-1'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Riwayat Alergi</span>
                </label>
                <input
                  type='text'
                  placeholder='Suhu'
                  onChange={(e) => setRiwayatAlergi(e.target.value)}
                  value={riwayatAlergi}
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PengkajianKeperawatan
