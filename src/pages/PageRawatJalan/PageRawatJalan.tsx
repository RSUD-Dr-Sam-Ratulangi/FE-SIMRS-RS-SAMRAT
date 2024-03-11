import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { dateNow } from '../../utils/DateNow'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
// import CustomTTSComponent from '../../utils/TtsSound'

type DataItem = {
  no_reg: string
  no_rawat: string
  tgl_registrasi: string
  jam_reg: string
  kd_dokter: string
  no_rkm_medis: number
  kd_poli: string
  p_jawab: string
  almt_pj: string
  hubunganpj: string
  biaya_reg: number
  stts: string
  stts_daftar: string
  status_lanjut: string
  kd_pj: string
  umurdaftar: string
  sttsumur: string
  status_bayar: string
  status_poli: string
  nm_pasien: string
  no_ktp: string
  jk: string
  tmp_lahir: string
  tgl_lahir: string
  nm_ibu: string
  alamat: string
  gol_darah: string
  pekerjaan: string
  stts_nikah: string
  agama: string
  tgl_daftar: string
  no_tlp: number
  umur: number
  pnd: string
  keluarga: string
  namakeluarga: string
  no_peserta: string
  kd_kel: number
  kd_kec: number
  kd_kab: number
  pekerjaanpj: string
  alamatpj: string
  kelurahanpj: string
  kecamatanpj: string
  kabupatenpj: string
  perusahaan_pasien: string
  suku_bangsa: number
  bahasa_pasien: number
  cacat_fisik: number
  email: string
  nip: string
  kd_prop: number
  propinsipj: string
  nm_dokter: string
  gol_drh: string
  almt_tgl: string
  kd_sps: string
  alumni: string
  no_ijn_praktek: string
  status: string
  nm_poli: string
  registrasi: number
  registrasilama: number
  png_jawab: string
  nama_perusahaan: string
  alamat_asuransi: string
  attn: string
}

export default function PageRawatJalan() {
  const tglSkrng = dateNow()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [changeDate, setChangeDate] = useState(tglSkrng)

  // const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null)
  // const ttsComponentRef = useRef(null)
  // const [ttsKey, setTTSKey] = useState(0)

  // useEffect(() => {
  //   if (selectedPatientName) {
  //     const timeoutId = setTimeout(() => {
  //       if (ttsComponentRef.current) {
  //         ttsComponentRef.current.play()
  //       }
  //     }, 0)
  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [selectedPatientName, ttsComponentRef])

  const navigate = useNavigate()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const kdDokter = Kd.dokter?.kd_dokter
  const role = Object.keys(Kd)[0]

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(
          `/api/v1/getalllpasienmendaftar?kd_poli=&tglKunjungan=${changeDate}&tglKunjunganAkhir=${changeDate}`,
        )
        const responseData = response.data

        let sortedData = responseData

        if (role === 'dokter') {
          sortedData = responseData
            .filter((item) => item.kd_dokter === kdDokter)
            .sort((a, b) => a.no_reg.localeCompare(b.no_reg))
        } else if (role === 'petugas') {
          sortedData = responseData.sort((a, b) => a.no_reg.localeCompare(b.no_reg))
        }

        setData(sortedData)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [tokenValue, changeDate])

  const handleDateChange = (event: any) => {
    const dateValue = event.target.value
    setChangeDate(dateValue)
  }

  // const handleNameClick = (patientName: string, doctorName: string, poliName: string) => {
  //   const lowerCaseName = patientName.toLowerCase()
  //   const additionalInfo = 'silahkan datang ke ners station'
  //   setSelectedPatientName(lowerCaseName + additionalInfo)
  //   setTTSKey((prevKey) => prevKey + 1)
  //   if (ttsComponentRef.current) {
  //     ttsComponentRef.current.play()
  //   }
  //   console.log(speechSynthesis.getVoices())
  //   localStorage.setItem('patientName', lowerCaseName)
  //   localStorage.setItem('doctorName', doctorName)
  //   localStorage.setItem('poliName', poliName)
  // }

  const columns = [
    { name: 'NO.REG', selector: (row: DataItem) => row.no_reg, sortable: true },
    { name: 'NO.RM', selector: (row: DataItem) => row.no_rkm_medis, sortable: true },
    {
      name: 'NAMA PASIEN',
      selector: (row: DataItem) => (
        <a
          className='font-semibold uppercase text-md hover:cursor-pointer'
          onClick={async () => {
            localStorage.setItem('no_rawat', row.no_rawat)
            localStorage.setItem('no_antrian', row.no_reg)
            localStorage.setItem('status_rawat', row.stts)
            navigate(`/rawat-jalan/soap-pemeriksaan/${row.no_rkm_medis}`, { state: { data: row } })
          }}
        >
          {row.nm_pasien}
        </a>
      ),
      sortable: true,
    },
    { name: 'NO RAWAT', selector: (row: DataItem) => row.no_rawat, sortable: true },
    {
      name: 'DOKTER',
      selector: (row: DataItem) => row.nm_dokter,
      sortable: true,
    },
    {
      name: 'POLI',
      selector: (row: DataItem) => row.nm_poli,
      sortable: true,
    },
    {
      name: 'STATUS PERIKSA',
      selector: (row: DataItem) => row.stts,
      sortable: true,
    },
    // { name: 'PENJAMIN', selector: (row: DataItem) => row.png_jawab, sortable: true },
    // { name: 'NO ASURANSI', selector: (row: DataItem) => row.no_peserta, sortable: true },
    { name: 'TANGGAL KUNJUNGAN', selector: (row: DataItem) => row.tgl_registrasi, sortable: true },
    {
      name: 'STATUS BAYAR',
      selector: (row: DataItem) => row.status_bayar,
      sortable: true,
    },
    {
      name: 'UMUR',
      selector: (row: DataItem) => (
        <p className='text-black mx-auto text-center text-[15px]'>{row.umurdaftar}</p>
      ),
      sortable: true,
    },
    {
      name: 'STATUS LANJUT',
      selector: (row: DataItem) => row.status_lanjut,
      sortable: true,
    },
    // {
    //   name: 'PANGGIL',
    //   sortable: true,
    //   cell: (row: DataItem) => (
    //     <button
    //       className='panggil-button'
    //       onClick={() => handleNameClick(row.nm_pasien, row.nm_dokter, row.nm_poli)}
    //     >
    //       <PlayIcon width={20} height={20} className='play-icon' />
    //     </button>
    //   ),
    // },
    // {
    //   name: 'Actions',
    //   selector: (row: DataItem) => (
    //     <button
    //       className='btn btn-xs btn-ghost'
    //       onClick={async () => {
    //         localStorage.setItem('no_rawat', row.no_rawat)
    //         localStorage.setItem('no_antrian', row.no_reg)
    //         localStorage.setItem('status_rawat', row.stts)
    //         navigate(`/rawat-jalan/rme/${row.no_rkm_medis}`, { state: { data: row } })
    //       }}
    //     >
    //       Edit
    //     </button>
    //   ),
    // },ls
  ]

  return (
    <>
      {isLoading ? (
        <div className='flex flex-row justify-center items-center h-screen'>
          <ArrowPathIcon width={85} height={85} className='animate-spin'></ArrowPathIcon>
          <span>
            Memuat Data <span className='text font-bold text-xl'>{changeDate}</span>
          </span>
        </div>
      ) : (
        <>
          <div className='mt-3'>
            {/* <div className='hidden'>
              {selectedPatientName && (
                <CustomTTSComponent key={ttsKey} ref={ttsComponentRef}>
                  <p>{selectedPatientName}</p>
                </CustomTTSComponent>
              )}
            </div> */}
            <Breadcrumb />
            <div className='mt-5'>
              <div>
                <label className='label font-bold'>Pilih Tanggal :</label>
                <input
                  type='date'
                  className='input border-primary text-sm'
                  value={changeDate}
                  onChange={handleDateChange}
                />
              </div>
              <TableData data={data} columns={columns} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
