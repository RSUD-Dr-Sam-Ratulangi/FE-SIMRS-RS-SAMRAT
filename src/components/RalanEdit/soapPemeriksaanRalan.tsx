import { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { useParams } from 'react-router-dom'
// import RiwayatSoap from './RiwayatSoap';
import RalanEditHeader from './RalanEditHeader'
import RiwayatSoapRalan from '../RalanSOAP/RiwayatSoap'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'
import InsertSoapRalan from '../RalanSOAP/InsertSoap'
//     kd_penyakit: string
//     prioritas: number
//     nm_penyakit: string
// };

// type ApiData = userData[];

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

const RanapSoapPemeriksaan: React.FC = () => {
  const { id } = useParams()
  const [personalData, setPersonalData] = useState<userData>()
  const [riwayatObat, setRiwayatObat] = useState([])
  console.log('parent page :', riwayatObat)

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
        const data: userData = await response.data
        setPersonalData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPersonalData()
  }, [])

  // ambil data dari child
  const handleRiwayatObatChange = (riwayatObatData: any) => {
    setRiwayatObat(riwayatObatData)
  }

  return (
    <div className='flex-1 w-auto min-w-fit overflow-x-auto p-4'>
      <RalanEditHeader />
      <div className='flex mt-4 min-w-fit'>
        <div>
          <p className='font-inter font-bold text-2xl text-[#121713]'>Riwayat</p>
          <div className='w-auto bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300  '>
            <p className=' font-bold text-xl text-[#121713]'>Data Pasien</p>
            {personalData ? (
              <div className=' flex font-sans justify-between text-base font-normal text-[#121713] leading-6 mt-2 gap-10'>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                    <p className=''>{personalData.no_rkm_medis}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                    <p className=' whitespace-nowrap'>{personalData.nm_pasien}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                    <p>{personalData.alamat}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>UMUR</p>
                    <p className=' whitespace-nowrap'>{personalData.umur}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                    <p>{personalData.jk}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>TANGGAL LAHIR</p>
                    <p>{personalData.tgl_lahir}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      GOLONGAN DARAH
                    </p>
                    <p>{personalData.gol_darah}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                    <p>{personalData.nm_ibu}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                    <p>{personalData.stts_nikah}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                    <p>{personalData.agama}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      PENDIDIKAN TERAKHIR
                    </p>
                    <p className='whitespace-nowrap'>{personalData.pnd}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      PERTAMA DAFTAR
                    </p>
                    <p className='whitespace-nowrap'>{personalData.tgl_daftar}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>Loading...</>
            )}
          </div>
          <RiwayatSoapRalan onRiwayatObatChange={handleRiwayatObatChange} />
          <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] mt-4 py-2 bg-primary rounded-xl hover:opacity-80'>
            <ArchiveBoxArrowDownIcon width={20} height={20} />
            <p className='ml-1'>Cetak</p>
          </button>
        </div>
        <div className='max-w-5xl ml-4'>
          <p className='font-inter font-bold text-2xl text-[#121713] mb-4'>SOAP & Pemeriksaan</p>
          <div className=' bg-white rounded-xl mt-4 p-4'>
            <p className=' font-bold text-xl text-[#121713]'>SOAP</p>
            <p className='text-disabled whitespace-nowrap'>
              Isi semua data dibawah ini untuk menambahkan SOAP baru kedalam daftar
            </p>
            <InsertSoapRalan copyResep={riwayatObat} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RanapSoapPemeriksaan
