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
  const [searchQueryPemeriksaan, setSearchQueryPemeriksaan] = useState('')
  const [selectSaveTemplate, setSelectSaveTemplate] = useState(false)
  const [indikasi, setIndikasi] = useState('')
  const [info, setInfo] = useState('')
  const [errInfo, setErrInfo] = useState('')
  const [filteredDataPemeriksaan, setFilteredDataPemeriksaan] = useState([])
  const [dataLaborDetailPemeriksaan, setDataLaborDetailPemeriksaan] = useState([])
  const [kodePemeriksaan, setKodePemeriksaan] = useState('')
  const [currentPagePemeriksaan, setCurrentPagePemeriksaan] = useState(1)
  const [currentPageFilterPemeriksaan, setCurrentPageFilterPemeriksaan] = useState(0)
  const [labSelectedDetailData, setLabSelectedDetailData] = useState([])
  const [sending, setSending] = useState(false)
  const pageSize = 6
  const SecondModalInputRef = useRef<PopupActions>(null)

  const nmrRawat = localStorage.getItem('no_rawat')
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  useEffect(() => {
    const fetchDataPemeriksaan = async () => {
      try {
        const response = await apiLabor.get(
          `/api/v1/getallPeriksaLab?pageNumber=${currentPagePemeriksaan}&pageSize=${pageSize}`,
        )
        setDataLaborPemeriksaan(response.data)
        console.log('data')
      } catch (err) {
        console.log('labor data err', err)
      }
    }
    fetchDataPemeriksaan()
  }, [currentPagePemeriksaan, pageSize])

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

  useEffect(() => {
    const handleSearchPemeriksaan = async () => {
      try {
        const response = await apiLabor.get(
          `/api/v1/searchJnsPerawatanLab?kdJenisPrw&nmPerawatan=${searchQueryPemeriksaan}&page=${currentPageFilterPemeriksaan}&size=${pageSize}`,
        )
        setFilteredDataPemeriksaan(response.data.content)
        console.log('filter search ok')
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }

    handleSearchPemeriksaan()
  }, [searchQueryPemeriksaan, currentPageFilterPemeriksaan, pageSize])

  const pilihPemeriksaan = (kode: any) => {
    setKodePemeriksaan(kode)
    if (SecondModalInputRef.current) {
      SecondModalInputRef.current.open()
    }
    setLabSelectedDetailData([])
  }

  const handleCloseFirstModal = () => {
    onClose()
    setLabSelectedDetailData([])
    setErrInfo('')
    setInfo('')
    setIndikasi('')
    setSelectSaveTemplate(false)
  }
  const handleCloseSecondModal = () => {
    if (SecondModalInputRef.current) {
      SecondModalInputRef.current.close()
    }
  }

  const handlePrevPagePemeriksaan = () => {
    setCurrentPagePemeriksaan(currentPagePemeriksaan - 1)
  }

  const handleNextPagePemeriksaan = () => {
    setCurrentPagePemeriksaan(currentPagePemeriksaan + 1)
  }

  const handlePrevFilterPagePemeriksaan = () => {
    setCurrentPageFilterPemeriksaan(currentPagePemeriksaan - 1)
  }

  const handleNextFilterPagePemeriksaan = () => {
    setCurrentPageFilterPemeriksaan(currentPagePemeriksaan + 0)
  }

  const handleSelectTemplate = (
    idTemplate: any,
    pemeriksaan: any,
    satuan: any,
    nilai_rujukan_ld: any,
    nilai_rujukan_la: any,
    nilai_rujukan_pa: any,
  ) => {
    // Add selected template to labSelectedDetailData
    setLabSelectedDetailData([
      ...labSelectedDetailData,
      { idTemplate, pemeriksaan, satuan, nilai_rujukan_ld, nilai_rujukan_la, nilai_rujukan_pa },
    ])

    // Filter out the selected template from dataLaborDetailPemeriksaan
    const updatedDataLaborDetailPemeriksaan = dataLaborDetailPemeriksaan.filter(
      (data) => data.id_template !== idTemplate,
    )
    setDataLaborDetailPemeriksaan(updatedDataLaborDetailPemeriksaan)

    spesificSuccess({ doneMessage: `Pemeriksaan ${pemeriksaan} Berhasil Ditambahkan` })
  }

  const handleRemoveTemplate = (idTemplate: any) => {
    const removedItemIndex = labSelectedDetailData.findIndex(
      (item) => item.idTemplate === idTemplate,
    )
    if (removedItemIndex !== -1) {
      const removedItem = labSelectedDetailData[removedItemIndex]

      // Remove the item from labSelectedDetailData
      const updatedLabSelectedDetailData = [...labSelectedDetailData]
      updatedLabSelectedDetailData.splice(removedItemIndex, 1)
      setLabSelectedDetailData(updatedLabSelectedDetailData)

      // Add the removed item back to dataLaborDetailPemeriksaan
      const restoredItem = {
        id_template: removedItem.idTemplate, // Ensure the property name is consistent
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

  const handleSaveSelectTemplate = () => {
    setSelectSaveTemplate(true)
    handleCloseSecondModal()
  }

  const postLabor = async () => {
    const dataPermintaanLab = {
      noRawat: nmrRawat,
      dokterPerujuk: nipCredentials,
      status: 'ralan',
      informasiTambahan: info,
      diagnosaKlinis: indikasi,
    }
    if (!indikasi) {
      setErrInfo('MOHON MENGINPUT INDIKASI/KLINIS')
    } else if (!info) {
      setErrInfo('MOHON MENGINPUT INFORMASI TAMBAHAN')
    } else if (Object.keys(dataLaborDetailPemeriksaan).length === 0) {
      setErrInfo('MOHON MEMILIH SETIDAKNYA 1 PEMERIKSAAN')
    } else {
      const isDataCorrect = window.confirm(
        'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
      )
      if (isDataCorrect) {
        try {
          const response1 = await apiLabor.post('/api/v1/permintaanLab', dataPermintaanLab)
          setSending(true)
          setErrInfo('')
          try {
            const response2 = await apiLabor.post('/api/v1/permintaanPemeriksaanLab', {
              noOrder: response1.data.noorder,
              kdJenisPrw: kodePemeriksaan,
              sttsBayar: 'Belum',
            })
            console.log('repsonse2', response2)
          } catch (err) {
            spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, postPemeriksaanLab' })
          }

          // postDetailPemeriksaanLab
          for (const item of labSelectedDetailData) {
            try {
              const response3 = await apiLabor.post('/api/v1/permintaanDetailPermintaanLab', {
                noOrder: response1.data.noorder,
                kdJenisPrw: kodePemeriksaan,
                idTemplate: item.idTemplate,
                sttsBayar: 'Sudah',
              })
              console.log('repsonse3', response3)
            } catch (err) {
              spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga. postPermintaanLab' })
            }
          }
        } catch (err) {
          spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, Mohon Coba Lagi' })
          setSending(false)
          setErrInfo('Terjadi Kesalahan tidak terduga, Mohon Coba Lagi')
        } finally {
          setSending(false)
        }
      }
    }
  }

  console.log(labSelectedDetailData)

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
          <div className='mt-8 grid overflow-auto'>
            <div>
              <p className=' font-bold text-xl text-[#121713'>PEMERIKSAAN</p>
              <div className='flex relative mt-1 gap-5'>
                <input
                  type='text'
                  className='w-full px-3 py-2 border rounded-2xl outline-slate-500 '
                  placeholder='Hematologi Rutin'
                  value={searchQueryPemeriksaan}
                  onChange={(e) => setSearchQueryPemeriksaan(e.target.value)}
                />
                {searchQueryPemeriksaan && (
                  <>
                    <button
                      className='absolute top-1/2 transform -translate-y-1/2 right-64 btn-ghost hover:bg-white'
                      onClick={() => setSearchQueryPemeriksaan('')}
                    >
                      <XMarkIcon width={25} height={25} />
                    </button>
                  </>
                )}
              </div>
            </div>
            {searchQueryPemeriksaan ? (
              <div className='mt-8 grid overflow-auto'>
                <>
                  <div className='mt-2 pt-4 h-full overflow-auto'>
                    <table className='table table-lg w-full'>
                      <thead>
                        <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                          <th className='text-start'>NO</th>
                          <th className='text-start'>KODE PERIKSA</th>
                          <th className='text-start'>NAMA PEMERIKSAAN</th>
                          <th className='text-start'>AKSI</th>
                        </tr>
                      </thead>
                      <tbody className='overflow-auto'>
                        {filteredDataPemeriksaan.map((data, index) => (
                          <tr
                            key={index}
                            className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px]'
                          >
                            <td className='text-start'>{index + 1}</td>
                            <td className='text-start'>{data.kd_jenis_prw}</td>
                            <td className='text-start'>{data.nm_perawatan}</td>
                            <td>
                              <button
                                className='underline'
                                onClick={() => pilihPemeriksaan(data.kd_jenis_prw)}
                              >
                                <p className='text-start'>Pilih</p>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='flex justify-between p-2'>
                      <button
                        className='btn bg-primary text-white'
                        onClick={handlePrevFilterPagePemeriksaan}
                        disabled={currentPageFilterPemeriksaan === 0}
                      >
                        Prev
                      </button>
                      <p className='flex items-center'>
                        Halaman{' '}
                        <span className='ml-2 font-bold'>{currentPageFilterPemeriksaan}</span>
                      </p>
                      <button
                        className='btn bg-primary text-white'
                        onClick={handleNextFilterPagePemeriksaan}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              </div>
            ) : (
              <div className='mt-2 pt-4 h-full overflow-auto'>
                <table className='table table-lg w-full'>
                  <thead>
                    <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                      <th className='text-start'>NO</th>
                      <th className='text-start'>KODE PERIKSA</th>
                      <th className='text-start'>NAMA PEMERIKSAAN</th>
                      <th className='text-start'>AKSI</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-auto'>
                    {dataLaborPemeriksaan.map((data, index) => (
                      <tr
                        key={index}
                        className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px]'
                      >
                        <td className='text-start'>{index + 1}</td>
                        <td className='text-start'>{data.kd_jenis_prw}</td>
                        <td className='text-start'>{data.nm_perawatan}</td>
                        <td>
                          <button
                            className='underline'
                            onClick={() => pilihPemeriksaan(data.kd_jenis_prw)}
                          >
                            <p className='text-start'>Pilih</p>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='flex justify-between p-2'>
                  <button
                    className='btn bg-primary text-white'
                    onClick={handlePrevPagePemeriksaan}
                    disabled={currentPagePemeriksaan === 1}
                  >
                    Prev
                  </button>
                  <p className='flex items-center'>
                    Halaman <span className='ml-2 font-bold'>{currentPagePemeriksaan}</span>
                  </p>
                  <button className='btn bg-primary text-white' onClick={handleNextPagePemeriksaan}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            {selectSaveTemplate ? (
              <div>
                <label className='label font-bold'>DETAIL DAFTAR PEMERIKSAAN :</label>
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
                        className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px] hover:bg-slate-300 rounded-lg'
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
            ) : null}
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
        closeOnDocumentClick={true}
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
            <p>{nmrRawat}</p>
            <div className='grid gap-4'>
              <div className='mt-2 pt-4 h-96 overflow-auto shadow p-2'>
                <table className='table table-lg w-full'>
                  <thead>
                    <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
                      <th className='text-start'>NO</th>
                      <th className='text-start'>ID TEMP</th>
                      <th className='text-start'>PEMERIKSAAN</th>
                      <th className='text-start'>SATUAN</th>
                      <th className='text-start'>NILAI RUJUKAN</th>
                    </tr>
                  </thead>
                  <tbody className='overflow-auto'>
                    {dataLaborDetailPemeriksaan.map((data, index) => (
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
                {labSelectedDetailData && (
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
                )}
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
