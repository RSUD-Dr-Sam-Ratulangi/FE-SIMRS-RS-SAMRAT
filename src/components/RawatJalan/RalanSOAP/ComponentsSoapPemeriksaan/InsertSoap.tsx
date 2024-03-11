import React, { useEffect, useState, useRef } from 'react'
import { api } from '../../../../services/api/config.api'
import { spesificError } from '../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { AxiosResponse } from 'axios'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import { formatSelectedDate, formatSelectedDateNow } from '../../../../utils/DateNow'
import ModalLaborInput from '../Laboratorium/Modal/ModalLaborInput'
import { PopupActions } from 'reactjs-popup/dist/types'
// import ToastInfo from '../../utils/ToastInfo'

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

type DataItem = {
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
const InsertSoapRalan: React.FC<{ copyResep: any }> = ({ copyResep }) => {
  const [loading, setIsLoading] = useState(false)
  const [obatExist, setObatExist] = useState([])
  const [rtl, setRtl] = useState('')
  const [kdPenyakit, setKdPenyakit] = useState('')
  const [alasan, setAlasan] = useState('')
  const [diagnosa, setDiagnosa] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [editObat, setEditObat] = useState(false)
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [suhu, setSuhu] = useState('')
  const [tensi, setTensi] = useState('')
  const [nadi, setNadi] = useState('')
  const [rr, setRr] = useState('')
  const [tinggi, setTinggi] = useState('')
  const [berat, setBerat] = useState('')
  const [spo2, setSpo2] = useState('')
  const [gcs, setGcs] = useState('')
  const [alergi, setAlergi] = useState('')
  const [kesadaran, setSelectedKesadaran] = useState('')
  const [subjektif, setSubjektif] = useState('')
  const [nmrResep, setNmrResep] = useState('')
  const [objectPemeriksaan, setObjectPemeriksaan] = useState('')
  const [haveNoResep, setHaveNoResep] = useState(false)
  const [penilaian, setPenilaian] = useState('')
  const [plan, setPlan] = useState('')
  const [instruksi, setInstruksi] = useState('')
  const [evaluasi, setEvaluasi] = useState('')
  const [listPenyakit, setListPenyakit] = useState<DataItem[]>([])
  const [listObat, setListObat] = useState([])
  const [listTindakan, setListTindakan] = useState([])
  const [aturanPakai, setAturanPakai] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermObat, setSearchTermObat] = useState('')
  const [searchTermTindakan, setSearchTermTindakan] = useState('')
  const [tindakan, setTindakan] = useState('')
  const [jumlahObat, setJumlahObat] = useState<number>(0)
  const [dataSoap, setDataSoap] = useState<DataItem[]>([])
  const [selectedMedicines, setSelectedMedicines] = useState<{ [kode: string]: Medicine }>({})
  const [editedRowIndex, setEditedRowIndex] = useState(null)
  const [laborData, setLaborData] = useState('')
  const modalLaborRef = useRef<PopupActions>(null)

  const navigate = useNavigate()
  const nmrRawat = localStorage.getItem('no_rawat')
  // const noAntrian = localStorage.getItem('no_antrian')
  const dateNow = formatSelectedDateNow()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]
  const { id } = useParams()

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
      const response = await api.put(
        `api/v1/updateRegPeriksaStts?noRawat=${nmrRawat}&newStatus=Sudah`,
      )
      console.log(response)
    } catch (err) {
      console.log('Status Gagal Diubah', err)
    }
  }
  const handleChangeStatusFirstSend = async () => {
    try {
      const response = await api.put(
        `api/v1/updateRegPeriksaStts?noRawat=${nmrRawat}&newStatus=Berkas Diterima`,
      )
      console.log(response)
    } catch (err) {
      console.log('Status Gagal Diubah', err)
    }
  }

  const handleHapusObat = (kode: string) => {
    // Update selectedMedicines state to remove the selected medicine
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }
      delete newSelectedMedicines[kode]

      const planString = generatePlanString(newSelectedMedicines)
      setPlan(planString)

      return newSelectedMedicines
    })
  }

  const handleEditObat = (index) => {
    setEditObat(true)
    setEditedRowIndex(index)
  }

  const handleLaborData = (laborData) => {
    console.log('Received labor data:', laborData)
    setLaborData(laborData)
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
      try {
        const response = await api.get(
          `api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${nmrRawat}`,
        )
        setDataSoap(response.data)
      } catch (err) {
        console.log(err)
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
      console.log('mappedDataObat', mappedData)

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
        setPenilaian(`${response.data[0].kd_penyakit}, ${response.data[0].nm_penyakit}`)
        setKdPenyakit(response.data[0].kd_penyakit)
      }
    } catch (err) {
      console.log('exist diagnosa error', err)
    }
  }

  // cek no rawat jika sudah ada
  const checkExistNoResep = async () => {
    try {
      const response = await api.get(
        `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${nmrRawat}`,
      )
      console.log(response.data[0])
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
          console.log(res.data)
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
      setDiagnosa(
        (prevValue) =>
          `${
            prevValue ? prevValue + '\n' : ''
          }-KONTROL KEMBALI-\nAlasan: ${alasan}\nRTL: ${rtl}\nTanggal Datang: ${dateNow}\nTanggal Rujukan: ${selectedDate}\n`,
      )
    }
    // const data = {
    //   noRkmMedis: id,
    //   diagnosa: penilaian,
    //   terapi: 'Some Therapy',
    //   alasan1: alasan,
    //   alasan2: alasan,
    //   rtl1: rtl,
    //   rtl2: rtl,
    //   tanggalDatang: dateNow,
    //   tanggalRujukan: selectedDate,
    //   noAntrian: noAntrian,
    //   kdDokter: nipCredentials,
    //   status: 'Menunggu',
    // }
    // let response: AxiosResponse<any> | undefined
    // try {
    //   response = await api.post('/api/v1/insertSkdpBpjs', data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   console.log('diagnosa', response.data)
    //   spesificSuccess({ doneMessage: 'Rencana Kontrol Berhasil Dikirim' })
    // } catch (err) {
    //   errorPostSoap()
    // } finally {
    //   if (response) {
    //   }
    // }
  }

  const postDiagnosa = async () => {
    const data = {
      noRawat: nmrRawat,
      status: 'Ralan',
      kdPenyakit: kdPenyakit,
      prioritas: '1',
      statusPenyakit: 'Baru',
    }
    try {
      const response = await api.post('/api/v1/insertDiagnosaPasien', data)
      console.log('diagnosa dikirim', response.data)
    } catch (error) {
      console.log('diagnosa gagal dikirim', error)
    }
  }

  const postResep = async () => {
    const data = {
      noRawat: nmrRawat,
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
            const res = await api.post('/api/v1/postResepDokter', resepDokterData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            console.log('Berhasil')
            console.log(res.data)
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

        // Checking Exist Selected Medicine Data,
        if (existingMedicines.includes(medicineData.kode)) {
          console.log('Medicine already exists, skipping:', medicineData)
          continue
        }

        const resepDokterData = {
          noResep: nmrResep,
          kodeBrng: medicineData.kode,
          jml: Math.round(medicineData.jumlahObat * 55) / 54,
          aturanPakai: medicineData.aturanPakai,
        }

        try {
          const res = await api.post('/api/v1/postResepDokter', resepDokterData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log('Berhasil')
          console.log(res.data)
          console.log('obat berhasil :', resepDokterData)
        } catch (err) {
          console.log('obat error :', resepDokterData)
          console.log(err)
        }
      }
    }
    console.log('no rawat sudah ada, skip')
  }

  // NEED FIX BEFORE ACTIVE AGAIN
  // const handlePostSoap = async () => {
  //   const dataPetugas = {
  //     noRawat: nmrRawat,
  //     suhuTubuh: suhu,
  //     tensi: tensi,
  //     nadi: nadi,
  //     respirasi: rr,
  //     tinggi: tinggi,
  //     berat: berat,
  //     spo2: spo2,
  //     gcs: gcs,
  //     kesadaran: kesadaran,
  //     keluhan: subjektif,
  //     pemeriksaan: '',
  //     alergi: alergi,
  //     lingkarPerut: '',
  //     rtl: '',
  //     penilaian: penilaian,
  //     instruksi: instruksi,
  //     evaluasi: evaluasi,
  //     nip: nipCredentials,
  //   }
  //   const dataDokter = {
  //     keluhan: subjektif || tindakan,
  //     noRawat: nmrRawat,
  //     pemeriksaan: objectPemeriksaan,
  //     nip: nipCredentials,
  //     penilaian: penilaian,
  //     rtl: plan || rtl,
  //     evaluasi: evaluasi || diagnosa,
  //     instruksi: instruksi,
  //   }

  //   if (role.includes('petugas')) {
  //     if (!suhu) {
  //       spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
  //     } else if (!tensi) {
  //       spesificError({ errMessage: 'Masukan Data Tensi.' })
  //     } else if (!nadi) {
  //       spesificError({ errMessage: 'Masukan Data nadi' })
  //     } else if (!rr) {
  //       spesificError({ errMessage: 'Masukan Data RR.' })
  //     } else if (!tinggi) {
  //       spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
  //     } else if (!berat) {
  //       spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
  //     } else if (!spo2) {
  //       spesificError({ errMessage: 'Masukan Data SPO2' })
  //     } else if (!alergi) {
  //       spesificError({ errMessage: 'Masukan Data alergi.' })
  //     } else if (!kesadaran) {
  //       spesificError({ errMessage: 'Masukan Data Kesadaran Pasien' })
  //     } else {
  //       try {
  //         const response = await api.post(
  //           '/api/v1/postPemeriksaanRalan',
  //           JSON.stringify(dataPetugas),
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         console.log('BERHASIL MENGIRIM(petugas) ,POST response:', response.data)
  //         await handleChangeStatusPetugas()
  //         window.location.reload()
  //       } catch (error) {
  //         console.log('error petugas', error)
  //       }
  //     }
  //   } else if (role.includes('dokter')) {
  //     if (!tindakan && !subjektif) {
  //       spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
  //     } else if (!objectPemeriksaan) {
  //       spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
  //     } else if (!penilaian) {
  //       spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
  //     } else if (Object.keys(selectedMedicines).length === 0) {
  //       spesificError({ errMessage: 'Tidak Ada Obat yang dipilih. Mohon Untuk Memasukan Obat.' })
  //     } else if (!instruksi) {
  //       spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
  //     } else {
  //       try {
  //         const response = await api.put(
  //           '/api/v1/updatePemeriksaanRalan',
  //           JSON.stringify(dataDokter),
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         await postResep()
  //         await postDiagnosa()
  //         await handleChangeStatusDokter()
  //         console.log(response)
  //         window.location.reload()
  //       } catch (err) {
  //         console.log('err dokter put', err)
  //       }
  //     }
  //   }
  // }

  // NEED FIX BEFORE ACTIVE AGAIN(2)
  // const handlePostSoap = async () => {
  //   const dataBelumPeriksa = {
  //     noRawat: nmrRawat,
  //     suhuTubuh: suhu || '0',
  //     tensi: tensi || '0/0',
  //     nadi: nadi || '0',
  //     respirasi: rr || '0',
  //     tinggi: tinggi || '0',
  //     berat: berat || '0',
  //     spo2: spo2 || '0',
  //     gcs: gcs || '0',
  //     kesadaran: kesadaran || 'Compos Mentis',
  //     keluhan: subjektif || tindakan,
  //     pemeriksaan: objectPemeriksaan,
  //     alergi: alergi || '-',
  //     // eslint-disable-next-line camelcase
  //     lingkar_perut: '-',
  //     penilaian: dataSoap[0]?.penilaian || penilaian,
  //     rtl: plan || rtl,
  //     evaluasi: evaluasi || diagnosa,
  //     instruksi: instruksi,
  //     nip: nipCredentials,
  //   }
  //   const dataBerkasDiterima = {
  //     noRawat: nmrRawat,
  //     suhuTubuh: suhu || dataSoap[0]?.suhu_tubuh,
  //     tensi: tensi || dataSoap[0]?.tensi,
  //     nadi: nadi || dataSoap[0]?.nadi,
  //     respirasi: rr || dataSoap[0]?.respirasi,
  //     tinggi: tinggi || dataSoap[0]?.tinggi,
  //     berat: berat || dataSoap[0]?.berat,
  //     spo2: spo2 || dataSoap[0]?.spo2,
  //     gcs: gcs || dataSoap[0]?.gcs,
  //     // eslint-disable-next-line camelcase
  //     lingkar_perut: '-',
  //     kesadaran: dataSoap[0]?.kesadaran || kesadaran || 'Compos Mentis',
  //     alergi: alergi || dataSoap[0]?.alergi,
  //     penilaian: dataSoap[0]?.penilaian || penilaian,
  //     instruksi: dataSoap[0]?.instruksi || instruksi,
  //     keluhan: dataSoap[0]?.keluhan || subjektif || tindakan,
  //     pemeriksaan: dataSoap[0]?.pemeriksaan || objectPemeriksaan,
  //     nip: nipCredentials,
  //     rtl: dataSoap[0]?.rtl || plan || rtl,
  //     evaluasi: dataSoap[0]?.evaluasi || evaluasi || diagnosa,
  //   }

  //   if (sttsRawat === 'Belum') {
  //     if (role.includes('petugas')) {
  //       if (!suhu) {
  //         spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
  //       } else if (!tensi) {
  //         spesificError({ errMessage: 'Masukan Data Tensi.' })
  //       } else if (!nadi) {
  //         spesificError({ errMessage: 'Masukan Data nadi' })
  //       } else if (!rr) {
  //         spesificError({ errMessage: 'Masukan Data RR.' })
  //       } else if (!tinggi) {
  //         spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
  //       } else if (!berat) {
  //         spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
  //       } else if (!spo2) {
  //         spesificError({ errMessage: 'Masukan Data SPO2' })
  //       } else if (!alergi) {
  //         spesificError({ errMessage: 'Masukan Data alergi.' })
  //       } else {
  //         try {
  //           const response = await api.post(
  //             '/api/v1/postPemeriksaanRalan',
  //             JSON.stringify(dataBelumPeriksa),
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           )
  //           console.log('BERHASIL MENGIRIM(sebelum Periksa) ,POST response:', response.data)
  //           await postResep()
  //           await postDiagnosa()
  //           await handleChangeStatusFirstSend()
  //           navigate('/rawat-jalan/')
  //           window.location.reload()
  //         } catch (error) {
  //           console.log('error petugas', error)
  //           spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
  //         }
  //       }
  //     } else if (role.includes('dokter')) {
  //       if (!tindakan && !subjektif) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
  //       } else if (!objectPemeriksaan) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
  //       } else if (!penilaian) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
  //       } else if (Object.keys(selectedMedicines).length === 0) {
  //         spesificError({ errMessage: 'Tidak Ada Obat yang dipilih. Mohon Untuk Memasukan Obat.' })
  //       } else if (!instruksi) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
  //       } else {
  //         try {
  //           const response = await api.post(
  //             '/api/v1/postPemeriksaanRalan',
  //             JSON.stringify(dataBelumPeriksa),
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           )
  //           console.log('BERHASIL MENGIRIM(sebelum Periksa) ,POST response:', response.data)
  //           await postResep()
  //           await postDiagnosa()
  //           await handleChangeStatusFirstSend()
  //           navigate('/rawat-jalan/')
  //           window.location.reload()
  //         } catch (error) {
  //           console.log('error petugas', error)
  //           spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
  //         }
  //       }
  //     }
  //   } else if (sttsRawat === 'Berkas Diterima') {
  //     if (role.includes('petugas')) {
  //       if (!suhu) {
  //         spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
  //       } else if (!tensi) {
  //         spesificError({ errMessage: 'Masukan Data Tensi.' })
  //       } else if (!nadi) {
  //         spesificError({ errMessage: 'Masukan Data nadi' })
  //       } else if (!rr) {
  //         spesificError({ errMessage: 'Masukan Data RR.' })
  //       } else if (!tinggi) {
  //         spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
  //       } else if (!berat) {
  //         spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
  //       } else if (!spo2) {
  //         spesificError({ errMessage: 'Masukan Data SPO2' })
  //       } else if (!alergi) {
  //         spesificError({ errMessage: 'Masukan Data alergi.' })
  //       } else {
  //         try {
  //           const response = await api.put(
  //             '/api/v1/updatePemeriksaanRalan',
  //             JSON.stringify(dataBerkasDiterima),
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           )
  //           await postResep()
  //           await postDiagnosa()
  //           await handleChangeStatusSecondSend()
  //           console.log(response)
  //           navigate('/rawat-jalan/')
  //           window.location.reload()
  //         } catch (err) {
  //           console.log('err dokter put', err)
  //           spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
  //         }
  //       }
  //     } else if (role.includes('dokter')) {
  //       if (!tindakan && !subjektif) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
  //       } else if (!objectPemeriksaan) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
  //       } else if (!penilaian) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
  //       } else if (Object.keys(selectedMedicines).length === 0) {
  //         spesificError({ errMessage: 'Tidak Ada Obat yang dipilih. Mohon Untuk Memasukan Obat.' })
  //       } else if (!instruksi) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
  //       } else if (!evaluasi && !diagnosa) {
  //         spesificError({ errMessage: 'Mohon Memasukan Data Evaluasi.' })
  //       } else {
  //         try {
  //           const response = await api.post(
  //             '/api/v1/postPemeriksaanRalan',
  //             JSON.stringify(dataBerkasDiterima),
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           )
  //           console.log('BERHASIL MENGIRIM(sebelum Periksa) ,POST response:', response.data)
  //           await postResep()
  //           await postDiagnosa()
  //           await handleChangeStatusFirstSend()
  //           navigate('/rawat-jalan/')
  //           window.location.reload()
  //         } catch (error) {
  //           console.log('error petugas', error)
  //           spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
  //         }
  //       }
  //     }
  //   } else {
  //     spesificError({ errMessage: 'Sudah Selesai Periksa. Tidak Bisa Mengirim' })
  //   }
  // }

  const handlePostSoap = async () => {
    // EVALUSI STRING LOGIC
    const [laborDataValue, diagnosaValue, evaluasiValue, dataSoapValue] = [
      laborData,
      diagnosa,
      evaluasi,
      dataSoap[0]?.evaluasi,
    ]

    const evaluasiToSend = [laborDataValue, diagnosaValue, evaluasiValue, dataSoapValue]
      .filter(Boolean)
      .map((value) => value || '')
      .join('\n')

    const dataPost = {
      noRawat: nmrRawat,
      suhuTubuh: suhu,
      tensi: tensi,
      nadi: nadi,
      respirasi: rr,
      tinggi: tinggi,
      berat: berat,
      spo2: spo2,
      gcs: gcs,
      kesadaran: kesadaran || 'Compos Mentis',
      keluhan: subjektif || tindakan,
      pemeriksaan: objectPemeriksaan,
      alergi: alergi,
      // eslint-disable-next-line camelcase
      lingkar_perut: '-',
      penilaian: dataSoap[0]?.penilaian || penilaian,
      rtl: plan || rtl,
      evaluasi: evaluasiToSend || dataSoap[0]?.evaluasi,
      instruksi: instruksi,
      nip: nipCredentials,
    }
    const dataPut = {
      noRawat: nmrRawat,
      suhuTubuh: suhu || dataSoap[0]?.suhu_tubuh,
      tensi: tensi || dataSoap[0]?.tensi,
      nadi: nadi || dataSoap[0]?.nadi,
      respirasi: rr || dataSoap[0]?.respirasi,
      tinggi: tinggi || dataSoap[0]?.tinggi,
      berat: berat || dataSoap[0]?.berat,
      spo2: spo2 || dataSoap[0]?.spo2,
      gcs: gcs || dataSoap[0]?.gcs,
      // eslint-disable-next-line camelcase
      lingkar_perut: '-',
      kesadaran: dataSoap[0]?.kesadaran || kesadaran || 'Compos Mentis',
      alergi: alergi || dataSoap[0]?.alergi,
      penilaian: penilaian || dataSoap[0]?.penilaian,
      instruksi: instruksi || dataSoap[0]?.instruksi,
      keluhan: subjektif || tindakan || dataSoap[0]?.keluhan,
      pemeriksaan: objectPemeriksaan || dataSoap[0]?.pemeriksaan,
      nip: nipCredentials,
      rtl: plan || rtl || dataSoap[0]?.rtl,
      evaluasi: evaluasiToSend || dataSoap[0]?.evaluasi,
    }
    try {
      const response = await api.get(`/api/v1/checkPemeriksaanRalan?noRawat=${nmrRawat}`)
      const message = response.data.message

      if (message === 'Belum ada data pemeriksaaan.') {
        if (role.includes('petugas')) {
          if (!suhu) {
            spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
          } else if (!tensi) {
            spesificError({ errMessage: 'Masukan Data Tensi.' })
          } else if (!nadi) {
            spesificError({ errMessage: 'Masukan Data nadi' })
          } else if (!rr) {
            spesificError({ errMessage: 'Masukan Data RR.' })
          } else if (!tinggi) {
            spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
          } else if (!berat) {
            spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
          } else if (!spo2) {
            spesificError({ errMessage: 'Masukan Data SPO2' })
          } else if (!alergi) {
            spesificError({ errMessage: 'Masukan Data alergi.' })
          } else if (!tindakan && !subjektif) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
          } else if (!objectPemeriksaan) {
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
          if (!tindakan && !subjektif) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
          } else if (!objectPemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else if (!penilaian) {
            spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
            // } else if (Object.keys(selectedMedicines).length === 0) {
            //   spesificError({
            //     errMessage: 'Tidak Ada Obat yang dipilih. Mohon Untuk Memasukan Obat.',
            //   })
          } else if (!dataSoap[0]?.rtl && !plan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Plan' })
          } else if (!instruksi) {
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
                await postResep()
                await postDiagnosa()
                await handleChangeStatusFirstSend()
                // navigate('/rawat-jalan/')
                // window.location.reload()
              } catch (error) {
                console.log('error dokter post', error)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
              } finally {
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
          if (!suhu) {
            spesificError({ errMessage: 'Masukan Data Suhu Tubuh.' })
          } else if (!tensi) {
            spesificError({ errMessage: 'Masukan Data Tensi.' })
          } else if (!nadi) {
            spesificError({ errMessage: 'Masukan Data nadi' })
          } else if (!rr) {
            spesificError({ errMessage: 'Masukan Data RR.' })
          } else if (!tinggi) {
            spesificError({ errMessage: 'Masukan Data Tinggi Pasien.' })
          } else if (!berat) {
            spesificError({ errMessage: 'Masukan Data Berat Pasien.' })
          } else if (!spo2) {
            spesificError({ errMessage: 'Masukan Data SPO2' })
          } else if (!alergi) {
            spesificError({ errMessage: 'Masukan Data alergi.' })
          } else if (!dataSoap[0].keluhan && (!subjektif || !tindakan)) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif..' })
          } else if (!dataSoap[0]?.pemeriksaan && !objectPemeriksaan) {
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

                setIsLoading(true)
                await handleChangeStatusSecondSend()
                console.log(response)
              } catch (err) {
                console.log('err petugas put', err)
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
          //           if (!dataSoap[0].keluhan && (!subjektif || !tindakan))
          if (!dataSoap[0].keluhan && (!subjektif || !tindakan)) {
            spesificError({ errMessage: 'Mohon Memasukan Data Subjektif..' })
          } else if (!dataSoap[0]?.pemeriksaan && !objectPemeriksaan) {
            spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
          } else if (!dataSoap[0]?.penilaian && !penilaian) {
            spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
          } else if (!dataSoap[0]?.instruksi && !instruksi) {
            spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
          } else if (!dataSoap[0]?.rtl && !plan) {
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
                await postResep()
                await postDiagnosa()
                await handleChangeStatusSecondSend()
              } catch (error) {
                console.log('error dokter put', error)
                spesificError({ errMessage: 'Terjadi Kesalahan tidak terduga, error.' })
              } finally {
                navigate('/rawat-jalan/')
                window.location.reload()
              }
            } else {
              spesificError({ errMessage: 'Aborted' })
            }
          }
        }
      }
    } catch (err) {
      console.log('ini error apa?', err)
    }
  }

  const handlePilihPenyakit = async (kode: string, nama: string) => {
    setKdPenyakit(kode)
    setListPenyakit([])
    setPenilaian((prevValue) => `${prevValue}\n${kode}, ${nama}`)
  }

  const handlePilihTindakan = async (kode, nmPerawatan) => {
    setSubjektif((prevValue) => `${prevValue}${kode}, ${nmPerawatan}\n`)
    setTindakan((prevValue) => `${prevValue}${kode}, ${nmPerawatan}\n`)
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
        // If medicine is already selected, increase the quantity
        newSelectedMedicines[kode] = {
          ...newSelectedMedicines[kode],
          nama: nama,
          jumlahObat: jumlahObat,
          aturanPakai: aturanPakai,
          kode: kode,
        }
      } else {
        // If medicine is selected for the first time, add it to the state
        newSelectedMedicines[kode] = { nama, aturanPakai, jumlahObat, kode }
      }

      // Generate plan string here when selecting a new medicine
      const planString = generatePlanString(newSelectedMedicines)
      setPlan(planString)

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

    // Join the array into a single string
    return planArray.join('\n')
  }

  // const testSimpan = async () => {
  //   const planString = generatePlanString(selectedMedicines)
  //   setPlan(planString)
  //   setAturanPakai('')
  //   setListObat([])
  //   console.log(planString)
  //   console.log(selectedMedicines)
  // }

  const modalLaborInputOpen = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.open()
    }
    console.log('Open')
  }

  const modalLaborInputClose = () => {
    if (modalLaborRef.current) {
      modalLaborRef.current.close()
    }
    console.log('Close')
  }

  return (
    <div className='max-w-7xl mt-4'>
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
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.suhu_tubuh : 'Loading'}
                    defaultValue={dataSoap[0]?.suhu_tubuh || suhu}
                    onChange={(e) => setSuhu(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Tensi(mmHg)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.tensi : 'Loading'}
                    defaultValue={dataSoap[0]?.tensi || tensi}
                    onChange={(e) => setTensi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Nadi(/mnt)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.nadi : 'Loading'}
                    defaultValue={dataSoap[0]?.nadi || nadi}
                    onChange={(e) => setNadi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>RR(/mnt)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.respirasi : 'Loading'}
                    defaultValue={dataSoap[0]?.respirasi || rr}
                    onChange={(e) => setRr(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Tinggi(cm)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.tinggi : 'Loading'}
                    defaultValue={dataSoap[0]?.tinggi || tinggi}
                    onChange={(e) => setTinggi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Berat(kg)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    // value={dataSoap ? dataSoap[0]?.berat : 'Loading'}
                    defaultValue={dataSoap[0]?.berat || berat}
                    onChange={(e) => setBerat(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>SPO2</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    defaultValue={dataSoap[0]?.spo2 || spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>GCS(E,V,M)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    defaultValue={dataSoap[0]?.gcs || gcs}
                    onChange={(e) => setGcs(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Alergi</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    defaultValue={dataSoap[0]?.alergi || alergi}
                    onChange={(e) => setAlergi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control '>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Kesadaran</span>
                  </label>
                  <select
                    className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                    defaultValue={dataSoap[0]?.kesadaran || kesadaran}
                    onChange={(e) => setSelectedKesadaran(e.target.value)}
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
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    value={subjektif || tindakan || dataSoap[0]?.keluhan}
                    onChange={(e) => setSubjektif(e.target.value)}
                  />
                </div>
                {/* {dataSoap[0]?.keluhan || tindakan ? (
                  <>
                    <p className='p-3 bg-slate-600 w-fit h-fit rounded-xl mt-3 ml-1 text-xs text-gray-100'>
                      {tindakan}
                    </p>
                  </>
                ) : null} */}
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
                                    handlePilihTindakan(data?.kd_jenis_prw, data?.nm_perawatan)
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
                  defaultValue={dataSoap[0]?.pemeriksaan || objectPemeriksaan}
                  className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  onChange={(e) => setObjectPemeriksaan(e.target.value)}
                />
              </div>
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
              defaultValue={penilaian || dataSoap[0]?.penilaian}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              onChange={(e) => setPenilaian(e.target.value)}
              disabled={role.includes('petugas')}
            />
          </div>
          <div className='mt-4'>
            <label>Cari Penyakit</label>
            <div className='flex relative mt-1'>
              <input
                type='text'
                value={searchTerm}
                disabled={role.includes('petugas')}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                placeholder='Kanker'
              />
            </div>
            {listPenyakit.length > 0 ? (
              <div className='mt-4 pt-4'>
                <div className='h-56 overflow-auto'>
                  <table className='table w-full'>
                    <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                      <th className=''>NO</th>
                      <th className=''>KODE PENYAKIT</th>
                      <th className=''>NAMA PENYAKIT</th>
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
                              disabled={role.includes('petugas')}
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
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              // value={plan}
              value={plan || dataSoap[0]?.rtl}
              disabled={role.includes('petugas')}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <label>Cari Obat</label>
            <div className='flex relative mt-1'>
              <input
                type='text'
                disabled={role.includes('petugas')}
                onChange={(e) => setSearchTermObat(e.target.value)}
                className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
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
                <div className='mt-4 pt-4 h-full overflow-auto'>
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
                              className='w-32 input input-bordered'
                            />
                          </td>
                          <td>
                            <button
                              id={`button_${index}`}
                              className='underline'
                              disabled={role.includes('petugas') || !aturanPakai || !jumlahObat}
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
                                    onChange={(e) => setJumlahObat(parseFloat(e.target.value))}
                                    defaultValue={data.jumlahObat || jumlahObat}
                                    className='w-20 h-10 input input-bordered'
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault()
                                        const button = document.getElementById(`button__${index}`)
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
                                          const button = document.getElementById(`button__${index}`)
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
                              <td className='flex justify-center gap-3'>
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
                </div>
              </>
            ) : null}

            {/* {selectedMedicines && Object.keys(selectedMedicines).length > 0 ? (
              <div className='mt-3 flex justify-end'>
                <button
                  disabled={role.includes('petugas')}
                  onClick={testSimpan}
                  className='w-24 p-3 rounded-xl bg-primary text-white font-semibold ml-4'
                >
                  Simpan
                </button>
              </div>
            ) : null} */}
          </div>
        </div>
        <div className='border border-slate-300 rounded-lg p-3'>
          <div className='form-control'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Instruksi</span>
            </label>
            <textarea
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              // value={dataSoap ? dataSoap[0]?.instruksi : instruksi}
              defaultValue={dataSoap[0]?.instruksi || instruksi}
              onChange={(e) => setInstruksi(e.target.value)}
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
              value={[laborData, diagnosa, evaluasi, dataSoap[0]?.evaluasi]
                .filter(Boolean)
                .map((value) => value || '')
                .join('\n')}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              onChange={(e) => setEvaluasi(e.target.value)}
            />
          </div>
          <div className='flex justify-between mt-3 p-2'>
            <div>
              <label className='label'>Tanggal Balik</label>
              <input
                disabled={role.includes('petugas')}
                type='date'
                className='input border border-slate-400'
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label className='label'>Alasan</label>
              <input
                type='text'
                disabled={role.includes('petugas')}
                className='input border border-slate-400'
                onChange={(e) => setAlasan(e.target.value)}
              />
            </div>
            <div>
              <label className='label'>RTL</label>
              <input
                type='text'
                disabled={role.includes('petugas')}
                className='input border border-slate-400'
                onChange={(e) => setRtl(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              disabled={role.includes('petugas')}
              className='btn btn-md bg-primary text-white'
              onClick={postRencanKontrol}
            >
              Simpan
            </button>
          </div>
        </div>
        <div className=' w-auto mt-4'>
          <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
            <InformationCircleIcon width={25} height={25} />
            <p className='ml-[6px]'>Informasi</p>
          </div>
          <p className='w-full font-sans text-red-400 animate-pulse text-base font-normal leading-5'>
            Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam
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
            <button
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary-500 rounded-xl hover:opacity-80'
              onClick={modalLaborInputOpen}
            >
              PERMINTAAN LABORATORIUM
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
      <ModalLaborInput
        ref={modalLaborRef}
        onClose={modalLaborInputClose}
        onLaborData={handleLaborData}
      />
    </div>
  )
}

export default InsertSoapRalan
