/* eslint-disable camelcase */
// ModalLabor.jsx
import React, { forwardRef, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { apiLabor } from '../../../../../services/api/config.api'

interface ModalLaborHistoryProps {
  noRawat: any
  dataPersonal: any
  onClose: () => void
}

const ModalLaborHistory = forwardRef<PopupActions, ModalLaborHistoryProps>((props, ref) => {
  const nmrRawat = props.noRawat
  const dataPersonal = props.dataPersonal || {}

  const [loading, setLoading] = useState(false)
  const [tglPeriksa, setTglPeriksa] = useState('')
  const [jam, setJam] = useState('')

  const [dataRiwayat, setDataRiwayat] = useState<{ [key: string]: any[] }>({})

  useEffect(() => {
    setLoading(true)

    const fetchDataRiwayatLabor = async () => {
      try {
        const response = await apiLabor.get(`/api/v1/detailPeriksaLab?noRawat=${nmrRawat}`)
        setTglPeriksa(response.data[0].tgl_periksa)
        setJam(response.data[0].jam)
        // Separate the data based on nm_perawatan
        const newDataRiwayat = {}
        response.data.forEach((item) => {
          if (!newDataRiwayat[item.nm_perawatan]) {
            newDataRiwayat[item.nm_perawatan] = []
          }
          newDataRiwayat[item.nm_perawatan].push(item)
        })

        setDataRiwayat(newDataRiwayat)
      } catch (err) {
        null
      } finally {
        setLoading(false)
      }
    }

    fetchDataRiwayatLabor()
  }, [nmrRawat])

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
        // maxHeight: 'full',
        height: 'full',
        backgroundColor: 'whitesmoke',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='p-3'>
        <div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold'>Tanggal Periksa : {tglPeriksa}</p>
              <p className='font-semibold'>Jam Permintaan : {jam}</p>
            </div>
            <p className=' font-bold text-xl text-[#121713] mb-5 underline'>
              RIWAYAT PEMERIKSAAN LABORATORIUM
            </p>
            {/* <button className='btn flex justify-end btn-ghost' onClick={handleCloseModal}>
              <XMarkIcon width={25} height={25} />
              Close
            </button> */}
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
              {Object.keys(dataRiwayat).length === 0 ? (
                <p>Null</p>
              ) : (
                <div className='p-2 bg-white h-[580px] overflow-auto'>
                  {Object.keys(dataRiwayat).map((nm_perawatan, index) => (
                    <div key={index} className='mt-3'>
                      <p className='text text-lg font-bold text-gray-500 underline mb-5'>
                        {nm_perawatan}
                      </p>
                      <table className='w-full'>
                        <thead>
                          <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                            <th className='text-start'>PEMERIKSAAN</th>
                            <th className='text-start'>SATUAN</th>
                            <th className='text-start'>NILAI RUJUKAN</th>
                            <th className='text-start'>HASIL</th>
                            <th className='text-start'>KETERANGAN</th>
                          </tr>
                        </thead>
                        <tbody className='overflow-auto'>
                          {dataRiwayat[nm_perawatan].map((data, dataIndex) => (
                            <tr
                              key={dataIndex}
                              className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg'
                            >
                              <td className='text-start'>{data.Pemeriksaan}</td>
                              <td className='text-start'>{data.satuan}</td>
                              <td className='text-start'>
                                LD: {data.nilai_rujukan_ld}, LA: {data.nilai_rujukan_la}, PA:{' '}
                                {data.nilai_rujukan_pa}
                              </td>
                              <td className='text-start font-bold text-lg'>{data.nilai}</td>
                              <td className='text-start'>{data.keterangan}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
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
