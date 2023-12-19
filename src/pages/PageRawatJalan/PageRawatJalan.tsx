import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { dateNow } from '../../utils/DateNow'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

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
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const tglSkrng = dateNow()
  const tokenValue = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      const Kd = JSON.parse(tokenValue)
      const kdDokter = Kd.dokter?.kd_dokter
      const role = Object.keys(Kd)[0]

      try {
        const response = await api.get(
          `/api/v1/getalllpasienmendaftar?kd_poli=&tglKunjungan=${tglSkrng}&tglKunjunganAkhir=${tglSkrng}`,
        )
        const responseData = response.data

        let sortedData = responseData

        if (role === 'dokter') {
          sortedData = responseData.sort((a, b) => {
            if (a.kd_dokter === kdDokter) return -1
            if (b.kd_dokter === kdDokter) return 1
            return a.kd_dokter.localeCompare(b.kd_dokter)
          })

          sortedData = sortedData.filter((item) => item.kd_dokter === kdDokter)
        }

        setData(sortedData)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [tokenValue, tglSkrng])

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
            navigate(`/rawat-jalan/rme/${row.no_rkm_medis}`, { state: { data: row } })
          }}
        >
          {row.nm_pasien}
        </a>
      ),
      sortable: true,
    },

    { name: 'NO RAWAT', selector: (row: DataItem) => row.no_rawat, sortable: true },
    {
      name: 'UMUR',
      selector: (row: DataItem) => (
        <p className='text-black mx-auto text-center text-[15px]'>{row.umurdaftar}</p>
      ),
      sortable: true,
    },
    {
      name: 'POLI',
      selector: (row: DataItem) => row.nm_poli,
      sortable: true,
    },
    {
      name: 'DOKTER',
      selector: (row: DataItem) => row.nm_dokter,
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
      name: 'STATUS PERIKSA',
      selector: (row: DataItem) => row.stts,
      sortable: true,
    },
    {
      name: 'STATUS LANJUT',
      selector: (row: DataItem) => row.status_lanjut,
      sortable: true,
    },
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
    // },
  ]

  return (
    <>
      {isLoading ? (
        <p className='flex justify-center items-center h-screen'>
          <ArrowPathIcon width={80} height={80} className='animate-spin' />
          <span className='font-bold text-xl animate-pulse'>Memuat Data</span>
        </p>
      ) : (
        <>
          <div className='mt-3'>
            <Breadcrumb />
            <div className='mt-5'>
              <TableData data={data} columns={columns} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
