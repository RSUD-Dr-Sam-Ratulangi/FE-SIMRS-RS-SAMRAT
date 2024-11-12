/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import KirimAntrian from '../../utils/KirimAntrian'
import KirimAntrianSemua from '../../utils/KirimAntrianSemua'
import { Icon } from '@iconify/react'

// import CustomTTSComponent from '../../utils/TtsSound'

type DataItem = {
  soapExists: any
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

interface Column {
  name: string
  selector?: (row: DataItem) => string | number | JSX.Element
  cell?: (row: DataItem) => JSX.Element
  sortable: boolean
  ignoreRowClick?: boolean
  allowOverflow?: boolean
  button?: boolean
}

export default function PageRawatJalan() {
  const tglSkrng = localStorage.getItem('tglSkrng')
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [changeDate, setChangeDate] = useState(tglSkrng)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [openPopupAll, setOpenPopupAll] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedNoRawat, setSelectedNoRawat] = useState<string>('')
  const [selectedNmPasien, setSelectedNmPasien] = useState<string>('')

  const navigate = useNavigate()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const kdDokter = Kd.dokter?.kd_dokter
  const role = Object.keys(Kd)[0]
  const nip = localStorage.getItem('nip')

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
            .filter((item) => item.kd_dokter === kdDokter && !item.nm_poli.includes('INSTALASI'))
            .sort((a, b) => a.no_reg.localeCompare(b.no_reg))
        } else if (role === 'petugas') {
          sortedData = responseData
            .filter((item) => !item.nm_poli.includes('INSTALASI'))
            .sort((a, b) => a.no_reg.localeCompare(b.no_reg))
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
    localStorage.setItem('tglSkrng', dateValue)
    const getDate = localStorage.getItem('tglSkrng')

    setChangeDate(getDate)
  }

  const handleSendAntrian = (noRawat: string, nmPasien: string) => {
    setSelectedNoRawat(noRawat)
    setSelectedNmPasien(nmPasien)
    setOpenPopup(true)
  }

  const handleSendAllAntrian = () => {
    setOpenPopupAll(true)
  }

  const createContextMenu = (e, url) => {
    e.preventDefault()

    const existingContextMenu = document.querySelector('.custom-context-menu')
    if (existingContextMenu) {
      console.log('Context menu exists. Removing...')
      existingContextMenu.remove()
    } else {
      console.log('Context menu does not exist.')
    }

    const contextMenu = document.createElement('div')
    contextMenu.className =
      'custom-context-menu absolute z-10 bg-white border border-gray-200 rounded shadow'
    contextMenu.innerHTML = `
    <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onclick="window.open('${url}', '_blank')">BUKA DI TAB BARU</button>
  `
    document.body.appendChild(contextMenu)
    contextMenu.style.cssText = `
    top: ${e.clientY}px;
    left: ${e.clientX}px;
  `

    const closeContextMenu = (event) => {
      const isClickInsideContextMenu = contextMenu.contains(event.target)
      if (!isClickInsideContextMenu) {
        console.log('Closing context menu...')
        contextMenu.remove()
        document.removeEventListener('click', closeContextMenu)
      }
    }
    document.addEventListener('click', closeContextMenu)
  }

  const columns: Column[] = [
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
          onContextMenu={(e) =>
            createContextMenu(
              e,
              `${window.location.origin}/rawat-jalan/soap-pemeriksaan/${row.no_rkm_medis}`,
            )
          }
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
    { name: 'TANGGAL KUNJUNGAN', selector: (row: DataItem) => row.tgl_registrasi, sortable: true },
    {
      name: 'UMUR',
      selector: (row: DataItem) => (
        <p className='text-black mx-auto text-center text-[15px]'>{row.umurdaftar}</p>
      ),
      sortable: true,
    },
    {
      name: 'CHECKLIST RM',
      selector: (row: DataItem) => {
        const [isTrueSoap, setIsTrueSoap] = useState<boolean | null>(null)
        const [isTrueLab, setIsTrueLab] = useState<boolean | null>(null)
        const [isTrueRad, setIsTrueRad] = useState<boolean | null>(null)
        const [isTrueFarmasi, setIsTrueFarmasi] = useState<boolean | null>(null)
        const [isTrueIcd9, setIsTrueIcd9] = useState<boolean | null>(null)
        const [isTrueDiagnosa, setIsTrueDiagnosa] = useState<boolean | null>(null)
        const [isTrueResume, setIsTrueResume] = useState<boolean | null>(null)
        useEffect(() => {
          const fetchData = async () => {
            try {
              // Fetch SOAP data
              try {
                const responseSoap = await api.get(
                  `/api/v1/RiwayatSoapByNoRawat?noRkmMedis=${row.no_rkm_medis}&noRawat=${row.no_rawat}`,
                )
                const dataSoap = responseSoap.data
                console.log('SOAP Response:', dataSoap)

                if (dataSoap.length > 0) {
                  setIsTrueSoap(true)
                } else {
                  setIsTrueSoap(false)
                }
              } catch (soapError) {
                setIsTrueSoap(false)
              }

              // Fetch Lab data
              try {
                const responseLab = await api.get(
                  `/api/v1/checkPermintaanLab?noRawat=${row.no_rawat}`,
                )
                const dataLab = responseLab.data

                if (dataLab === 'no_rawat exists in permintaan_lab table') {
                  setIsTrueLab(true)
                } else {
                  setIsTrueLab(false)
                }
              } catch (labError) {
                setIsTrueLab(false)
              }

              // Fetch Radiologi data
              try {
                const responseRad = await api.get(
                  `/api/v1/radiology-results?noRawat=${row.no_rawat}`,
                )
                const dataRad = responseRad.data

                if (Object.keys(dataRad).length > 0) {
                  setIsTrueRad(true)
                } else {
                  setIsTrueRad(false)
                }
              } catch (radError) {
                setIsTrueRad(false)
              }

              // Fetch Farmasi data
              try {
                const responseFarmasi = await api.get(
                  `/api/v1/getPrescriptionNumbers?noRkmMedis=${row.no_rkm_medis}&noRawat=${row.no_rawat}`,
                )
                const dataFarmasi = responseFarmasi.data

                if (dataFarmasi.length > 0) {
                  setIsTrueFarmasi(true)
                } else {
                  setIsTrueFarmasi(false)
                }
              } catch (farmasiError) {
                setIsTrueFarmasi(false)
              }

              // Fetch icd9/prosedur data
              try {
                const responseProsedur = await api.get(
                  `/api/v1/getProsedurByNoRawat?noRawat=${row.no_rawat}`,
                )
                const dataProsedur = responseProsedur.data

                if (dataProsedur.length > 0) {
                  setIsTrueIcd9(true)
                } else {
                  setIsTrueIcd9(false)
                }
              } catch (farmasiError) {
                setIsTrueIcd9(false)
              }

              // Fetch diagnosa data
              try {
                const responseDiagnosa = await api.get(
                  `/api/v1/getDiagnosaPasien?noRawat=${row.no_rawat}`,
                )
                const dataDiganosa = responseDiagnosa.data

                if (dataDiganosa.length > 0) {
                  setIsTrueDiagnosa(true)
                } else {
                  setIsTrueDiagnosa(false)
                }
              } catch (farmasiError) {
                setIsTrueDiagnosa(false)
              }

              // Fetch resume data
              try {
                const responseResume = await api.get(
                  `/api/v1/getDiagnosaPasien?noRawat=${row.no_rawat}`,
                )
                const dataResume = responseResume.data

                if (dataResume.length > 0) {
                  setIsTrueResume(true)
                } else {
                  setIsTrueResume(false)
                }
              } catch (farmasiError) {
                setIsTrueResume(false)
              }
            } catch (err) {
              console.log('General error during fetch process:', err)
            }
          }

          fetchData()
        }, [row.no_rkm_medis, row.no_rawat])

        if (isTrueSoap === null) {
          return <div>Loading...</div>
        }

        return (
          <div className='grid items-center p-2'>
            <div className='flex space-x-4'>
              <div>
                {isTrueSoap ? (
                  <Icon icon='medical-icon:medical-records' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:medical-records' fontSize={26} color='#000000' />
                )}
              </div>
              <div>
                {isTrueLab ? (
                  <Icon icon='medical-icon:laboratory' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:laboratory' fontSize={26} color='#000000' />
                )}
              </div>
              <div>
                {isTrueRad ? (
                  <Icon icon='medical-icon:i-radiology' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:i-radiology' fontSize={26} color='#000000' />
                )}
              </div>
            </div>
            <div className='flex space-x-4'>
              {isTrueFarmasi ? (
                <Icon icon='mdi:drugs' fontSize={26} color='#0bf000' />
              ) : (
                <Icon icon='mdi:drugs' fontSize={26} color='#000000' />
              )}
              <div>
                {isTrueIcd9 ? (
                  <Icon icon='medical-icon:i-physical-therapy' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:i-physical-therapy' fontSize={26} color='#000000' />
                )}
              </div>
              <div>
                {isTrueDiagnosa ? (
                  <Icon icon='medical-icon:i-pathology' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:i-pathology' fontSize={26} color='#000000' />
                )}
              </div>
              <div>
                {isTrueResume ? (
                  <Icon icon='medical-icon:i-administration' fontSize={26} color='#0bf000' />
                ) : (
                  <Icon icon='medical-icon:i-administration' fontSize={26} color='#000000' />
                )}
              </div>
            </div>
          </div>
        )
      },
      sortable: true,
    },
  ]

  if (
    nip === 'IT007' ||
    nip === 'IT008' ||
    nip === 'IT006' ||
    nip === 'IT009' ||
    nip === ' IT010'
  ) {
    columns.push({
      name: 'KIRIM ANTRIAN',
      cell: (row: DataItem) => (
        <button
          className='btn btn-sm bg-[#55A46B]'
          onClick={() => handleSendAntrian(row.no_rawat, row.nm_pasien)}
        >
          KIRIM
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      sortable: false,
    })
  }

  return (
    <>
      <KirimAntrian
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        noRawat={selectedNoRawat}
        nmPasien={selectedNmPasien}
      />
      <KirimAntrianSemua openPopup={openPopupAll} setOpenPopup={setOpenPopupAll} />
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
                <div className='flex items-center justify-between p-2'>
                  <input
                    type='date'
                    className='input border-primary text-sm'
                    value={changeDate}
                    onChange={handleDateChange}
                  />
                  {nip === 'IT007' ||
                  nip === 'IT008' ||
                  nip === 'IT006' ||
                  nip === 'IT009' ||
                  nip === ' IT010' ? (
                    <button
                      onClick={handleSendAllAntrian}
                      className='btn btn-md hover:bg-gray-200 hover:border-primary border-primary bg-white'
                    >
                      KIRIM SEMUA ANTRIAN
                    </button>
                  ) : null}
                </div>
              </div>
              <TableData data={data} columns={columns} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
