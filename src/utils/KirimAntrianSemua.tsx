/* eslint-disable camelcase */
import React, { useState } from 'react'
import { api } from '../services/api/config.api'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface KirimAntrianSemuaProps {
  openPopup: boolean
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>
}

interface AntrianMessage {
  no_rawat: string
  nm_pasien: string
  message: string[]
}

const KirimAntrianSemua: React.FC<KirimAntrianSemuaProps> = ({ openPopup, setOpenPopup }) => {
  //   const [noRawatData, setNoRawatData] = useState<{ no_rawat: string; nm_pasien: string }[]>([])
  const [antrianMessages, setAntrianMessages] = useState<Map<string, AntrianMessage>>(new Map())
  const [done, setDone] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getCurrentDate = (): string => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const kirimAntrian = async () => {
    setIsLoading(true)
    const changeDate = getCurrentDate()

    try {
      const response = await api.get(
        `/api/v1/getalllpasienmendaftar?kd_poli=&tglKunjungan=${changeDate}&tglKunjunganAkhir=${changeDate}`,
      )
      const noRawatArray = response.data.map((item: { no_rawat: string; nm_pasien: string }) => ({
        no_rawat: item.no_rawat,
        nm_pasien: item.nm_pasien,
      }))
      console.log('Semua No Rawat dan Nama Pasien dapat')

      let completedRequests = 0
      for (const { no_rawat, nm_pasien } of noRawatArray) {
        try {
          const responseAntrian = await api.post(`/api/v1/sendRequest?kodeBooking=${no_rawat}`)
          const messagesFromResponse = responseAntrian.data.map(
            (item: { message: string }) => item.message,
          )

          setAntrianMessages((prevMessages) => {
            const updatedMessages = new Map(prevMessages)
            updatedMessages.set(no_rawat, {
              no_rawat,
              nm_pasien,
              message: messagesFromResponse,
            })
            return updatedMessages
          })

          console.log(`Messages for ${no_rawat}:`, messagesFromResponse)
        } catch (err) {
          console.log(err)
        } finally {
          completedRequests += 1
          if (completedRequests === noRawatArray.length) {
            setDone(true)
          }
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setOpenPopup(false)
    if (isLoading === false) {
      null
    } else {
      window.location.reload()
    }
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
        onClose={() => setOpenPopup(false)}
      >
        <div>
          <div className='flex justify-end'>
            <button onClick={handleClose} className='btn btn-sm'>
              X
            </button>
          </div>
          <div className='antrian-messages'>
            <p className='flex gap-2 text-2xl font-bold mb-3'>
              {isLoading ? (
                <p className='flex items-center'>
                  Mengirim Antrian{' '}
                  <ArrowPathIcon width={35} height={35} className='animate-spin ml-2' />
                </p>
              ) : (
                <div className='ml-5'>
                  <button className='' onClick={kirimAntrian}>
                    Kirim Antrian
                  </button>
                </div>
              )}
            </p>
            <div className='h-[600px] overflow-auto'>
              {Array.from(antrianMessages.values()).map((messageData, index) => (
                <div key={index} className='antrian-message mt-2'>
                  <div className='mb-1'>
                    <strong>Nama Pasien:</strong> {messageData.nm_pasien} ({messageData.no_rawat})
                  </div>
                  <div>
                    {messageData.message.map((message, msgIndex) => (
                      <div key={msgIndex}>
                        <strong>Message:</strong> {message}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {done && (
              <div className='done-message'>
                <strong>
                  <p className='font-bold'>DONE</p>
                </strong>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </>
  )
}

export default KirimAntrianSemua
