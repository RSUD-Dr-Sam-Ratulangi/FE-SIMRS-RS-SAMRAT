/* eslint-disable react/no-children-prop */
/* eslint-disable camelcase */
// ModalLabor.jsx
import React, { forwardRef, useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { api } from '../../../../../services/api/config.api'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface ModalRadiologiHistoryProps {
  noRawat: any
  onClose: () => void
}

const ModalRadiologiHistory = forwardRef<PopupActions, ModalRadiologiHistoryProps>((props, ref) => {
  const nmrRawat = props.noRawat
  // const SecondModalInputRef = useRef<PopupActions>(null)
  const [tglPeriksa, setTglPeriksa] = useState('')
  const [jam, setJam] = useState('')
  const [hasil, setHasil] = useState('')
  const [gambar, setGambar] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/v1/radiology-results?noRawat=${nmrRawat}`)
        setTglPeriksa(response.data.tgl_periksa)
        setJam(response.data.jam)
        setHasil(response.data.hasil)
      } catch (err) {
        null
      }
    }
    fetchData()
  }, [nmrRawat])

  const seeImages = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/api/v1/radiology-images?noRawat=${nmrRawat}`)
      console.log('images', response.data)
      const imageUrls = response.data.map(
        (item) => `http://rsudsamrat.site/webapps/radiologi/${item.lokasi_gambar}`,
      )
      setGambar(imageUrls)
    } catch (err) {
      console.log('error Image Radiologi', err)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    seeImages()
  }, [nmrRawat])

  const renderText = (text) => {
    if (text.includes('\n')) {
      return text.split('\n').map((line, index) => (
        <p key={index} className='font-bold text-2xl indent-1'>
          {line}
        </p>
      ))
    } else {
      return <p className='font-bold text-3xl indent-1'>{text}</p>
    }
  }

  // const openSecondModal = () => {
  //   if (SecondModalInputRef.current) {
  //     SecondModalInputRef.current.open()
  //   }
  // }

  return (
    <div>
      <Popup
        ref={ref}
        modal
        closeOnDocumentClick={true}
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
          // maxHeight: 'full',
          height: 'full',
          backgroundColor: 'whitesmoke',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isLoading ? (
          <p className='flex justify-center items-center text-3xl'>
            <ArrowPathIcon className='animate-spin mr-3' width={70} height={70} />
            Memuat
          </p>
        ) : (
          <>
            <div className='p-3 h-[670px] overflow-auto'>
              <div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className=' font-bold text-xl text-[#121713] '>
                      Tanggal Periksa: {tglPeriksa}
                    </p>
                    <p className=' font-bold text-xl text-[#121713]'>Jam: {jam}</p>
                  </div>
                  <p className=' font-bold text-2xl text-[#121713] mb-5 underline'>
                    HASIL PEMERIKSAAN RADIOLOGI
                  </p>
                </div>
              </div>
              <div className='mt-5'>
                <label className='label font-bold text-2xl'>HASIL : </label>
                <div className='overflow-auto border-4 border-zinc-500 rounded-xl shadow-xl p-5 '>
                  <p className='font-bold text-3xl indent-1'>{renderText(hasil)}</p>
                </div>
              </div>

              {isLoading ? (
                <ArrowPathIcon width={20} height={20} />
              ) : (
                <div className='flex justify-center mt-8 rounded-md'>
                  {gambar ? (
                    <div className='grid grid-cols-2 items-center justify-between gap-3'>
                      {gambar.map((url, index) => (
                        <Zoom key={index}>
                          <img
                            key={index}
                            className='w-[450px] h-[450px] '
                            src={url}
                            alt={`Radiology Image ${index + 1}`}
                          />
                        </Zoom>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p>TIDAK ADA DATA</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </Popup>

      {/* <Popup
        ref={SecondModalInputRef}
        modal
        closeOnDocumentClick={true}
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
          maxHeight: 'full',
          height: 'full',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          // eslint-disable-next-line react/no-children-prop
        }}
      >
        <div className='overflow-y-auto'>
          <img alt='img_rad' src={gambar} className='w-full h-screen rounded-2xl' />
        </div>
      </Popup> */}
    </div>
  )
})

// Set displayName for the component
ModalRadiologiHistory.displayName = 'ModalLabor'

export default ModalRadiologiHistory
