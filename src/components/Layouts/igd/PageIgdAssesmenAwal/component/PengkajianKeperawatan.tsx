import { ClockIcon } from '@heroicons/react/24/solid'
import img from '../../../../../assets/img/asawal.png'
import React, { useEffect, useState } from 'react'
import { InformasiAwalKeperawatan, StatusKehamilanAwalKeperawatan } from '../type/EnumAssesmenAwal'

interface PengkajianKeperawatanProps {
  onValuesChangePengkajianKeperawatan: (
    informasi: string,
    keluhanUtama: string,
    rpd: string,
    rpo: string,
    statusKehamilan: string,
    gravida: string,
    para: string,
    abortus: string,
    hpht: string,
  ) => void
}

const PengkajianKeperawatan: React.FC<PengkajianKeperawatanProps> = ({
  onValuesChangePengkajianKeperawatan,
}) => {
  const [informasi, setInformasi] = useState<string>('')
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [statusKehamilan, setStatusKehamilan] = useState<string>('')
  const [gravida, setGravida] = useState<string>('')
  const [para, setPara] = useState<string>('')
  const [abortus, setAbortus] = useState<string>('')
  const [hpht, setHpht] = useState<string>('')

  useEffect(() => {
    onValuesChangePengkajianKeperawatan(
      informasi,
      keluhanUtama,
      rpd,
      rpo,
      statusKehamilan,
      gravida,
      para,
      abortus,
      hpht,
    )
  }, [
    informasi,
    keluhanUtama,
    rpd,
    rpo,
    statusKehamilan,
    para,
    gravida,
    abortus,
    hpht,
    onValuesChangePengkajianKeperawatan,
  ])

  return (
    <>
      <div>
        <div>
          <label className='font-inter font-bold text-xl text-[#121713]'>
            PENGKAJIAN KEPERAWATAN
          </label>
          <div className='flex gap-5'>
            <div>
              <label className='label font-bold text-sm'>
                Informasi diperoleh dari : (informasi)
              </label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setInformasi(e.target.value)}
              >
                <option disabled selected>
                  Autoanamnesa
                </option>
                {Object.values(InformasiAwalKeperawatan).map((informasi) => (
                  <option key={informasi} value={informasi}>
                    {informasi}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className='flex items-start w-full'>
          <div className='grid items-center gap-5 w-full'>
            <div className='flex gap-5 w-full'>
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
            </div>
            <div className='grid gap-2'>
              <div className='w-full border rounded-2xl p-2'>
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
              </div>
              {/* batas */}
              <div className='flex gap-3 w-full p-0'>
                <div className='border rounded-2xl p-2 w-full'>
                  <div className='flex justify-evenly gap-5'>
                    <div className='w-full'>
                      <label className='label font-bold text-sm'>Riwayat Alergi :</label>
                      <select className='select select-bordered w-56'>
                        <option disabled selected>
                          Autoanamnesa
                        </option>
                        <option>Lorem</option>
                        <option>Lorem</option>
                      </select>
                    </div>
                    <div className='w-full'>
                      <label className='label font-bold text-sm'>Merokok :</label>
                      <select className='select select-bordered w-56'>
                        <option disabled selected>
                          Autoanamnesa
                        </option>
                        <option>Lorem</option>
                        <option>Lorem</option>
                      </select>
                    </div>
                  </div>
                  <div className='w-full'>
                    <label className='text text-xl label'>Reaksi Jika Alergi</label>
                    <textarea
                      placeholder='-'
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    />
                  </div>
                </div>
                <div className='grid justify-center border rounded-2xl p-2 w-full'>
                  <div className='flex items-center gap-5'>
                    <div>
                      <label className='label font-bold text-sm'>
                        Riwayat Kehamilan : (status_kehamilan)
                      </label>
                      <select
                        className='select select-bordered'
                        onChange={(e) => setStatusKehamilan(e.target.value)}
                      >
                        <option disabled selected>
                          tidak
                        </option>
                        {Object.values(StatusKehamilanAwalKeperawatan).map((kehamilan) => (
                          <option key={kehamilan} value={kehamilan}>
                            {kehamilan}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='grid gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>G (gravida)</span>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        onChange={(e) => setGravida(e.target.value)}
                        value={gravida}
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                    <div className='grid gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>P (para)</span>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        onChange={(e) => setPara(e.target.value)}
                        value={para}
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                  </div>
                  <div className='flex gap-5 mt-1'>
                    <div className='grid gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>A (abortus)</span>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        onChange={(e) => setAbortus(e.target.value)}
                        value={abortus}
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                    <div className='grid gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>HPHT (hpht)</span>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        onChange={(e) => setHpht(e.target.value)}
                        value={hpht}
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BATAS IMAGE */}
          <div className='grid gap-3 mt-5'>
            <div className='flex justify-end'>
              <button className='flex justify-center items-end font-semibold text-gray-500 border-2 text-base w-80 h-[50px] py-2 p-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <ClockIcon className='mr-3' width={25} height={25} />
                  RIWAYAT PEMERIKSAAN PASIEN
                </p>
              </button>
            </div>
            <img className='w-[1400px] h-full' src={img} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PengkajianKeperawatan
