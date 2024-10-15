/* eslint-disable camelcase */
import { useParams } from 'react-router-dom'
import { api } from '../../../../../services/api/config.api'
import { useEffect, useState } from 'react'
import { RincianRiwayat } from '../type/InterfaceCppt'
import RiwayatModalIgd from '../../RiwayatModal/RiwayatIgd'

const RincianRiwayatCppt = () => {
  const [activeTab, setActiveTab] = useState<number>()
  const [rincianRiwayat, setRincianRiwayat] = useState<RincianRiwayat[]>([])
  const [dokterList, setDokterList] = useState<string[]>([])
  const [NmrRawat, setNmrRawat] = useState<string>('')
  const { id } = useParams()

  const fetchRincianRiwayat = async () => {
    try {
      const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
      console.log('riwayat', response.data)
      setRincianRiwayat(response.data)

      const noRawatList = response.data.map((item) => item.no_rawat)
      fetchDokterNames(noRawatList)
    } catch (err) {
      console.log('err get rincian riwayat', err)
    }
  }

  const fetchDokterNames = async (noRawatList) => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
      const allDokters = response.data

      const dokterNames = noRawatList
        .map((no_rawat) => {
          const dokter = allDokters.find((item) => item.no_rawat === no_rawat)
          return dokter ? dokter.nm_dokter : null
        })
        .filter((name) => name !== null)

      setDokterList(dokterNames)
      console.log('dokter names', dokterNames)
    } catch (err) {
      console.log('err get dokter names', err)
    }
  }

  useEffect(() => {
    fetchRincianRiwayat()
  }, [id])

  const [isPopupOpenModalRiwayat, setIsPopupOpenModalRiwayat] = useState(false)

  const openPopupModal = (noRawat: string) => {
    setActiveTab(4)
    setIsPopupOpenModalRiwayat(true)
    setNmrRawat(noRawat)
  }
  const closePopupModal = () => setIsPopupOpenModalRiwayat(false)

  return (
    <>
      <div className='w-full h-full bg-white mt-3'>
        <label className='label font-inter font-bold text-xl text-[#121713]'>Rincian Riwayat</label>
        <table className='table table-sm table-zebra font-bold'>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal Perawatan</th>
              <th>Jam Rawat</th>
              <th>Nama Dokter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rincianRiwayat.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.tgl_perawatan}</td>
                <td>{item.jam_rawat}</td>
                <td>{dokterList[index] || '-'}</td>
                <td>
                  <button
                    className='btn btn-sm bg-primary'
                    onClick={() => openPopupModal(item.no_rawat)}
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RiwayatModalIgd
        activeTab={activeTab}
        isOpen={isPopupOpenModalRiwayat}
        onClose={closePopupModal}
        noRawat={NmrRawat}
      />
    </>
  )
}

export default RincianRiwayatCppt
