import imgNyeri from '../../../../../assets/img/pms.jpg'
import React, { useState, useEffect } from 'react'
import {
  BerjalanAKeperawatan,
  BerjalanBKeperawatan,
  BerjalanCKeperawatan,
  HasilKeperawatan,
  LaporKeperawatan,
  MenyebarKeperawatan,
  NyeriHilangKeperawatan,
  NyeriKeperawatan,
  PadaDokterKeperawatan,
  ProvokesKeperawatan,
  QualityKeperawatan,
  SkalaNyeriKeperawatan,
} from '../type/EnumAssesmenAwal'

interface PengkajianNyeriPenilaianResiko {
  onValuesChangePengkajianNyeriPenilaianResiko: (
    nyeri: string,
    provokes: string,
    ketProvokes: string,
    quality: string,
    ketQuality: string,
    lokasi: string,
    menyebar: string,
    skalaNyeri: string,
    durasi: string,
    nyeriHilang: string,
    ketNyeri: string,
    padaDokter: string,
    ketDokter: string,
    berjalanA: string,
    berjalanB: string,
    berjalanC: string,
    hasil: string,
    lapor: string,
    ketLapor: string,
    rencana: string,
  ) => void
}

const PengkajianNyeriPenilaianResikoJatuh: React.FC<PengkajianNyeriPenilaianResiko> = ({
  onValuesChangePengkajianNyeriPenilaianResiko,
}) => {
  const [nyeri, setNyeri] = useState<string>('')
  const [provokes, setProvokes] = useState<string>('')
  const [ketProvokes, setKetProvokes] = useState<string>('')
  const [quality, setQuality] = useState<string>('')
  const [ketQuality, setKetQuality] = useState<string>('')
  const [lokasi, setLokasi] = useState<string>('')
  const [menyebar, setMenyebar] = useState<string>('')
  const [skalaNyeri, setSkalaNyeri] = useState<string>('')
  const [durasi, setDurasi] = useState<string>('')
  const [nyeriHilang, setNyeriHilang] = useState<string>('')
  const [ketNyeri, setKetNyeri] = useState<string>('')
  const [padaDokter, setPadaDokter] = useState<string>('')
  const [ketDokter, setKetDokter] = useState<string>('')
  const [berjalanA, setBerjalanA] = useState<string>('')
  const [berjalanB, setBerjalanB] = useState<string>('')
  const [berjalanC, setBerjalanC] = useState<string>('')
  const [hasil, setHasil] = useState<string>('')
  const [lapor, setLapor] = useState<string>('')
  const [ketLapor, setKetLapor] = useState<string>('')
  const [rencana, setRencana] = useState<string>('')

  useEffect(() => {
    onValuesChangePengkajianNyeriPenilaianResiko(
      nyeri,
      provokes,
      ketProvokes,
      quality,
      ketQuality,
      lokasi,
      menyebar,
      skalaNyeri,
      durasi,
      nyeriHilang,
      ketNyeri,
      padaDokter,
      ketDokter,
      berjalanA,
      berjalanB,
      berjalanC,
      hasil,
      lapor,
      ketLapor,
      rencana,
    )
  }, [
    nyeri,
    provokes,
    ketProvokes,
    quality,
    ketQuality,
    lokasi,
    menyebar,
    skalaNyeri,
    durasi,
    nyeriHilang,
    ketNyeri,
    padaDokter,
    ketDokter,
    berjalanA,
    berjalanB,
    berjalanC,
    hasil,
    lapor,
    ketLapor,
    rencana,
    onValuesChangePengkajianNyeriPenilaianResiko,
  ])

  return (
    <>
      <div className='border mt-3 p-2 rounded-2xl'>
        <label className='label font-bold'> PENGKAJIAN NYERI</label>
        <div className='flex gap-3'>
          <div className='border rounded-2xl p-1 w-full'>
            <img src={imgNyeri} className='w-full' />
          </div>

          <div className='border p-2 rounded-2xl w-full'>
            <label className='label'>Deskripsi Nyeri :</label>
            <div className='flex items-center gap-4 mb-5 w-56'>
              <select
                className='select select-bordered w-full'
                onChange={(e) => setNyeri(e.target.value)}
              >
                <option disabled selected>
                  Nyeri
                </option>
                {Object.values(NyeriKeperawatan).map((nyeri) => (
                  <option key={nyeri} value={nyeri}>
                    {nyeri}
                  </option>
                ))}
              </select>
            </div>
            <div className='grid gap-4 w-full'>
              <div className='grid gap-4 w-full'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>(P) Faktor Pencetus</span>
                    </label>
                    <select
                      className='select select-bordered w-full'
                      onChange={(e) => setProvokes(e.target.value)}
                    >
                      <option disabled selected>
                        Provokes
                      </option>
                      {Object.values(ProvokesKeperawatan).map((provokes) => (
                        <option key={provokes} value={provokes}>
                          {provokes}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>Ket FP</span>
                    </label>
                    <input
                      value={ketProvokes}
                      onChange={(e) => setKetProvokes(e.target.value)}
                      type='text'
                      placeholder='Keterangan Provokes'
                      className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>(Q) Qualitas</span>
                    </label>
                    <select
                      className='select select-bordered w-full'
                      onChange={(e) => setQuality(e.target.value)}
                    >
                      <option disabled selected>
                        Qualitas
                      </option>
                      {Object.values(QualityKeperawatan).map((qualitas) => (
                        <option key={qualitas} value={qualitas}>
                          {qualitas}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>KET Q</span>
                    </label>
                    <input
                      type='text'
                      value={ketQuality}
                      onChange={(e) => setKetQuality(e.target.value)}
                      placeholder='Keterangan Kualitas'
                      className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>(L) Lokasi</span>
                    </label>
                    <input
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      type='text'
                      placeholder='Lokasi'
                      className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
                    />
                  </div>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>Menjalar</span>
                    </label>
                    <select
                      className='select select-bordered w-full'
                      onChange={(e) => setMenyebar(e.target.value)}
                    >
                      <option disabled selected>
                        Menyebar
                      </option>
                      {Object.values(MenyebarKeperawatan).map((menyebar) => (
                        <option key={menyebar} value={menyebar}>
                          {menyebar}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex items-center'>
                    <label className='flex font-semibold text-slate-700 text-md w-32'>
                      <span>Skala Nyeri</span>
                    </label>
                    <select
                      className='select select-bordered w-full'
                      onChange={(e) => setSkalaNyeri(e.target.value)}
                    >
                      <option disabled selected>
                        Input
                      </option>
                      {Object.values(SkalaNyeriKeperawatan).map((skalaNyeri) => (
                        <option key={skalaNyeri} value={skalaNyeri}>
                          {skalaNyeri}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='flex items-center'>
                  <label className='flex font-semibold text-slate-700 text-md w-32'>
                    <span>Durasi Nyeri</span>
                  </label>
                  <input
                    value={durasi}
                    onChange={(e) => setDurasi(e.target.value)}
                    type='text'
                    placeholder='Lokasi'
                    className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-5 items-center'>
          <div className='flex items-center'>
            <div>
              <label className='label text-center font-bold text-sm'>
                Nyeri Hilang Atau Berkurang Apabila
              </label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setNyeriHilang(e.target.value)}
              >
                <option disabled selected>
                  Input
                </option>
                {Object.values(NyeriHilangKeperawatan).map((nyeriHIlang) => (
                  <option key={nyeriHIlang} value={nyeriHIlang}>
                    {nyeriHIlang}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label text-center font-bold text-sm w-96'>
                Keterangan Nyeri Hilang
              </label>
              <input
                value={ketNyeri}
                onChange={(e) => setKetNyeri(e.target.value)}
                type='text'
                placeholder='Keterangan Nyeri Hilang'
                className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
              />
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <div>
              <label className='label text-center font-bold text-sm'>
                Diberitahukan Kepada Dokter
              </label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setPadaDokter(e.target.value)}
              >
                <option disabled selected>
                  Pada Dokter
                </option>
                {Object.values(PadaDokterKeperawatan).map((padaDokter) => (
                  <option key={padaDokter} value={padaDokter}>
                    {padaDokter}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label text-center font-bold text-sm w-96'>Ket Dokter</label>
              <input
                value={ketDokter}
                onChange={(e) => setKetDokter(e.target.value)}
                type='text'
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
              />
            </div>
          </div>
        </div>
        {/* batas */}
        <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-full'>
          <div className='flex w-full'>
            <div>
              <label className='label font-bold text-lg'>PENILAIAN RESIKO JATUH</label>
              <div className='grid gap-3'>
                <div>
                  <p>a. Cara Berjalan :</p>
                  <div className='flex items-center gap-3'>
                    <div className='p-2'>
                      <div className='grid gap-2'>
                        <div className='flex gap-5'>
                          <div>
                            <label className='label font-bold text-sm'>
                              1. Tidak Seimbang /sempoyongan / limbung
                            </label>
                            <select
                              className='select select-bordered w-56'
                              onChange={(e) => setBerjalanA(e.target.value)}
                            >
                              <option disabled selected>
                                Berjalan A
                              </option>
                              {Object.values(BerjalanAKeperawatan).map((berjalanA) => (
                                <option key={berjalanA} value={berjalanA}>
                                  {berjalanA}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className='label font-bold text-sm'>
                              2. Jalan dengan alat bantu
                            </label>
                            <select
                              className='select select-bordered w-56'
                              onChange={(e) => setBerjalanB(e.target.value)}
                            >
                              <option disabled selected>
                                Berjalan B
                              </option>
                              {Object.values(BerjalanBKeperawatan).map((berjalanB) => (
                                <option key={berjalanB} value={berjalanB}>
                                  {berjalanB}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p>b. Menopang Saat akan duduk, tampak memegang alat sebagai penopang :</p>
                  <div className='flex items-center gap-3'>
                    <div className='p-2'>
                      <div className='grid gap-2'>
                        <div className='flex gap-5'>
                          <div>
                            <select
                              className='select select-bordered w-56'
                              onChange={(e) => setBerjalanC(e.target.value)}
                            >
                              <option disabled selected>
                                Berjalan C
                              </option>
                              {Object.values(BerjalanCKeperawatan).map((berjalanC) => (
                                <option key={berjalanC} value={berjalanC}>
                                  {berjalanC}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='border rounded-2xl p-2'>
              <div>
                <div className='flex items-center gap-3'>
                  <div className='p-2'>
                    <div className='grid gap-2'>
                      <div className='flex gap-5'>
                        <div>
                          <label className='label font-bold text-sm'>Masalah Keperawatan</label>
                          <select disabled className='select select-bordered w-56'>
                            <option disabled selected>
                              Autoanamnesa
                            </option>
                            <option>Lorem</option>
                            <option>Lorem</option>
                          </select>
                        </div>
                        <div>
                          <label className='label font-bold text-sm'>Rencana Keperawatan</label>
                          <textarea
                            className='textarea textarea-bordered'
                            value={rencana}
                            onChange={(e) => setRencana(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-fit'>
          <div className='grid gap-3'>
            <div>
              <div className='flex items-center gap-3'>
                <div className='p-2'>
                  <div className='grid gap-2'>
                    <div className='flex gap-5'>
                      <div>
                        <label className='label font-bold text-sm'>Hasil</label>
                        <select
                          className='select select-bordered w-56'
                          onChange={(e) => setHasil(e.target.value)}
                        >
                          <option disabled selected>
                            Hasil
                          </option>
                          {Object.values(HasilKeperawatan).map((hasil) => (
                            <option key={hasil} value={hasil}>
                              {hasil}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='label font-bold text-sm'>
                          Dilaporkan Kepada Dokter ?
                        </label>
                        <select
                          className='select select-bordered w-56'
                          onChange={(e) => setLapor(e.target.value)}
                        >
                          <option disabled selected>
                            Autoanamnesa
                          </option>
                          {Object.values(LaporKeperawatan).map((lapor) => (
                            <option key={lapor} value={lapor}>
                              {lapor}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className='label font-bold text-sm'>Keterangan Dilaporkan</label>
                        <input
                          value={ketLapor}
                          onChange={(e) => setKetLapor(e.target.value)}
                          type='text'
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-gray-300 w-full'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PengkajianNyeriPenilaianResikoJatuh
