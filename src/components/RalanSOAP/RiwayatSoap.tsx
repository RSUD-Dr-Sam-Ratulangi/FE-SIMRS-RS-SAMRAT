import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { errorCopyResep } from '../../utils/ToastInfo'
import { useParams } from 'react-router-dom'
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'

type userData = {
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
  no_rawat: string
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
}

const RiwayatSoapRalan: React.FC<RiwayatSoapRalanProps> = ({ onRiwayatObatChange }) => {
  const [riwayatSoap, setRiwayatSoap] = useState<ApiData>([])
  const { id } = useParams()

  useEffect(() => {
    const fetchRiwayatSoap = async () => {
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data

        // Now, for each entry in the data, fetch the nm_poli
        const newData = await Promise.all(
          data.map(async (riwayat) => {
            const nmPoliResponse = await api.get(`/api/v1/poli?kode=${riwayat.kd_poli}`)
            const nmPoliData = nmPoliResponse.data[0].nm_poli
            console.log('nama poli', nmPoliData)
            // eslint-disable-next-line camelcase
            return { ...riwayat, nm_poli: nmPoliData }
          }),
        )

        setRiwayatSoap(newData)
        console.log('data baru', newData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchRiwayatSoap()
  }, [])

  console.log('riwayat soap', riwayatSoap)

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
        console.log('Data Obat :', res.data)
        onRiwayatObatChange(res.data)
      } catch (err) {
        errorCopyResep()
        console.log('Data obat gagal diambil', err)
      }
    } catch (err) {
      errorCopyResep()
      console.log('Gagal ambil resep', err)
    }
  }

  return (
    <div className='h-[2089px] overflow-y-auto mt-4'>
      {riwayatSoap.map((riwayat, index) => (
        <div
          key={index}
          className='w-auto max-w-[890px] bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300'
        >
          <div className='flex justify-between'>
            <p className=' font-bold text-xl text-[#121713] mb-2'>Rawat Jalan</p>
            <div className='flex w-auto p-1 pr-[6px] items-center rounded-3xl bg-primary text-white text-base font-bold'>
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
          <p className='text text-sm border border-slate-500 rounded-lg p-2 font-bold w-fit'>
            {riwayat.nm_poli} - {riwayat.kd_poli}
          </p>
          <div className='mt-5'>
            <div className='mt-5 mb-3 p-2'>
              <label className=' font-semibold text-slate-700 text-sm'>SUBJEK</label>
              <p>{riwayat.keluhan || '-'}</p>
            </div>
            <div className='border border-slate-400 p-2 rounded-lg'>
              <label className=' font-semibold text-slate-700 text-md'>OBJECT</label>
              <div className='flex w-full justify-between mt-3'>
                <div>
                  <div>
                    <label className=' font-semibold text-slate-700 text-sm'>NADI(/menit)</label>
                    <p className=''>{riwayat.nadi || '-'}</p>
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
                    <label className=' font-semibold text-slate-700 text-sm'>RR(/menit)</label>
                    <p className=''>{riwayat.respirasi || '-'}</p>
                  </div>
                  <div className=' my-2'>
                    <label className=' font-semibold text-slate-700 text-sm'>SlabelO2</label>
                    <p className=' whitespace-nowrap'>{riwayat.spo2 || '-'}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className=' font-semibold text-slate-700 text-sm'>SUHU(C))</label>
                    <p className=''>{riwayat.suhu_tubuh || '-'}</p>
                  </div>
                  <div className=' my-2'>
                    <label className=' font-semibold text-slate-700 text-sm'>TINGGI(cm)</label>
                    <p>{riwayat.tinggi || '-'}</p>
                  </div>
                </div>
                <div className=' mr-24'>
                  <div>
                    <label className=' font-semibold text-slate-700 text-sm'>TENSI(mmHg)</label>
                    <p className=''>{riwayat.tensi || '-'}</p>
                  </div>
                  <div className=' my-2'>
                    <label className=' font-semibold text-slate-700 text-sm'>BERAT(kg)</label>
                    <p>{riwayat.berat || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-2 p-2'>
              <label className=' font-semibold text-slate-700 text-sm'>ASESMEN</label>
              <p>{riwayat.penilaian || '-'}</p>
            </div>
            <div className='mt-2 p-2'>
              <div className='flex justify-between items-center'>
                <label className=' font-semibold text-slate-700 text-sm'>PLAN</label>
                <button
                  className='btn btn-ghost hover:bg-white'
                  onClick={() => testCopyResep(riwayat.no_rawat)}
                >
                  Copy Resep
                </button>
              </div>

              <p>{riwayat.rtl || '-'}</p>
            </div>
            <div className='mt-2 p-2'>
              <label className=' font-semibold text-slate-700 text-sm'>INSTRUKSI</label>
              <p>{riwayat.instruksi || '-'}</p>
            </div>
            <div className='mt-2 p-2'>
              <label className=' font-semibold text-slate-700 text-sm'>EVALUASI</label>
              <p>{riwayat.evaluasi || '-'}</p>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  )
}

export default RiwayatSoapRalan
