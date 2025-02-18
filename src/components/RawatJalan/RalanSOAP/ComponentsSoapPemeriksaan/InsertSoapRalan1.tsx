/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { api } from '../../../../services/api/config.api'
import { spesificError } from '../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { formatSelectedDate, formatSelectedDateNow } from '../../../../utils/DateNow'
import ModalLaborInput from '../../../Layouts/Ralan/ModalRalan/Laboratorium/Modal/ModalLaborInput'
import { PopupActions } from 'reactjs-popup/dist/types'
import ModalRadiologiInput from '../../../Layouts/Ralan/ModalRalan/Radiologi/Modal/ModalRadiologiInput'

enum KesadaranOptions {
  defaultValue = 'Pilih Kesadaran',
  ComposMentis = 'Compos Mentis',
  Somnolence = 'Somnolence',
  Sopor = 'Sopor',
  Coma = 'Coma',
  Alert = 'Alert',
  Confusion = 'Confusion',
  Voice = 'Voice',
  Pain = 'Pain',
  Unresponsive = 'Unresponsive',
}

interface FormData {
  noRawat: string
  suhuTubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  spo2: string
  gcs: string
  kesadaran: string
  keluhan: string
  pemeriksaan: string
  alergi: string
  lingkarPerut: string
  rtl: string
  instruksi: string
  evaluasi: string
  nip: string
  penilaian: string
}

type DataItem = {
  jam_rawat: string
  kd_penyakit: string
  nm_penyakit: string
  ciri_ciri: string
  keterangan: string
  kd_ktg: string
  status: string
  // soap data
  noRawat: string
  suhu_tubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  spo2: string
  gcs: string
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
}

interface Medicine {
  nama: string
  aturanPakai: any
  jumlahObat: any
  kode: string
}

// eslint-disable-next-line react/prop-types
const InsertSoapRalan1: React.FC<{
  copyResep: any
  resepMessage: any
  trueFalseResep: boolean
  copyDiagnosa: any
}> = ({ copyResep, resepMessage, trueFalseResep, copyDiagnosa }) => {
  const [formData, setFormData] = useState<FormData>({
    noRawat: '',
    suhuTubuh: '',
    tensi: '',
    nadi: '',
    respirasi: '',
    tinggi: '',
    berat: '',
    spo2: '',
    gcs: '',
    kesadaran: '',
    keluhan: '',
    pemeriksaan: '',
    alergi: '',
    lingkarPerut: '',
    rtl: '',
    penilaian: '',
    instruksi: '',
    evaluasi: '',
    nip: '',
  })

  // BATAS
  const [loading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [obatExist, setObatExist] = useState([])
  const [rtl, setRtl] = useState('')
  const [alasan, setAlasan] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [editObat, setEditObat] = useState(false)
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [nmrResep, setNmrResep] = useState('')
  const [haveNoResep, setHaveNoResep] = useState(false)
  const [listPenyakit, setListPenyakit] = useState<DataItem[]>([])
  const [listProsedur, setListProsedur] = useState([])
  const [listObat, setListObat] = useState([])
  const [listTindakan, setListTindakan] = useState([])
  const [aturanPakai, setAturanPakai] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermProsedur, setSearchTermProsedur] = useState('')
  const [searchTermObat, setSearchTermObat] = useState('')
  const [searchTermTindakan, setSearchTermTindakan] = useState('')
  const [jumlahObat, setJumlahObat] = useState<number>(0)
  const [selectedMedicines, setSelectedMedicines] = useState<{ [kode: string]: Medicine }>({})
  const [editedRowIndex, setEditedRowIndex] = useState(null)
  const [choosenDiagnosa, setChoosenDiagnosa] = useState([])
  const [ekspertisi, setEkspertisi] = useState('')
  const modalLaborRef = useRef<PopupActions>(null)
  const modalRadiologiRef = useRef<PopupActions>(null)

  const navigate = useNavigate()
  const nmrRawat = localStorage.getItem('no_rawat')
  const choosenPoli = localStorage.getItem('poli')
  // const noAntrian = localStorage.getItem('no_antrian')
  const dateNow = formatSelectedDateNow()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]
  const { id } = useParams()

  const date = new Date()
  const showTime = date.getHours() + ':' + date.getMinutes()

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  useEffect(() => {
    setTimeAndDate()
    checkExistNoResep()
    checkExistDiagnosa()
  }, [])

  const handleDateChange = (event) => {
    const selectedDateValue = event.target.value
    const formattedDate = formatSelectedDate(selectedDateValue)
    setSelectedDate(formattedDate)
  }

  // copy diagnosa props function
  const updateDiagnosaState = () => {
    if (copyDiagnosa && copyDiagnosa.length > 0) {
      const data = copyDiagnosa[0]
      setFormData((prevData) => ({
        ...prevData,
        rtl: prevData.rtl ? `${data}` : data,
      }))
      setChoosenDiagnosa((prevDiagnosa) => [...prevDiagnosa, data])
    }
  }

  useEffect(() => {
    updateDiagnosaState()
  }, [copyDiagnosa])

  const setTimeAndDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const hours = today.getHours().toString().padStart(2, '0')
    const minutes = today.getMinutes().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    const formattedTime = `${hours}:${minutes}`

    setJam(formattedTime)
    setTanggal(formattedDate)
  }

  const handleChangeStatusSecondSend = async () => {
    try {
      await api.put(`api/v1/updateRegPeriksaStts?noRawat=${nmrRawat}&newStatus=Sudah`)
    } catch (err) {
      console.log('Status Gagal Diubah', err)
    }
  }
  const handleChangeStatusFirstSend = async () => {
    try {
      await api.put(`api/v1/updateRegPeriksaStts?noRawat=${nmrRawat}&newStatus=Berkas Diterima`)
    } catch (err) {
      console.log('Status Gagal Diubah', err)
    }
  }

  const handleHapusObat = (kode: string) => {
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }
      delete newSelectedMedicines[kode]

      const planString = generatePlanString(newSelectedMedicines)
      const editedPlan = `----------------------------------------\nWaktu Penyimpanan Pertama: ${showTime}\n---------------------------------------- \n${planString}`

      setFormData((prevData) => ({
        ...prevData,
        rtl: prevData.rtl ? `${editedPlan}` : editedPlan,
      }))

      return newSelectedMedicines
    })
  }

  const handleEditObat = (index) => {
    setEditObat(true)
    setEditedRowIndex(index)
  }

  const handleLaborData = (laborData) => {
    setFormData((prevData) => ({
      ...prevData,
      evaluasi: prevData.evaluasi ? `${prevData.evaluasi}\n${laborData}` : laborData,
    }))
  }

  const handleRadiologiData = (radiologiData) => {
    setFormData((prevData) => ({
      ...prevData,
      evaluasi: prevData.evaluasi ? `${prevData.evaluasi}\n${radiologiData}` : radiologiData,
    }))
  }

  useEffect(() => {
    const handleGetTindakan = async () => {
      try {
        if (searchTermTindakan.trim().length >= 3) {
          const response = await api.get(`api/v1/searchJnsPerawatan?keyword=${searchTermTindakan}`)
          setListTindakan(response.data)
        } else {
          setListTindakan([])
        }
      } catch (err) {
        console.log(err)
      }
    }

    handleGetTindakan()
  }, [searchTermTindakan])

  useEffect(() => {
    const handleGetPenyakit = async () => {
      try {
        if (searchTerm.trim().length >= 3) {
          const response = await api.get(`/api/v1/getAllPenyakit?searchString=${searchTerm}`)
          setListPenyakit(response.data)
        } else {
          setListPenyakit([])
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleGetPenyakit()
  }, [searchTerm])

  useEffect(() => {
    const handleGetProsedur = async () => {
      try {
        if (searchTermProsedur.trim().length >= 3) {
          const response = await api.get(
            `/api/v1/searchIcd9?deskripsiPanjang=${searchTermProsedur}`,
          )
          setListProsedur(response.data)
        } else {
          setListProsedur([])
        }
      } catch (err) {
        console.log('prosedur err', err)
      }
    }

    handleGetProsedur()
  }, [searchTermProsedur])

  useEffect(() => {
    const handleGetObat = async () => {
      try {
        if (searchTermObat.trim().length >= 2) {
          const response = await api.get(`/api/v1/searchDatabarang?searchString=${searchTermObat}`)
          setListObat(response.data)
          // setIsListObatOpen(true)
        } else {
          setListObat([])
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleGetObat()
  }, [searchTermObat])

  useEffect(() => {
    const fetchDataSoap = async () => {
      setIsLoading(true)
      try {
        const response = await api.get<DataItem[]>(
          `api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${nmrRawat}`,
        )
        const dataSoap = response?.data?.[0]
        setFormData({
          noRawat: nmrRawat || '',
          suhuTubuh: dataSoap?.suhu_tubuh || '',
          tensi: dataSoap?.tensi || '',
          nadi: dataSoap?.nadi || '',
          respirasi: dataSoap?.respirasi || '',
          tinggi: dataSoap?.tinggi || '',
          berat: dataSoap?.berat || '',
          spo2: dataSoap?.spo2 || '',
          gcs: dataSoap?.tensi || '',
          kesadaran: dataSoap.kesadaran || '',
          keluhan: dataSoap?.keluhan || '',
          pemeriksaan: dataSoap?.pemeriksaan || '',
          alergi: dataSoap?.alergi || '',
          lingkarPerut: dataSoap?.lingkar_perut || '',
          rtl: dataSoap?.rtl || '',
          penilaian: dataSoap?.penilaian || '',
          instruksi: dataSoap?.instruksi || '',
          evaluasi: dataSoap?.evaluasi || '',
          nip: dataSoap?.nip || '',
        })
      } catch (err) {
        console.log('Error Taking Data Soap', err)

        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDataSoap()
  }, [id, nmrRawat])

  // copy resep
  useEffect(() => {
    if (copyResep) {
      copyResep.forEach((item) => {
        const mappedData = {
          kode: item.kode_brng,
          nama: item.nama_brng,
          jumlahObat: item.jml,
          aturanPakai: item.aturan_pakai,
        }

        handlePilihObat(
          mappedData.kode,
          mappedData.nama,
          mappedData.jumlahObat,
          mappedData.aturanPakai,
        )
      })
    }
  }, [copyResep])

  // Fetch Exist Obat
  useEffect(() => {
    const fetchExistObat = async () => {
      try {
        const response = await api.get(`/api/v1/getResepDokterDetails?noResep=${nmrResep}`)
        setObatExist(response.data)
      } catch (err) {
        console.log('tidak ada obat yang sudah ada', err)
      }
    }

    fetchExistObat()
  }, [nmrResep]) // Add nmrResep to the dependency array

  // Handle Exist Obat
  useEffect(() => {
    obatExist.forEach((item) => {
      const mappedData = {
        kode: item.kode_brng,
        nama: item.nama_brng,
        jumlahObat: item.jml,
        aturanPakai: item.aturan_pakai,
      }

      handlePilihObat(
        mappedData.kode,
        mappedData.nama,
        mappedData.jumlahObat,
        mappedData.aturanPakai,
      )
    })
  }, [obatExist])

  const checkExistDiagnosa = async () => {
    try {
      const response = await api.get(`/api/v1/getDiagnosaPasien?noRawat=${nmrRawat}`)
      if (response.data.length === 0) {
        console.log('TIDAK ADA DIAGNOSA.')
      } else {
        console.log('exist diagnosa', response.data)

        const penilaianValue = response.data
          .map(
            (item: { kd_penyakit: string; nm_penyakit: string }) =>
              `${item.kd_penyakit}, ${item.nm_penyakit}`,
          )
          .join('\n')

        setFormData((prevData) => ({
          ...prevData,
          penilaian: penilaianValue,
        }))
      }
    } catch (err) {
      console.log('exist diagnosa error', err)
    }
  }

  // cek no resep jika sudah ada
  const checkExistNoResep = async () => {
    try {
      const response = await api.get(
        `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${nmrRawat}`,
      )
      if (response.data.length === 0) {
        try {
          const data = {
            noRawat: nmrRawat,
            kdDokter: nipCredentials,
          }
          const res = await api.post('/api/v1/postResepObat', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          setHaveNoResep(false)
          setNmrResep(res.data)
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log('tidak ada resep yang perlu ditambahkan.')
        setNmrResep(response.data[0])
        setHaveNoResep(true)
        console.log()
      }
    } catch (err) {
      console.log('Tidak Ada no resep', err)
    }
  }

  const postRencanKontrol = async () => {
    if (!selectedDate) {
      spesificError({ errMessage: 'Mohon Memilih Tanggal Rujukan' })
    } else if (!alasan) {
      spesificError({ errMessage: 'Mohon Memasukan Alasan.' })
    } else if (!rtl) {
      spesificError({ errMessage: 'Mohon Memasukan RTL.' })
    } else {
      const dataRecana = `-KONTROL KEMBALI-\nAlasan: ${alasan}\nRTL: ${rtl}\nTanggal Datang: ${dateNow}\nTanggal Rujukan: ${selectedDate}\n`
      setFormData((prevData) => ({
        ...prevData,
        evaluasi: prevData.evaluasi ? `${prevData.evaluasi}\n${dataRecana}` : dataRecana,
      }))
    }
  }

  const postDiagnosa = async () => {
    try {
      for (const diagnosa of choosenDiagnosa) {
        const [kode] = diagnosa.split(', ')
        const data = {
          noRawat: nmrRawat,
          status: 'Ralan',
          kdPenyakit: kode,
          prioritas: '1',
          statusPenyakit: 'Baru',
        }

        const response = await api.post('/api/v1/insertDiagnosaPasien', data)
        console.log('Diagnosa dikirim:', response.data)
      }
    } catch (error) {
      console.log('Diagnosa gagal dikirim', error)
    }
  }

  const postResep = async () => {
    const data = {
      noRawat: nmrRawat,
      status: 'ralan',
      kdDokter: nipCredentials,
    }
    if (haveNoResep === false) {
      try {
        const response = await api.post('/api/v1/postResepObat', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        for (const key in selectedMedicines) {
          const medicineData = selectedMedicines[key]
          console.log(medicineData)

          const resepDokterData = {
            noResep: response.data.no_resep,
            kodeBrng: medicineData.kode,
            jml: Math.round(medicineData.jumlahObat * 55) / 54,
            aturanPakai: medicineData.aturanPakai,
          }
          try {
            await api.post('/api/v1/postResepDokter', resepDokterData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
          } catch (err) {
            console.log('obat :', resepDokterData)
            console.log(err)
          }
        }
        console.log('post resep response', response.data.no_resep)
      } catch (err) {
        console.log('post resep error', err)
      }
    } else if (haveNoResep === true) {
      const existingMedicines = obatExist.map((item) => item.kode_brng)

      for (const key in selectedMedicines) {
        const medicineData = selectedMedicines[key]

        if (existingMedicines.includes(medicineData.kode)) {
          continue
        }

        const resepDokterData = {
          noResep: nmrResep,
          kodeBrng: medicineData.kode,
          jml: Math.round(medicineData.jumlahObat * 55) / 54,
          aturanPakai: medicineData.aturanPakai,
        }

        try {
          await api.post('/api/v1/postResepDokter', resepDokterData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (err) {
          console.log('obat error :', resepDokterData)
          console.log(err)
        }
      }
    }
    console.log('no rawat sudah ada, skip')
  }

  const handlePostSoap = async () => {
    const dataPost = {
      noRawat: nmrRawat,
      suhuTubuh: formData.suhuTubuh,
      tensi: formData.tensi,
      nadi: formData.nadi,
      respirasi: formData.respirasi,
      tinggi: formData.tinggi,
      berat: formData.berat,
      spo2: formData.spo2,
      gcs: formData.gcs,
      kesadaran: formData.kesadaran || 'Compos Mentis',
      keluhan: formData.keluhan,
      pemeriksaan: formData.pemeriksaan,
      alergi: formData.alergi,
      lingkar_perut: '-',
      penilaian: formData.penilaian,
      rtl: formData.rtl,
      evaluasi: formData.evaluasi,
      instruksi: formData.instruksi,
      nip: nipCredentials,
    }
    const dataPut = {
      noRawat: nmrRawat,
      suhuTubuh: formData.suhuTubuh,
      tensi: formData.tensi,
      nadi: formData.nadi,
      respirasi: formData.respirasi,
      tinggi: formData.tinggi,
      berat: formData.berat,
      spo2: formData.spo2,
      gcs: formData.gcs,
      lingkar_perut: '-',
      kesadaran: formData.kesadaran || 'Compos Mentis',
      alergi: formData.alergi,
      penilaian: formData.penilaian,
      instruksi: formData.instruksi,
      keluhan: formData.keluhan,
      pemeriksaan: formData.pemeriksaan,
      nip: nipCredentials,
      rtl: formData.rtl,
      evaluasi: formData.evaluasi,
    }
    try {
      setProgress(20)
      const response = await api.get(`/api/v1/checkPemeriksaanRalan?noRawat=${nmrRawat}`)
      const message = response.data.message

      if (message === 'Belum ada data pemeriksaaan.') {
        if (role.includes('petugas')) {
          if (!formData.suhuTubuh) {
            spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
          } else if (!formData.tensi) {
            spesificError({ errMessage: 'Masukan Data Tensi.' })
          } else if (!formData.nadi) {
            spesificError({ errMessage: 'Masukan Data nadi' })
          } else if (!formData.respirasi) {
            spesificError({ errMessage: 'Masukan Data RR.' })
          } else if (!formData.tinggi) {
            spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
          } else if (!formData.berat) {
            spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
          } else if (!formData.spo2) {
            spesificError({ errMessage: 'Masukan Data SPO2' })
          } else if (!formData.alergi) {
            spesificError({ errMessage: 'Masukan Data alergi.' })
          } else if (!formData.keluhan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
          } else if (!formData.pemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else {
            const isDataCorrect = window.confirm(
              'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
            )
            if (isDataCorrect) {
              try {
                const response = await api.post(
                  '/api/v1/postPemeriksaanRalan',
                  JSON.stringify(dataPost),
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                console.log('BERHASIL MENGIRIM ,POST response:', response.data)
                setProgress(100)
                await handleChangeStatusFirstSend()
              } catch (error) {
                console.log('error petugas post', error)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
              } finally {
                navigate('/rawat-jalan/')
                window.location.reload()
              }
            } else {
              spesificError({ errMessage: 'Batal Mengirim.' })
            }
          }
        } else if (role.includes('dokter')) {
          if (!formData.keluhan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
          } else if (!formData.pemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else if (!formData.penilaian) {
            spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
          } else if (!formData.rtl) {
            spesificError({ errMessage: 'Mohon Memasukan Data Plan' })
          } else if (!formData.instruksi) {
            spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
          } else {
            const isDataCorrect = window.confirm(
              'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
            )
            if (isDataCorrect) {
              try {
                const response = await api.post(
                  '/api/v1/postPemeriksaanRalan',
                  JSON.stringify(dataPost),
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                setIsLoading(true)

                console.log('BERHASIL MENGIRIM(dokter) ,POST response:', response.data)
                setProgress(60)
                await postResep()
                setProgress(70)
                await postDiagnosa()
                setProgress(80)
                await handleChangeStatusFirstSend()
                // navigate('/rawat-jalan/')
                // window.location.reload()
                setProgress(100)
              } catch (error) {
                console.log('error dokter post', error)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
                setProgress(100)
              } finally {
                setProgress(100)
                navigate('/rawat-jalan/')
                window.location.reload()
                console.log('okok')
              }
            } else {
              spesificError({ errMessage: 'Batal Mengirim.' })
            }
          }
        }
      } else if (message === 'Sudah ada data pemeriksaan') {
        if (role.includes('petugas')) {
          if (!formData.suhuTubuh) {
            spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
          } else if (!formData.tensi) {
            spesificError({ errMessage: 'Masukan Data Tensi.' })
          } else if (!formData.nadi) {
            spesificError({ errMessage: 'Masukan Data nadi' })
          } else if (!formData.respirasi) {
            spesificError({ errMessage: 'Masukan Data RR.' })
          } else if (!formData.tinggi) {
            spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
          } else if (!formData.berat) {
            spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
          } else if (!formData.spo2) {
            spesificError({ errMessage: 'Masukan Data SPO2' })
          } else if (!formData.alergi) {
            spesificError({ errMessage: 'Masukan Data alergi.' })
          } else if (!formData.keluhan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif..' })
          } else if (!formData.pemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else {
            const isDataCorrect = window.confirm(
              'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
            )

            if (isDataCorrect) {
              try {
                const response = await api.put(
                  '/api/v1/updatePemeriksaanRalan',
                  JSON.stringify(dataPut),
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                setProgress(70)
                setIsLoading(true)
                setProgress(86)
                await handleChangeStatusSecondSend()
                console.log(response)
                setProgress(100)
              } catch (err) {
                console.log('err petugas put', err)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
              } finally {
                setProgress(100)
                navigate('/rawat-jalan/')
                window.location.reload()
              }
            } else {
              spesificError({ errMessage: 'Batal Mengirim.' })
            }
          }
        } else if (role.includes('dokter')) {
          //           if (!dataSoap[0].keluhan && (!subjektif || !tindakan))
          if (!formData.keluhan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif..' })
          } else if (!formData.pemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else if (!formData.penilaian) {
            spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
          } else if (!formData.instruksi) {
            spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
          } else if (!formData.rtl) {
            spesificError({ errMessage: 'Mohon Memasukan Data Plan' })
          } else {
            const isDataCorrect = window.confirm(
              'Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien. LANJUTKAN?',
            )

            if (isDataCorrect) {
              try {
                const response = await api.put(
                  '/api/v1/updatePemeriksaanRalan',
                  JSON.stringify(dataPut),
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )

                setIsLoading(true)
                console.log('BERHASIL MENGIRIM(dokter):', response.data)
                setProgress(70)
                await postResep()
                setProgress(80)
                await postDiagnosa()
                setProgress(86)
                await handleChangeStatusSecondSend()
                setProgress(100)
              } catch (error) {
                console.log('error dokter put', error)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
                setProgress(100)
              } finally {
                setProgress(100)
                const isCorrect = window.confirm('Apakah Ingin Melanjutkan Mengisi RESUME PASIEN ?')
                if (isCorrect) {
                  navigate(`/rawat-jalan/resume/${id}`)
                } else {
                  navigate('/rawat-jalan/')
                  window.location.reload()
                }
              }
            } else {
              spesificError({ errMessage: 'Aborted' })
            }
          }
        }
      }
    } catch (err) {
      setProgress(100)
      console.log('ini error apa?', err)
    }
  }

  const handlePilihPenyakit = async (kode: string, nama: string) => {
    const penyakitBaru = `${kode}, ${nama} - Diagnosa`
    setFormData((prevData) => ({
      ...prevData,
      penilaian: prevData.penilaian ? `${prevData.penilaian}\n${penyakitBaru}` : penyakitBaru,
    }))
    setListPenyakit([])

    setChoosenDiagnosa((prevDiagnosa) => [...prevDiagnosa, penyakitBaru])
  }

  const handlePilihProsedur = async (kode: string, namaProsedur: string) => {
    const prosedurBaru = `${kode}, ${namaProsedur} - Prosedur`
    setFormData((prevData) => ({
      ...prevData,
      penilaian: prevData.penilaian ? `${prevData.penilaian}\n${prosedurBaru}` : prosedurBaru,
    }))
    setListProsedur([])
  }

  const handlePilihTindakan = async (kode: any, nmPerawatan: any) => {
    const tindakanBaru = `${kode}, ${nmPerawatan}`
    setFormData((prevData) => ({
      ...prevData,
      keluhan: prevData.keluhan ? `${prevData.keluhan}\n${tindakanBaru}` : tindakanBaru,
    }))
    setListTindakan([])
    const data = {
      noRawat: nmrRawat,
      kdJenisPrw: kode,
      kdDokter: nipCredentials,
      material: Math.round(50000.0 * 55) / 54,
      bhp: Math.round(0.1 * 55) / 54,
      tarifTindakandr: Math.round(150000.0 * 55) / 54,
      kso: Math.round(0.1 * 55) / 54,
      menejemen: Math.round(50000.0 * 55) / 54,
      biayaRawat: Math.round(25000.0 * 55) / 54,
      sttsBayar: 'Belum',
    }
    const isConfirmed = window.confirm('Apakah Yang Anda Dipilih Sudah Benar?')

    if (isConfirmed) {
      try {
        const response = await api.post('/api/v1/insertRawatJalanData', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('data tindakan dikirim', response.data)
      } catch (err) {
        console.log('Error sending treatment data:', err)
      }
    } else {
      console.log('Data sending cancelled.')
    }
  }

  const handlePilihObat = (kode: string, nama: string, jumlahObat: any, aturanPakai: string) => {
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }

      if (newSelectedMedicines[kode] || copyResep) {
        newSelectedMedicines[kode] = {
          ...newSelectedMedicines[kode],
          nama: nama,
          jumlahObat: jumlahObat,
          aturanPakai: aturanPakai,
          kode: kode,
        }
      } else {
        newSelectedMedicines[kode] = { nama, aturanPakai, jumlahObat, kode }
      }

      const planString = generatePlanString(newSelectedMedicines)
      const editedPlan = `----------------------------------------\nWaktu Penyimpanan Pertama: ${showTime}\n---------------------------------------- \n${planString}`

      setFormData((prevData) => ({
        ...prevData,
        rtl: prevData.rtl ? `${editedPlan}` : editedPlan,
      }))
      return newSelectedMedicines
    })
  }

  const generatePlanString = (selectedMedicines: any) => {
    const planArray = []

    for (const kode in selectedMedicines) {
      const { nama, jumlahObat, aturanPakai } = selectedMedicines[kode]
      const planItem = `${nama} ${kode} - Jumlah: ${jumlahObat}, Aturan Pakai: ${aturanPakai}.`
      planArray.push(planItem)
    }
    return planArray.join('\n')
  }

  const modalLaborInputOpen = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.open()
    }
  }

  const modalLaborInputClose = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.close()
    }
  }

  const modalRadiologiInputOpen = () => {
    if (modalRadiologiRef.current) {
      modalRadiologiRef.current.open()
    }
  }

  const modalRadiologiInputClose = () => {
    if (modalRadiologiRef.current) {
      modalRadiologiRef.current.close()
    }
  }

  const handleWindow = () => {
    const width = Math.floor(window.screen.width * 0.5)
    const height = Math.floor(window.screen.height * 0.7)
    const left = Math.floor((window.screen.width - width) / 2)
    const top = Math.floor((window.screen.height - height) / 2)

    const popup = window.open(
      '/diagnosa-search',
      'Diagnosa',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      console.error('Popup gagal dibuka. Pastikan pop-up tidak diblokir oleh browser.')
      return
    }

    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return
      console.log('Data dari pop-up:', event.data)
    })

    window.addEventListener('message', (event) => {
      console.log('Data diterima:', event.data)
      if (Array.isArray(event.data) && event.data.every((item) => item.kode && item.nmPenyakit)) {
        setFormData((prevData) => ({
          ...prevData,
          penilaian: prevData.penilaian
            ? `${prevData.penilaian}\n${event.data
                .map((item) => `${item.kode} - ${item.nmPenyakit}`)
                .join('\n')}`
            : event.data.map((item) => `${item.kode} - ${item.nmPenyakit}`).join('\n'),
        }))

        setChoosenDiagnosa((prevDiagnosa) => [
          ...prevDiagnosa,
          ...event.data.map((item) => `${item.kode}, ${item.nama} - Diagnosa`),
        ])
      }
    })
  }

  const handleSimpanEkspertisi = () => {
    setFormData((prevData) => ({
      ...prevData,
      pemeriksaan: prevData.pemeriksaan
        ? `${prevData.pemeriksaan}\n* Data Ekspertisi *\n${ekspertisi}`
        : `* Data Ekspertisi *\n${ekspertisi}`,
    }))
    setEkspertisi('')
  }

  return (
    <div className='w-full mt-4'>
      <LoadingBar
        color='#55a46b'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={7}
      ></LoadingBar>
      {loading ? (
        <div className='flex w-full flex-col gap-4 p-3 bg-slate-100'>
          <div className='skeleton h-32 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-32 w-full'></div>
          <div className='skeleton h-32 w-full'></div>
          <div className='skeleton h-32 w-full'></div>
        </div>
      ) : (
        <>
          <div>
            <div>
              <p className=' font-bold text-xl text-[#121713]'>Pemeriksaan</p>
              <p className=' font-bold text-xl text-[#121713]'>No Resep: {nmrResep}</p>
              <div className='text-base text-[#121713] font-sans flex'>
                <div className='w-full'>
                  <div className='flex'>
                    <div className='form-control mt-6'>
                      <label className='label'>
                        <span>No. Rawat</span>
                      </label>
                      <input
                        type='Text'
                        placeholder='2023/10/11/000001'
                        className='input input-bordered text-sm rounded-2xl border-disabled w-[200px] disabled'
                        value={nmrRawat}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                          }
                        }}
                      />
                    </div>
                    <div className='form-control mt-6 ml-4'>
                      <label className='label'>
                        <span>NIP</span>
                      </label>
                      <input
                        type='Text'
                        placeholder='2023/10/11/000001'
                        className='input input-bordered text-sm rounded-2xl border-disabled w-[150px] disabled'
                        value={nipCredentials}
                      />
                    </div>
                  </div>
                  <div className='flex gap-5'>
                    <div className=''>
                      <label className='label'>
                        <span>Tanggal</span>
                      </label>
                      <input
                        type='date'
                        className='input input-bordered text-sm rounded-2xl border-disabled w-[550px]'
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                      />
                    </div>
                    <div className=''>
                      <label className='label'>
                        <span>Jam</span>
                      </label>
                      <input
                        type='time'
                        defaultValue='19:44'
                        className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                        value={jam}
                        onChange={(e) => setJam(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='border border-slate-300 rounded-lg mt-5 p-3'>
                    <label className='font-semibold text-slate-700 text-md'>VITALITY SIGN</label>
                    <div className='grid grid-cols-4 gap-3'>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Suhu(C)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.suhuTubuh}
                          onChange={(e) => setFormData({ ...formData, suhuTubuh: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Tensi(mmHg)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.tensi}
                          onChange={(e) => setFormData({ ...formData, tensi: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Nadi(/mnt)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.nadi}
                          onChange={(e) => setFormData({ ...formData, nadi: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>RR(/mnt)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.respirasi}
                          onChange={(e) => setFormData({ ...formData, respirasi: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Tinggi(cm)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.tinggi}
                          onChange={(e) => setFormData({ ...formData, tinggi: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Berat(kg)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          // value={dataSoap ? dataSoap[0]?.berat : 'Loading'}
                          value={formData.berat}
                          onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>SPO2</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.spo2}
                          onChange={(e) => setFormData({ ...formData, spo2: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control mt-6'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>GCS(E,V,M)</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.gcs}
                          onChange={(e) => setFormData({ ...formData, gcs: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Alergi</span>
                        </label>
                        <input
                          type='Text'
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.alergi}
                          onChange={(e) => setFormData({ ...formData, alergi: e.target.value })}
                          disabled={role.includes('dokter')}
                        />
                      </div>
                      <div className='form-control '>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Kesadaran</span>
                        </label>
                        <select
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                          value={formData.kesadaran ?? ''}
                          onChange={(e) => setFormData({ ...formData, kesadaran: e.target.value })}
                          disabled={role.includes('dokter')}
                        >
                          {Object.values(KesadaranOptions).map((option) => (
                            <option
                              key={option}
                              value={option}
                              disabled={option === KesadaranOptions.defaultValue}
                              hidden={option === KesadaranOptions.defaultValue}
                              selected={option === KesadaranOptions.defaultValue}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='mt-3 border border-slate-300 p-3 rounded-lg'>
                      <div className='form-control'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Subjektif</span>
                        </label>
                        <textarea
                          placeholder=''
                          className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                          value={formData.keluhan}
                          onChange={(e) => setFormData({ ...formData, keluhan: e.target.value })}
                        />
                      </div>
                      <label className='label'>Cari Tindakan</label>
                      <div className='flex relative mt-1'>
                        <input
                          type='text'
                          className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                          placeholder='Tindakan'
                          onChange={(e) => setSearchTermTindakan(e.target.value)}
                        />
                      </div>
                      <div className='overflow-auto'>
                        {listTindakan.length > 0 ? (
                          <div className='h-56 overflow-auto'>
                            <table className='table w-full'>
                              <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                                <th className=''>KODE PERAWATAN</th>
                                <th className=''>NAMA PERAWATAN</th>
                                <th className=''>KD PENGANGGUNG JAWAB</th>
                                <th className=''>KD POLI</th>
                                <th>AKSI</th>
                                <th>
                                  <button
                                    onClick={() => setListTindakan([])}
                                    className='btn btn-sm bg-slate-100 hover:bg-slate-100 border-none text-lg font-bold'
                                  >
                                    X
                                  </button>
                                </th>
                              </thead>
                              <tbody className='overflow-y-auto'>
                                {listTindakan.map((data, index) => (
                                  <tr
                                    key={index}
                                    className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200'
                                  >
                                    <td className=''>{data?.kd_jenis_prw || '-'}</td>
                                    <td className=''>{data?.nm_perawatan || '-'}</td>
                                    <td className=''>{data?.kd_pj || '-'}</td>
                                    <td className=''>{data?.kd_poli || '-'}</td>
                                    <td className=''>
                                      <button
                                        className='underline'
                                        onClick={() =>
                                          handlePilihTindakan(
                                            data?.kd_jenis_prw,
                                            data?.nm_perawatan,
                                          )
                                        }
                                      >
                                        Pilih
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <p>Tindakan</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className='border border-slate-300 rounded-lg p-3 mt-4'>
                    <div className='form-control'>
                      <label className='label font-semibold text-slate-700 text-md'>
                        <span>Object</span>
                      </label>
                      <textarea
                        placeholder='-'
                        value={formData.pemeriksaan}
                        onChange={(e) => setFormData({ ...formData, pemeriksaan: e.target.value })}
                        className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                      />
                    </div>
                    {choosenPoli === 'KLINIK KANDUNGAN ' ? (
                      <div className='grid items-center gap-1'>
                        <label className='label'>Ekspertisi USG</label>
                        <div className='flex relative gap-1 mt-1'>
                          <textarea
                            className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                            placeholder='Ekspertisi'
                            value={ekspertisi}
                            onChange={(e) => setEkspertisi(e.target.value)}
                          />
                          <button
                            className='btn bg-primary text-white'
                            onClick={handleSimpanEkspertisi}
                          >
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <div className='border border-slate-300 rounded-lg p-3'>
                <div className='form-control'>
                  <div className='flex justify-between p-2'>
                    <label className='label font-semibold text-slate-700 text-md'>
                      <span>Asesmen</span>
                    </label>
                  </div>
                  <textarea
                    placeholder='-'
                    value={formData.penilaian}
                    onChange={(e) => setFormData({ ...formData, penilaian: e.target.value })}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'

                    // disabled={role.includes('petugas')}
                  />
                </div>
                <div className='mt-4'>
                  <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <label>Diagnosa</label>
                      <div className='flex relative items-end gap-1 mt-1'>
                        <input
                          type='text'
                          value={searchTerm}
                          // disabled={role.includes('petugas')}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className='w-full px-3 py-2 border rounded-2xl  disabled:bg-slate-200 disabled:text-black'
                          placeholder='Diagnosa'
                        />
                        <button
                          onClick={handleWindow}
                          className='btn btn-ghost btn-xs hover:text-sm hover:bg-slate-200'
                        >
                          ??
                        </button>
                      </div>
                    </div>
                    <div>
                      <label>Prosedur</label>
                      <div className='flex relative mt-1'>
                        <input
                          type='text'
                          value={searchTermProsedur}
                          // disabled={role.includes('petugas')}
                          onChange={(e) => setSearchTermProsedur(e.target.value)}
                          className='w-full px-3 py-2 border rounded-2xl  disabled:bg-slate-200 disabled:text-black'
                          placeholder='Prosedur'
                        />
                      </div>
                    </div>
                  </div>

                  {listProsedur.length > 0 ? (
                    <div className='mt-4 pt-4'>
                      <div className='h-56 overflow-auto'>
                        <label className='label font-bold'>Prosedur</label>
                        <table className='table w-full'>
                          <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                            <th className=''>NO</th>
                            <th className=''>KODE</th>
                            <th className=''>PROSEDUR PANJANG</th>
                            <th className=''>PROSEDUR PENDEK</th>
                            <th>
                              <button
                                onClick={() => setListProsedur([])}
                                className='btn btn-sm bg-slate-100 hover:bg-slate-100 border-none text-lg font-bold'
                              >
                                X
                              </button>
                            </th>
                          </thead>
                          <tbody className='overflow-y-auto'>
                            {listProsedur.map((data, index) => (
                              <tr
                                key={index}
                                className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200 '
                              >
                                <td className=''>{index + 1}</td>
                                <td className=''>
                                  {listProsedur.length > 0 ? data.kode || '-' : '-'}
                                </td>
                                <td className=''>
                                  {listProsedur.length > 0 ? data.deskripsi_panjang || '-' : '-'}
                                </td>
                                <td className=''>
                                  {listProsedur.length > 0 ? data.deskripsi_pendek || '-' : '-'}
                                </td>
                                <td className=''>
                                  <button
                                    className='underline'
                                    onClick={() =>
                                      handlePilihProsedur(data.kode, data.deskripsi_pendek)
                                    }
                                    // disabled={role.includes('petugas')}
                                  >
                                    Pilih
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}

                  {listPenyakit.length > 0 ? (
                    <div className='mt-4 pt-4'>
                      <div className='h-56 overflow-auto'>
                        <label className='label font-bold'>Diagnosa</label>
                        <table className='table w-full'>
                          <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                            <th className=''>NO</th>
                            <th className=''>KODE DIAGNOSA</th>
                            <th className=''>NAMA DIAGNOSA</th>
                            <th className=''>AKSI</th>
                            <th>
                              <button
                                onClick={() => setListPenyakit([])}
                                className='btn btn-sm bg-slate-100 hover:bg-slate-100 border-none text-lg font-bold'
                              >
                                X
                              </button>
                            </th>
                          </thead>
                          <tbody className='overflow-y-auto'>
                            {listPenyakit.map((data, index) => (
                              <tr
                                key={index}
                                className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200 '
                              >
                                <td className=''>{index + 1}</td>
                                <td className=''>
                                  {listPenyakit.length > 0 ? data.kd_penyakit || '-' : '-'}
                                </td>
                                <td className=''>
                                  {listPenyakit.length > 0 ? data.nm_penyakit || '-' : '-'}
                                </td>
                                <td className=''>
                                  <button
                                    className='underline '
                                    // disabled={role.includes('petugas')}
                                    onClick={() =>
                                      handlePilihPenyakit(data.kd_penyakit, data.nm_penyakit)
                                    }
                                  >
                                    Pilih
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='border border-slate-300 p-3 rounded-lg mt-5 mb-5'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Plan</span>
                  </label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                    value={formData.rtl}
                    onChange={(e) => setFormData({ ...formData, rtl: e.target.value })}
                    disabled={role.includes('petugas')}
                  />
                </div>
                <div className='mt-4'>
                  <label>Cari Obat</label>
                  <div className='flex relative mt-1'>
                    <input
                      type='text'
                      disabled={role.includes('petugas')}
                      onChange={(e) => setSearchTermObat(e.target.value)}
                      className='w-full px-3 py-2 border rounded-2xl disabled:bg-slate-200 disabled:text-black'
                      placeholder='Paracetamol'
                    />
                    {listObat.length > 0 ? (
                      <button
                        onClick={() => setListObat([])}
                        className='btn w-10 h-5 bg-slate-100 hover:bg-slate-100 border-none text-lg font-bold'
                      >
                        X
                      </button>
                    ) : null}
                  </div>
                  {listObat.length > 0 ? (
                    <>
                      <div className='mt-4 pt-4 h-full'>
                        <table className='table table-lg w-full'>
                          <thead>
                            <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                              <th className='text-start'>NO</th>
                              <th className='text-start'>KODE OBAT</th>
                              <th className='text-start'>NAMA OBAT</th>
                              <th className='text-start'>JUMLAH</th>
                              <th className='text-start'>ATURAN PAKAI</th>
                              <th className='text-start'>AKSI</th>
                            </tr>
                          </thead>
                          <tbody className='overflow-auto'>
                            {listObat.map((data, index) => (
                              <tr
                                key={index}
                                className='text-sm text-gray-700 h-10 font-bold border-b-[1px] border-gray-200 py-[10px]'
                              >
                                <td className='text-start'>{index + 1}</td>
                                <td className='text-start'>
                                  {listObat.length > 0 ? data.kode_brng || '-' : '-'}
                                </td>
                                <td className='text-start'>
                                  {listObat.length > 0 ? data.nama_brng || '-' : '-'}
                                </td>
                                <td>
                                  <input
                                    id={`input_obat_${index}`}
                                    type='number'
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault()
                                        const button = document.getElementById(`button_${index}`)
                                        if (button) {
                                          button.click()
                                          setListObat([])
                                        }
                                      }
                                    }}
                                    onChange={(e) => setJumlahObat(parseFloat(e.target.value))}
                                    className='text-center w-20 input input-bordered'
                                  />
                                </td>
                                <td>
                                  {data.nama_brng.includes('Racikan') ? (
                                    <textarea
                                      id={`input_aturan_pakai_${index}`}
                                      onChange={(e) => setAturanPakai(e.target.value)}
                                      className='textarea textarea-bordered w-96'
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.shiftKey === false) {
                                          e.preventDefault()
                                          const button = document.getElementById(`button_${index}`)
                                          if (button) {
                                            button.click()
                                            setListObat([])
                                          }
                                        }
                                      }}
                                    />
                                  ) : (
                                    <input
                                      id={`input_aturan_pakai_${index}`}
                                      type='text'
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault()
                                          const button = document.getElementById(`button_${index}`)
                                          if (button) {
                                            button.click()
                                            setListObat([])
                                          }
                                        }
                                      }}
                                      onChange={(e) => setAturanPakai(e.target.value)}
                                      className='input input-bordered w-32'
                                    />
                                  )}
                                </td>
                                <td>
                                  <button
                                    id={`button_${index}`}
                                    className='underline'
                                    disabled={
                                      role.includes('petugas') || !aturanPakai || !jumlahObat
                                    }
                                    onClick={() => {
                                      handlePilihObat(
                                        data.kode_brng,
                                        data.nama_brng,
                                        jumlahObat,
                                        aturanPakai,
                                      )
                                      setJumlahObat(0)
                                      setAturanPakai('')

                                      // Reset input fields
                                      const inputObat = document.getElementById(
                                        `input_obat_${index}`,
                                      ) as HTMLInputElement
                                      const inputAturanPakai = document.getElementById(
                                        `input_aturan_pakai_${index}`,
                                      ) as HTMLInputElement

                                      if (inputObat && inputAturanPakai) {
                                        inputObat.value = ''
                                        inputAturanPakai.value = ''
                                      }
                                    }}
                                  >
                                    <p className='text-start'>Simpan</p>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}
                  {selectedMedicines && Object.keys(selectedMedicines).length > 0 ? (
                    <>
                      <div className='mt-4'>
                        <label className='label'>
                          <span>Daftar Obat yang ditambahkan :</span>
                        </label>
                        <div className='pt-4 w-full h-full'>
                          <table className='table w-full'>
                            <thead className='text-xs text-gray-400 font-bold border-b-2 border-gray-200 pb-2'>
                              <tr>
                                <th>NO</th>
                                <th>KODE OBAT</th>
                                <th>NAMA OBAT</th>
                                <th>JUMLAH</th>
                                <th>ATURAN PAKAI</th>
                                <th>AKSI</th>
                              </tr>
                            </thead>
                            <tbody className='overflow-y-auto'>
                              {Object.entries(selectedMedicines).map(([kode, data], index) => (
                                <tr
                                  key={index}
                                  className='text-sm text-gray-700 font-bold border-b-[1px] border-gray-200'
                                >
                                  <td className='text-center'>{index + 1}</td>
                                  <td className='text-center'>{kode}</td>
                                  <td className='text-center'>{data.nama}</td>
                                  {editObat && editedRowIndex === index ? (
                                    <>
                                      <td className='text-center'>
                                        <input
                                          id={`input_obat_${index}`}
                                          type='number'
                                          onChange={(e) =>
                                            setJumlahObat(parseFloat(e.target.value))
                                          }
                                          defaultValue={data.jumlahObat || jumlahObat}
                                          className='w-20 h-10 input input-bordered'
                                          onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                              e.preventDefault()
                                              const button = document.getElementById(
                                                `button__${index}`,
                                              )
                                              if (button) {
                                                button.click()
                                                setListObat([])
                                              }
                                            }
                                          }}
                                        />
                                      </td>
                                      <td className='text-center'>
                                        <div className='flex justify-center'>
                                          <input
                                            id={`input_aturan_pakai_${index}`}
                                            type='text'
                                            defaultValue={data.aturanPakai || aturanPakai}
                                            onChange={(e) => setAturanPakai(e.target.value)}
                                            className='w-32 h-10 input input-bordered'
                                            onKeyPress={(e) => {
                                              if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const button = document.getElementById(
                                                  `button__${index}`,
                                                )
                                                if (button) {
                                                  button.click()
                                                  setListObat([])
                                                }
                                              }
                                            }}
                                          />
                                        </div>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className='text-center'>
                                        {/* <input
                                    className='input-ghost w-20 text-center'
                                    value={jumlahObat || data.jumlahObat}
                                  /> */}
                                        <div className='rounded flex justify-center'>
                                          {data.jumlahObat}
                                          <p className='text-disabled'>x</p>
                                        </div>
                                      </td>
                                      <td className='text-center'>{data.aturanPakai}</td>
                                    </>
                                  )}
                                  {editObat && editedRowIndex === index ? (
                                    <td className='flex justify-center items-center gap-3'>
                                      <button
                                        onClick={() => {
                                          handlePilihObat(
                                            data.kode,
                                            data.nama,
                                            jumlahObat || data.jumlahObat,
                                            aturanPakai || data.aturanPakai,
                                          )
                                          setEditObat(false)
                                          setJumlahObat(0)
                                          setAturanPakai('')
                                          trueFalseResep = false
                                        }}
                                        id={`button__${index}`}
                                      >
                                        <p className='text-green-500'>Simpan</p>
                                      </button>
                                      <button onClick={() => setEditObat(false)}>
                                        <p className='text-red-500'>Batal</p>
                                      </button>
                                    </td>
                                  ) : (
                                    <td className='flex items-center justify-center gap-3'>
                                      <button onClick={() => handleEditObat(index)}>
                                        <p className='text-blue-500'>Edit</p>
                                      </button>
                                      <button onClick={() => handleHapusObat(kode)}>
                                        <p className='text-red-500'>Hapus</p>
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {trueFalseResep ? (
                          <>
                            <div className='grid animate-pulse mt-1'>
                              <label className='label text-red-500'>PERINGATAN :</label>
                              <div className='flex'>
                                <ExclamationCircleIcon width={30} height={23} color='#f02f00' />{' '}
                                <p className='flex text-center pl-2 text-red-500'>
                                  {resepMessage} <p className='font-bold pl-1'> TIDAK ADA</p>
                                </p>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className='border border-slate-300 rounded-lg p-3'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Instruksi</span>
                  </label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                    value={formData.instruksi}
                    onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
                    disabled={role.includes('petugas')}
                  />
                </div>
              </div>
              <div className='border border-slate-300 rounded-lg p-3 mt-3'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Evaluasi</span>
                  </label>
                  <textarea
                    placeholder='-'
                    disabled={role.includes('petugas')}
                    value={formData.evaluasi}
                    onChange={(e) => setFormData({ ...formData, evaluasi: e.target.value })}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                  />
                </div>
                <div className='flex justify-between mt-3 p-2'>
                  <div>
                    <label className='label'>Tanggal Balik</label>
                    <input
                      disabled={role.includes('petugas')}
                      type='date'
                      className='input border border-disabled disabled:bg-slate-200 disabled:text-black'
                      onChange={handleDateChange}
                    />
                  </div>
                  <div>
                    <label className='label'>Alasan</label>
                    <input
                      type='text'
                      disabled={role.includes('petugas')}
                      className='input border  border-disabled disabled:bg-slate-200 disabled:text-black'
                      onChange={(e) => setAlasan(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='label'>RTL</label>
                    <input
                      type='text'
                      disabled={role.includes('petugas')}
                      className='input border  border-disabled disabled:bg-slate-200 disabled:text-black'
                      onChange={(e) => setRtl(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex justify-end mr-3'>
                  <button
                    disabled={role.includes('petugas')}
                    className='btn btn-[8px] bg-primary text-white'
                    onClick={postRencanKontrol}
                  >
                    Simpan
                  </button>
                </div>
              </div>
              <div className=' w-auto mt-4'>
                <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[10px] ml-2'>
                  <InformationCircleIcon width={25} height={25} />
                  <p className='ml-[4px]'>Informasi</p>
                </div>
                <p className='w-full text-center font-sans text-red-400 animate-pulse font-normal leading-5 text-[20px]'>
                  Mohon pastikan data yang di Input sudah benar sebelum melanjutkan. Kesalahan dalam
                  pengisian data dapat berdampak pada perawatan pasien.
                </p>
                <button
                  className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
                  onClick={handlePostSoap}
                  disabled={loading}
                >
                  {loading ? (
                    <p className='flex justify-center items-center'>
                      <ArrowPathIcon className='animate-spin mr-3' width={25} height={25} />
                      Mengirim
                    </p>
                  ) : (
                    <p className='flex'>
                      <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' /> Selesai
                    </p>
                  )}
                </button>
              </div>
              <div>
                {role.includes('petugas') ? null : (
                  <div className='flex justify-between gap-3'>
                    <button
                      className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary-500 rounded-xl hover:opacity-80'
                      onClick={modalLaborInputOpen}
                    >
                      PERMINTAAN LABORATORIUM
                    </button>
                    <button
                      className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary-500 rounded-xl hover:opacity-80'
                      onClick={modalRadiologiInputOpen}
                    >
                      PERMINTAAN RADIOLOGI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div
            className='p-4 bg-gray-100 rounded-lg text-sm text-gray-700 
             overflow-auto max-w-full whitespace-pre-wrap break-words 
             w-96 opacity-90 fixed top-1 right-1 shadow-lg z-0'
          >
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div> */}
        </>
      )}

      <ToastContainer />
      <ModalLaborInput
        ref={modalLaborRef}
        onClose={modalLaborInputClose}
        onLaborData={handleLaborData}
      />
      <ModalRadiologiInput
        ref={modalRadiologiRef}
        onClose={modalRadiologiInputClose}
        onRadiologiData={handleRadiologiData}
      />
    </div>
  )
}

export default InsertSoapRalan1
