/* eslint-disable camelcase */
import React, { forwardRef, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { apiRadiologi } from '../../../../../../services/api/config.api'
import { spesificError } from '../../../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'

interface ModalProps {
  onClose: () => void
  onRadiologiData: any
}

// eslint-disable-next-line react/display-name
const ModalRadiologiInput = forwardRef<PopupActions, ModalProps>((props, ref) => {
  const { onClose, onRadiologiData } = props
  const today = new Date()
  const nmrRawat = localStorage.getItem('no_rawat')
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]
  const [errInfo, setErrInfo] = useState('')
  const initialDate = today.toISOString().substr(0, 10)
  const [indikasi, setIndikasi] = useState('')
  const [info, setInfo] = useState('')
  const [tglPermintaan, setTanggalPermintaan] = useState(initialDate)
  const [dataPemeriksaanRadiologi, setDataPemeriksaanRadiologi] = useState([])
  const [selectedPermintaan, setSelectedPermintaan] = useState([])
  const [kodePrwtn, setKodePrwtn] = useState('')
  const [sending, setSending] = useState(false)
  const [errCheck, setErrCheck] = useState(false)
  const [radiologiString, setRadiologiString] = useState('')

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  useEffect(() => {
    if (radiologiString) {
      onRadiologiData(radiologiString)
    }
  }, [radiologiString])

  function getCurrentTime() {
    const today = new Date()
    let hours: string | number = today.getHours()
    let minutes: string | number = today.getMinutes()
    let seconds: string | number = today.getSeconds()

    hours = hours < 10 ? `0${hours}` : `${hours}`
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    const fetchDataRadiologi = async () => {
      const response = await apiRadiologi.get('/api/v1/procedures')
      setDataPemeriksaanRadiologi(response.data)
    }
    fetchDataRadiologi()
  }, [ref])

  const handleCloseFirstModal = () => {
    if (errCheck) {
      const isDataCorrect = window.confirm('DATA LABORATORIUM BELUM TERKIRIM, LANJUTKAN ?')
      if (isDataCorrect) {
        onClose()
        setIndikasi('')
        setInfo('')
        setSelectedPermintaan([])
        setKodePrwtn('')
        setErrInfo('')
        setErrCheck(false)
      }
    } else {
      onClose()
      setErrInfo('')
      setInfo('')
      setIndikasi('')
    }
  }

  const pilihPemeriksaan = async (kodePrw, kodePj, nmPerawatan) => {
    const selectedItem = { kodePrw, kodePj, nmPerawatan }
    setKodePrwtn(kodePrw)
    setSelectedPermintaan([selectedItem])
  }

  const postPermintaanRadiologi = async () => {
    const dataPermintaanRadiologi = {
      no_rawat: nmrRawat,
      tgl_permintaan: tglPermintaan,
      jam_permintaan: getCurrentTime(),
      tgl_sampel: tglPermintaan,
      jam_sampel: getCurrentTime(),
      tgl_hasil: tglPermintaan,
      jam_hasil: getCurrentTime(),
      dokter_perujuk: nipCredentials,
      status: 'ralan',
      informasi_tambahan: info,
      diagnosa_klinis: indikasi,
    }

    if (!indikasi) {
      setErrInfo('MOHON MENGINPUT INDIKASI/KLINIS')
    } else if (!info) {
      setErrInfo('MOHON MENGINPUT INFORMASI TAMBAHAN')
    } else if (!tglPermintaan) {
      setErrInfo('MOHON MEMILIH TANGGAL PERMINTAAN')
    } else {
      const isDataCorrect = window.confirm(
        'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
      )
      if (isDataCorrect) {
        setErrInfo('')
        setSending(true)
        try {
          let isError = false
          const response1 = await apiRadiologi.post(
            '/api/v1/radiologyRequest',
            dataPermintaanRadiologi,
          )
          console.log('response 1', response1.data)

          try {
            const dataPermintaanRadiologi2 = {
              noOrder: response1.data.noorder,
              kdJenisPrw: kodePrwtn,
              sttsBayar: 'Sudah',
            }

            const response2 = apiRadiologi.post(
              '/api/v1/permintaan-radiologi',
              dataPermintaanRadiologi2,
            )
            console.log('response 2', response2)
          } catch (err2) {
            isError = true
            setErrCheck(true)
            console.log('err2', err2)
          }

          if (!isError) {
            postRadiologiString()
            handleCloseFirstModal()
          }
        } catch (err1) {
          console.log('err post radiologi', err1)
          setSending(false)
          spesificError({
            errMessage:
              'Terjadi Kesalahan tidak terduga, postPemeriksaanRadiologi. Mohon dicoba kembali',
          })
          setErrCheck(true)
        } finally {
          setSending(false)
        }
      }
    }
  }

  const postRadiologiString = () => {
    const data = selectedPermintaan.map((item) => {
      return `-PERMINTAAN RADIOLOGI-\nIndikasi: ${indikasi}\nInformasi: ${info}\nNama Perawatan: ${item.nmPerawatan}\nKodePj: ${item.kodePj}\nKode Perawatan: ${item.kodePrw}\n`
    })

    setRadiologiString(data.join('\n'))
    console.log(data.join('\n'))
  }

  return (
    <Popup
      ref={ref}
      modal
      closeOnDocumentClick={false}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 998,
      }}
      contentStyle={{
        borderRadius: '12px',
        padding: '20px',
        width: '80rem',
        maxHeight: '88vh',
        overflow: 'auto',
        backgroundColor: 'whitesmoke',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='w-full p-3 bg-slate-100'>
        <div>
          <div className='flex justify-between'>
            <p className=' font-bold text-xl text-[#121713] mb-5 underline'>INPUT DATA RADIOLOGI</p>
            <button className='btn flex justify-end btn-ghost' onClick={handleCloseFirstModal}>
              <XMarkIcon width={25} height={25} />
              Close
            </button>
          </div>
          <p className=' font-bold text-xl text-[#121713]'>DATA PERMINTAAN RADIOLOGI</p>
          <span className='text text-gray-400 font-light'>
            Isi semua data dibawah ini untuk menambahkan data permintaan Radiologi kedalam daftar
            rawat jalan
          </span>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-5 justify-evenly'>
          <div>
            <label className='text text-xl font-bold label'>Indikasi/Klinis</label>
            <textarea
              onChange={(e) => setIndikasi(e.target.value)}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='text text-xl font-bold label'>Informasi Tambahan</label>
            <textarea
              onChange={(e) => setInfo(e.target.value)}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
        </div>
        <div>
          <div className='flex items-center'>
            <label className='label '>Tanggal Permintaan :</label>
            <input
              type='date'
              className='input input-md border border-slate-500 mt-3'
              value={tglPermintaan}
              onChange={(e) => setTanggalPermintaan(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className='grid grid-cols-4 gap-3 mt-5'>
            {dataPemeriksaanRadiologi.slice(0, 10).map((data, index) => (
              <button
                key={index}
                className='btn bg-[#B6E5F2] text-black hover:bg-slate-50'
                onClick={() => pilihPemeriksaan(data.kd_jenis_prw, data.kd_pj, data.nm_perawatan)}
              >
                <p className='grid gap-1 text-[13px]'>
                  <span>{data.nm_perawatan}</span>{' '}
                  <span className='font-light'>({data.kd_jenis_prw})</span>
                </p>
              </button>
            ))}
          </div>
        </div>
        {selectedPermintaan.length > 0 ? (
          <div>
            <label className='label p-3 font-bold'>Data Yang Dipilih :</label>
            <div>
              {selectedPermintaan.map((item, index) => (
                <div key={index}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Nama Perawatan</th>
                        <th>Kode Perawatan</th>
                        <th>Kode PJ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {/* Removed whitespace */}
                        <td>{item.nmPerawatan}</td>
                        <td>{item.kodePrw}</td>
                        <td>{item.kodePj}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            {sending ? (
              <div className='flex justify-center'>
                <ArrowPathIcon width={30} height={30} className='mr-3 animate-spin' />
              </div>
            ) : (
              <div className=' w-auto mt-4'>
                <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
                  <InformationCircleIcon width={25} height={25} />
                  <p className='ml-[6px]'>Informasi</p>
                </div>
                <p className='w-full font-sans text-red-400  text-base font-normal leading-5'>
                  Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan
                  dalam pengisian data dapat berdampak pada perawatan pasien.
                </p>
                <div>
                  <button
                    className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
                    onClick={postPermintaanRadiologi}
                  >
                    <p className='flex'>
                      <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' /> Kirim
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <h1 className='mt-3 text text-2xl font-bold text-red-500 animate-pulse '>{errInfo}</h1>
      </div>
      <ToastContainer />
    </Popup>
  )
})

export default ModalRadiologiInput
