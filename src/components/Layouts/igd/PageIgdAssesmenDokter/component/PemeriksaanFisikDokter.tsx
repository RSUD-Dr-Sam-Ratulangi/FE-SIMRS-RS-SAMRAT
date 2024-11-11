import React, { useState, useEffect } from 'react'
import {
  KeadaanAssesmenDokter,
  KesadaranAssesmenDokter,
  PemeriksaanKepala,
  PemeriksaanMata,
  PemeriksaanGigi,
  PemeriksaanLeher,
  PemeriksaanThoraks,
  PemeriksaanAbdomen,
  PemeriksaanGenital,
  PemeriksaanEkstremitas,
} from '../type/EnumAssesmenDokter'

interface PemeriksaanFisikDokterProps {
  onValueChangePemeriksaanFisikDokter: (
    keadaan: string,
    gcs: string,
    kesadaran: string,
    td: string,
    nadi: string,
    rr: string,
    suhu: string,
    spo: string,
    bb: string,
    tb: string,
    kepala: string,
    mata: string,
    gigi: string,
    leher: string,
    thoraks: string,
    abdomen: string,
    genital: string,
    ekstremitas: string,
    ketFisik: string,
  ) => void
}

const PemeriksaanFisikDokter: React.FC<PemeriksaanFisikDokterProps> = ({
  onValueChangePemeriksaanFisikDokter,
}) => {
  const [keadaan, setKeadaan] = useState<string>('')
  const [gcsE, setGcsE] = useState<string>('')
  const [gcsV, setGcsV] = useState<string>('')
  const [gcsM, setGcsM] = useState<string>('')
  const [gcsAkral, setGcsAkral] = useState<string>('')
  const [kesadaran, setKesadaran] = useState<string>('')
  const [td, setTd] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [rr, setRr] = useState<string>('')
  const [suhu, setSuhu] = useState<string>('')
  const [spo, setSpo] = useState<string>('')
  const [bb, setBb] = useState<string>('')
  const [tb, setTb] = useState<string>('')
  const [kepala, setKepala] = useState<string>('')
  const [mata, setMata] = useState<string>('')
  const [gigi, setGigi] = useState<string>('')
  const [leher, setLeher] = useState<string>('')
  const [thoraks, setThoraks] = useState<string>('')
  const [abdomen, setAbdomen] = useState<string>('')
  const [genital, setGenital] = useState<string>('')
  const [ekstremitas, setEkstremitas] = useState<string>('')
  const [ketFisik, setKetFisik] = useState<string>('')

  useEffect(() => {
    onValueChangePemeriksaanFisikDokter(
      keadaan,
      `E: ${gcsE}- V: ${gcsV}- M: ${gcsM} - Akral: ${gcsAkral}`,
      kesadaran,
      td,
      nadi,
      rr,
      suhu,
      spo,
      bb,
      tb,
      kepala,
      mata,
      gigi,
      leher,
      thoraks,
      abdomen,
      genital,
      ekstremitas,
      ketFisik,
    )
  }, [
    keadaan,
    gcsE,
    gcsV,
    gcsM,
    gcsAkral,
    kesadaran,
    td,
    nadi,
    rr,
    suhu,
    spo,
    bb,
    tb,
    kepala,
    mata,
    gigi,
    leher,
    thoraks,
    abdomen,
    genital,
    ekstremitas,
    ketFisik,
    onValueChangePemeriksaanFisikDokter,
  ])

  return (
    <>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-full'>
        <label className='label font-bold text-lg'>Pemeriksaan Fisik</label>
        <div className='p-2'>
          <div className='grid gap-2'>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>Keadaan :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setKeadaan(e.target.value)}
                >
                  <option disabled selected>
                    Keadaan
                  </option>
                  {Object.values(KeadaanAssesmenDokter).map((keadaan) => (
                    <option key={keadaan} value={keadaan}>
                      {keadaan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label font-bold text-sm'>Kesadaran :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setKesadaran(e.target.value)}
                >
                  <option disabled selected>
                    Kesadaran
                  </option>
                  {Object.values(KesadaranAssesmenDokter).map((kesadaran) => (
                    <option key={kesadaran} value={kesadaran}>
                      {kesadaran}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label font-bold text-sm'>Berat Badan :</label>
                <input
                  placeholder='Berat Badan'
                  onChange={(e) => setBb(e.target.value)}
                  value={bb}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Tinggi Badan :</label>
                <input
                  placeholder='Tinggi Badan'
                  onChange={(e) => setTb(e.target.value)}
                  value={tb}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Tekanan Darah :</label>
                <input
                  placeholder='Tekanan Darah'
                  onChange={(e) => setTd(e.target.value)}
                  value={td}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Nadi :</label>
                <input
                  placeholder='Nadi'
                  onChange={(e) => setNadi(e.target.value)}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
            </div>
          </div>
          <div className='grid items-center gap-2'>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>Respirasi :</label>
                <input
                  placeholder='Respirasi'
                  onChange={(e) => setRr(e.target.value)}
                  value={rr}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Suhu :</label>
                <input
                  placeholder='Suhu'
                  onChange={(e) => setSuhu(e.target.value)}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Spo2 :</label>
                <input
                  placeholder='Spo2'
                  onChange={(e) => setSpo(e.target.value)}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
            </div>
            <div className='grid'>
              <label className='label font-bold'>GCS</label>
              <div className='flex gap-7'>
                <div>
                  <label className='label font-bold text-sm'>E :</label>
                  <input
                    placeholder='GCS E'
                    className='input input-bordered text-sm rounded-2xl'
                    value={gcsE}
                    onChange={(e) => setGcsE(e.target.value)}
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>V :</label>
                  <input
                    placeholder='GCS V'
                    className='input input-bordered text-sm rounded-2xl'
                    onChange={(e) => setGcsV(e.target.value)}
                    value={gcsV}
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>M :</label>
                  <input
                    placeholder='GCS M'
                    className='input input-bordered text-sm rounded-2xl'
                    onChange={(e) => setGcsM(e.target.value)}
                    value={gcsM}
                  />
                </div>
                <div>
                  <label className='label font-bold text-sm'>Akral :</label>
                  <input
                    placeholder='Akral'
                    className='input input-bordered text-sm rounded-2xl'
                    onChange={(e) => setGcsAkral(e.target.value)}
                    value={gcsAkral}
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-5'>
              <div>
                <div>
                  <div className='flex gap-5'>
                    <div>
                      <label className='label font-bold text-sm'>Kepala :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setKepala(e.target.value)}
                      >
                        <option disabled selected>
                          Kepala
                        </option>
                        {Object.values(PemeriksaanKepala).map((kepala) => (
                          <option key={kepala} value={kepala}>
                            {kepala}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Mata :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setMata(e.target.value)}
                      >
                        <option disabled selected>
                          Mata
                        </option>
                        {Object.values(PemeriksaanMata).map((mata) => (
                          <option key={mata} value={mata}>
                            {mata}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Gigi & Mulut :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setGigi(e.target.value)}
                      >
                        <option disabled selected>
                          Gigi & Mulut
                        </option>
                        {Object.values(PemeriksaanGigi).map((gigi) => (
                          <option key={gigi} value={gigi}>
                            {gigi}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Leher :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setLeher(e.target.value)}
                      >
                        <option disabled selected>
                          Leher
                        </option>
                        {Object.values(PemeriksaanLeher).map((leher) => (
                          <option key={leher} value={leher}>
                            {leher}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className='flex gap-5'>
                    <div>
                      <label className='label font-bold text-sm'>Thoraks :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setThoraks(e.target.value)}
                      >
                        <option disabled selected>
                          Thoraks
                        </option>
                        {Object.values(PemeriksaanThoraks).map((thoraks) => (
                          <option key={thoraks} value={thoraks}>
                            {thoraks}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Abdomen :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setAbdomen(e.target.value)}
                      >
                        <option disabled selected>
                          Abdomen
                        </option>
                        {Object.values(PemeriksaanAbdomen).map((abdomen) => (
                          <option key={abdomen} value={abdomen}>
                            {abdomen}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Genital & Anus :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setGenital(e.target.value)}
                      >
                        <option disabled selected>
                          Genital/Anus
                        </option>
                        {Object.values(PemeriksaanGenital).map((genital) => (
                          <option key={genital} value={genital}>
                            {genital}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='label font-bold text-sm'>Ekstremitas :</label>
                      <select
                        className='select select-bordered w-56'
                        onChange={(e) => setEkstremitas(e.target.value)}
                      >
                        <option disabled selected>
                          Ekstremitas
                        </option>
                        {Object.values(PemeriksaanEkstremitas).map((ekstremitas) => (
                          <option key={ekstremitas} value={ekstremitas}>
                            {ekstremitas}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <label className='text text-xl font-bold label'>Keterangan Fisik</label>
                <textarea
                  placeholder='keterangan fisik'
                  onChange={(e) => setKetFisik(e.target.value)}
                  value={ketFisik}
                  className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PemeriksaanFisikDokter
