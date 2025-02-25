/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  BellIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import PemeriksaanCppt from './component/PemeriksaanCppt'
import RincianRiwayatCppt from './component/RincianRiwayatCppt'
import { useEffect, useState } from 'react'
import { api } from '../../../../services/api/config.api'
import { useParams } from 'react-router-dom'
import { spesificError, spesificSuccess } from '../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'

const PageInsertSoapIgd = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  const [jam, setJam] = useState<string>('')
  const [tanggal, setTanggal] = useState<string>('')
  const [suhuTubuh, setSuhuTubuh] = useState<string>('')
  const [tensi, setTensi] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [tinggi, setTinggi] = useState<string>('')
  const [berat, setBerat] = useState<string>('')
  const [spo2, setSpo2] = useState<string>('')
  const [gcs, setGcs] = useState<string>('')
  const [kesadaran, setKesadaran] = useState<string>('')
  const [keluhan, setKeluhan] = useState<string>('')
  const [pemeriksaan, setPemeriksaan] = useState<string>('')
  const [alergi, setAlergi] = useState<string>('')
  const [lingkarPerut, setLingkarPerut] = useState<string>('')
  const [rtl, setRtl] = useState<string>('')
  const [penilaian, setPenilaian] = useState<string>('')
  const [instruksi, setInstruksi] = useState<string>('')
  const [evaluasi, setEvaluasi] = useState<string>('')

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

  const handleValuesChangePemeriksaanCppt = (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    spo2: string,
    gcs: string,
    kesadaran: string,
    keluhan: string,
    pemeriksaan: string,
    alergi: string,
    lingkarPerut: string,
    rtl: string,
    penilaian: string,
    instruksi: string,
    evaluasi: string,
  ) => {
    setSuhuTubuh(suhuTubuh)
    setTensi(tensi)
    setNadi(nadi)
    setRespirasi(respirasi)
    setTinggi(tinggi)
    setBerat(berat)
    setSpo2(spo2)
    setGcs(gcs)
    setKesadaran(kesadaran)
    setKeluhan(keluhan)
    setPemeriksaan(pemeriksaan)
    setAlergi(alergi)
    setLingkarPerut(lingkarPerut)
    setRtl(rtl)
    setPenilaian(penilaian)
    setInstruksi(instruksi)
    setEvaluasi(evaluasi)
  }

  const setTimeAndDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const hours = today.getHours().toString().padStart(2, '0')
    const minutes = today.getMinutes().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    const formattedTime = `${hours}:${minutes}`
    setJam(formattedTime)
    setTanggal(formattedDate)
  }

  const postSoapIgd = async () => {
    const dataPost = {
      noRawat: nmrRawat,
      suhuTubuh,
      tensi,
      nadi,
      respirasi,
      tinggi,
      berat,
      spo2,
      gcs,
      kesadaran,
      keluhan,
      pemeriksaan,
      alergi,
      lingkarPerut,
      rtl,
      penilaian,
      instruksi,
      evaluasi,
      nip: nipCredentials,
    }

    const emptyFields = Object.entries(dataPost)
      .filter(([key, value]) => value === '' || value === undefined || value === null)
      .map(([key]) => key)

    if (emptyFields.length > 0) {
      spesificError({
        errMessage: `Data gagal dikirim: Kolom ${emptyFields.join(', ')} tidak boleh kosong.`,
      })
      return
    }

    const isConfirmed = window.confirm('Apakah Anda yakin ingin mengirim data ini?')
    if (!isConfirmed) {
      return
    }

    try {
      const response = await api.post('/api/v1/postPemeriksaanRalan', dataPost)
      console.log('berhasil : ', response.data)

      spesificSuccess({ doneMessage: 'Data SOAP IGD berhasil dikirim...' })

      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      console.log('error input soap igd', err)
      console.log('data yang dikirim', dataPost)

      spesificError({ errMessage: `Data gagal dikirim: ${err}` })
    }
  }

  useEffect(() => {
    setTimeAndDate()
  }, [])

  return (
    <>
      <div className='p-1'>
        <div className='flex w-full h-full bg-white mt-3 p-2'>
          <div className='w-full'>
            <div className=''>
              <p className='font-inter font-bold text-lg text-[#121713]'>Tambah Pasien</p>
              <p className='text-sm text-disabled '>
                Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat jalan
              </p>
              <div>
                <div className='flex gap-3 items-center'>
                  <div className='grid gap-2 w-full'>
                    <div className='flex gap-2'>
                      <div className='grid'>
                        <label className='label'>Tanggal</label>
                        <input
                          value={tanggal}
                          type='date'
                          disabled
                          className='disabled:bg-slate-200 disabled:text-black input w-full disabled:border-primary text-sm'
                        />
                      </div>
                      <div className='w-full'>
                        <label className='label'>Jam</label>
                        <input
                          value={jam}
                          type='time'
                          disabled
                          className='disabled:bg-slate-200 disabled:text-black input w-full disabled:border-primary text-sm'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='w-full'>
                        <label className='label'>Nama Pasien</label>
                        <input
                          value={dataRow?.nm_pasien ? dataRow.nm_pasien : '-'}
                          type='text'
                          disabled
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid w-full'>
                    <div className='grid w-full gap-3'>
                      <div className='grid w-full'>
                        <label className='label'>ID Rawat</label>
                        <input
                          type='text'
                          disabled
                          value={nmrRawat}
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                      <div className='grid w-full'>
                        <label className='label'>Nomor RM</label>
                        <input
                          type='text'
                          disabled
                          value={dataRow?.no_rkm_medis ? dataRow.no_rkm_medis : '-'}
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Batas */}
              <PemeriksaanCppt onValuesChangePemeriksaanCppt={handleValuesChangePemeriksaanCppt} />
            </div>
          </div>
          <div className='w-[500px] p-5 mt-12 border rounded-2xl ml-2 mr-2'>
            <div>
              <label className='flex  text-lg font-bold'>
                <InformationCircleIcon width={25} height={25} /> INFORMASI
              </label>
              <p className='text-sm text-disabled'>
                Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan
                dalam pengisian data dapat berdampak pada perawatan pasien.
              </p>
            </div>
            <div className='grid '>
              <button
                onClick={postSoapIgd}
                className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
              >
                <p className='flex justify-center items-center'>
                  <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
                  Mengirim
                </p>
              </button>
              {/* <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <BellIcon className='mr-3' width={25} height={25} />
                  ICD 9 & 10
                </p>
              </button>
              <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <ClockIcon className='mr-3' width={25} height={25} />
                  RIWAYAT
                </p>
              </button>
              <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <CheckIcon className='mr-3' width={25} height={25} />
                  SELESAI
                </p>
              </button> */}
            </div>
          </div>
        </div>
        {/* batas */}
        <RincianRiwayatCppt />
      </div>
      <ToastContainer />
      <div
        className='p-4 bg-gray-100 rounded-lg text-sm text-gray-700 
             overflow-auto max-w-full whitespace-pre-wrap break-words 
             w-96 opacity-90 fixed top-1 right-1 shadow-lg z-0'
      >
        <div className='grid gap-2'>
          <pre>
            {JSON.stringify({
              noRawat: nmrRawat,
              suhuTubuh,
              tensi,
              nadi,
              respirasi,
              tinggi,
              berat,
              spo2,
              gcs,
              kesadaran,
              keluhan,
              pemeriksaan,
              alergi,
              lingkarPerut,
              rtl,
              penilaian,
              instruksi,
              evaluasi,
              nip: nipCredentials,
            })}
          </pre>
        </div>
      </div>
    </>
  )
}

export default PageInsertSoapIgd
