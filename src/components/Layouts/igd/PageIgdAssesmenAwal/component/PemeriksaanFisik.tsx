import React, { useEffect, useState } from 'react'
import {
  EdemaKeperawatan,
  IntegumenKeperawatan,
  IntoksikasiKeperawatan,
  MukosaKeperawatan,
  NeurosensorikAwalKeperawatan,
  PerdarahanKeperawatan,
  PupilAwalKeperawatan,
  TekananAwalKeperawatan,
  TurgorKeperawatan,
} from '../type/EnumAssesmenAwal'

interface PemeriksaanFisikProps {
  onValuesChangePemeriksaanFisik: (
    tekanan: string,
    pupil: string,
    neurosensorik: string,
    integumen: string,
    turgor: string,
    edema: string,
    mukosa: string,
    perdarahan: string,
    jumlahPerdarahan: string,
    warnaPerdarahan: string,
    intoksikasi: string,

    // Eliminsasi
    bab: string,
    xBab: string,
    kBab: string,
    wBab: string,
    bak: string,
    xBak: string,
    kBak: string,
    wBak: string,
    lBak: string,
  ) => void
}

const PemeriksaanFisik: React.FC<PemeriksaanFisikProps> = ({ onValuesChangePemeriksaanFisik }) => {
  const [tekanan, setTekanan] = useState<string>('')
  const [pupil, setPupil] = useState<string>('')
  const [neurosensorik, setNeurosensorik] = useState<string>('')
  const [integumen, setIntegumen] = useState<string>('')
  const [turgor, setTurgor] = useState<string>('')
  const [edema, setEdema] = useState<string>('')
  const [mukosa, setMukosa] = useState<string>('')
  const [perdarahan, setPerdarahan] = useState<string>('')
  const [jumlahPerdarahan, setJumlahPerdarahan] = useState<string>('')
  const [warnaPerdarahan, setWarnaPerdarahan] = useState<string>('')
  const [intoksikasi, setIntoksikasi] = useState<string>('')

  const [bab, setBab] = useState<string>('')
  const [xBab, setXBab] = useState<string>('')
  const [kBab, setKBab] = useState<string>('')
  const [wBab, setWBab] = useState<string>('')
  const [bak, setBak] = useState<string>('')
  const [xBak, setXBak] = useState<string>('')
  const [kBak, setKBak] = useState<string>('')
  const [wBak, setWBak] = useState<string>('')
  const [lBak, setLBak] = useState<string>('')

  useEffect(() => {
    onValuesChangePemeriksaanFisik(
      tekanan,
      pupil,
      neurosensorik,
      integumen,
      turgor,
      edema,
      mukosa,
      perdarahan,
      jumlahPerdarahan,
      warnaPerdarahan,
      intoksikasi,
      bab,
      xBab,
      kBab,
      wBab,
      bak,
      xBak,
      kBak,
      wBak,
      lBak,
    )
  }, [
    tekanan,
    pupil,
    neurosensorik,
    integumen,
    turgor,
    edema,
    mukosa,
    perdarahan,
    jumlahPerdarahan,
    warnaPerdarahan,
    intoksikasi,
    bab,
    xBab,
    kBab,
    wBab,
    bak,
    xBak,
    kBak,
    wBak,
    lBak,
  ])

  return (
    <>
      <div className='border rounded-2xl p-2 grid mt-3 gap-3 w-[1500px]'>
        <label className='label font-bold text-lg'>Pemeriksaan Fisik</label>
        <div className='border rounded-2xl p-2'>
          <div className='grid gap-2'>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>Tekanan :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setTekanan(e.target.value)}
                >
                  <option disabled selected>
                    Tekanan
                  </option>
                  {Object.values(TekananAwalKeperawatan).map((tekanan) => (
                    <option key={tekanan} value={tekanan}>
                      {tekanan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label font-bold text-sm'>Integumen :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setIntegumen(e.target.value)}
                >
                  <option disabled selected>
                    Integumen
                  </option>
                  {Object.values(IntegumenKeperawatan).map((integumen) => (
                    <option key={integumen} value={integumen}>
                      {integumen}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Perdarahan :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setPerdarahan(e.target.value)}
                >
                  <option disabled selected>
                    Perdarahan
                  </option>
                  {Object.values(PerdarahanKeperawatan).map((perdarahan) => (
                    <option key={perdarahan} value={perdarahan}>
                      {perdarahan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label font-bold text-sm'>Jumlah Perdarahan :</label>
                <input
                  placeholder='Jumlah Perdarahan'
                  onChange={(e) => setJumlahPerdarahan(e.target.value)}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Warna Perdarahan :</label>
                <input
                  placeholder='Jumlah Perdarahan'
                  onChange={(e) => setWarnaPerdarahan(e.target.value)}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
            </div>
          </div>
          <div className='grid items-center gap-2'>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>Pupil :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setPupil(e.target.value)}
                >
                  <option disabled selected>
                    Pupil
                  </option>
                  {Object.values(PupilAwalKeperawatan).map((pupil) => (
                    <option key={pupil} value={pupil}>
                      {pupil}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Turgor Kulit :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setTurgor(e.target.value)}
                >
                  <option disabled selected>
                    Turgor
                  </option>
                  {Object.values(TurgorKeperawatan).map((turgor) => (
                    <option key={turgor} value={turgor}>
                      {turgor}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Intoksikasi :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setIntoksikasi(e.target.value)}
                >
                  <option disabled selected>
                    Intoksikasi
                  </option>
                  {Object.values(IntoksikasiKeperawatan).map((intoksikasi) => (
                    <option key={intoksikasi} value={intoksikasi}>
                      {intoksikasi}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Edema :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setEdema(e.target.value)}
                >
                  <option disabled selected>
                    Edema
                  </option>
                  {Object.values(EdemaKeperawatan).map((edema) => (
                    <option key={edema} value={edema}>
                      {edema}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Mukosa Mulut :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setMukosa(e.target.value)}
                >
                  <option disabled selected>
                    Mukosa
                  </option>
                  {Object.values(MukosaKeperawatan).map((mukosa) => (
                    <option key={mukosa} value={mukosa}>
                      {mukosa}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='label text-center font-bold text-sm'>Neurosensorik :</label>
                <select
                  className='select select-bordered w-56'
                  onChange={(e) => setNeurosensorik(e.target.value)}
                >
                  <option disabled selected>
                    Neurosensorik
                  </option>
                  {Object.values(NeurosensorikAwalKeperawatan).map((neurosensorik) => (
                    <option key={neurosensorik} value={neurosensorik}>
                      {neurosensorik}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='border rounded-2xl p-2'>
          <div>
            <label className=''>Eliminsasi</label>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>BAB: Frekuensi </label>
                <input
                  onChange={(e) => setBab(e.target.value)}
                  value={bab}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>X/ :</label>
                <input
                  onChange={(e) => setXBab(e.target.value)}
                  value={xBab}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Konsistensi :</label>
                <input
                  onChange={(e) => setKBab(e.target.value)}
                  value={kBab}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Warna :</label>
                <input
                  onChange={(e) => setWBab(e.target.value)}
                  value={wBab}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
            </div>
            <div className='flex gap-5'>
              <div>
                <label className='label font-bold text-sm'>BAK: Frekuensi </label>
                <input
                  onChange={(e) => setBak(e.target.value)}
                  value={bak}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>X/ :</label>
                <input
                  onChange={(e) => setXBak(e.target.value)}
                  value={xBak}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Konsistensi :</label>
                <input
                  onChange={(e) => setKBak(e.target.value)}
                  value={kBak}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Warna :</label>
                <input
                  onChange={(e) => setWBak(e.target.value)}
                  value={wBak}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
              <div>
                <label className='label font-bold text-sm'>Lain-lain :</label>
                <input
                  onChange={(e) => setLBak(e.target.value)}
                  value={lBak}
                  className='input input-bordered text-sm rounded-2xl disabled:text-black w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PemeriksaanFisik
