import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { errorPostSoap, spesificError } from '../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom'
import { formatSelectedDate, formatSelectedDateNow } from '../../utils/DateNow'
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
  lingkarPerut: string
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
  // const [toast, setToast] = useState('')
  const [rtl, setRtl] = useState('')
  const [kdPenyakit, setKdPenyakit] = useState('')
  const [alasan, setAlasan] = useState('')
  const [diagnosa, setDiagnosa] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [editObat, setEditObat] = useState(false)
  const [isListDignosaOpen, setIsListDiagonsaOpen] = useState(false)
  const [isListObatOpen, setIsListObatOpen] = useState(false)
  const [isListTindakaOpen, setIsListTindakanOpen] = useState(false)
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

  const nmrRawat = localStorage.getItem('no_rawat')
  const noAntrian = localStorage.getItem('no_antrian')
  const dateNow = formatSelectedDateNow()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]
  const { id } = useParams()

  console.log('antrian', noAntrian)

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

  const handleChangeStatusDokter = async () => {
    try {
      const response = await api.put(
        `api/v1/updateRegPeriksaStts?noRawat=${nmrRawat}&newStatus=Sudah`,
      )
      console.log(response)
    } catch (err) {
      console.log('Status Gagal Diubah', err)
    }
  }
  const handleChangeStatusPetugas = async () => {
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
      return newSelectedMedicines
    })
  }

  const handleEditObat = () => {
    setEditObat(true)
  }

  useEffect(() => {
    const fetchDataSoap = async () => {
      try {
        const response = await api.get(
          `api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${nmrRawat}`,
        )
        setDataSoap(response.data)
        console.log('data soap', response.data)
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

  const checkExistDiagnosa = async () => {
    try {
      const response = await api.get(
        `http://rsudsamrat.site:8901/api/v1/getDiagnosaPasien?noRawat=${nmrRawat}`,
      )
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
      }
    } catch (err) {
      console.log('Tidak Ada no resep', err)
    }
  }

  const postRencanKontrol = async () => {
    const data = {
      noRkmMedis: id,
      diagnosa: penilaian,
      terapi: 'Some Therapy',
      alasan1: alasan,
      alasan2: alasan,
      rtl1: rtl,
      rtl2: rtl,
      tanggalDatang: selectedDate,
      tanggalRujukan: dateNow,
      noAntrian: noAntrian,
      kdDokter: nipCredentials,
      status: 'Menunggu',
    }
    try {
      const response = await api.post('/api/v1/insertSkdpBpjs', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('diagnosa', response.data)
      setDiagnosa(
        `Kode: ${response.data.diagnosa}\nAlasan: ${response.data.alasan1}\nrtl: ${response.data.rtl1}\nTanggal Datang: ${response.data.tanggal_datang}\nTanggal Kembali${response.data.tanggal_rujukan}`,
      )
    } catch (err) {
      errorPostSoap()

      console.log(err)
    }
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
      for (const key in selectedMedicines) {
        const medicineData = selectedMedicines[key]
        console.log(medicineData)

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
        } catch (err) {
          console.log('obat :', resepDokterData)
          console.log(err)
        }
      }
    }
    console.log('no rawat sudah ada, skip')
  }

  const handleGetPenyakit = async () => {
    try {
      const response = api.get(`/api/v1/getAllPenyakit?searchString=${searchTerm}`)
      setListPenyakit((await response).data)
      setIsListDiagonsaOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetObat = async () => {
    try {
      const response = api.get(`/api/v1/searchDatabarang?searchString=${searchTermObat}`)
      setListObat((await response).data)
      setIsListObatOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetTindakan = async () => {
    try {
      const response = await api.get(`api/v1/searchJnsPerawatan?keyword=${searchTermTindakan}`)
      setListTindakan(response.data)
      setIsListTindakanOpen(true)
      console.log('tindakan', response.data)
    } catch (err) {
      spesificError({ errMessage: 'Data Tindakan Tidak Ditemukan. Mohon Cari Lagi' })
      console.log(err)
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchTermObatChange = (event) => {
    setSearchTermObat(event.target.value)
  }

  const handleSearchTermTindakanChange = (event) => {
    setSearchTermTindakan(event.target.value)
  }

  const handlePostSoap = async () => {
    const dataPetugas = {
      noRawat: nmrRawat,
      suhuTubuh: suhu,
      tensi: tensi,
      nadi: nadi,
      respirasi: rr,
      tinggi: tinggi,
      berat: berat,
      spo2: spo2,
      gcs: gcs,
      kesadaran: kesadaran,
      keluhan: subjektif,
      pemeriksaan: '',
      alergi: alergi,
      lingkarPerut: '',
      rtl: '',
      penilaian: penilaian,
      instruksi: instruksi,
      evaluasi: evaluasi,
      nip: nipCredentials,
    }
    const dataDokter = {
      keluhan: subjektif || tindakan,
      noRawat: nmrRawat,
      pemeriksaan: objectPemeriksaan,
      nip: nipCredentials,
      penilaian: penilaian,
      rtl: plan || rtl,
      evaluasi: evaluasi || diagnosa,
      instruksi: instruksi,
    }

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
      } else if (!kesadaran) {
        spesificError({ errMessage: 'Masukan Data Kesadaran Pasien' })
      } else {
        try {
          const response = await api.post(
            '/api/v1/postPemeriksaanRalan',
            JSON.stringify(dataPetugas),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          console.log('BERHASIL MENGIRIM(petugas) ,POST response:', response.data)
          await handleChangeStatusPetugas()
          window.location.reload()
        } catch (error) {
          console.log('error petugas', error)
        }
      }
    } else if (role.includes('dokter')) {
      if (!tindakan && !subjektif) {
        spesificError({ errMessage: 'Mohon Memasukan Data Subjektif.' })
      } else if (!objectPemeriksaan) {
        spesificError({ errMessage: 'Mohon Memasukan Data Object.' })
      } else if (!penilaian) {
        spesificError({ errMessage: 'Mohon Memasukan Data Assesmen.' })
      } else if (Object.keys(selectedMedicines).length === 0) {
        spesificError({ errMessage: 'Tidak Ada Obat yang dipilih. Mohon Untuk Memasukan Obat.' })
      } else if (!instruksi) {
        spesificError({ errMessage: 'Mohon Memasukan Data Instruksi.' })
      } else {
        try {
          const response = await api.put(
            '/api/v1/updatePemeriksaanRalan',
            JSON.stringify(dataDokter),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          await postResep()
          await postDiagnosa()
          await handleChangeStatusDokter()
          console.log(response)
          window.location.reload()
        } catch (err) {
          console.log('err dokter put', err)
        }
      }
    }
  }

  const handlePilihPenyakit = async (kode: string, nama: string) => {
    setKdPenyakit(kode)
    setPenilaian(`${kode}, ${nama} `)
    setIsListDiagonsaOpen(false)
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
      return newSelectedMedicines
    })
  }

  const handlePilihTindakan = async (kode, nmPerawatan) => {
    setTindakan(kode + ' ' + nmPerawatan)
    console.log(tindakan)
    setIsListTindakanOpen(false)
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
        console.log(response.data)
      } catch (err) {
        console.log('Error sending treatment data:', err)
      }
    } else {
      console.log('Data sending cancelled.')
    }
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

  const testSimpan = async () => {
    const planString = generatePlanString(selectedMedicines)
    setPlan(planString)
    setAturanPakai('')
    setIsListObatOpen(false)
    console.log(planString)
    console.log(selectedMedicines)
  }

  return (
    <div className='w-full mt-4 '>
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
            <div className='flex'>
              <div className='form-control w-full'>
                <label className='label'>
                  <span>Tanggal</span>
                </label>
                <input
                  type='date'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-full'
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </div>
              <div className='form-control ml-4'>
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
            <div className='border border-slate-500 rounded-lg mt-5 p-3'>
              <label className='font-semibold text-slate-700 text-md'>VITALITY SIGN</label>
              <div className='flex justify-between'>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Suhu(C)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.suhu_tubuh : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.tensi : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.nadi : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.respirasi : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.tinggi : 'Loading'}
                    onChange={(e) => setTinggi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Berat(kg)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.berat : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.spo2 : 'Loading'}
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
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                    value={dataSoap ? dataSoap[0]?.gcs : 'Loading'}
                    onChange={(e) => setGcs(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Alergi</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled w-[320px]'
                    value={dataSoap ? dataSoap[0]?.alergi : 'Loading'}
                    onChange={(e) => setAlergi(e.target.value)}
                    disabled={role.includes('dokter')}
                  />
                </div>
              </div>
              <div className='form-control mt-6'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Kesadaran</span>
                </label>
                <select
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[540px]'
                  value={dataSoap ? dataSoap[0]?.kesadaran : KesadaranOptions.ComposMentis}
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
                {role.includes('dokter') && (
                  <>
                    <p className='text-center p-3'>VITALITY SIGN DI ISI OLEH PERAWAT</p>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className='mt-3 border border-slate-400 p-3 rounded-lg'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Subjektif</span>
                  </label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    defaultValue={tindakan || subjektif}
                    onChange={(e) => setSubjektif(e.target.value)}
                    disabled={role.includes('petugas')}
                  />
                </div>
                <label className='label'>Cari Tindakan</label>
                <div className='flex relative mt-1'>
                  <input
                    type='text'
                    className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                    placeholder='Tindakan'
                    onChange={handleSearchTermTindakanChange}
                  />
                  <button
                    onClick={handleGetTindakan}
                    className='flex justify-center items-center w-24 p-2 rounded-xl bg-primary text-white font-semibold ml-4'
                  >
                    <MagnifyingGlassIcon width={20} height={20} className=' mr-1' />
                    Cari
                  </button>
                </div>
                <div className='overflow-auto'>
                  {isListTindakaOpen && (
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
                              className='btn btn-sm bg-none'
                              onClick={() => setIsListTindakanOpen(false)}
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
                                  disabled={role.includes('petugas')}
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
                  )}
                </div>
              </div>
            </div>
            <div className='border border-slate-400 rounded-lg p-3 mt-4'>
              <div className='form-control'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Object</span>
                </label>
                <textarea
                  placeholder='-'
                  defaultValue={dataSoap ? dataSoap[0]?.pemeriksaan : objectPemeriksaan}
                  className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  disabled={role.includes('petugas')}
                  onChange={(e) => setObjectPemeriksaan(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <div className='border border-slate-500 rounded-lg p-3'>
          <div className='form-control'>
            <div className='flex justify-between p-2'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Asesmen</span>
              </label>
            </div>
            <textarea
              placeholder='-'
              value={penilaian}
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
                onChange={handleSearchTermChange}
                className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                placeholder='Kanker'
              />
              <button
                className=' flex justify-center items-center w-24 p-2 rounded-xl bg-primary text-white font-semibold ml-4'
                disabled={searchTerm.length <= 1}
                onClick={handleGetPenyakit}
              >
                <MagnifyingGlassIcon width={20} height={20} className=' mr-1' />
                Cari
              </button>
            </div>
            <div className='mt-4 pt-4'>
              {isListDignosaOpen && (
                <div className=''>
                  <table className='table w-full'>
                    <thead className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                      <th className=''>NO</th>
                      <th className=''>KODE PENYAKIT</th>
                      <th className=''>NAMA PENYAKIT</th>
                      <th className=''>AKSI</th>
                      <th>
                        <button
                          className='btn btn-sm bg-none'
                          onClick={() => setIsListDiagonsaOpen(false)}
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
              )}
            </div>
          </div>
        </div>
        <div className='border border-slate-500 p-3 rounded-lg mt-5 mb-5'>
          <div className='form-control'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Plan</span>
            </label>
            <textarea
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              disabled={role.includes('petugas')}
            />
          </div>
          <div className='mt-4'>
            <label>Cari Obat</label>
            <div className='flex relative mt-1'>
              <input
                type='text'
                onChange={handleSearchTermObatChange}
                className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
                placeholder='Paracetamol'
              />
              <button
                className='flex justify-center items-center w-24 p-2 rounded-xl bg-primary text-white font-semibold ml-4'
                disabled={searchTermObat.length <= 1}
                onClick={handleGetObat}
              >
                <MagnifyingGlassIcon width={20} height={20} className=' mr-1' />
                Cari
              </button>
            </div>
            {isListObatOpen && (
              <>
                <div className='mt-4 pt-4 h-60 overflow-auto'>
                  <table className='w-full'>
                    <thead>
                      <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 '>
                        <th className='text-start'>NO</th>
                        <th className='text-start'>KODE OBAT</th>
                        <th className='text-start'>NAMA OBAT</th>
                        <th className='text-start'>JUMLAH</th>
                        <th className='text-start'>ATURAN PAKAI</th>
                        <th className='text-start'>AKSI</th>
                        <th>
                          <button className='btn w-10 h-5' onClick={() => setIsListObatOpen(false)}>
                            X
                          </button>
                        </th>
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
                              onChange={(e) => setJumlahObat(parseFloat(e.target.value))}
                              className='text-center w-20 input input-bordered'
                              disabled={role.includes('petugas')}
                            />
                          </td>
                          <td>
                            <input
                              id={`input_aturan_pakai_${index}`}
                              type='text'
                              onChange={(e) => setAturanPakai(e.target.value)}
                              className='text-center w-20 input input-bordered'
                              disabled={role.includes('petugas')}
                            />
                          </td>
                          <td>
                            <button
                              className='underline'
                              disabled={role.includes('petugas')}
                              onClick={() => {
                                handlePilihObat(
                                  data.kode_brng,
                                  data.nama_brng,
                                  jumlahObat,
                                  aturanPakai,
                                )

                                setJumlahObat(0)
                                setAturanPakai('')
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
            )}
            {selectedMedicines && Object.keys(selectedMedicines).length > 0 ? (
              <>
                <div className='mt-4'>
                  <label className='label'>
                    <span>Daftar Obat yang ditambahkan :</span>
                  </label>
                  <div className='pt-4'>
                    <table className='w-full'>
                      <thead className='text-xs text-gray-400 font-bold border-b-2 border-gray-200 pb-2'>
                        <tr>
                          <th className='w-1/6'>NO</th>
                          <th className='w-1/6'>KODE OBAT</th>
                          <th className='w-1/6'>NAMA OBAT</th>
                          <th className='w-1/6'>JUMLAH</th>
                          <th className='w-1/6'>ATURAN PAKAI</th>
                          <th className='w-1/6'>AKSI</th>
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
                            {editObat ? (
                              <>
                                <td className='text-center'>
                                  <input
                                    id={`input_obat_${index}`}
                                    type='number'
                                    onChange={(e) => setJumlahObat(parseFloat(e.target.value))}
                                    className='w-20 h-8 input input-bordered'
                                    disabled={role.includes('petugas')}
                                  />
                                </td>
                                <td className='text-center'>
                                  <div className='flex justify-center'>
                                    <input
                                      id={`input_aturan_pakai_${index}`}
                                      type='text'
                                      onChange={(e) => setAturanPakai(e.target.value)}
                                      className='w-20 h-8 input input-bordered'
                                      disabled={role.includes('petugas')}
                                    />
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td className='text-center'>
                                  <div className='border-[#E2E8F0] border-2 rounded flex justify-center'>
                                    {data.jumlahObat}
                                    <p className='text-disabled'>x</p>
                                  </div>
                                </td>
                                <td className='text-center'>{data.aturanPakai}</td>
                              </>
                            )}
                            {editObat ? (
                              <td className='flex justify-center gap-3'>
                                <button
                                  disabled={role.includes('petugas')}
                                  onClick={() => {
                                    handlePilihObat(data.kode, data.nama, jumlahObat, aturanPakai)
                                    setEditObat(false)
                                  }}
                                >
                                  <p className='text-green-500'>Simpan</p>
                                </button>
                                <button onClick={() => setEditObat(false)}>
                                  <p className='text-red-500'>Batal</p>
                                </button>
                              </td>
                            ) : (
                              <td className='flex justify-center gap-3'>
                                <button
                                  disabled={role.includes('petugas')}
                                  onClick={() => handleEditObat()}
                                >
                                  <p className='text-blue-500'>Edit</p>
                                </button>
                                <button
                                  disabled={role.includes('petugas')}
                                  onClick={() => handleHapusObat(kode)}
                                >
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

            {selectedMedicines && Object.keys(selectedMedicines).length > 0 ? (
              <div className='mt-3 flex justify-end'>
                <button
                  disabled={role.includes('petugas')}
                  onClick={testSimpan}
                  className='w-24 p-3 rounded-xl bg-primary text-white font-semibold ml-4'
                >
                  Simpan
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className='border border-slate-400 rounded-lg p-3'>
          <div className='form-control'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Instruksi</span>
            </label>
            <textarea
              disabled={role.includes('petugas')}
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              // value={dataSoap ? dataSoap[0]?.instruksi : instruksi}
              onChange={(e) => setInstruksi(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className='form-control'>
            <label className='label font-semibold text-slate-700 text-md'>
              <span>Evaluasi</span>
            </label>
            <textarea
              placeholder='-'
              defaultValue={evaluasi || diagnosa}
              disabled={role.includes('petugas')}
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              onChange={(e) => setEvaluasi(e.target.value)}
            />
          </div>
          <div className='flex justify-between mt-3 p-2'>
            <div>
              <label className='label'>Tanggal Balik</label>
              <input
                type='date'
                className='input border border-slate-400'
                onChange={handleDateChange}
                disabled={role.includes('petugas')}
              />
            </div>
            <div>
              <label className='label'>Alasan</label>
              <input
                type='text'
                className='input border border-slate-400'
                onChange={(e) => setAlasan(e.target.value)}
                disabled={role.includes('petugas')}
              />
            </div>
            <div>
              <label className='label'>RTL</label>
              <input
                type='text'
                className='input border border-slate-400'
                onChange={(e) => setRtl(e.target.value)}
                disabled={role.includes('petugas')}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              className='btn btn-md bg-primary text-white'
              disabled={!rtl || !alasan}
              onClick={postRencanKontrol}
            >
              Kirim
            </button>
          </div>
        </div>
        <p>{selectedDate}</p>
        <div className=' w-auto mt-4'>
          <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
            <InformationCircleIcon width={20} height={20} />
            <p className='ml-[6px]'>Informasi</p>
          </div>
          <p className='w-full font-sans text-red-400 animate-pulse text-base font-normal leading-5'>
            Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam
            pengisian data dapat berdampak pada perawatan pasien.
          </p>
          <button
            className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            onClick={handlePostSoap}
          >
            <ArchiveBoxArrowDownIcon width={20} height={20} />
            <p className='ml-1'>Selesai</p>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default InsertSoapRalan
