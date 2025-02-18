/* eslint-disable camelcase */
import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  // BellIcon,
  // CheckIcon,
  // ClockIcon,
} from '@heroicons/react/24/solid'
import PemeriksaanCpptRanap from './component/PemeriksaanCpptRanap'
import { useEffect, useState } from 'react'
import SoapCpptRanap from './component/SoapCpptRanap'
import { formatSelectedDateNow } from '../../../../utils/DateNow'
import { ToastContainer } from 'react-toastify'
import { spesificError } from '../../../../utils/ToastInfo'
import RiwayatSoapRanap from './component/RiwayatSoapRanap'
import { api } from '../../../../services/api/config.api'
import { useParams } from 'react-router-dom'
import RiwayatDiagnosaRanap from './component/RiwayatDiagnosaRanap'
import RiwayatProsedurRanap from './component/RiwayatProsedurRanap'

const PageInsertSoapRanap = () => {
  const [pemeriksaanDataCpptRanap, setPemeriksaanDataCpptRanap] = useState<any>({})
  const [soapDataCpptRanap, setSoapDataCpptRanap] = useState<any>({})
  const [dataPasien, setDataPasien] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<any | null>('riwayatSoap')

  const nmrRawat = localStorage.getItem('no_rawat')
  // const noAntrian = localStorage.getItem('no_antrian')
  const dateNow = formatSelectedDateNow()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]

  const { id } = useParams()

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  const getCurrentTime = (): string => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  const fetchDataPasien = async () => {
    try {
      const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
      setDataPasien(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchDataPasien()
  }, [id])

  const handlePemeriksaanCpptRanap = (
    suhuTubuh: string,
    tensi: string,
    nadi: string,
    respirasi: string,
    tinggi: string,
    berat: string,
    spo2: string,
    gcs: string,
    kesadaran: string,
    alergi: string,
    lingkarPerut: string,
  ) => {
    setPemeriksaanDataCpptRanap({
      suhuTubuh,
      tensi,
      nadi,
      respirasi,
      tinggi,
      berat,
      spo2,
      gcs,
      kesadaran,
      alergi,
      lingkarPerut,
    })
  }

  const handleSoapCpptRanap = (
    keluhan: string, // subjektif
    pemeriksaan: string, // object
    rtl: string, // plan
    penilaian: string, // Assesmen
    instruksi: string, // instuksi
    evaluasi: string, // evaluasi
  ) => {
    setSoapDataCpptRanap({
      keluhan,
      pemeriksaan,
      rtl,
      penilaian,
      instruksi,
      evaluasi,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const requestData = {
      ...pemeriksaanDataCpptRanap,
      ...soapDataCpptRanap,
      no_rawat: nmrRawat,
      tgl_perawatan: dateNow,
      jam_rawat: getCurrentTime(),
      nip: nipCredentials,
    }

    const fieldsToCheck = [
      { field: 'Suhu Tubuh', value: requestData.suhuTubuh },
      { field: 'tensi', value: requestData.tensi },
      { field: 'nadi', value: requestData.nadi },
      { field: 'respirasi', value: requestData.respirasi },
      { field: 'tinggi', value: requestData.tinggi },
      { field: 'berat', value: requestData.berat },
      { field: 'spo2', value: requestData.spo2 },
      { field: 'gcs', value: requestData.gcs },
      { field: 'kesadaran', value: requestData.kesadaran },
      { field: 'alergi', value: requestData.alergi },
      { field: 'lingkar Perut', value: requestData.lingkarPerut },
      { field: 'Subjektif', value: requestData.keluhan },
      { field: 'Object', value: requestData.pemeriksaan },
      { field: 'Plan', value: requestData.rtl },
      { field: 'Assesmen', value: requestData.penilaian },
      { field: 'Instruksi', value: requestData.instruksi },
      { field: 'Evaluasi', value: requestData.evaluasi },
    ]

    const errors: string[] = []

    fieldsToCheck.forEach(({ field, value }) => {
      if (!value) {
        errors.push(`${field}`)
      }
    })

    if (errors.length > 0) {
      spesificError({
        errMessage: `Field: \n${errors.join(', ')} belum diisi, Mohon Periksa kembali`,
      })
      setIsLoading(false)
      return
    } else {
      try {
        // Kirim Pemeriksaan Ranap
        const response = await api.post('/api/v1/insertPemeriksaanRanap', requestData)
        console.log(response)

        setTimeout(() => {
          setIsLoading(false)
          window.location.reload()
        }, 1000)
      } catch (err) {
        spesificError({ errMessage: 'Gagal Mengirim Data!!!' })
        console.log(err)
      }
    }
  }

  return (
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
                      <label className='label'>Tanggal Lahir</label>
                      <input
                        value={dataPasien?.tgl_lahir ? dataPasien?.tgl_lahir : '-'}
                        type='text'
                        disabled
                        className='input w-full border-primary text-sm'
                      />
                    </div>
                    <div className='w-full'>
                      <label className='label'>Umur</label>
                      <input
                        type='text'
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        value={dataPasien?.umur ? dataPasien?.umur : '-'}
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <div className='w-full'>
                      <label className='label'>Nama Pasien</label>
                      <input
                        disabled
                        type='text'
                        value={dataPasien?.nm_pasien ? dataPasien?.nm_pasien : '-'}
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='grid w-full gap-3'>
                    <div className='grid w-full'>
                      <label className='label'>Nomor Rawat</label>
                      <input
                        type='text'
                        disabled
                        value={nmrRawat ? nmrRawat : '-'}
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                    <div className='grid w-full'>
                      <label className='label'>Nomor RM</label>
                      <input
                        type='text'
                        disabled
                        value={id ? id : '-'}
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Batas */}
            <PemeriksaanCpptRanap onValuesChangePemeriksaanCpptRanap={handlePemeriksaanCpptRanap} />
            {/* Batas */}
            <SoapCpptRanap onValuesChangeSoapCpptRanap={handleSoapCpptRanap} />
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
              disabled={isLoading}
              onClick={handleSubmit}
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            >
              <p className='flex justify-center items-center'>
                {isLoading ? (
                  <p className='flex justify-center items-center'>
                    <ArrowPathIcon className='animate-spin mr-3' width={25} height={25} />
                    Mengirim
                  </p>
                ) : (
                  <p className='flex items-center justify-center'>
                    {' '}
                    <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />{' '}
                    <span>Kirim</span>
                  </p>
                )}
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
      <div>
        <div role='tablist' className='tabs tabs-bordered'>
          <a
            role='tab'
            className={`tab ${activeTab === 'riwayatSoap' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('riwayatSoap')}
          >
            Riwayat Soap
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'riwayatDiagnosa' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('riwayatDiagnosa')}
          >
            Riwayat Diagnosa
          </a>
          <a
            role='tab'
            className={`tab ${activeTab === 'riwayatProsedur' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('riwayatProsedur')}
          >
            Riwayat Prosedur
          </a>
        </div>

        {/* Tab Content */}
        <div className='mt-4'>
          {activeTab === 'riwayatSoap' && <RiwayatSoapRanap />}
          {activeTab === 'riwayatDiagnosa' && <RiwayatDiagnosaRanap />}
          {activeTab === 'riwayatProsedur' && <RiwayatProsedurRanap />}
        </div>
      </div>
      {/* <div
        className='p-4 bg-gray-100 rounded-lg text-sm text-gray-700 
             overflow-auto max-w-full whitespace-pre-wrap break-words 
             w-96 opacity-90 fixed top-1 right-1 shadow-lg z-0'
      >
        <div className='grid gap-2'>
          <pre>{JSON.stringify(pemeriksaanDataCpptRanap, null, 2)}</pre>
          <pre>{JSON.stringify(soapDataCpptRanap, null, 2)}</pre>
          <pre>
            {nmrRawat}, {dateNow}, {role}, {nipCredentials}
          </pre>
        </div>
      </div> */}
      <ToastContainer />
    </div>
  )
}

export default PageInsertSoapRanap
