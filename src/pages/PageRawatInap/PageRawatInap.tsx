import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { useNavigate } from 'react-router-dom'

export default function PageRawatInap() {
  const [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/v1/getDataPasienRanap?statusPulang=-&bangsalName=')
        console.log(response.data)
        setData(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  type DataItem = {
    id: number
    no_rawat: string
    status_lanjut: string
    nm_dokter: string
    nm_pasien: string
    no_rkm_medis: string
    kd_bangsal: string
    status: string
    kelas: string
    statusdata: string
    nm_bangsal: string
    kd_kamar: string
    trf_kamar: number
    diagnosa_awal: string
    diagnosa_akhir: string
    tgl_masuk: string
    jam_masuk: string
    lama: number
    ttl_biaya: number
    stts_pulang: string
  }

  const columns = [
    {
      name: 'No.RM',
      selector: (row: DataItem) => row.no_rkm_medis,
      sortable: true,
    },
    {
      name: 'Nama Pasien',
      selector: (row: DataItem) => row.nm_pasien,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Bangsal/Kamar',
      selector: (row: DataItem) => row.nm_bangsal,
      sortable: true,
      width: '15rem',
    },
    { name: 'Dokter', selector: (row: DataItem) => row.nm_dokter, sortable: true, width: '15rem' },
    {
      name: 'Diagnosa Awal',
      selector: (row: DataItem) => row.diagnosa_awal,
      sortable: true,
      width: '14rem',
    },
    {
      name: 'Masuk/Keluar',
      selector: (row: DataItem) => `${row.tgl_masuk} ${row.jam_masuk}`,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Antrian',
      selector: (row: DataItem) => row.nm_pasien,
      sortable: true,
      width: '15rem',
    },
    {
      name: '',
      selector: (row: DataItem) => (
        <button
          className='btn btn-xs btn-ghost'
          onClick={() => navigate(`/rawat-inap/rme/${row.no_rkm_medis}`, { state: { data: row } })}
        >
          Edit
        </button>
      ),
    },
  ]
  return (
    <div>
      <Breadcrumb />
      <TableData data={data} columns={columns} />
    </div>
  )
}
