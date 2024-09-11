import React, { useEffect, useState } from 'react'
import { api } from '../services/api/config.api'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface KirimAntrianProps {
  openPopup: boolean
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
  noRawat: string
  nmPasien: string
}

const KirimAntrian: React.FC<KirimAntrianProps> = ({
  openPopup,
  setOpenPopup,
  noRawat,
  nmPasien,
}) => {
  const [antrianData, setAntrianData] = useState<{ message: string }[]>([])

  useEffect(() => {
    if (openPopup) {
      const sendingAntrian = async () => {
        try {
          const responseAntrian = await api.post(`/api/v1/sendRequest?kodeBooking=${noRawat}`)
          const data = responseAntrian.data.map((item: { message: string }) => item)
          setAntrianData(data) // Store the response data
          console.log('data Antrian', data)
        } catch (err: any) {
          console.log(err.response?.data?.message || 'An error occurred')
        } finally {
          setOpenPopup(true)
        }
      }

      sendingAntrian()
    }
  }, [openPopup, noRawat, setOpenPopup])

  const setCloseModal = () => {
    setOpenPopup(false)
    window.location.reload()
  }

  return (
    <>
      <Popup
        closeOnDocumentClick={false}
        overlayStyle={{
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
        }}
        contentStyle={{
          borderRadius: '12px',
          padding: '20px',
          width: '80rem',
          height: 'auto',
          backgroundColor: 'whitesmoke',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        open={openPopup}
        onClose={setCloseModal}
      >
        <div>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-lg font-bold'>
              {nmPasien} ({noRawat})
            </p>
            <button onClick={setCloseModal} className=' btn btn-sm'>
              X
            </button>
          </div>
          {/* Render the response data here */}
          <div className='antrian-messages'>
            {antrianData.length > 0 ? (
              antrianData.map((item, index) => (
                <div key={index} className='antrian-message'>
                  {item.message}
                </div>
              ))
            ) : (
              <div className='flex justify-center'>
                <ArrowPathIcon width={60} height={60} className='animate-spin ml-2'></ArrowPathIcon>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  )
}

export default KirimAntrian
