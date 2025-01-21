import React, { useEffect, useState } from 'react'
import {
  AktifitasKeperawatan,
  AlatBantuKeperawatan,
  BudayaKeperawatan,
  EdukasiKeperawatan,
  HubunganKeperawatan,
  KemampuanKeperawatan,
  PsikologisKeperawatan,
  TinggalDenganKeperawatan,
} from '../type/EnumAssesmenAwal'

interface RiwayatPsikologiProps {
  onValuesChangeRiwayatPsikologi: (
    psikologi: string,
    hubungan: string,
    tinggalDengan: string,
    ketTinggal: string,
    budaya: string,
    ketBudaya: string,
    edukasi: string,
    ketEdukasi: string,
    kemampuan: string,
    aktifitas: string,
    alatBantu: string,
    ketBantu: string,
  ) => void
}

const RiwayatPsikologi: React.FC<RiwayatPsikologiProps> = ({ onValuesChangeRiwayatPsikologi }) => {
  const [psikologi, setPsikologi] = useState<string>('')
  const [hubungan, setHubungan] = useState<string>('')
  const [tinggalDengan, setTinggalDengan] = useState<string>('')
  const [ketTinggal, setKetTinggal] = useState<string>('')
  const [budaya, setBudaya] = useState<string>('')
  const [ketBudaya, setKetBudaya] = useState<string>('')
  const [edukasi, setEdukasi] = useState<string>('')
  const [ketEdukasi, setKetEdukasi] = useState<string>('')
  const [kemampuan, setKemampuan] = useState<string>('')
  const [aktifitas, setAktifitas] = useState<string>('')
  const [alatBantu, setAlatBantu] = useState<string>('')
  const [ketBantu, setKetBantu] = useState<string>('')

  useEffect(() => {
    onValuesChangeRiwayatPsikologi(
      psikologi,
      hubungan,
      tinggalDengan,
      ketTinggal,
      budaya,
      ketBudaya,
      edukasi,
      ketEdukasi,
      kemampuan,
      aktifitas,
      alatBantu,
      ketBantu,
    )
  }, [
    psikologi,
    hubungan,
    tinggalDengan,
    ketTinggal,
    budaya,
    ketBudaya,
    edukasi,
    ketEdukasi,
    kemampuan,
    aktifitas,
    alatBantu,
    ketBantu,
  ])

  return (
    <>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-fit'>
        <label className='label font-bold text-lg'>III. FUNGSIONAL</label>
        <div className='flex items-center gap-3'>
          <div className='p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Aktifitas Sehari-hari (ADL)</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setKemampuan(e.target.value)}
                  >
                    <option disabled selected>
                      Kemampuan
                    </option>
                    {Object.values(KemampuanKeperawatan).map((kemampuan) => (
                      <option key={kemampuan} value={kemampuan}>
                        {kemampuan}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Cacat Fisik </label>
                  <input
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                    placeholder='Otomatis diinput'
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Protesa</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setAktifitas(e.target.value)}
                  >
                    <option disabled selected>
                      Aktifitas
                    </option>
                    {Object.values(AktifitasKeperawatan).map((aktifitas) => (
                      <option key={aktifitas} value={aktifitas}>
                        {aktifitas}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Protesa</label>
                  <input
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                    placeholder='Keterangan alat bantu'
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Alat Bantu </label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setAlatBantu(e.target.value)}
                  >
                    <option disabled selected>
                      tidak
                    </option>
                    {Object.values(AlatBantuKeperawatan).map((alatBantu) => (
                      <option key={alatBantu} value={alatBantu}>
                        {alatBantu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Alat bantu</label>
                  <input
                    onChange={(e) => setKetBantu(e.target.value)}
                    value={ketBantu}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                    placeholder='Keterangan alat bantu'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-full'>
        <label className='label font-bold text-lg'>
          IV. RIWAYAT PSIKOLOGIS - SOSIAL -EKONOMI - BUDAYA SPIRITUAL
        </label>
        <div className='flex items-center gap-3'>
          <div className='border rounded-2xl p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Status Psikologis :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setPsikologi(e.target.value)}
                  >
                    <option disabled selected>
                      Psikologi
                    </option>
                    {Object.values(PsikologisKeperawatan).map((psikologi) => (
                      <option key={psikologi} value={psikologi}>
                        {psikologi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Status Psikologis :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
              <div className='flex items-center gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Tinggal Dengan :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setTinggalDengan(e.target.value)}
                  >
                    <option disabled selected>
                      Tinggal Dengan
                    </option>
                    {Object.values(TinggalDenganKeperawatan).map((tinggalDengan) => (
                      <option key={tinggalDengan} value={tinggalDengan}>
                        {tinggalDengan}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan TInggal :</label>
                  <input
                    placeholder='Keterangan Tinggal'
                    onChange={(e) => setKetTinggal(e.target.value)}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Hubungan dgn Keluarga :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setHubungan(e.target.value)}
                  >
                    <option disabled selected>
                      Hubungan
                    </option>
                    {Object.values(HubunganKeperawatan).map((hubungan) => (
                      <option key={hubungan} value={hubungan}>
                        {hubungan}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Ekonomi :</label>
                  <select className='select select-bordered w-56'>
                    <option disabled selected>
                      Hubungan
                    </option>
                    {Object.values(HubunganKeperawatan).map((hubungan) => (
                      <option key={hubungan} value={hubungan}>
                        {hubungan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='border rounded-2xl p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Bahasa :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Agama :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Budaya :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setBudaya(e.target.value)}
                  >
                    <option disabled selected>
                      Autoanamnesa
                    </option>
                    {Object.values(BudayaKeperawatan).map((Budaya) => (
                      <option key={Budaya} value={Budaya}>
                        {Budaya}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Budaya :</label>
                  <input
                    placeholder='Keterangan Budaya'
                    value={ketBudaya}
                    onChange={(e) => setKetBudaya(e.target.value)}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Edukasi Diberikan Kepada :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setEdukasi(e.target.value)}
                  >
                    <option disabled selected>
                      Edukasi diberikan kepada
                    </option>
                    {Object.values(EdukasiKeperawatan).map((edukasi) => (
                      <option key={edukasi} value={edukasi}>
                        {edukasi}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Edukasi :</label>
                  <input
                    placeholder='Keterangan Edukasi'
                    onChange={(e) => setKetEdukasi(e.target.value)}
                    value={ketEdukasi}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RiwayatPsikologi
