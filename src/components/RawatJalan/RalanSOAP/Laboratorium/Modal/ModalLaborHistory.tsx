// ModalLabor.jsx
import React, { forwardRef, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { apiLabor } from '../../../../../services/api/config.api'

interface ModalLaborHistoryProps {
  noRawat: any
  dataPersonal: any
  onClose: () => void
}

const ModalLaborHistory = forwardRef<PopupActions, ModalLaborHistoryProps>((props, ref) => {
  const nmrRawat = props.noRawat
  const dataPersonal = props.dataPersonal || {}
  const { onClose } = props

  const [dataRiwayat, setDataRiwayat] = useState([])
  const [loading, setLoading] = useState(false)
  const [namaPerawatan, setNamaPerawatan] = useState('')

  useEffect(() => {
    setLoading(true)

    const fetchDataRiwayatLabor = async () => {
      try {
        const response = await apiLabor.get(`/api/v1/detailPeriksaLab?noRawat=${nmrRawat}`)
        setDataRiwayat(response.data)
        setNamaPerawatan(response.data[0].nm_perawatan)
        console.log('riwaytlabor', response.data)
      } catch (err) {
        console.log(err)
        setDataRiwayat([])
      } finally {
        setLoading(false)
        console.log('ok')
      }
    }

    fetchDataRiwayatLabor()
  }, [nmrRawat])

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <Popup
      ref={ref}
      modal
      closeOnDocumentClick={true}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
      contentStyle={{
        borderRadius: '12px',
        padding: '20px',
        width: '80rem',
        maxHeight: '80vh',
        backgroundColor: 'whitesmoke',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='p-3'>
        <div>
          <div className='flex justify-between items-center'>
            <p>{nmrRawat}</p>
            <p className=' font-bold text-xl text-[#121713] mb-5 underline'>
              RIWAYAT PEMERIKSAAN LABORATORIUM
            </p>
            <button className='btn flex justify-end btn-ghost' onClick={handleCloseModal}>
              <XMarkIcon width={25} height={25} />
              Close
            </button>
          </div>
          <div>
            <p className='text text-lg font-semibold mb-5'>
              {dataPersonal.nm_pasien && <p>Nama Pasien: {dataPersonal.nm_pasien}</p>}
            </p>
          </div>
          {loading ? (
            <div className='flex justify-center'>
              <ArrowPathIcon width={80} height={80} className='animate-spin' />
            </div>
          ) : (
            <>
              {dataRiwayat.length === 0 ? (
                <p>Null</p>
              ) : (
                <div className='p-3 bg-white h-80 overflow-auto'>
                  <p className='text text-lg font-semibold mb-5'>{namaPerawatan}</p>
                  <table className='w-full'>
                    <thead>
                      <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                        <th className='text-start'>PEMERIKSAAN</th>
                        <th className='text-start'>SATUAN</th>
                        <th className='text-start'>NILAI RUJUKAN</th>
                        <th className='text-start'>KETERANGAN</th>
                        <th className='text-start'>HASIL</th>
                      </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                      {dataRiwayat.map((dataRiwayat, index) => (
                        <tr
                          key={index}
                          className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg'
                        >
                          <td className='text-start'>{dataRiwayat.Pemeriksaan}</td>
                          <td className='text-start'>{dataRiwayat.satuan}</td>
                          <td className='text-start'>
                            LD: {dataRiwayat.nilai_rujukan_ld}, LA: {dataRiwayat.nilai_rujukan_la},
                            PA: {dataRiwayat.nilai_rujukan_pa}
                          </td>
                          <td className='text-start'>{dataRiwayat.keterangan}</td>
                          <td className='text-start'>{dataRiwayat.nilai}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Popup>
  )
})

// Set displayName for the component
ModalLaborHistory.displayName = 'ModalLabor'

export default ModalLaborHistory
