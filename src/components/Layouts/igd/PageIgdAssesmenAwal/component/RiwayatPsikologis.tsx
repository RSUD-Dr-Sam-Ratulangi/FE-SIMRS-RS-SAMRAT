import React, { useEffect, useState } from 'react'
import {
  AktifitasKeperawatan,
  AlatBantuKeperawatan,
  BudayaKeperawatan,
  EdukasiKeperawatan,
  HubunganKeperawatan,
  JiwaKeperawatan,
  KemampuanKeperawatan,
  PendidikPjKeperawatan,
  PerilakuKeperawatan,
  PsikologisKeperawatan,
  TinggalDenganKeperawatan,
} from '../type/EnumAssesmenAwal'

interface RiwayatPsikologiProps {
  onValuesChangeRiwayatPsikologi: (
    psikologi: string,
    jiwa: string,
    perilaku: string,
    dilaporkan: string,
    sebutkan: string,
    hubungan: string,
    tinggalDengan: string,
    ketTinggal: string,
    budaya: string,
    ketBudaya: string,
    pendidikanPj: string,
    ketPendidikanPj: string,
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
  const [jiwa, setJiwa] = useState<string>('')
  const [perilaku, setPerilaku] = useState<string>('')
  const [dilaporkan, setDilaporkan] = useState<string>('')
  const [sebutkan, setSebutkan] = useState<string>('')
  const [hubungan, setHubungan] = useState<string>('')
  const [tinggalDengan, setTinggalDengan] = useState<string>('')
  const [ketTinggal, setKetTinggal] = useState<string>('')
  const [budaya, setBudaya] = useState<string>('')
  const [ketBudaya, setKetBudaya] = useState<string>('')
  const [pendidikanPj, setPendidikanPj] = useState<string>('')
  const [ketPendidikanPj, setKetPendidikanPj] = useState<string>('')
  const [edukasi, setEdukasi] = useState<string>('')
  const [ketEdukasi, setKetEdukasi] = useState<string>('')
  const [kemampuan, setKemampuan] = useState<string>('')
  const [aktifitas, setAktifitas] = useState<string>('')
  const [alatBantu, setAlatBantu] = useState<string>('')
  const [ketBantu, setKetBantu] = useState<string>('')

  useEffect(() => {
    onValuesChangeRiwayatPsikologi(
      psikologi,
      jiwa,
      perilaku,
      dilaporkan,
      sebutkan,
      hubungan,
      tinggalDengan,
      ketTinggal,
      budaya,
      ketBudaya,
      pendidikanPj,
      ketPendidikanPj,
      edukasi,
      ketEdukasi,
      kemampuan,
      aktifitas,
      alatBantu,
      ketBantu,
    )
  }, [
    psikologi,
    jiwa,
    perilaku,
    dilaporkan,
    sebutkan,
    hubungan,
    tinggalDengan,
    ketTinggal,
    budaya,
    ketBudaya,
    pendidikanPj,
    ketPendidikanPj,
    edukasi,
    ketEdukasi,
    kemampuan,
    aktifitas,
    alatBantu,
    ketBantu,
  ])

  return (
    <>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-full'>
        <label className='label font-bold text-lg'>
          RIWAYAT PSIKOLOGIS - SOSIAL -EKONOMI - BUDAYA SPIRITUAL
        </label>
        <div className='flex items-center gap-3'>
          <div className='border rounded-2xl p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Kondisi Psikologi :</label>
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
                  <label className='label font-bold text-sm'>Gangguan Jiwa di masa lalu :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setJiwa(e.target.value)}
                  >
                    <option disabled selected>
                      Jiwa
                    </option>
                    {Object.values(JiwaKeperawatan).map((jiwa) => (
                      <option key={jiwa} value={jiwa}>
                        {jiwa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Status Pernikahan :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Adakah Perilaku :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setPerilaku(e.target.value)}
                  >
                    <option disabled selected>
                      Perilaku
                    </option>
                    {Object.values(PerilakuKeperawatan).map((perilaku) => (
                      <option key={perilaku} value={perilaku}>
                        {perilaku}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='label font-bold text-sm'>Dilaporkan Kepada :</label>
                  <input
                    placeholder='Dilaporkan'
                    onChange={(e) => setDilaporkan(e.target.value)}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Sebutkan :</label>
                  <input
                    placeholder='sebutkan'
                    onChange={(e) => setSebutkan(e.target.value)}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
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
                  <label className='label font-bold text-sm'>Pekerjaan :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Pembayaran :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
              </div>
            </div>
          </div>
          <div className='border rounded-2xl p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
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
                <div>
                  <label className='label font-bold text-sm'>Bahasa :</label>
                  <input className='input input-bordered text-sm rounded-2xl disabled:text-black w-full' />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Pendidikan :</label>
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
                <div>
                  <label className='label font-bold text-sm'>Pendidikan P.J :</label>
                  <select
                    className='select select-bordered w-56'
                    onChange={(e) => setPendidikanPj(e.target.value)}
                  >
                    <option disabled selected>
                      Pendidikan
                    </option>
                    {Object.values(PendidikPjKeperawatan).map((pendidikan) => (
                      <option key={pendidikan} value={pendidikan}>
                        {pendidikan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='grid items-center gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Keterangan Pendidikan P.J :</label>
                  <input
                    placeholder='Keterangan Pendidikan'
                    onChange={(e) => setKetPendidikanPj(e.target.value)}
                    value={ketPendidikanPj}
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                  />
                </div>
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
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-fit'>
        <label className='label font-bold text-lg'>PENGKAJIAN FUNGSIONAL</label>
        <div className='flex items-center gap-3'>
          <div className='p-2'>
            <div className='grid gap-2'>
              <div className='flex gap-5'>
                <div>
                  <label className='label font-bold text-sm'>Kemampuan Aktifitas Sehari-hari</label>
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
                  <label className='label font-bold text-sm'>Aktifitas</label>
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
                  <label className='label font-bold text-sm'>Cacat Masuk </label>
                  <input
                    className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                    placeholder='Otomatis diinput'
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
    </>
  )
}

export default RiwayatPsikologi
