/* eslint-disable camelcase */
// ModalLabor.jsx
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  XMarkIcon,
  TrashIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid'
import { apiLabor } from '../../../../../services/api/config.api'
import { spesificError, spesificSuccess } from '../../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'

interface ModalProps {
  onClose: () => void
}

const ModalLaborInput = forwardRef<PopupActions, ModalProps>((props, ref) => {
  const { onClose } = props
  const [dataLaborPemeriksaan, setDataLaborPemeriksaan] = useState([])
  const [indikasi, setIndikasi] = useState('')
  const [info, setInfo] = useState('')
  const [errInfo, setErrInfo] = useState('')
  const [dataLaborDetailPemeriksaan, setDataLaborDetailPemeriksaan] = useState([])
  const [kodePemeriksaan, setKodePemeriksaan] = useState('')
  const [labSelectedDetailData, setLabSelectedDetailData] = useState([])
  const [listSelectedDetailData, setListSelectedDetailData] = useState([])
  const [sending, setSending] = useState(false)
  const SecondModalInputRef = useRef<PopupActions>(null)
  const nmrRawat = localStorage.getItem('no_rawat')
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]
  const pageSize = 10
  const today = new Date()
  const initialDate = today.toISOString().substr(0, 10)
  const [tglPermintaan, setTanggalPermintaan] = useState(initialDate)

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  useEffect(() => {
    const fetchDataPemeriksaan = async () => {
      try {
        const response = await apiLabor.get(
          `/api/v1/searchJnsPerawatanLab?kdJenisPrw=&nmPerawatan=RSUD&page=0&size=${pageSize}`,
        )
        setDataLaborPemeriksaan(response.data.content)
        console.log('data', response.data.content)
      } catch (err) {
        console.log('labor data err', err)
      }
    }
    fetchDataPemeriksaan()
  }, [ref])

  useEffect(() => {
    const fetchDataDetailPemeriksaan = async () => {
      try {
        const response = await apiLabor.get(
          `/api/v1/templateLaboratorium?kdJenisPrw=${kodePemeriksaan}`,
        )
        setDataLaborDetailPemeriksaan(response.data)
        console.log('data detail')
      } catch (err) {
        console.log('labor data err', err)
      }
    }
    fetchDataDetailPemeriksaan()
  }, [kodePemeriksaan])

  const pilihPemeriksaan = (kode: any) => {
    setKodePemeriksaan(kode)
    if (SecondModalInputRef.current) {
      SecondModalInputRef.current.open()
    }
  }

  const handleCloseFirstModal = () => {
    onClose()
    setLabSelectedDetailData([])
    setListSelectedDetailData([])
    setErrInfo('')
    setInfo('')
    setIndikasi('')
  }

  const handleCloseSecondModal = () => {
    if (SecondModalInputRef.current) {
      SecondModalInputRef.current.close()
    }
    setLabSelectedDetailData([])
  }

  const handleSelectTemplate = (
    idTemplate: any,
    pemeriksaan: any,
    satuan: any,
    nilai_rujukan_ld: any,
    nilai_rujukan_la: any,
    nilai_rujukan_pa: any,
  ) => {
    setLabSelectedDetailData([
      ...labSelectedDetailData,
      { idTemplate, pemeriksaan, satuan, nilai_rujukan_ld, nilai_rujukan_la, nilai_rujukan_pa },
    ])

    const updatedDataLaborDetailPemeriksaan = dataLaborDetailPemeriksaan.filter(
      (data) => data.id_template !== idTemplate,
    )
    setDataLaborDetailPemeriksaan(updatedDataLaborDetailPemeriksaan)

    spesificSuccess({ doneMessage: `Pemeriksaan ${pemeriksaan} Berhasil Ditambahkan` })
  }

  const handleSelectAll = () => {
    const allSelectedItems = dataLaborDetailPemeriksaan.map((data) => ({
      idTemplate: data.id_template,
      pemeriksaan: data.Pemeriksaan,
      satuan: data.satuan,
      nilai_rujukan_ld: data.nilai_rujukan_ld,
      nilai_rujukan_la: data.nilai_rujukan_la,
      nilai_rujukan_pa: data.nilai_rujukan_pa,
    }))
    setLabSelectedDetailData([...labSelectedDetailData, ...allSelectedItems])

    setDataLaborDetailPemeriksaan([])
  }

  const handleRemoveTemplate = (idTemplate: any) => {
    const removedItemIndex = labSelectedDetailData.findIndex(
      (item) => item.idTemplate === idTemplate,
    )
    if (removedItemIndex !== -1) {
      const removedItem = labSelectedDetailData[removedItemIndex]

      const updatedLabSelectedDetailData = [...labSelectedDetailData]
      updatedLabSelectedDetailData.splice(removedItemIndex, 1)
      setLabSelectedDetailData(updatedLabSelectedDetailData)

      const restoredItem = {
        id_template: removedItem.idTemplate,
        pemeriksaan: removedItem.pemeriksaan,
        satuan: removedItem.satuan,
        nilai_rujukan_ld: removedItem.nilai_rujukan_ld,
        nilai_rujukan_la: removedItem.nilai_rujukan_la,
        nilai_rujukan_pa: removedItem.nilai_rujukan_pa,
      }

      setDataLaborDetailPemeriksaan([...dataLaborDetailPemeriksaan, restoredItem])

      spesificSuccess({ doneMessage: `Pemeriksaan ${removedItem.pemeriksaan} Berhasil Dihapus` })
    }
  }

  const handleRemoveFromList = (idTemplateToRemove) => {
    const updatedListSelectedDetailData = listSelectedDetailData.map((item) => ({
      ...item,
      [Object.keys(item)[0]]: item[Object.keys(item)[0]].filter(
        (innerItem) => innerItem.idTemplate !== idTemplateToRemove,
      ),
    }))
    setListSelectedDetailData(updatedListSelectedDetailData)
  }

  const handleSaveSelectTemplate = () => {
    const newData = {
      [kodePemeriksaan]: [...labSelectedDetailData],
    }
    setListSelectedDetailData([...listSelectedDetailData, newData])

    setLabSelectedDetailData([])

    handleCloseSecondModal()
  }

  const postLabor = async () => {
    const dataPermintaanLab = {
      noRawat: nmrRawat,
      dokterPerujuk: nipCredentials,
      status: 'ralan',
      informasiTambahan: info,
      diagnosaKlinis: indikasi,
      tglPermintaan: tglPermintaan,
    }

    if (!indikasi) {
      setErrInfo('MOHON MENGINPUT INDIKASI/KLINIS')
    } else if (!info) {
      setErrInfo('MOHON MENGINPUT INFORMASI TAMBAHAN')
    } else if (Object.keys(listSelectedDetailData).length === 0) {
      setErrInfo('MOHON MEMILIH SETIDAKNYA 1 PEMERIKSAAN')
    } else if (!tglPermintaan) {
      setErrInfo('MOHON MEMILIH TANGGAL PERMINTAAN')
    } else {
      const isDataCorrect = window.confirm(
        'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
      )
      if (isDataCorrect) {
        try {
          const response1 = await apiLabor.post('/api/v1/permintaanLab', dataPermintaanLab)
          setSending(true)
          setErrInfo('')

          for (const item of listSelectedDetailData) {
            const key = Object.keys(item)[0]
            try {
              const response2 = await apiLabor.post('/api/v1/permintaanPemeriksaanLab', {
                noOrder: response1.data.noorder,
                kdJenisPrw: key,
                sttsBayar: 'Belum',
              })
              console.log('response2', response2)
            } catch (err) {
              spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, postPemeriksaanLab' })
            }

            for (const innerItem of item[key]) {
              try {
                const response3 = await apiLabor.post('/api/v1/permintaanDetailPermintaanLab', {
                  noOrder: response1.data.noorder,
                  kdJenisPrw: key,
                  idTemplate: innerItem.idTemplate,
                  sttsBayar: 'Sudah',
                })
                console.log('response3', response3)
              } catch (err) {
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga. postPermintaanLab' })
              }
            }
          }
        } catch (err) {
          spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, Mohon Coba Lagi' })
          setSending(false)
          setErrInfo('Terjadi Kesalahan tidak terduga, Mohon Coba Lagi')
        } finally {
          setSending(false)
          handleCloseFirstModal()
        }
      }
    }
  }

  console.log(labSelectedDetailData)
  console.log(dataLaborPemeriksaan)
  console.log('listlist', listSelectedDetailData)

  return (
    <div>
      {/* FIRST MODAL */}
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
              <p className=' font-bold text-xl text-[#121713] mb-5 underline'>
                INPUT DATA LABORATORIUM
              </p>
              <button className='btn flex justify-end btn-ghost' onClick={handleCloseFirstModal}>
                <XMarkIcon width={25} height={25} />
                Close
              </button>
            </div>
            <p className=' font-bold text-xl text-[#121713]'>DATA PERMINTAAN LABORATORIUM</p>
            <span className='text text-gray-400 font-light'>
              Isi semua data dibawah ini untuk menambahkan data permintaan laboratorium kedalam
              daftar rawat jalan
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
            <input
              type='date'
              className='input border border-slate-500 mt-3'
              value={tglPermintaan}
              onChange={(e) => setTanggalPermintaan(e.target.value)}
            />
            <div className='grid grid-cols-4 gap-3 mt-5'>
              {dataLaborPemeriksaan.map((data, index) => (
                <button
                  key={index}
                  className='btn bg-[#B6E5F2] text-black hover:bg-slate-50'
                  onClick={() => pilihPemeriksaan(data.kd_jenis_prw)}
                >
                  {data.nm_perawatan}
                </button>
              ))}
            </div>
          </div>
          <div>
            {listSelectedDetailData.map((item, index) => (
              <div
                key={index}
                className='h-56 overflow-auto border border-slate-300 rounded-lg mt-4'
              >
                <table className='table table-lg w-full'>
                  <thead>
                    <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                      <th className='text-start'>Kode</th>
                      <th className='text-start'>ID TEMP</th>
                      <th className='text-start'>PEMERIKSAAN</th>
                      <th className='text-start'>SATUAN</th>
                      <th className='text-start'>NILAI RUJUKAN</th>
                      <th className='text-start'>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(item).map((key) => (
                      <React.Fragment key={key}>
                        <tr className='text-gray-500 font-bold'>
                          <td>
                            <p className='font-bold'>{key}</p>
                          </td>
                        </tr>
                        {item[key].map((innerItem, innerIndex) => (
                          <tr
                            key={`${key}-${innerIndex}`}
                            className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg'
                          >
                            <td className='text-start'>{key}</td>
                            <td className='text-start'>{innerItem.idTemplate}</td>
                            <td className='text-start'>{innerItem.pemeriksaan}</td>
                            <td className='text-start'>{innerItem.satuan}</td>
                            <td className='text-start'>
                              LD: {innerItem.nilai_rujukan_ld}, LA: {innerItem.nilai_rujukan_la},
                              PA: {innerItem.nilai_rujukan_pa}
                            </td>
                            <td>
                              <button
                                className='underline'
                                onClick={() => handleRemoveFromList(innerItem.idTemplate)}
                              >
                                <p className='text-start'>
                                  <TrashIcon width={20} height={20} className='mr-3' />
                                </p>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className=' w-auto mt-4'>
            <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
              <InformationCircleIcon width={25} height={25} />
              <p className='ml-[6px]'>Informasi</p>
            </div>
            <p className='w-full font-sans text-red-400  text-base font-normal leading-5'>
              Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan
              dalam pengisian data dapat berdampak pada perawatan pasien.
            </p>
            <h1 className='mt-3 text text-2xl font-bold text-red-500 animate-pulse '>{errInfo}</h1>
            {sending ? (
              <div className='flex justify-center'>
                <ArrowPathIcon width={30} height={30} className='mr-3 animate-spin' />
              </div>
            ) : (
              <button
                onClick={postLabor}
                className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
              >
                <p className='flex'>
                  <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' /> Selesai
                </p>
              </button>
            )}
          </div>
        </div>
      </Popup>

      {/* SECOND MODAL */}
      <Popup
        ref={SecondModalInputRef}
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
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className='bg-slate-100 p-2 rounded-xl'>
          <div className='mt-8 '>
            <div className='flex justify-between items-center'>
              <p className=' font-bold text-xl text-gray-500'>DETAIL PEMERIKSAAN</p>
              <button className='btn flex justify-end btn-ghost' onClick={handleCloseSecondModal}>
                <XMarkIcon width={25} height={25} />
              </button>
            </div>
            <div className='flex justify-between items-center mt-5 p-3'>
              <p>{nmrRawat}</p>
              <p className='font-bold'>{kodePemeriksaan}</p>
              <button className='btn bg-blue-100 btn-sm' onClick={handleSelectAll}>
                Pilih semua
              </button>
            </div>
            <div className='grid gap-4'>
              <div className='mt-2 pt-4 h-96 overflow-auto shadow p-2'>
                <table className='table table-lg w-full'>
                  <thead>
                    <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                      <th className='text-start'>NO</th>
                      <th className='text-start'>ID TEMP</th>
                      <th className='text-start'>PEMERIKSAAN</th>
                      <th className='text-start'>SATUAN</th>
                      <th className='text-start'>NILAI RUJUKANnn</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-auto'>
                    {dataLaborDetailPemeriksaan
                      .filter(
                        (data) =>
                          !labSelectedDetailData.some(
                            (selectedData) => selectedData.idTemplate === data.id_template,
                          ),
                      )
                      .map((data, index) => (
                        <tr
                          key={index}
                          onClick={() =>
                            handleSelectTemplate(
                              data.id_template,
                              data.Pemeriksaan,
                              data.satuan,
                              data.nilai_rujukan_ld,
                              data.nilai_rujukan_la,
                              data.nilai_rujukan_pa,
                            )
                          }
                          className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg cursor-default'
                        >
                          <td className='text-start'>{index + 1}</td>
                          <td className='text-start'>{data.id_template}</td>
                          <td className='text-start'>{data.Pemeriksaan}</td>
                          <td className='text-start'>{data.satuan}</td>
                          <td className='text-start'>
                            LD: {data.nilai_rujukan_ld}, LA: {data.nilai_rujukan_la}, PA:{' '}
                            {data.nilai_rujukan_pa}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className='mt-5'>
                <p className=' font-bold text-xl text-gray-500'>DETAIL DAFTAR PEMERIKSAAN</p>
                <div>
                  <table className='table table-lg w-full'>
                    <thead>
                      <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                        <th className='text-start'>NO</th>
                        <th className='text-start'>ID TEMP</th>
                        <th className='text-start'>PEMERIKSAAN</th>
                        <th className='text-start'>SATUAN</th>
                        <th className='text-start'>NILAI RUJUKAN</th>
                        <th className='text-start'>AKSI</th>
                      </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                      {labSelectedDetailData.map((data, index) => (
                        <tr
                          key={index}
                          className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg cursor-default'
                        >
                          <td className='text-start'>{index + 1}</td>
                          <td className='text-start'>{data.idTemplate}</td>
                          <td className='text-start'>{data.pemeriksaan}</td>
                          <td className='text-start'>{data.satuan}</td>
                          <td className='text-start'>
                            LD: {data.nilai_rujukan_ld}, LA: {data.nilai_rujukan_la}, PA:{' '}
                            {data.nilai_rujukan_pa}
                          </td>
                          <td>
                            <button
                              className='underline'
                              onClick={() => handleRemoveTemplate(data.idTemplate)}
                            >
                              <p className='text-start'>
                                <TrashIcon width={20} height={20} className='mr-3' />
                              </p>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(labSelectedDetailData).length >= 1 && (
            <button
              onClick={handleSaveSelectTemplate}
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            >
              <p className='flex justify-center items-center'>Simpan</p>
            </button>
          )}
        </div>
      </Popup>
      <ToastContainer />
    </div>
  )
})

// Set displayName for the component
ModalLaborInput.displayName = 'ModalLabor'

export default ModalLaborInput
