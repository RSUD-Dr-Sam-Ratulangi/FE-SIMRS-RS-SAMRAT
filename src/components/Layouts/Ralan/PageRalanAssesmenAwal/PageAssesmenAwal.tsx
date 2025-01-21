import { useState } from 'react'
import HeaderRalan from '../../../Navbar/HeaderDetailRalan'
import RiwayatKesehatan from './component/RiwayatKesehatan'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'
import KeadaanUmum from './component/KeadaanUmum'
import RiwayatPsikologi from './component/RiwayatPsikologis'
import PengkajianNyeriPenilaianResikoJatuh from './component/PengkajianNyeri_PenilaianResikoJatuh'

const PageRalanAssesmenAwal = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  // state for keadaaan umum
  const [suhuTubuh, setSuhuTubuh] = useState<string>('')
  const [tensi, setTensi] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [tinggi, setTinggi] = useState<string>('')
  const [berat, setBerat] = useState<string>('')
  const [bmi, setBmi] = useState<string>('')
  const [gcs, setGcs] = useState<string>('')

  // State for Pengkajian Keperawatan
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [rpk, setRpk] = useState<string>('')
  const [riwayatAlergi, setRiwayatAlergi] = useState<string>('')

  // State for Riwayat Psikologi
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

  const getCurrentFormattedDate = () => {
    const now = new Date()
    return now.toISOString().slice(0, 19)
  }

  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]
  let nipCredentials = ''
  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  const handleValuesChangeRiwayatKesehatan = (
    keluhanUtama: string,
    rpd: string,
    rpo: string,
    rpk: string,
    riwayatAlergi: string,
  ) => {
    setKeluhanUtama(keluhanUtama)
    setRpd(rpd)
    setRpo(rpo)
    setRpk(rpk), setRiwayatAlergi(riwayatAlergi)
  }

  const handleValuesChangeKeadaanUmum = (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    bmi: string,
    gcs: string,
  ) => {
    setSuhuTubuh(suhuTubuh)
    setTensi(tensi)
    setNadi(nadi)
    setRespirasi(respirasi)
    setTinggi(tinggi)
    setBerat(berat)
    setBmi(bmi)
    setGcs(gcs)
  }

  const handleValuesChangeRiwayatPsikologi = (
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
  ) => {
    setPsikologi(psikologi)
    setHubungan(hubungan)
    setTinggalDengan(tinggalDengan)
    setKetTinggal(ketTinggal)
    setBudaya(budaya)
    setKetBudaya(ketBudaya)
    setEdukasi(edukasi)
    setKetEdukasi(ketEdukasi)
    setKemampuan(kemampuan)
    setAktifitas(aktifitas)
    setAlatBantu(alatBantu)
    setKetBantu(ketBantu)
  }

  const postAwalKeperawatanRalan = async () => {
    const dataPost = {
      noRawat: nmrRawat,
      tanggal: getCurrentFormattedDate(),
      suhuTubuh: suhuTubuh,
      tensi: tensi,
      nadi: nadi,
      respirasi: respirasi,
      tinggi: tinggi,
      berat: berat,
      bmi: bmi,
      gcs: gcs,
      // batas
      keluhanUtama: keluhanUtama,
      rpd: rpd,
      rpo: rpo,
      rpk: rpk,
      riwayatAlergi: riwayatAlergi,
      // batas
      psikologis: psikologi,
      hubungan: hubungan,
      tinggalDengan: tinggalDengan,
      ketTinggal: ketTinggal,
      budaya: budaya,
      ketBudaya: ketBudaya,
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
    console.log(dataPost)
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

  return (
    <>
      <HeaderRalan />
      <div>
        <div>
          <div className='flex justify-between'>
            <div>
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
                  <p className='text text-xs font-semibold'>RAWAT JALAN ASSESMEN AWAL</p>
                  <p className=' font-bold text-sm text-[#121713] mt-2 '>DOKTER : dr -</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <KeadaanUmum onValuesChangeKeadaanUmum={handleValuesChangeKeadaanUmum} />
        </div>
        <div>
          <RiwayatKesehatan onValuesChangeRiwayatKesehatan={handleValuesChangeRiwayatKesehatan} />
        </div>
        <div>
          <RiwayatPsikologi onValuesChangeRiwayatPsikologi={handleValuesChangeRiwayatPsikologi} />
        </div>
        <div>
          <PengkajianNyeriPenilaianResikoJatuh
            onValuesChangePengkajianNyeriPenilaianResiko={
              handleValuesChangePengkajianNyeriPenilaianResikoJatuh
            }
          />
        </div>
        <div>
          <div className='grid '>
            <button
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
              onClick={postAwalKeperawatanRalan}
            >
              <p className='flex justify-center items-center'>
                <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
                SIMPAN
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageRalanAssesmenAwal
