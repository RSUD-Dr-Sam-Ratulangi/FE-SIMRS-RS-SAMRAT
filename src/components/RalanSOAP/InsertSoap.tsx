import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom'

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
  quantity: number
}

const InsertSoapRalan: React.FC = () => {
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
  const [kesadaran, setKesadaran] = useState('')
  const [subjektif, setSubjektif] = useState('')
  // const [diagnosa, setDiagnosa] = useState('')
  const [asesmen, setAsesmen] = useState('')
  const [plan, setPlan] = useState('')
  const [instruksi, setInstruksi] = useState('')
  const [evaluasi, setEvaluasi] = useState('')
  const [listPenyakit, setListPenyakit] = useState<DataItem[]>([])
  const [listObat, setListObat] = useState([])
  const [aturanPakai, setAturanPakai] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermObat, setSearchTermObat] = useState('')
  const [dataSoap, setDataSoap] = useState<DataItem[]>([])
  const [selectedMedicines, setSelectedMedicines] = useState<{ [kode: string]: Medicine }>({})

  const nmrRawat = localStorage.getItem('no_rawat')
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
  }, [])

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

  const handleHapusObat = (kode: string) => {
    // Update selectedMedicines state to remove the selected medicine
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }
      delete newSelectedMedicines[kode]
      return newSelectedMedicines
    })
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

  const handleGetPenyakit = async () => {
    try {
      const response = api.get(`/api/v1/getAllPenyakit?searchString=${searchTerm}`)
      setListPenyakit((await response).data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetObat = async () => {
    try {
      const response = api.get(`/api/v1/searchDatabarang?searchString=${searchTermObat}`)
      setListObat((await response).data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchTermObatChange = (event) => {
    setSearchTermObat(event.target.value)
  }

  const handlePostSoap = async () => {
    const data = {
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
      penilaian: '',
      instruksi: '',
      evaluasi: '',
      nip: nipCredentials,
    }

    console.log('data yang akan dikirim', data)

    try {
      const response = await api.post('/api/v1/postPemeriksaanRalan', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('POST response:', response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePilihPenyakit = async (kode) => {
    const confirmation = window.confirm('Apakah Anda yakin ingin memilih?')
    const data = {
      noRawat: nmrRawat,
      status: 'Ralan',
      kdPenyakit: kode,
      prioritas: '1',
      statusPenyakit: 'Baru',
    }

    if (confirmation) {
      try {
        const response = api.post('/api/v1/insertDiagnosaPasien', data)
        if ((await response).status === 200) {
          const kode = (await response).data.kd_penyakit
          const namaPenyakit = (await response).data.nm_penyakit
          setAsesmen(kode + ' ' + namaPenyakit)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handlePilihObat = (kode: string, nama: string) => {
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }

      if (newSelectedMedicines[kode]) {
        // If medicine is already selected, increase the quantity
        newSelectedMedicines[kode] = {
          ...newSelectedMedicines[kode],
          quantity: newSelectedMedicines[kode].quantity + 1,
        }
        console.log(newSelectedMedicines[kode].quantity)
      } else {
        // If medicine is selected for the first time, add it to the state
        newSelectedMedicines[kode] = { nama, quantity: 1 }
      }

      return newSelectedMedicines
    })
  }
  return (
    <div className='w-full mt-4'>
      <div>
        <p className=' font-bold text-xl text-[#121713]'>Pemeriksaan</p>
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
            <div className='flex justify-between '>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Suhu(C)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.suhu_tubuh : 'Loading'}
                  onChange={(e) => setSuhu(e.target.value)}
                  // disabled={role.includes('dokter')}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Tensi(mmHg)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.tensi : 'Loading'}
                  onChange={(e) => setTensi(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Nadi(/mnt)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.nadi : 'Loading'}
                  onChange={(e) => setNadi(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>RR(/mnt)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.respirasi : 'Loading'}
                  onChange={(e) => setRr(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Tinggi(cm)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.tinggi : 'Loading'}
                  onChange={(e) => setTinggi(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Berat(kg)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.berat : 'Loading'}
                  onChange={(e) => setBerat(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>SPO2</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.spo2 : 'Loading'}
                  onChange={(e) => setSpo2(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>GCS(E,V,M)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[150px]'
                  value={dataSoap ? dataSoap[0]?.gcs : 'Loading'}
                  onChange={(e) => setGcs(e.target.value)}
                />
              </div>
              <div className='form-control mt-6'>
                <label className='label'>
                  <span>Alergi</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled w-[320px]'
                  value={dataSoap ? dataSoap[0]?.alergi : 'Loading'}
                  onChange={(e) => setAlergi(e.target.value)}
                />
              </div>
            </div>
            <div className='form-control mt-6'>
              <label className='label'>
                <span>Kesadaran</span>
              </label>
              <input
                type='Text'
                placeholder='Compos Mentis'
                className='input input-bordered text-sm rounded-2xl border-disabled w-[540px]'
                value={dataSoap ? dataSoap[0]?.kesadaran : 'Loading'}
                onChange={(e) => setKesadaran(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <p className=' font-bold text-xl text-[#121713]'>SOAP</p>
        <div className='form-control'>
          <label className='label'>
            <span>Subjektif</span>
          </label>
          <textarea
            placeholder='-'
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            value={subjektif}
            onChange={(e) => setSubjektif(e.target.value)}
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
              onClick={handleGetPenyakit}
            >
              <MagnifyingGlassIcon width={20} height={20} className=' mr-1' />
              Cari
            </button>
          </div>
          <div className='mt-4 pt-4'>
            <div className='flex justify-between text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 pb-[10px]'>
              <div className='flex'>
                <p className='w-[100px]'>NO</p>
                <p className='w-[200px]'>KODE PENYAKIT</p>
                <p className='w-[400px]'>NAMA PENYAKIT</p>
              </div>
              <div className=' w-32 '>
                <p>AKSI</p>
              </div>
            </div>
            <div className='max-h-[200px] overflow-y-auto'>
              {listPenyakit.map((data, index) => (
                <div
                  key={index}
                  className='flex justify-between text-sm text-gray-700 font-bold border-b-[1px] border-gray-200 py-[10px]'
                >
                  <div className='flex'>
                    <p className='w-[100px]'>{index + 1}</p>
                    <p className='w-[200px]'>
                      {listPenyakit.length > 0 ? data.kd_penyakit || '-' : '-'}
                    </p>
                    <p className='w-[400px]'>
                      {listPenyakit.length > 0 ? data.nm_penyakit || '-' : '-'}
                    </p>
                  </div>
                  <button
                    className=' underline w-32 '
                    onClick={() => handlePilihPenyakit(data.kd_penyakit)}
                  >
                    <p className=' text-start'>Pilih</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='form-control'>
          <div className='flex justify-between p-2'>
            <label className='label'>
              <span>Asesmen</span>
            </label>
          </div>
          <textarea
            placeholder='-'
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            value={asesmen}
            onChange={(e) => setAsesmen(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span>Plan</span>
          </label>
          <textarea
            placeholder='-'
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
        </div>
        <div className='mt-4'>
          <label>Cari Obat</label>
          <div className='flex relative mt-1'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchTermObatChange}
              className='w-full px-3 py-2 border rounded-2xl focus:outline-none focus:border-blue-500'
              placeholder='Paracetamol'
            />
            <button
              className=' flex justify-center items-center w-24 p-2 rounded-xl bg-primary text-white font-semibold ml-4'
              onClick={handleGetObat}
            >
              <MagnifyingGlassIcon width={20} height={20} className=' mr-1' />
              Cari
            </button>
          </div>
          <div className='mt-4 pt-4'>
            <div className='flex justify-between text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 pb-[10px]'>
              <div className='flex'>
                <p className='w-[100px]'>NO</p>
                <p className='w-[200px]'>KODE PENYAKIT</p>
                <p className='w-[400px]'>NAMA PENYAKIT</p>
              </div>
              <div className=' w-32 '>
                <p>AKSI</p>
              </div>
            </div>
            <div className='max-h-[200px] overflow-y-auto'>
              {listObat.map((data, index) => (
                <div
                  key={index}
                  className='flex justify-between text-sm text-gray-700 font-bold border-b-[1px] border-gray-200 py-[10px]'
                >
                  <div className='flex'>
                    <p className='w-[100px]'>{index + 1}</p>
                    <p className='w-[200px]'>{listObat.length > 0 ? data.kode_brng || '-' : '-'}</p>
                    <p className='w-[400px]'>{listObat.length > 0 ? data.nama_brng || '-' : '-'}</p>
                  </div>
                  <button
                    className=' underline w-32 '
                    onClick={() => handlePilihObat(data.kode_brng, data.nama_brng)}
                  >
                    <p className=' text-start'>Pilih</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <label>
            <span>Daftar Obat yang ditambahkan</span>
          </label>
          <div className=' pt-4'>
            <div className='flex justify-between text-[10px] text-gray-400 font-bold border-b-2 border-gray-200 pb-[10px]'>
              <div className='flex'>
                <p className='w-[100px]'>NO</p>
                <p className='w-[200px]'>KODE PENYAKIT</p>
                <p className='w-[350px]'>NAMA PENYAKIT</p>
                <p className='w-[100px]'>JUMLAH</p>
              </div>
              <div className=' w-32 '>
                <p>AKSI</p>
              </div>
            </div>
            <div className='max-h-[200px] overflow-y-auto'>
              {Object.entries(selectedMedicines).map(([kode, data], index) => (
                <div
                  key={index}
                  className='flex justify-between text-sm text-gray-700 font-bold border-b-[1px] border-gray-200 py-[10px]'
                >
                  <div className='flex'>
                    <p className='w-[100px]'>{index + 1}</p>
                    <p className='w-[200px]'>{kode}</p>
                    <p className='w-[350px]'>{data.nama}</p>

                    <div className=' border-[#E2E8F0] border-2 w-[40px] rounded flex justify-center'>
                      {data.quantity}
                      <p className=' text-disabled'>x</p>
                    </div>
                    <button className='w-32' onClick={() => handleHapusObat(kode)}>
                      <p className=' text-red-500'>Hapus</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-baseline items-end'>
          <div className='form-control'>
            <label className='label'>
              <span>Aturan Pakai</span>
            </label>
            <input
              type='Text'
              placeholder='3x3'
              className='input input-bordered text-sm rounded-2xl border-disabled w-[540px]'
              value={aturanPakai}
              onChange={(e) => setAturanPakai(e.target.value)}
            />
          </div>
          <div className=''>
            <button className=' flex justify-center items-center w-24 p-3 rounded-xl bg-primary text-white font-semibold ml-4'>
              Submit
            </button>
          </div>
        </div>

        <div className='form-control'>
          <label className='label'>
            <span>Instruksi</span>
          </label>
          <textarea
            placeholder='-'
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            value={instruksi}
            onChange={(e) => setInstruksi(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label className='label'>
            <span>Evaluasi</span>
          </label>
          <textarea
            placeholder='-'
            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            value={evaluasi}
            onChange={(e) => setEvaluasi(e.target.value)}
          />
        </div>
        <div className=' w-auto mt-4'>
          <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
            <InformationCircleIcon width={20} height={20} />
            <p className='ml-[6px]'>Informasi</p>
          </div>
          <p className='w-full font-sans text-disabled text-base font-normal leading-5'>
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
    </div>
  )
}

export default InsertSoapRalan
