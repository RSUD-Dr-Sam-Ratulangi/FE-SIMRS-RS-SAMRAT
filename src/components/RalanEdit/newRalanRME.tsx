import { useEffect, useState } from 'react'
import { ArchiveBoxArrowDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { api } from '../../services/api/config.api'
import { useParams } from 'react-router-dom'

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

const NewRalanRME: React.FC = () => {
  const { id } = useParams()
  const [soap, setSoap] = useState<ApiData>([])
  const [diagnosa, setDiagnosa] = useState<ApiData>([])
  const [personalData, setPersonalData] = useState<userData>()

  useEffect(() => {
    const fetchSoap = async () => {
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data
        setSoap(data)
        // perlu data soap -> subjek, objek, asesmen
      } catch (err) {
        console.log(err)
      }
    }

    const fetchDiagnosa = async () => {
      try {
        const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
        const data: ApiData = await response.data
        setDiagnosa(data)
        // perlu data diagnosa-> no.registrasi, penjamin, tanggal registrasi, unit/poliklinik, pemeriksaan, tindakan/perawatan
      } catch (err) {
        console.log(err)
      }
    }

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
    fetchDiagnosa()
    fetchSoap()
  }, [])

  const handleButton = () => {
    console.log('display personal data:', personalData)
    console.log('display soap data:', soap)
    console.log('display diagnosadata:', diagnosa)
  }

  return (
    <div className='bg-white h-auto w-[860px] p-4 mt-4 rounded-xl'>
      <p className='font-sans text-xl font-bold text-[#2D3748] mb-4'>Riwayat Perawatan</p>
      <div>
        <p className='font-sans text-lg text-disabled font-normal'>Data Riwayat Perawatan Pasien</p>
        {personalData ? (
          <div className=' flex font-sans justify-between text-base font-normal text-[#121713] leading-6 mt-2'>
            <div>
              <div>
                <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                <p>{personalData.no_rkm_medis}</p>
              </div>
              <div className=' my-2'>
                <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                <p className=' whitespace-nowrap'>{personalData.nm_pasien}</p>
              </div>
              <div>
                <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                <p>{personalData.alamat}</p>
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
            </div>
            <div>
              <div>
                <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>GOLONGAN DARAH</p>
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
                <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>PERTAMA DAFTAR</p>
                <p className='whitespace-nowrap'>{personalData.tgl_daftar}</p>
              </div>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
      <div className='mt-4'>
        <p className='font-sans text-lg text-disabled font-normal'>Data Riwayat Perawatan Pasien</p>
        <div className=' overflow-auto h-[640px] mb-2 border-b-2'>
          {diagnosa
            .slice()
            .reverse()
            .map((diagnosa, index) => (
              <div key={index} className=' overflow-x-auto'>
                <div className='flex font-sans text-base font-normal text-[#121713] leading-6 mt-2 whitespace-nowrap'>
                  <div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                      <p>{diagnosa.no_rawat}</p>
                    </div>
                    <div className='mt-2'>
                      <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                      <p>{diagnosa.nm_dokter}</p>
                    </div>
                  </div>
                  <div className='ml-16'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                      <p>-</p>
                    </div>
                    <div className='mt-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                      <p>-</p>
                    </div>
                  </div>
                  <div className='ml-16'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                      <p>-</p>
                    </div>
                    <div className='mt-2'>
                      <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                      <p>{diagnosa.status}</p>
                    </div>
                  </div>
                  <div className='ml-16'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                      <p>-</p>
                    </div>
                    <div className='mt-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                      <p>-</p>
                    </div>
                  </div>
                </div>
                <div key={index} className='border-b pb-8 mb-8'>
                  <p className=' font-bold text-gray-400 text-xs mb-2 mt-8'>
                    DIAGNOSA/PENYAKIT/ICD 10
                  </p>
                  <div className=' text-gray-400 whitespace-nowrap font-sans font-bold text-[10px] h-auto w-auto p-2 border border-disabled rounded-xl'>
                    <div className='flex border-b pb-2 mb-2'>
                      <p>KODE</p>
                      <p className='ml-[51px]'>NAMA PENYAKIT</p>
                      <div className='flex justify-end w-full'>
                        <p>PIORITAS</p>
                      </div>
                    </div>
                    <div className=' text-[#121713] text-base font-normal '>
                      <div className='flex'>
                        <p>{diagnosa.kd_penyakit}</p>
                        <p className='ml-[35px]'>{diagnosa.nm_penyakit}</p>
                        <div className='flex justify-end w-full'>
                          <p>{diagnosa.prioritas}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className='w-full my-8 border-b-2'>
          <p className='font-inter text-lg text-disabled'>Rawat Jalan</p>
          <div className='overflow-y-auto h-[640px]'>
            {soap.map((data, index) => (
              <div key={index} className=' text-disabled mt-2 border-b-[1px] mb-4 pb-4'>
                <div className='flex'>
                  <div>
                    <div>
                      <p className='font-inter font-bold text-xs'>TANGGAL</p>
                      <p className='font-inter text-base text-[#121713]'>
                        {data.tgl_perawatan || '-'}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>NADI(/menit)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.nadi || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>GCS(E,V,M)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.gcs || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>SUBJEK</p>
                      <p className='font-inter text-base text-[#121713] whitespace-nowrap'>-</p>
                    </div>
                  </div>
                  <div className='ml-40'>
                    <div>
                      <p className='font-inter font-bold text-xs'>JAM</p>
                      <p className='font-inter text-base text-[#121713]'>{data.jam_rawat || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>RR(/menit)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.respirasi || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>SPO2</p>
                      <p className='font-inter text-base text-[#121713]'>{data.spo2 || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>OBJEK</p>
                      <p className='font-inter text-base text-[#121713] whitespace-nowrap'>-</p>
                    </div>
                  </div>
                  <div className='ml-32'>
                    <div>
                      <p className='font-inter font-bold text-xs'>SUHU(C)</p>
                      <p className='font-inter text-base text-[#121713]'>
                        {data.suhu_tubuh || '-'}
                      </p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>TINGGI(cm)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.tinggi || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>KESADARAN</p>
                      <p className='font-inter text-base text-[#121713]'>{data.kesadaran || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>ASESMEN</p>
                      <p className='font-inter text-base text-[#121713] whitespace-nowrap'>-</p>
                    </div>
                  </div>
                  <div className='ml-14'>
                    <div>
                      <p className='font-inter font-bold text-xs'>TENSI(mmHg)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.tensi || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <p className='font-inter font-bold text-xs'>BERAT(kg)</p>
                      <p className='font-inter text-base text-[#121713]'>{data.berat || '-'}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-2'>
                  <p className='font-inter font-bold text-xs text-disabled'>PLAN</p>
                  <p className='font-inter text-base text-[#121713]'>{data.rtl || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white h-auto w-full mt-4 rounded-xl'>
          <p className='font-inter text-lg text-disabled'>Tindakan Perawatan</p>
          <div className='h-[640px] overflow-y-auto'>
            {diagnosa.map((data, index) => (
              <div
                key={index}
                className='flex w-full h-auto border border-disabled p-2 mt-2 mb-4 rounded-xl font-sans font-bold text-xs text-disabled'
              >
                <div className=' border-r-2 border-lightgray w-[156px]'>
                  <p className=' whitespace-nowrap'>Tindakan Rawat</p>
                  <p>Jalan Dokter</p>
                </div>
                <div className='w-full text-[10px]'>
                  <div className='flex ml-2 pb-2 border-b-2 border-lightgray'>
                    <p className='w-[120px]'>TANGGAL</p>
                    <p className='w-[60px]'>KODE</p>
                    <p className='w-[260px] whitespace-nowrap'>NAMA TINDAKAN/PERAWATAN</p>
                    <p className=''>DOKTER</p>
                  </div>
                  <div className='w-full py-2'>
                    <div className='flex ml-2 text-base text-[#121713] font-normal'>
                      <p className='w-[120px]'>{data.tgl_registrasi}</p>
                      <p className='w-[60px]'>{data.kd_penyakit}</p>
                      <p className='w-[260px]'>{data.pemeriksaan || 'Periksa Poliklinik Syaraf'}</p>
                      <p className='w-[240px]'>{data.nm_dokter}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex text-white justify-end'>
          <button
            className='flex justify-center items-center font-semibold text-base w-[360px] h-auto py-2 bg-primary rounded-xl hover:opacity-80'
            onClick={handleButton}
          >
            <ArchiveBoxArrowDownIcon width={20} height={20} />
            <p className='ml-1'>Cetak</p>
          </button>
          <button className='flex justify-center items-center font-semibold text-base text-[#8B8B8B] w-[360px] h-auto py-2 ml-4 border-2 border-[#8B8B8B] rounded-xl hover:opacity-80'>
            <ArrowLeftOnRectangleIcon width={20} height={20} />
            <p className='ml-1'>Tutup</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewRalanRME
