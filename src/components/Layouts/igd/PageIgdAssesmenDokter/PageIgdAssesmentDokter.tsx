/* eslint-disable camelcase */
import { ArchiveBoxArrowDownIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
import { useEffect, useState } from 'react'
import { DataPasienAssesmenDokter } from './type/InterfaceAssesmenDokter'
import { api } from '../../../../services/api/config.api'
import { useParams } from 'react-router-dom'
import PemeriksaanAwal from './component/PemeriksaanAwal'
import PemeriksaanFisikDokter from './component/PemeriksaanFisikDokter'
import PemeriksaanPenunjang from './component/PemeriksaanPenunjang'

const PageIgdAssesmenDokter = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  const [dataPasien, setDataPasien] = useState<DataPasienAssesmenDokter | null>(null)
  // Anamnesis states
  const [anamnesis, setAnamnesis] = useState<string>('')
  const [hubungan, setHubungan] = useState<string>('')
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [rps, setRps] = useState<string>('')
  const [rpd, setRpd] = useState<string>('')
  const [rpk, setRpk] = useState<string>('')
  const [rpo, setRpo] = useState<string>('')
  const [alergi, setAlergi] = useState<string>('')

  // Pemeriksaan Fisik states
  const [keadaan, setKeadaan] = useState<string>('')
  const [gcs, setGcs] = useState<string>('')
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

  // Pemeriksaan Penunjang states
  const [ketLokalis, setKetLokalis] = useState<string>('')
  const [ekg, setEkg] = useState<string>('')
  const [rad, setRad] = useState<string>('')
  const [lab, setLab] = useState<string>('')
  const [diagnosis, setDiagnosis] = useState<string>('')
  const [tata, setTata] = useState<string>('')

  const { id } = useParams()
  const storedRow = localStorage.getItem('dataRow')
  const dataRow = storedRow ? JSON.parse(storedRow) : null
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]
  let nipCredentials = ''
  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  const fetchDataPasien = async () => {
    const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
    console.log('data pasien igd', response.data)
    setDataPasien(response.data)
  }

  useEffect(() => {
    fetchDataPasien()
  }, [id])

  const formatDate = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num)

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1) // Months are zero-based
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // Function implementations
  const handleValuesChangePemeriksaanAwal = (
    anamnesis: string,
    hubungan: string,
    keluhanUtama: string,
    rps: string,
    rpd: string,
    rpk: string,
    rpo: string,
    alergi: string,
  ) => {
    setAnamnesis(anamnesis)
    setHubungan(hubungan)
    setKeluhanUtama(keluhanUtama)
    setRps(rps)
    setRpd(rpd)
    setRpk(rpk)
    setRpo(rpo)
    setAlergi(alergi)
  }

  const handleValuesChangePemeriksaanFisik = (
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
  ) => {
    setKeadaan(keadaan)
    setGcs(gcs)
    setKesadaran(kesadaran)
    setTd(td)
    setNadi(nadi)
    setRr(rr)
    setSuhu(suhu)
    setSpo(spo)
    setBb(bb)
    setTb(tb)
    setKepala(kepala)
    setMata(mata)
    setGigi(gigi)
    setLeher(leher)
    setThoraks(thoraks)
    setAbdomen(abdomen)
    setGenital(genital)
    setEkstremitas(ekstremitas)
    setKetFisik(ketFisik)
  }

  const handleValuesChangePemeriksaanPenunjang = (
    ketLokalis: string,
    ekg: string,
    rad: string,
    lab: string,
    diagnosis: string,
    tata: string,
  ) => {
    setKetLokalis(ketLokalis)
    setEkg(ekg)
    setRad(rad)
    setLab(lab)
    setDiagnosis(diagnosis)
    setTata(tata)
  }

  const dataPostAssesmenDokter = async () => {
    const dataPost = {
      no_rawat: nmrRawat,
      tanggal: formatDate(new Date()),
      kd_dokter: nipCredentials,
      anamnesis: anamnesis,
      hubungan: hubungan,
      keluhan_utama: keluhanUtama,
      rps: rps,
      rpd: rpd,
      rpk: rpk,
      rpo: rpo,
      alergi: alergi,
      keadaan: keadaan,
      gcs: gcs,
      kesadaran: kesadaran,
      td: td,
      nadi: nadi,
      rr: rr,
      suhu: suhu,
      spo: spo,
      bb: bb,
      tb: tb,
      kepala: kepala,
      mata: mata,
      gigi: gigi,
      leher: leher,
      thoraks: thoraks,
      abdomen: abdomen,
      genital: genital,
      ekstremitas: ekstremitas,
      ket_fisik: ketFisik,
      ket_lokalis: ketLokalis,
      ekg: ekg,
      rad: rad,
      lab: lab,
      diagnosis: diagnosis,
      tata: tata,
    }

    try {
      const response = await api.post('/api/v1/insert', dataPost)
      console.log('berhasil', response.data)
      console.log('data yang dikirm', dataPost)
    } catch (err) {
      console.log('err', err)
      console.log('data yang dikirm err', dataPost)
    }
  }

  return (
    <>
      <HeaderIgd />
      <div>
        <div className='grid gap-2'>
          <div>
            <p className=' font-bold text-sm text-disabled '>Data Pasien</p>
            <div className=''>
              <div className='grid grid-cols-4 mt-2 gap-2 '>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                  <p className=''>{id}</p>
                </div>
                <div>
                  <p className='font-bold text-gray-400 text-xs'>UMUR</p>
                  <p>{dataPasien ? dataPasien?.umur : '-'}</p>
                </div>
                <div>
                  <p className='font-bold text-gray-400 text-xs'>GOLONGAN DARAH</p>
                  <p>
                    <p>{dataPasien ? dataPasien?.gol_darah : '-'}</p>
                  </p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                  <p>{dataPasien ? dataPasien?.agama : '-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                  <p>{dataPasien ? dataPasien?.nm_pasien : '-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                  <p>{dataPasien ? dataPasien?.jk : '-'}</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                  <p>{dataPasien ? dataPasien?.nm_ibu : '-'}</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>PENDIDIKAN TERAKHIR</p>
                  <p>{dataPasien ? dataPasien?.pnd : '-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                  <p>{dataPasien ? dataPasien?.alamat : '-'}</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs '>TANGGAL LAHIR</p>
                  <p>{dataPasien ? dataPasien?.tgl_lahir : '-'}</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                  <p>{dataPasien ? dataPasien?.stts_nikah : '-'}</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>PERTAMA DAFTAR</p>
                  <p>
                    {dataPasien ? dataPasien?.tgl_daftar : '-'} {nmrRawat}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <p className=' font-bold text-sm text-disabled'>Data Riwayat</p>
            <div className=''>
              <div className='flex gap-12 mt-2'>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                  <p className=''>{nmrRawat}</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                  <p className=''>{dataRow.no_reg}</p>
                </div>
                <div>
                  <p className='font-bold text-gray-400 text-xs'>TGL. REGISTRASI</p>
                  <p className=''>{dataRow.tgl_registrasi}</p>
                </div>
                <div>
                  <p className='font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                  <p className=''>{dataRow.nm_poli}</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>KODE DOKTER</p>
                  <p className=''>{dataRow.kd_dokter}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                  <p className=''>{dataRow.png_jawab}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                  <p className=''>{dataRow.status_lanjut}</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BATAS */}
        <div className='flex gap-8'>
          <div className='border rounded-2xl p-2 mt-5 grid w-full gap-0'>
            <PemeriksaanAwal onValueChangePemeriksaanAwal={handleValuesChangePemeriksaanAwal} />
            {/* BATAS */}
            <PemeriksaanFisikDokter
              onValueChangePemeriksaanFisikDokter={handleValuesChangePemeriksaanFisik}
            />
            {/* BATAS */}
            <PemeriksaanPenunjang
              onValueChangePemeriksaanPenunjang={handleValuesChangePemeriksaanPenunjang}
            />
          </div>
        </div>
        <div className='flex gap-3'>
          <button
            onClick={dataPostAssesmenDokter}
            className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
          >
            <p className='flex justify-center items-center'>
              <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
              Mengirim
            </p>
          </button>
          <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ClockIcon className='mr-3' width={25} height={25} />
              RIWAYAT
            </p>
          </button>
          <button className='flex justify-center items-center font-semibold text-base w-full h-[50px] py-2 mt-[20px] bg-gray-100 border text-black rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ArchiveBoxIcon className='mr-3' width={25} height={25} />
              Tutup
            </p>
          </button>
        </div>
      </div>
    </>
  )
}

export default PageIgdAssesmenDokter
