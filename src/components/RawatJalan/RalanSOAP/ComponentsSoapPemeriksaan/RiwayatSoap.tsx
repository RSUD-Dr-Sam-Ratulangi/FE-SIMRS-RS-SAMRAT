import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../../../services/api/config.api'
import { errorCopyResep, spesificError, spesificSuccess } from '../../../../utils/ToastInfo'
import { useParams } from 'react-router-dom'
import { ClockIcon, CalendarDaysIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'
import ModalLaborHistory from '../Laboratorium/Modal/ModalLaborHistory'
import { PopupActions } from 'reactjs-popup/dist/types'

type userData = {
  existsInLabTable: any
  no_rkm_medis: string
  nm_pasien: string
  no_ktp: string
  pnd: string
  jk: string
  tmp_lahir: string
  tgl_lahir: string
  nm_ibu: string
  alamat: string
  gol_darah: string
  stts_nikah: string
  agama: string
  tgl_daftar: string
  umur: string
  tgl_perawatan: string
  jam_rawat: string
  suhu_tubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  gcs: string
  spo2: string
  kesadaran: string
  keluhan: string
  pemeriksaan: string
  alergi: string
  lingkar_perut: string
  rtl: string
  penilaian: string
  instruksi: string
  evaluasi: string
  nip: string
  nama: string
  jbtn: string
  no_rawat: any
  kd_penyakit: string
  status: string
  prioritas: number
  status_penyakit: string
  nm_penyakit: string
  tgl_registrasi: string
  kd_dokter: string
  kd_poli: string
  nm_poli: string
  nm_dokter: string
}

type ApiData = userData[]

interface RiwayatSoapRalanProps {
  onRiwayatObatChange: (riwayatObatData: any) => void
  personalData: any
}

const RiwayatSoapRalan: React.FC<RiwayatSoapRalanProps> = ({
  onRiwayatObatChange,
  personalData,
}) => {
  const dataPersonal = personalData || {} // Hampir sama seperti null
  const modalLaborRef = useRef<PopupActions>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [riwayatSoap, setRiwayatSoap] = useState<ApiData>([])
  const [laborNmrRawat, setLaborNmrRawat] = useState('')
  const [noRawatExist, setNoRawatExist] = useState(null)
  const { id } = useParams()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]

  useEffect(() => {
    const fetchRiwayatSoap = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data

        // Extracting all no_rawat values
        const noRawatList = data.map((item) => item.no_rawat)

        // Check each no_rawat
        const checkNoRawat = async (noRawat) => {
          try {
            const checkResponse = await api.get(
              `http://rsudsamrat.site:8901/api/v1/checkPermintaanLab?noRawat=${noRawat}`,
            )
            const checkData = checkResponse.data
            return checkData === 'no_rawat exists in permintaan_lab table'
          } catch (error) {
            console.error('Error checking no_rawat:', error)
            return false
          }
        }

        // Check all no_rawat concurrently
        const results = await Promise.all(noRawatList.map(checkNoRawat))

        // Set the state based on the results
        setNoRawatExist(results)

        const newData = await Promise.all(
          data.map(async (riwayat) => {
            const nmPoliResponse = await api.get(`/api/v1/poli?kode=${riwayat.kd_poli}`)
            const nmPoliData = nmPoliResponse.data[0].nm_poli

            // eslint-disable-next-line camelcase
            return { ...riwayat, nm_poli: nmPoliData }
          }),
        )
        setRiwayatSoap(newData)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRiwayatSoap()
  }, [])

  const testCopyResep = async (noRawat: any) => {
    try {
      const response = await api.get(
        `http://rsudsamrat.site:8901/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${noRawat}`,
      )
      // ambil data obat
      try {
        const res = await api.get(
          `http://rsudsamrat.site:8901/api/v1/getResepDokterDetails?noResep=${response.data[0]}`,
        )
        if (res.data.length === 0) {
          spesificError({ errMessage: 'Data Obat Tidak Ditemukan.' })
        } else {
          onRiwayatObatChange(res.data)
          spesificSuccess({ doneMessage: 'Resep Berhasil Di Copy' })
        }
      } catch (err) {
        errorCopyResep()
        console.log('Data obat gagal diambil', err)
      }
    } catch (err) {
      errorCopyResep()
      console.log('Gagal ambil resep', err)
    }
  }

  const modalLaborOpen = (noRawat: any) => {
    if (modalLaborRef.current) {
      modalLaborRef.current.open()
      setLaborNmrRawat(noRawat)
    }
    console.log('Open')
  }

  const modalLaborClose = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.close()
    }
    console.log('Close')
  }

  return (
    <div className='h-[2360px] overflow-y-auto mt-4 rounded-xl border border-slate-100'>
      {isLoading ? (
        <>
          <p className='flex justify-center items-center'>
            <ArrowPathIcon width={40} height={40} className='animate-spin' />
            <span className='ml-3 font-bold'>MEMUAT DATA SOAP</span>
          </p>
        </>
      ) : (
        <>
          {riwayatSoap.map((riwayat, index) => (
            <div
              key={index}
              className='w-auto  bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300'
            >
              <div className='flex justify-between'>
                <div>
                  <p className=' font-bold text-xl text-[#121713] mb-2'>
                    RIWAYAT SOAP (Rawat Jalan)
                  </p>
                </div>
                <div className='flex w-auto p-3 pr-[6px] items-center rounded-xl bg-primary text-white text-base font-bold'>
                  <div className='flex items-center'>
                    <ClockIcon width={20} height={20} />
                    <p className='ml-[2px]'>{riwayat.jam_rawat}</p>
                  </div>
                  <div className='flex ml-[12px] items-center'>
                    <CalendarDaysIcon width={20} height={20} />
                    <p className='ml-[2px]'>{riwayat.tgl_perawatan}</p>
                  </div>
                </div>
              </div>
              <div className='p-2 border border-green-500 bg-white w-fit rounded-xl'>
                <p className='text text-xs font-semibold'>
                  {riwayat.nm_poli} - {riwayat.kd_poli}
                </p>
                <p className=' font-bold text-sm text-[#121713] mt-2 '>
                  PEMERIKSA : {riwayat.nama}
                </p>
              </div>
              <div className='mt-5'>
                <div className='mt-5 mb-3 p-2'>
                  <label className='font-semibold text-slate-700 text-sm'>SUBJEK</label>
                  <p className='whitespace-pre'>{riwayat.keluhan || '-'}</p>
                </div>
                <div className='mt-5 mb-3 p-2'>
                  <label className=' font-semibold text-slate-700 text-sm'>OBJECT</label>
                  <p className='whitespace-pre'>{riwayat.pemeriksaan || '-'}</p>
                </div>
                <div className='border border-slate-400 p-2 rounded-lg'>
                  <label className=' font-semibold text-slate-700 text-md'>VITALITY SIGN</label>
                  <div className='flex w-full justify-between mt-3'>
                    <div>
                      <div>
                        <label className=' font-semibold text-slate-700 text-sm'>SUHU(C))</label>
                        <p className=''>{riwayat.suhu_tubuh || '-'}</p>
                      </div>
                      <div className=' my-2'>
                        <label className=' font-semibold text-slate-700 text-sm'>GCS(E,V,M)</label>
                        <p>{riwayat.gcs || '-'}</p>
                      </div>
                      <div className=''>
                        <label className=' font-semibold text-slate-700 text-sm'>KESADARAN</label>
                        <p>{riwayat.kesadaran || '-'}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className=' font-semibold text-slate-700 text-sm'>TENSI(mmHg)</label>
                        <p className=''>{riwayat.tensi || '-'}</p>
                      </div>
                      <div className=' my-2'>
                        <label className=' font-semibold text-slate-700 text-sm'>SlabelO2</label>
                        <p className=' whitespace-nowrap'>{riwayat.spo2 || '-'}</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className=' font-semibold text-slate-700 text-sm'>
                          NADI(/menit)
                        </label>
                        <p className=''>{riwayat.nadi || '-'}</p>
                      </div>
                      <div className=' my-2'>
                        <label className=' font-semibold text-slate-700 text-sm'>TINGGI(cm)</label>
                        <p>{riwayat.tinggi || '-'}</p>
                      </div>
                    </div>
                    <div className=' mr-24'>
                      <div>
                        <label className=' font-semibold text-slate-700 text-sm'>RR(/menit)</label>
                        <p className=''>{riwayat.respirasi || '-'}</p>
                      </div>
                      <div className=' my-2'>
                        <label className=' font-semibold text-slate-700 text-sm'>BERAT(kg)</label>
                        <p>{riwayat.berat || '-'}</p>
                      </div>
                      <div className=' my-2'>
                        <label className=' font-semibold text-slate-700 text-sm'>ALERGI</label>
                        <p>{riwayat.alergi || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-2 p-2'>
                  <label className=' font-semibold text-slate-700 text-sm'>ASESMEN</label>
                  <p className='whitespace-pre'>{riwayat.penilaian || '-'}</p>
                </div>
                <div className='mt-2'>
                  <div className='mt-2 p-2'>
                    <div className='flex justify-between items-center '>
                      <label className=' font-semibold text-slate-700 text-sm'>PLAN</label>
                      {role.includes('dokter') ? (
                        <button
                          className='btn btn-ghost hover:bg-slate-100'
                          onClick={() => testCopyResep(riwayat.no_rawat)}
                        >
                          <span className='font-bold'>COPY RESEP</span>
                        </button>
                      ) : null}
                    </div>
                    <p className='whitespace-pre'>{riwayat.rtl || '-'}</p>
                  </div>
                </div>
                <div className='mt-2 p-2'>
                  <label className=' font-semibold text-slate-700 text-sm'>INSTRUKSI</label>
                  <p className='whitespace-pre'>{riwayat.instruksi || '-'}</p>
                </div>
                <div className='mt-2 p-2'>
                  <label className=' font-semibold text-slate-700 text-sm'>EVALUASI</label>
                  <p className='whitespace-pre'>{riwayat.evaluasi || '-'}</p>
                </div>
              </div>
              <div key={index}>
                {noRawatExist[index] ? (
                  <button
                    className='text text-gray-100 btn bg-primary btn-md'
                    onClick={() => modalLaborOpen(riwayat.no_rawat)}
                  >
                    Riwayat Laboratorium
                  </button>
                ) : null}
              </div>
              <ModalLaborHistory
                ref={modalLaborRef}
                onClose={modalLaborClose}
                noRawat={laborNmrRawat}
                dataPersonal={dataPersonal}
              />
            </div>
          ))}
        </>
      )}
      <ToastContainer />
    </div>
  )
}

export default RiwayatSoapRalan
