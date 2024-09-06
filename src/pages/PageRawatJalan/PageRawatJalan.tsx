import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { makeRequestsSequentiallyKirimAntrian } from '../../utils/KirimAntrian'
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
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingJKN, setIsLoadingJKN] = useState(false)
  const [changeDate, setChangeDate] = useState(tglSkrng)

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

  const kirimAntrian = (noRawat) => {
    makeRequestsSequentiallyKirimAntrian(noRawat, setIsLoadingJKN)
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
  ]

  if (nip === 'IT007') {
    columns.push({
      name: 'KIRIM ANTRIAN',
      cell: (row: DataItem) => (
        <button className='btn btn-sm bg-[#55A46B]' onClick={() => kirimAntrian(row.no_rawat)}>
          {isLoadingJKN ? (
            <p className='flex items-center justify-center gap-1'>
              <span> Mengirim</span>
              <ArrowPathIcon width={15} height={15} className='animate-spin' />
            </p>
          ) : (
            <p>KIRIM</p>
          )}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      sortable: false, // Buttons don't need to be sortable
    })
  }

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
