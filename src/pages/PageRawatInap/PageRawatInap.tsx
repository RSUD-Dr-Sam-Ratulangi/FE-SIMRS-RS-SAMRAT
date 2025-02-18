import { useEffect, useRef, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { PopupActions } from 'reactjs-popup/dist/types'
import ModalPulangRanap from '../../components/Layouts/Ranap/ModalPulang'

export default function PageRawatInap() {
  const modalPulangRef = useRef<PopupActions>(null)
  const tglSkrng = localStorage.getItem('tglSkrng')
  const [data, setData] = useState()
  const [changeDate, setChangeDate] = useState(tglSkrng)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await api.get('/api/v1/getDataPasienRanap?statusPulang=-&bangsalName=')
        const dataInap = response.data.reverse()
        setData(dataInap)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const createContextMenu = (e, url) => {
    e.preventDefault() // Prevent default context menu

    const existingContextMenu = document.querySelector('.custom-context-menu')
    if (existingContextMenu) {
      existingContextMenu.remove()
    } else {
      null
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
        contextMenu.remove() // Remove the context menu
        document.removeEventListener('click', closeContextMenu) // Remove the event listener
      }
    }
    document.addEventListener('click', closeContextMenu)
  }

  const modalPulangRanapOpen = () => {
    if (modalPulangRef.current) {
      modalPulangRef.current.open()
    }
  }

  const modalPulangRanapClose = () => {
    if (modalPulangRef.current) {
      modalPulangRef.current.close()
    }
  }

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

  const handleDateChange = (event: any) => {
    const dateValue = event.target.value
    localStorage.setItem('tglSkrng', dateValue)
    const getDate = localStorage.getItem('tglSkrng')

    setChangeDate(getDate)
  }

  const columns = [
    {
      name: 'No.RM',
      selector: (row: DataItem) => row.no_rkm_medis,
      sortable: true,
    },
    {
      name: 'NAMA PASIEN',
      selector: (row: DataItem) => (
        <a
          className='font-semibold uppercase text-md hover:cursor-pointer'
          onClick={async () => {
            localStorage.setItem('no_rawat', row.no_rawat)
            // localStorage.setItem('no_antrian', row.no_reg)
            // localStorage.setItem('status_rawat', row.stts)
            navigate(`/rawat-inap/soap-pemeriksaan/${row.no_rkm_medis}`, { state: { data: row } })
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
    {
      name: 'Bangsal/Kamar',
      selector: (row: DataItem) => row.nm_bangsal,
      sortable: true,
    },
    { name: 'Dokter', selector: (row: DataItem) => row.nm_dokter, sortable: true },
    {
      name: 'Diagnosa Awal',
      selector: (row: DataItem) => row.diagnosa_awal,
      sortable: true,
    },
    {
      name: 'Tgl/Jam Masuk',
      selector: (row: DataItem) => `${row.tgl_masuk} ${row.jam_masuk}`,
      sortable: true,
    },
    {
      name: 'Antrian',
      selector: (row: DataItem) => row.nm_pasien,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: DataItem) => (
        <>
          <div className='flex gap-2 p-1'>
            <button className='btn' onClick={modalPulangRanapOpen}>
              Pulang
            </button>
            <button className='btn' onClick={() => console.log(row.nm_bangsal)}>
              Pindah
            </button>
          </div>
        </>
      ),
      sortable: true,
    },
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
        <div>
          <Breadcrumb />
          <div className='grid gap-3 items-center mt-5'>
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
      )}
      <ModalPulangRanap ref={modalPulangRef} onClose={modalPulangRanapClose} />
    </>
  )
}
