/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../../../services/api/config.api'
import { errorCopyResep, spesificError, spesificSuccess } from '../../../../utils/ToastInfo'
import { useParams } from 'react-router-dom'
import { ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'
import ModalLaborHistory from '../../Ralan/ModalRalan/Laboratorium/Modal/ModalLaborHistory'
import { PopupActions } from 'reactjs-popup/dist/types'
import ModalRadiologiHistory from '../../Ralan/ModalRalan/Radiologi/Modal/ModalRadiologiHistory'
import PdfComponent from '../../Pdf/PrintSoapPDF'
import LoadingBar from 'react-top-loading-bar'
import RiwayatModalResume from '../../Ralan/ModalRalan/Resume/RiwayatResume'
import jsPDF from 'jspdf'
import img from '../../../../assets/img/LOGORSREVISI4.png'

type userData = {
  existsInLabTable: any
  no_rkm_medis: string
  nm_pasien: string
  no_ktp: string
  pnd: string
  jk: string
  tmp_lahir: string
  tgl_lahir: string
  nm_ibu: string
  alamat: string
  gol_darah: string
  stts_nikah: string
  agama: string
  tgl_daftar: string
  umur: string
  tgl_perawatan: string
  jam_rawat: string
  suhu_tubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  gcs: string
  spo2: string
  kesadaran: string
  keluhan: string
  pemeriksaan: string
  alergi: string
  lingkar_perut: string
  rtl: string
  penilaian: string
  instruksi: string
  evaluasi: string
  nip: string
  nama: string
  jbtn: string
  no_rawat: any
  kd_penyakit: string
  status: string
  prioritas: number
  status_penyakit: string
  nm_penyakit: string
  tgl_registrasi: string
  kd_dokter: string
  kd_poli: string
  nm_poli: string
  nm_dokter: string
  status_lanjut: string
}

type ApiData = userData[]

interface RiwayatSoapRalanProps {
  onRiwayatObatChange: (riwayatObatData: any) => void
  personalData: any
  checkSubTab: any
  errResepMessage: (message: any) => void
  trueFalseResep: (boolean) => void
}
const RiwayatSoapRalan: React.FC<RiwayatSoapRalanProps> = ({
  onRiwayatObatChange,
  errResepMessage,
  trueFalseResep,
  personalData,
  checkSubTab,
}) => {
  const dataPersonal = personalData || {} // Hampir sama seperti null
  const modalLaborRef = useRef<PopupActions>(null)
  const ModalRadiologiRef = useRef<PopupActions>(null)
  const modalRiwayatResumeRef = useRef<PopupActions>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [riwayatSoap, setRiwayatSoap] = useState<ApiData>([])
  const [laborNmrRawat, setLaborNmrRawat] = useState('')
  const [radiologiNmrRawat, setRadiologiNmrRawat] = useState('')
  const [dokterNames, setDokterNames] = useState({})
  const [noRawatExistLab, setNoRawatExistLab] = useState(null)
  const [noRawatExistRadiologi, setNoRawatExistRadiologi] = useState(null)
  const [progress, setProgress] = useState(0)
  const [noData, setNoData] = useState(false)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const { id } = useParams()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]

  useEffect(() => {
    const fetchRiwayatSoap = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data

        let filteredData = data

        if (startDate && endDate) {
          filteredData = data.filter((item) => {
            const itemDate = new Date(item.tgl_perawatan) // Sesuaikan dengan format data API
            const start = new Date(startDate)
            const end = new Date(endDate)
            return itemDate >= start && itemDate <= end
          })
        }

        console.log('sub tab', checkSubTab)

        const noRawatList = filteredData.map((item) => item.no_rawat)

        if (filteredData.length === 0) {
          setNoData(true)
        } else {
          setNoData(false)
        }

        const checkNoRawatLab = async (noRawat: any) => {
          try {
            const checkResponse = await api.get(`/api/v1/checkPermintaanLab?noRawat=${noRawat}`)
            const checkData = checkResponse.data
            return checkData === 'no_rawat exists in permintaan_lab table'
          } catch (error) {
            return false
          }
        }

        const results = await Promise.all(noRawatList.map(checkNoRawatLab))
        setNoRawatExistLab(results)

        // Radiologi Check no Rawat
        const checkNoRawatRadiologi = async (noRawat: any) => {
          try {
            const checkResponse = await api.get(`/api/v1/check-no-rawat?noRawat=${noRawat}`)
            const checkData = checkResponse.data
            return checkData.exists
          } catch (error) {
            console.error('Error checking no_rawat:', error)
            return false
          }
        }

        const resultRadiologi = await Promise.all(noRawatList.map(checkNoRawatRadiologi))
        setNoRawatExistRadiologi(resultRadiologi)

        const newData = await Promise.all(
          filteredData.map(async (riwayat) => {
            const nmPoliResponse = await api.get(`/api/v1/poli?kode=${riwayat.kd_poli}`)
            const nmPoliData = nmPoliResponse.data[0].nm_poli

            return { ...riwayat, nm_poli: nmPoliData }
          }),
        )

        setRiwayatSoap(newData)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRiwayatSoap()
  }, [startDate, endDate])

  // useEffect(() => {
  //   const fetchRiwayatSoap = async () => {
  //     setIsLoading(true)
  //     try {
  //       const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
  //       const data: ApiData = await response.data

  //       const noRawatList = data.map((item) => item.no_rawat)

  //       const dataSoap = response.data

  //       console.log('sub Tab', checkSubTab)

  //       if (dataSoap.length === 0) {
  //         setNoData(true)
  //       } else {
  //         setNoData(false)
  //       }

  //       const checkNoRawatLab = async (noRawat: any) => {
  //         try {
  //           const checkResponse = await api.get(`/api/v1/checkPermintaanLab?noRawat=${noRawat}`)
  //           const checkData = checkResponse.data
  //           return checkData === 'no_rawat exists in permintaan_lab table'
  //         } catch (error) {
  //           return false
  //         }
  //       }

  //       const results = await Promise.all(noRawatList.map(checkNoRawatLab))

  //       setNoRawatExistLab(results)

  //       // Radiologi Check no Rawat
  //       const checkNoRawatRadiologi = async (noRawat: any) => {
  //         try {
  //           const checkResponse = await api.get(`/api/v1/check-no-rawat?noRawat=${noRawat}`)
  //           const checkData = checkResponse.data
  //           return checkData.exists
  //         } catch (error) {
  //           console.error('Error checking no_rawat:', error)
  //           return false
  //         }
  //       }

  //       const resultRadiologi = await Promise.all(noRawatList.map(checkNoRawatRadiologi))

  //       setNoRawatExistRadiologi(resultRadiologi)

  //       const newData = await Promise.all(
  //         dataSoap.map(async (riwayat) => {
  //           const nmPoliResponse = await api.get(`/api/v1/poli?kode=${riwayat.kd_poli}`)
  //           const nmPoliData = nmPoliResponse.data[0].nm_poli

  //           // eslint-disable-next-line camelcase
  //           return { ...riwayat, nm_poli: nmPoliData }
  //         }),
  //       )
  //       setRiwayatSoap(newData)
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  //   fetchRiwayatSoap()
  // }, [])

  // Get Nama Dokter ?
  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedDokterNames = {}
        for (const riwayat of riwayatSoap) {
          const response = await api.get(
            `api/v1/getDataPasienRalanByNoRawat?noRawat=${riwayat.no_rawat}`,
          )
          const data = response.data
          updatedDokterNames[riwayat.no_rawat] = data.nm_dokter.toUpperCase()
        }
        setDokterNames(updatedDokterNames)
      } catch (error) {
        console.error('Error Mengambil data berdasarkan nomor Rawat, riwayat Soap:', error)
      }
    }

    fetchData()
  }, [riwayatSoap])

  const copyResep = async (noRawat: any) => {
    try {
      const response = await api.get(
        `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${noRawat}`,
      )
      setProgress(20)
      // ambil data obat
      try {
        const res = await api.get(`/api/v1/getResepDokterDetails?noResep=${response.data[0]}`)
        setProgress(50)
        if (res.data.length === 0) {
          spesificError({ errMessage: 'Data Obat Tidak Ditemukan.' })
          setProgress(100)
        } else {
          const checkBarangPromises = res.data.map(async (item, index) => {
            const searchRes = await api.get(
              `/api/v1/searchDatabarang?searchString=${item.kode_brng}`,
            )
            setProgress(50 + ((index + 1) / res.data.length) * 50)
            if (searchRes.data.length === 0) {
              // eslint-disable-next-line camelcase
              return { notFound: true, kode_brng: item.kode_brng, nama_brng: item.nama_brng }
            }
            return { notFound: false, item }
          })

          const checkResults = await Promise.all(checkBarangPromises)
          const validItems = checkResults
            .filter((result) => !result.notFound)
            .map((result) => result.item)
          const notFoundItems = checkResults.filter((result) => result.notFound)

          if (validItems.length > 0) {
            onRiwayatObatChange(validItems)
            if (notFoundItems.length > 0) {
              const notFoundMessages = notFoundItems
                .map((item) => `Obat (${item.nama_brng}, kode ${item.kode_brng})`)
                .join(', ')
              spesificSuccess({
                doneMessage: `Resep Berhasil Di Copy. \n ${notFoundMessages}`,
              })
              errResepMessage(`${notFoundMessages}`)
              trueFalseResep(true)
              setProgress(100)
            } else {
              spesificSuccess({ doneMessage: 'Resep Berhasil Di Copy' })
              trueFalseResep(false)
            }
          } else {
            spesificError({ errMessage: 'Tidak ada obat yang valid ditemukan.' })
            trueFalseResep(false)
          }
        }
      } catch (err) {
        errorCopyResep()
        console.log('Data obat gagal diambil', err)
        setProgress(100)
        trueFalseResep(false)
      }
    } catch (err) {
      errorCopyResep()
      console.log('Gagal ambil resep', err)
      setProgress(100)
      trueFalseResep(false)
    }
  }

  const modalLaborOpen = (noRawat: any) => {
    if (modalLaborRef.current) {
      modalLaborRef.current.open()
      setLaborNmrRawat(noRawat)
    }
    console.log('Open')
  }

  const modalLaborClose = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.close()
    }
    console.log('Close')
  }

  const modalRadiologiOpen = (noRawat: any) => {
    if (ModalRadiologiRef.current) {
      ModalRadiologiRef.current.open()
      setRadiologiNmrRawat(noRawat)
    }
    console.log('Open')
  }

  const modalRadiologiClose = () => {
    if (ModalRadiologiRef.current) {
      ModalRadiologiRef.current.close()
    }
    console.log('Close')
  }

  const modalRiwayatResumeOpen = (noRawat: any) => {
    if (modalRiwayatResumeRef.current) {
      modalRiwayatResumeRef.current.open()
      setRadiologiNmrRawat(noRawat)
    }
    console.log('open')
  }

  const modalRiwayatResumeClose = () => {
    if (modalRiwayatResumeRef.current) {
      modalRiwayatResumeRef.current.close()
    }
    console.log('close')
  }

  const generatePDF = (riwayat) => {
    if (!riwayat) return

    const doc = new jsPDF()
    doc.setFontSize(10)
    const lineSpacing = 8
    let yPos = 10
    const pageHeight = doc.internal.pageSize.height - 20

    // Fungsi untuk menambahkan header
    const addTitleHead = (doc, img) => {
      const pageWidth = doc.internal.pageSize.getWidth()
      const namePlace = 'RSUD SAM RATULANGI TONDANO'
      const address = 'JL. SUPRAPTO LUAAN TONDANO TIMUR, Telp: Hp: 0431321171 E-mail: -'
      const location = 'TONDANO, SULAWESI UTARA'

      const textWidth = doc.getTextWidth(namePlace)
      const locationWidth = doc.getTextWidth(location)

      const xOffset = (pageWidth - textWidth) / 1.9
      const addressOffset = (pageWidth - textWidth) / 2.5
      const locationOffset = (pageWidth - locationWidth) / 1.7

      const logoWidth = 30
      const logoHeight = 25
      const logoX = 8
      const logoY = 5.5
      const textY = logoY + logoHeight / 4
      const addressY = textY + 6
      const locationY = addressY + 6

      doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight)
      doc.text(namePlace, xOffset, textY)
      doc.setFontSize(10)
      doc.text(address, addressOffset, addressY)
      doc.text(location, locationOffset, locationY)

      const lineY = locationY + 10
      doc.setLineWidth(1)
      doc.line(10, lineY, pageWidth - 10, lineY)

      return lineY
    }

    // Tambahkan header dan update posisi yPos
    yPos = addTitleHead(doc, img) + lineSpacing

    const addSection = (title, content) => {
      if (yPos + 10 >= pageHeight) {
        doc.addPage()
        yPos = addTitleHead(doc, img) + lineSpacing
      }

      doc.setFont('helvetica', 'bold')
      doc.text(title, 10, yPos)
      doc.setFont('helvetica', 'normal')
      const splitText = doc.splitTextToSize(content || '-', 180)
      if (yPos + splitText.length * 5 + lineSpacing >= pageHeight) {
        doc.addPage()
        yPos = addTitleHead(doc, img) + lineSpacing
      }
      doc.text(splitText, 20, yPos + 5)
      yPos += splitText.length * 5 + lineSpacing
    }

    const addLine = () => {
      if (yPos + 4 >= pageHeight) {
        doc.addPage()
        yPos = addTitleHead(doc, img) + lineSpacing
      }
      doc.line(10, yPos, 200, yPos)
      yPos += 4
    }

    // Header Dokumen
    doc.setFont('helvetica', 'bold')
    doc.text(`RIWAYAT SOAP (Rawat Jalan) - ${riwayat.no_rawat}`, 10, yPos)
    yPos += lineSpacing
    doc.setFont('helvetica', 'normal')
    doc.text(`Tanggal Pemeriksaan : ${riwayat.tgl_perawatan} ${riwayat.jam_rawat}`, 10, yPos)
    yPos += lineSpacing
    addLine()

    // Informasi Poli dan Dokter
    addSection('POLI', `${riwayat.nm_poli} - ${riwayat.kd_poli}`)
    addSection('DOKTER', dokterNames[riwayat.no_rawat])
    addLine()

    // Subjektif
    addSection('SUBJEK', riwayat.keluhan)

    // Objektif
    const pemeriksaanText = riwayat.pemeriksaan
      ? riwayat.pemeriksaan.replace('* Data Ekspertisi *', '--Data Ekspertisi--')
      : '-'
    addSection('OBJECT', pemeriksaanText)
    addLine()

    // Vital Sign
    doc.setFont('helvetica', 'bold')
    doc.text('VITALITY SIGN', 10, yPos)
    yPos += 5
    doc.setFont('helvetica', 'normal')
    const vitalSigns = [
      `SUHU(C) : ${riwayat.suhu_tubuh || '-'}`,
      `TENSI(mmHg) : ${riwayat.tensi || '-'}`,
      `GCS(E,V,M) : ${riwayat.gcs || '-'}`,
      `SpO2 : ${riwayat.spo2 || '-'}`,
      `KESADARAN : ${riwayat.kesadaran || '-'}`,
      `NADI(/menit) : ${riwayat.nadi || '-'}`,
      `TINGGI(cm) : ${riwayat.tinggi || '-'}`,
      `RR(/menit) : ${riwayat.respirasi || '-'}`,
      `BERAT(kg) : ${riwayat.berat || '-'}`,
      `ALERGI : ${riwayat.alergi || '-'}`,
    ].join('\n')

    const splitVitalSigns = doc.splitTextToSize(vitalSigns, 180)
    if (yPos + splitVitalSigns.length * 5 >= pageHeight) {
      doc.addPage()
      yPos = addTitleHead(doc, img) + lineSpacing
    }
    doc.text(splitVitalSigns, 20, yPos)
    yPos += (splitVitalSigns.length + 1) * 5 + lineSpacing
    addLine()

    // Asesmen, Plan, Instruksi, Evaluasi
    addSection('ASESMEN', riwayat.penilaian)
    addSection('PLAN', riwayat.rtl)
    addSection('INSTRUKSI', riwayat.instruksi)
    addSection('EVALUASI', riwayat.evaluasi)

    // Simpan PDF
    doc.save(`riwayat_${riwayat.no_rawat}.pdf`)
  }

  return (
    <div className='h-[2360px] overflow-y-auto mt-4 rounded-xl border border-slate-100'>
      <LoadingBar
        color='#55a46b'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={7}
      ></LoadingBar>
      {isLoading ? (
        <>
          <div className='flex w-full flex-col gap-4 p-3'>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-32 w-full'></div>
            <div className='skeleton h-32 w-full'></div>
          </div>
        </>
      ) : (
        <>
          {noData ? (
            <>
              <div>
                <label className='label'>Filter tanggal : </label>
                <div className='flex gap-3 items-center'>
                  <input
                    type='date'
                    className='input input-sm border-primary text-sm'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span>&gt;</span>
                  <input
                    type='date'
                    className='input input-sm border-primary text-sm'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <p className='text-center mt-5'>No Data Avalaible.</p>
            </>
          ) : (
            <div className=''>
              <div className=''>
                <div>
                  <label className='label'>Filter tanggal : </label>
                  <div className='flex gap-3 items-center'>
                    <input
                      type='date'
                      className='input input-sm border-primary text-sm'
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>&gt;</span>
                    <input
                      type='date'
                      className='input input-sm border-primary text-sm'
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {riwayatSoap.map((riwayat, index) => (
                <div
                  key={index}
                  className='min-w-fit bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300'
                >
                  <div className='flex justify-between'>
                    <div>
                      <p className=' font-bold text-xl text-[#121713] mb-2'>
                        RIWAYAT SOAP (Rawat Jalan) {riwayat.no_rawat}
                      </p>
                    </div>
                    <div className='flex w-auto p-3 pr-[6px] items-center rounded-xl bg-primary text-white text-base font-bold'>
                      <div className='flex items-center'>
                        <ClockIcon width={20} height={20} />
                        <p className='ml-[2px]'>{riwayat.jam_rawat}</p>
                      </div>
                      <div className='flex ml-[12px] items-center'>
                        <CalendarDaysIcon width={20} height={20} />
                        <p className='ml-[2px]'>{riwayat.tgl_perawatan}</p>
                      </div>
                    </div>
                  </div>
                  <div className='p-2 border border-green-500 bg-white w-fit rounded-xl'>
                    <p className='text text-xs font-semibold'>
                      {riwayat.nm_poli} - {riwayat.kd_poli}
                    </p>
                    <p className=' font-bold text-sm text-[#121713] mt-2 '>
                      DOKTER : {dokterNames[riwayat.no_rawat]}
                    </p>
                    {/* <p className=' font-bold text-sm text-[#121713] mt-2 '>PERAWAT : {riwayat.nama}</p> */}
                  </div>
                  <div className='mt-5'>
                    <div className='mt-5 mb-3 p-2'>
                      <label className='font-semibold text-slate-700 text-sm'>SUBJEK</label>
                      <p className='whitespace-pre'>{riwayat.keluhan || '-'}</p>
                    </div>
                    <div className='mt-5 mb-3'>
                      <label className='font-semibold text-slate-700 text-sm'>OBJECT</label>
                      <p
                        className='whitespace-pre'
                        dangerouslySetInnerHTML={{
                          __html: riwayat.pemeriksaan
                            ? riwayat.pemeriksaan.replace(
                                '* Data Ekspertisi *',
                                '<div class="rounded-lg border-blue-300 border p-2 w-fit mt-2 -mb-3"><strong>--Data Ekspertisi--</strong></div>',
                              )
                            : '-',
                        }}
                      />
                    </div>

                    <div className='border border-slate-400 p-2 rounded-lg'>
                      <label className=' font-semibold text-slate-700 text-md'>VITALITY SIGN</label>
                      <div className='flex w-full justify-between mt-3'>
                        <div>
                          <div>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              SUHU(C))
                            </label>
                            <p className=''>{riwayat.suhu_tubuh || '-'}</p>
                          </div>
                          <div className=' my-2'>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              GCS(E,V,M)
                            </label>
                            <p>{riwayat.gcs || '-'}</p>
                          </div>
                          <div className=''>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              KESADARAN
                            </label>
                            <p>{riwayat.kesadaran || '-'}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              TENSI(mmHg)
                            </label>
                            <p className=''>{riwayat.tensi || '-'}</p>
                          </div>
                          <div className=' my-2'>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              SlabelO2
                            </label>
                            <p className=' whitespace-nowrap'>{riwayat.spo2 || '-'}</p>
                          </div>
                        </div>
                        <div>
                          <div>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              NADI(/menit)
                            </label>
                            <p className=''>{riwayat.nadi || '-'}</p>
                          </div>
                          <div className=' my-2'>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              TINGGI(cm)
                            </label>
                            <p>{riwayat.tinggi || '-'}</p>
                          </div>
                        </div>
                        <div className=' mr-24'>
                          <div>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              RR(/menit)
                            </label>
                            <p className=''>{riwayat.respirasi || '-'}</p>
                          </div>
                          <div className=' my-2'>
                            <label className=' font-semibold text-slate-700 text-sm'>
                              BERAT(kg)
                            </label>
                            <p>{riwayat.berat || '-'}</p>
                          </div>
                          <div className=' my-2'>
                            <label className=' font-semibold text-slate-700 text-sm'>ALERGI</label>
                            <p>{riwayat.alergi || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 p-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>ASESMEN</label>
                      <p className='whitespace-pre'>{riwayat.penilaian || '-'}</p>
                    </div>
                    <div className='mt-2'>
                      <div className='mt-2 p-2'>
                        <div className='flex justify-between items-center '>
                          <label className='font-semibold text-slate-700 text-sm'>PLAN</label>
                          {role.includes('dokter') ? (
                            <button
                              className='btn btn-ghost hover:bg-slate-100'
                              onClick={() => copyResep(riwayat.no_rawat)}
                            >
                              <span className='font-bold'>COPY RESEP</span>
                            </button>
                          ) : null}
                        </div>
                        <p className='whitespace-pre'>{riwayat.rtl || '-'}</p>
                      </div>
                    </div>
                    <div className='mt-2 p-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>INSTRUKSI</label>
                      <p className='whitespace-pre'>{riwayat.instruksi || '-'}</p>
                    </div>
                    <div className='mt-2 p-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>EVALUASI</label>
                      <p className='whitespace-pre'>{riwayat.evaluasi || '-'}</p>
                    </div>
                  </div>
                  <div key={index} className='flex justify-between'>
                    <div className='flex justify-start'>
                      {noRawatExistLab[index] ? (
                        <div className='flex justify-start gap-2'>
                          <button
                            className='text text-gray-100 btn bg-primary btn-md'
                            onClick={() => modalLaborOpen(riwayat.no_rawat)}
                          >
                            Riwayat Laboratorium
                          </button>
                        </div>
                      ) : null}
                      {noRawatExistRadiologi[index] ? (
                        <div>
                          <button
                            className='text text-gray-100 btn bg-primary btn-md'
                            onClick={() => modalRadiologiOpen(riwayat.no_rawat)}
                          >
                            Riwayat Radiologi
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <button
                        className='text text-gray-100 btn bg-primary btn-md'
                        onClick={() => generatePDF(riwayat)}
                      >
                        Print
                      </button>
                      <button
                        className='text text-gray-100 btn bg-primary btn-md'
                        onClick={() =>
                          PdfComponent(
                            riwayat.no_rawat,
                            id,
                            riwayat.kd_poli,
                            riwayat.nm_poli,
                            dokterNames[riwayat.no_rawat],
                            riwayat.nm_pasien,
                            setProgress,
                          )
                        }
                      >
                        Print PDF
                      </button>
                      <button
                        className='text text-gray-100 btn bg-primary btn-md'
                        onClick={() => modalRiwayatResumeOpen(riwayat.no_rawat)}
                      >
                        Riwayat Resume
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ModalLaborHistory
            ref={modalLaborRef}
            onClose={modalLaborClose}
            noRawat={laborNmrRawat}
            dataPersonal={dataPersonal}
          />
          <ModalRadiologiHistory
            ref={ModalRadiologiRef}
            noRawat={radiologiNmrRawat}
            onClose={modalRadiologiClose}
          />
          <RiwayatModalResume
            ref={modalRiwayatResumeRef}
            noRawat={radiologiNmrRawat}
            onClose={modalRiwayatResumeClose}
          />
        </>
      )}
      <ToastContainer />
    </div>
  )
}

export default RiwayatSoapRalan
