/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
import PengkajianKeperawatan from './component/PengkajianKeperawatan'
import PemeriksaanFisik from './component/PemeriksaanFisik'
import RiwayatPsikologi from './component/RiwayatPsikologis'
import PengkajianNyeriPenilaianResikoJatuh from './component/PengkajianNyeri_PenilaianResikoJatuh'
import React, { useState } from 'react'
import { api } from '../../../../services/api/config.api'

const PageIgdAssesmenAwal: React.FC = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  // State for Pengkajian Keperawatan
  const [informasi, setInformasi] = useState<string>('')
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [statusKehamilan, setStatusKehamilan] = useState<string>('')
  const [gravida, setGravida] = useState<string>('')
  const [para, setPara] = useState<string>('')
  const [abortus, setAbortus] = useState<string>('')
  const [hpht, setHpht] = useState<string>('')

  // State for Pemeriksaan Fisik
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

  // State for Riwayat Psikologi
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

  // State for Pengkajian Nyeri Penilaian Resiko Jatuh
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

  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]
  let nipCredentials = ''
  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  function getCurrentFormattedDate() {
    const now = new Date()
    return now.toISOString().slice(0, 19)
  }

  const handleValuesChangePengkajianKeperawatan = (
    informasi: string,
    keluhanUtama: string,
    rpd: string,
    rpo: string,
    statusKehamilan: string,
    gravida: string,
    para: string,
    abortus: string,
    hpht: string,
  ) => {
    setInformasi(informasi)
    setKeluhanUtama(keluhanUtama)
    setRpd(rpd)
    setRpo(rpo)
    setStatusKehamilan(statusKehamilan)
    setGravida(gravida)
    setPara(para)
    setAbortus(abortus)
    setHpht(hpht)
  }

  const handleValuesChangePemeriksaanFisik = (
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
    bab: string,
    xBab: string,
    kBab: string,
    wBab: string,
    bak: string,
    xBak: string,
    kBak: string,
    wBak: string,
    lBak: string,
  ) => {
    setTekanan(tekanan)
    setPupil(pupil)
    setNeurosensorik(neurosensorik)
    setIntegumen(integumen)
    setTurgor(turgor)
    setEdema(edema)
    setMukosa(mukosa)
    setPerdarahan(perdarahan)
    setJumlahPerdarahan(jumlahPerdarahan)
    setWarnaPerdarahan(warnaPerdarahan)
    setIntoksikasi(intoksikasi)
    setBab(bab)
    setXBab(xBab)
    setKBab(kBab)
    setWBab(wBab)
    setBak(bak)
    setXBak(xBak)
    setKBak(kBak)
    setWBak(wBak)
    setLBak(lBak)
  }

  const handleValuesChangeRiwayatPsikologi = (
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
  ) => {
    setPsikologi(psikologi)
    setJiwa(jiwa)
    setPerilaku(perilaku)
    setDilaporkan(dilaporkan)
    setSebutkan(sebutkan)
    setHubungan(hubungan)
    setTinggalDengan(tinggalDengan)
    setKetTinggal(ketTinggal)
    setBudaya(budaya)
    setKetBudaya(ketBudaya)
    setPendidikanPj(pendidikanPj)
    setKetPendidikanPj(ketPendidikanPj)
    setEdukasi(edukasi)
    setKetEdukasi(ketEdukasi)
    setKemampuan(kemampuan)
    setAktifitas(aktifitas)
    setAlatBantu(alatBantu)
    setKetBantu(ketBantu)
  }

  const handleValuesChangePengkajianNyeriPenilaianResikoJatuh = (
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
  ) => {
    setNyeri(nyeri)
    setProvokes(provokes)
    setKetProvokes(ketProvokes)
    setQuality(quality)
    setKetQuality(ketQuality)
    setLokasi(lokasi)
    setMenyebar(menyebar)
    setSkalaNyeri(skalaNyeri)
    setDurasi(durasi)
    setNyeriHilang(nyeriHilang)
    setKetNyeri(ketNyeri)
    setPadaDokter(padaDokter)
    setKetDokter(ketDokter)
    setBerjalanA(berjalanA)
    setBerjalanB(berjalanB)
    setBerjalanC(berjalanC)
    setHasil(hasil)
    setLapor(lapor)
    setKetLapor(ketLapor)
    setRencana(rencana)
  }

  const postAwalKeperawatanIgd = async () => {
    const dataPost = {
      noRawat: nmrRawat,
      tanggal: getCurrentFormattedDate(),
      informasi: informasi,
      keluhanUtama: keluhanUtama,
      rpd: rpd,
      rpo: rpo,
      statusKehamilan: statusKehamilan,
      gravida: gravida,
      para: para,
      abortus: abortus,
      hpht: hpht,
      tekanan: tekanan,
      pupil: pupil,
      neurosensorik: neurosensorik,
      integumen: integumen,
      turgor: turgor,
      edema: edema,
      mukosa: mukosa,
      perdarahan: perdarahan,
      jumlahPerdarahan: jumlahPerdarahan,
      warnaPerdarahan: warnaPerdarahan,
      intoksikasi: intoksikasi,
      bab: bab,
      xbab: xBab,
      kbab: kBab,
      wbab: wBab,
      bak: bak,
      xbak: xBak,
      kbak: kBak,
      wbak: wBak,
      lbak: lBak,
      psikologis: psikologi,
      jiwa: jiwa,
      perilaku: perilaku,
      dilaporkan: dilaporkan,
      sebutkan: sebutkan,
      hubungan: hubungan,
      tinggalDengan: tinggalDengan,
      ketTinggal: ketTinggal,
      budaya: budaya,
      ketBudaya: ketBudaya,
      pendidikanPj: pendidikanPj,
      ketPendidikanPj: ketPendidikanPj,
      edukasi: edukasi,
      ketEdukasi: ketEdukasi,
      kemampuan: kemampuan,
      aktifitas: aktifitas,
      alatBantu: alatBantu,
      keBantu: ketBantu,
      nyeri: nyeri,
      provokes: provokes,
      ketProvokes: ketProvokes,
      quality: quality,
      ketQuality: ketQuality,
      lokasi: lokasi,
      menyebar: menyebar,
      skalaNyeri: skalaNyeri,
      durasi: durasi,
      nyeriHilang: nyeriHilang,
      ketNyeri: ketNyeri,
      padaDokter: padaDokter,
      ketDokter: ketDokter,
      berjalanA: berjalanA,
      berjalanB: berjalanB,
      berjalanC: berjalanC,
      hasil: hasil,
      lapor: lapor,
      ketLapor: ketLapor,
      rencana: rencana,
      nip: nipCredentials,
    }

    try {
      const response = await api.post('/api/v1/insert-keperawatan-igd', dataPost)
      console.log('hasil', response.data)
    } catch (err) {
      console.log('Error', err)
      console.log('data yang dikirim', dataPost)
    }
  }

  return (
    <>
      <HeaderIgd />
      <div className='p-1'>
        <div className='grid w-full h-full bg-white mt-1 p-2'>
          <div className='mt-3'>
            <div className='flex justify-between'>
              <div>
                <label className='font-inter font-bold text-xl text-[#121713]'>
                  Assesmen Awal Keperawatan
                </label>
                <p className='text-lg '>Di isi oleh Perawat.</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='grid w-64'>
                  <label className='label font-bold'>Tanggal</label>
                  <input type='date' className='input w-full border-primary text-sm' />
                </div>
                <div className='w-64'>
                  <label className='label font-bold'>Jam</label>
                  <input
                    type='time'
                    className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                    value='13:30'
                  />
                </div>
                <div>
                  <label className='label font-bold'>Info</label>
                  <div className='p-1 border w-64 border-green-500 bg-white rounded-xl'>
                    <p className='text text-xs font-semibold'>INSTALASI IGD - U2001</p>
                    <p className=' font-bold text-sm text-[#121713] mt-2 '>
                      DOKTER : dr Gerry A.M. Supit
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* BATAS/ PENGKAJIAN KEPERAWATAN */}
            <div>
              <PengkajianKeperawatan
                onValuesChangePengkajianKeperawatan={handleValuesChangePengkajianKeperawatan}
              />
            </div>
            {/* BATAS / PEMERIKSAAN FISIK*/}
            <div>
              <PemeriksaanFisik
                onValuesChangePemeriksaanFisik={handleValuesChangePemeriksaanFisik}
              />
            </div>
            {/* BATAS / RIWAYAT PSIKOLOGIS & PENGKAJIAN FUNGSIONAL */}
            <div>
              <RiwayatPsikologi
                onValuesChangeRiwayatPsikologi={handleValuesChangeRiwayatPsikologi}
              />
            </div>
            {/* BATAS / PENGKAJIAN NYERI & PENILAIAN RESIKO JATUH */}
            <PengkajianNyeriPenilaianResikoJatuh
              onValuesChangePengkajianNyeriPenilaianResiko={
                handleValuesChangePengkajianNyeriPenilaianResikoJatuh
              }
            />
          </div>
        </div>
        <div className='grid '>
          <button
            className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            onClick={postAwalKeperawatanIgd}
          >
            <p className='flex justify-center items-center'>
              <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
              SIMPAN
            </p>
          </button>
        </div>
      </div>
    </>
  )
}

export default PageIgdAssesmenAwal
