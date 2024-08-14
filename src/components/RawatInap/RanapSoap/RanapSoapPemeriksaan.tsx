import { useEffect, useState } from 'react'
import { api } from '../../../services/api/config.api'
import { useParams } from 'react-router-dom'
// import RiwayatSoap from './RiwayatSoap';
import RiwayatSoapRalan from '../../Layouts/Riwayat/RiwayatSoap'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid'
import InsertSoapRanap from './ComponentsSoapPemeriksaan/InsertSoapRanap'
import HeaderRalan from '../../Navbar/HeaderDetailRalan'
import RiwayatDiagnosa from '../../Layouts/Riwayat/RiwayatDiagnosa'

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
  const [errResepMessage, setErrResepMessage] = useState('')
  const [trueFalseResep, setTrueFalseResep] = useState(false)
  const [riwayatObat, setRiwayatObat] = useState([])
  const [diagnosaCopy, setDiagnosaCopy] = useState([])
  const [isReverse, setIsReverse] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [activeSubTab, setActiveSubTab] = useState(2)
  // const [selectedTab, setSelectedTab] = useState('Riwayat Soap')

  useEffect(() => {
    console.log('Current Active Tab: ', activeTab)
  }, [activeTab])

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

  const handleResepMessage = (message: any) => {
    setErrResepMessage(message)
  }

  const checkTrueFalseResep = (value: boolean) => {
    setTrueFalseResep(value)
  }

  const handleDataFetched = (riwayatDiagnosa: any) => {
    setDiagnosaCopy(riwayatDiagnosa)
  }

  // const handleTabClick = (tabName) => {
  //   setSelectedTab(tabName)
  // }

  return (
    <div className='ml-3'>
      <HeaderRalan />
      <div className='grid grid-cols-2  overflow-x-auto'>
        <div className={`flex flex-row w-max ${isReverse ? 'flex-row-reverse' : 'flex-row'} mt-4`}>
          <div className='w-[850px]'>
            <div className='flex justify-between items-center'>
              <p className='font-inter font-bold text-xl text-[#121713]'>Riwayat</p>
              {isReverse ? null : (
                <div className='flex gap-2 items-center'>
                  <span>Reverse View</span>
                  <button
                    className='btn btn-ghost hover:bg-slate-100'
                    onClick={() => setIsReverse(true)}
                  >
                    <ArrowsRightLeftIcon width={35} height={35} className='mr-5' />
                  </button>
                </div>
              )}
            </div>
            <div className='w-full bg-slate-100 rounded-xl p-3 mt-1 border border-slate-300  '>
              <p className=' font-bold text-xl text-[#121713]'>Data Pasien</p>
              {personalData ? (
                <div className=''>
                  <div className='grid grid-cols-3 mt-2 gap-2 '>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                      <p className=''>{personalData.no_rkm_medis}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                      <p>{personalData.nm_pasien}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                      <p>{personalData.alamat}</p>
                    </div>

                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                      <p>{'-'}</p>
                    </div>

                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>UMUR</p>
                      <p>{personalData.umur}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                      <p>{personalData.jk}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>TANGGAL LAHIR</p>
                      <p>{personalData.tgl_lahir}</p>
                    </div>

                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                      <p>{'-'}</p>
                    </div>

                    <div>
                      <p className=' font-bold text-gray-400 text-xs '>GOLONGAN DARAH</p>
                      <p>{personalData.gol_darah}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                      <p>{personalData.nm_ibu}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                      <p>{personalData.stts_nikah}</p>
                    </div>

                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                      <p>{'-'}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                      <p>{personalData.agama}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs '>PENDIDIKAN TERAKHIR</p>
                      <p className=''>{personalData.pnd}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs '>PERTAMA DAFTAR</p>
                      <p className=''>{personalData.tgl_daftar}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=''>
                      <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                      <p>{'-'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>Loading...</>
              )}
            </div>

            <div>
              <div role='tablist' className='tabs tabs-bordered mt-2'>
                <a
                  role='tab'
                  className={`tab flex-1 text-center ${activeTab === 1 ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  Riwayat Soap
                </a>
                <a
                  role='tab'
                  className={`tab flex-1 text-center ${activeTab === 2 ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  Riwayat Diagnosa
                </a>
              </div>
              <div className='w-full'>
                {activeTab === 1 && (
                  <div className='mt-5'>
                    <div role='tablist' className='tabs tabs-lifted tabs-xs mt-2'>
                      <a
                        role='tab'
                        className={`tab ${activeSubTab === 1 ? 'tab-active' : ''}`}
                        onClick={() => setActiveSubTab(1)}
                      >
                        Rawat Jalan
                      </a>
                      <a
                        role='tab'
                        className={`tab ${activeSubTab === 2 ? 'tab-active' : ''}`}
                        onClick={() => setActiveSubTab(2)}
                      >
                        Rawat Inap
                      </a>
                      <a
                        role='tab'
                        className={`tab ${activeSubTab === 3 ? 'tab-active' : ''}`}
                        onClick={() => setActiveSubTab(3)}
                      >
                        IGD
                      </a>
                    </div>
                    <div>
                      {activeSubTab === 1 && (
                        <RiwayatSoapRalan
                          onRiwayatObatChange={handleRiwayatObatChange}
                          personalData={personalData}
                          errResepMessage={handleResepMessage}
                          trueFalseResep={checkTrueFalseResep}
                          checkSubTab={activeSubTab}
                        />
                      )}
                      {activeSubTab === 2 && (
                        <RiwayatSoapRalan
                          onRiwayatObatChange={handleRiwayatObatChange}
                          personalData={personalData}
                          errResepMessage={handleResepMessage}
                          trueFalseResep={checkTrueFalseResep}
                          checkSubTab={activeSubTab}
                        />
                      )}
                      {activeSubTab === 3 && (
                        <RiwayatSoapRalan
                          onRiwayatObatChange={handleRiwayatObatChange}
                          personalData={personalData}
                          errResepMessage={handleResepMessage}
                          trueFalseResep={checkTrueFalseResep}
                          checkSubTab={activeSubTab}
                        />
                      )}
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <RiwayatDiagnosa onDataFetched={handleDataFetched} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${isReverse ? 'max-w-4xl' : 'max-w-4xl'} ${isReverse ? 'mr-3' : 'ml-3'}`}
          >
            <div className='flex justify-between items-center'>
              <p className='font-inter font-bold text-xl text-[#121713] '>SOAP & Pemeriksaan</p>
              {isReverse ? (
                <div className='flex gap-2 items-center'>
                  <span>Reverse View</span>
                  <button
                    className='btn btn-ghost hover:bg-slate-100'
                    onClick={() => setIsReverse(false)}
                  >
                    <ArrowsRightLeftIcon width={35} height={35} className='mr-5' />
                  </button>
                </div>
              ) : null}
            </div>

            <div className='rounded-xl mt-4 p-4 bg-slate-100 min-w-fit'>
              <p className=' font-bold text-xl text-[#121713]'>SOAP</p>
              <p className='text-disabled '>
                Isi semua data dibawah ini untuk menambahkan SOAP baru kedalam daftar
              </p>
              <InsertSoapRanap
                copyResep={riwayatObat}
                resepMessage={errResepMessage}
                trueFalseResep={trueFalseResep}
                copyDiagnosa={diagnosaCopy}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RanapSoapPemeriksaan
