import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { useParams } from 'react-router-dom'
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'

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
  nm_dokter: string
}

type ApiData = userData[]

const RiwayatSoapRalan: React.FC = () => {
  const [riwayatSoap, setRiwayatSoap] = useState<ApiData>([])
  const { id } = useParams()

  useEffect(() => {
    const fetchRiwayatSoap = async () => {
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data
        setRiwayatSoap(data)
        // perlu data diagnosa-> no.registrasi, penjamin, tanggal registrasi, unit/poliklinik, pemeriksaan, tindakan/perawatan
      } catch (err) {
        console.log(err)
      }
    }

    fetchRiwayatSoap()
  }, [])

  return (
    <div className='h-[1000px] overflow-y-auto mt-4'>
      {riwayatSoap.map((riwayat, index) => (
        <div key={index} className='w-auto max-w-[890px] bg-white rounded-xl mt-4 p-4'>
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
          <div className='mt-2'>
            <div className='flex w-full justify-between'>
              <div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NADI(/menit)</p>
                  <p className=''>{riwayat.nadi || '-'}</p>
                </div>
                <div className=' my-2'>
                  <p className=' font-bold text-gray-400 text-xs'>GCS(E,V,M)</p>
                  <p>{riwayat.gcs || '-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>KESADARAN</p>
                  <p>{riwayat.kesadaran || '-'}</p>
                </div>
              </div>
              <div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>RR(/menit)</p>
                  <p className=''>{riwayat.respirasi || '-'}</p>
                </div>
                <div className=' my-2'>
                  <p className=' font-bold text-gray-400 text-xs'>SPO2</p>
                  <p className=' whitespace-nowrap'>{riwayat.spo2 || '-'}</p>
                </div>
              </div>
              <div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>SUHU(C))</p>
                  <p className=''>{riwayat.suhu_tubuh || '-'}</p>
                </div>
                <div className=' my-2'>
                  <p className=' font-bold text-gray-400 text-xs'>TINGGI(cm)</p>
                  <p>{riwayat.tinggi || '-'}</p>
                </div>
              </div>
              <div className=' mr-24'>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>TENSI(mmHg)</p>
                  <p className=''>{riwayat.tensi || '-'}</p>
                </div>
                <div className=' my-2'>
                  <p className=' font-bold text-gray-400 text-xs'>BERAT(kg)</p>
                  <p>{riwayat.berat || '-'}</p>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <p className=' font-bold text-gray-400 text-xs'>ASESMEN</p>
              <p>{riwayat.penilaian || '-'}</p>
            </div>
            <div className='mt-2'>
              <p className=' font-bold text-gray-400 text-xs'>SUBJEK</p>
              <p>{riwayat.keluhan || '-'}</p>
            </div>
            <div className='mt-2'>
              <p className=' font-bold text-gray-400 text-xs'>PLAN</p>
              <p>{riwayat.rtl || '-'}</p>
            </div>
            <div className='mt-2'>
              <p className=' font-bold text-gray-400 text-xs'>INSTRUKSI</p>
              <p>{riwayat.instruksi || '-'}</p>
            </div>
            <div className='mt-2'>
              <p className=' font-bold text-gray-400 text-xs'>EVALUASI</p>
              <p>{riwayat.evaluasi || '-'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RiwayatSoapRalan
