import { useParams } from 'react-router-dom'
import { api } from '../../../../services/api/config.api'
import HeaderRanap from '../../../Navbar/HeaderDetailRanap'
import {
  ArchiveBoxArrowDownIcon,
  ArrowPathIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { spesificError, spesificSuccess } from '../../../../utils/ToastInfo'
import { ToastContainer } from 'react-toastify'
// import { formatSelectedDateNow } from '../../../../utils/DateNow'

interface Medicine {
  nama: string
  jumlahObat: number
  aturanPakai: string
  kode: string
}

const PageRanapLayananObat = () => {
  const [dataPasien, setDataPasien] = useState<any | null>(null)
  const [searchTermObat, setSearchTermObat] = useState<any>('')
  const [listObat, setListObat] = useState<any>([])
  const [selectedMedicines, setSelectedMedicines] = useState<Record<string, Medicine>>({})
  const [jumlahObat, setJumlahObat] = useState<number>(0)
  const [aturanPakai, setAturanPakai] = useState<string>('')
  const [nmrResep, setNmrResep] = useState<string>('')
  const [obatExist, setObatExist] = useState([])
  const [haveNoResep, setHaveNoResep] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { id } = useParams()

  const nmrRawat = localStorage.getItem('no_rawat')
  // const noAntrian = localStorage.getItem('no_antrian')
  // const dateNow = formatSelectedDateNow()
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  const fetchDataPasien = async () => {
    try {
      const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
      setDataPasien(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const handleGetObat = async () => {
      try {
        if (searchTermObat.trim().length >= 2) {
          const response = await api.get(`/api/v1/searchDatabarang?searchString=${searchTermObat}`)
          setListObat(response.data)
        } else {
          setListObat([])
        }
      } catch (error) {
        console.log(error)
      }
    }

    handleGetObat()
  }, [searchTermObat])

  const handlePilihObat = (kode: string, nama: string, jumlah: number, aturan: string) => {
    setSelectedMedicines((prevState) => ({
      ...prevState,
      [kode]: {
        nama,
        jumlahObat: jumlah,
        aturanPakai: aturan,
        kode: kode,
      },
    }))
  }

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
          console.log(res.data)
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log('tidak ada resep yang perlu ditambahkan.', response.data)
        setNmrResep(response.data[0])
        setHaveNoResep(true)
        console.log()
      }
    } catch (err) {
      console.log('Tidak Ada no resep', err)
    }
  }

  const fetchExistObat = async () => {
    try {
      const response = await api.get(`/api/v1/getResepDokterDetails?noResep=${nmrResep}`)
      setObatExist(response.data)
      console.log('data obat yang sudah ada', response.data)
    } catch (err) {
      console.log('tidak ada obat yang sudah ada', err)
    }
  }

  const postResep = async () => {
    if (Object.keys(selectedMedicines).length === 0) {
      spesificError({ errMessage: 'Mohon Memilih setidaknya satu obat untuk melanjutkan.' })
      return
    }
    setIsLoading(true)

    const data = {
      noRawat: nmrRawat,
      status: 'ranap',
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
      } catch (err: any) {
        spesificError({ errMessage: `Post Resep Error : ${err.data}` })
        console.log('post resep error', err)
        setIsLoading(false)
        return
      }
    } else if (haveNoResep === true) {
      const existingMedicines = obatExist.map((item) => item.kode_brng)
      const resepDokterBatch = []

      for (const key in selectedMedicines) {
        const medicineData = selectedMedicines[key]

        if (!existingMedicines.includes(medicineData.kode)) {
          resepDokterBatch.push({
            noResep: nmrResep,
            kodeBrng: medicineData.kode,
            jml: Math.round(medicineData.jumlahObat * 55) / 54,
            aturanPakai: medicineData.aturanPakai,
          })
        }
      }

      try {
        await Promise.all(
          resepDokterBatch.map((resepDokterData) =>
            api.post('/api/v1/postResepDokter', resepDokterData, {
              headers: {
                'Content-Type': 'application/json',
              },
            }),
          ),
        )
      } catch (err) {
        console.log('obat error :', err)
        setIsLoading(false)
        return
      }
    }

    spesificSuccess({ doneMessage: 'Resep Berhasil Dikirim...' })

    setTimeout(() => {
      setIsLoading(false)
      window.location.reload()
    }, 1000)
  }

  useEffect(() => {
    const checkAll = async () => {
      await fetchDataPasien()
      await checkExistNoResep()
    }
    checkAll()
  }, [id])

  useEffect(() => {
    if (nmrResep) {
      fetchExistObat()
    }
  }, [nmrResep])

  return (
    <>
      <HeaderRanap />
      <div className='p-1'>
        <div className='flex w-full h-full bg-white mt-3 p-2'>
          <div className='w-full'>
            <div>
              <p className='font-inter font-bold text-lg text-[#121713]'>Tambah Pasien</p>
              <p className='text-sm text-disabled '>
                Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat jalan
              </p>
              <div>
                <div className='flex gap-3 items-center'>
                  <div className='grid gap-2 w-full'>
                    <div className='flex gap-2'>
                      <div className='grid'>
                        <label className='label'>Tanggal Lahir</label>
                        <input
                          value={dataPasien?.tgl_lahir ? dataPasien?.tgl_lahir : '-'}
                          type='text'
                          disabled
                          className='input w-full border-primary text-sm'
                        />
                      </div>
                      <div className='w-full'>
                        <label className='label'>Umur</label>
                        <input
                          type='text'
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          value={dataPasien?.umur ? dataPasien?.umur : '-'}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <div className='w-full'>
                        <label className='label'>Nama Pasien</label>
                        <input
                          disabled
                          type='text'
                          value={dataPasien?.nm_pasien ? dataPasien?.nm_pasien : '-'}
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid w-full'>
                    <div className='grid w-full gap-3'>
                      <div className='grid w-full'>
                        <label className='label'>Nomor Rawat</label>
                        <input
                          type='text'
                          disabled
                          value={nmrRawat ? nmrRawat : '-'}
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                      <div className='grid w-full'>
                        <label className='label'>Nomor RM</label>
                        <input
                          type='text'
                          disabled
                          value={id ? id : '-'}
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* BATA */}
              <div className='grid grid-cols-1 gap-6'>
                <div className='mt-4'>
                  <label className='label font-bold'>Cari Obat :</label>
                  <div className='flex relative gap-2 mt-1'>
                    <input
                      type='text'
                      onChange={(e) => setSearchTermObat(e.target.value)}
                      className='w-full px-3 py-2 border border-primary rounded-2xl disabled:bg-slate-200 disabled:text-black'
                      placeholder='Paracetamol'
                    />
                    {listObat.length > 0 ? (
                      <button
                        onClick={() => setListObat([])}
                        className='btn w-10 h-5 bg-white hover:bg-white border-none text-lg font-bold'
                      >
                        X
                      </button>
                    ) : null}
                  </div>
                  {listObat.length > 0 ? (
                    <div className='mt-4 pt-4 w-full overflow-auto'>
                      <table className='table table-lg w-full '>
                        <thead>
                          <tr className='text-[10px] text-gray-400 font-bold border-b-2 border-gray-200'>
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
                              <td className='text-start'>{data.kode_brng}</td>
                              <td className='text-start'>{data.nama_brng}</td>
                              <td>
                                <input
                                  id={`input_obat_${index}`}
                                  type='number'
                                  onChange={(e) => setJumlahObat(parseFloat(e.target.value))}
                                  className='text-center w-20 input input-bordered'
                                />
                              </td>
                              <td>
                                <input
                                  id={`input_aturan_pakai_${index}`}
                                  type='text'
                                  onChange={(e) => setAturanPakai(e.target.value)}
                                  className='input input-bordered w-32'
                                />
                              </td>
                              <td>
                                <button
                                  className='underline'
                                  disabled={!aturanPakai || !jumlahObat}
                                  onClick={() => {
                                    handlePilihObat(
                                      data.kode_brng,
                                      data.nama_brng,
                                      jumlahObat,
                                      aturanPakai,
                                    )
                                    setJumlahObat(0)
                                    setAturanPakai('')
                                    setListObat([])

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
                                  Simpan
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

                {/* Menampilkan daftar obat yang dipilih */}
                {Object.keys(selectedMedicines).length > 0 ? (
                  <div className='mt-4'>
                    <label className='label font-bold'>Daftar Obat yang ditambahkan :</label>
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
                              <td>{index + 1}</td>
                              <td>{kode}</td>
                              <td>{data.nama}</td>
                              <td>{data.jumlahObat}</td>
                              <td>{data.aturanPakai}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    const newMedicines = { ...selectedMedicines }
                                    delete newMedicines[kode]
                                    setSelectedMedicines(newMedicines)
                                  }}
                                >
                                  Hapus
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
          </div>
          <div className='w-[500px] p-5 mt-12 border rounded-2xl ml-2 mr-2'>
            <div>
              <label className='flex  text-lg font-bold'>
                <InformationCircleIcon width={25} height={25} /> INFORMASI
              </label>
              <p className='text-sm text-disabled'>
                Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan
                dalam pengisian data dapat berdampak pada perawatan pasien.
              </p>
            </div>
            <div className='grid '>
              <button
                disabled={isLoading}
                onClick={postResep}
                className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
              >
                <p className='flex justify-center items-center'>
                  {isLoading ? (
                    <p className='flex justify-center items-center'>
                      <ArrowPathIcon className='animate-spin mr-3' width={25} height={25} />
                      Mengirim
                    </p>
                  ) : (
                    <p className='flex items-center justify-center'>
                      {' '}
                      <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />{' '}
                      <span>Kirim</span>
                    </p>
                  )}
                </p>
              </button>
              {/* <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <BellIcon className='mr-3' width={25} height={25} />
                  ICD 9 & 10
                </p>
              </button>
              <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <ClockIcon className='mr-3' width={25} height={25} />
                  RIWAYAT
                </p>
              </button>
              <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
                <p className='flex justify-center items-center'>
                  <CheckIcon className='mr-3' width={25} height={25} />
                  SELESAI
                </p>
              </button> */}
            </div>
          </div>
        </div>
        {/* Batas */}
        <div className='w-full h-full bg-white mt-3 p-2'>
          <div className='pt-3'>
            <label className='label font-inter font-bold text-xl text-[#121713]'>RESEP</label>
          </div>
          <div className='border-2 rounded-3xl p-2 mb-2'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nomor Resep</th>
                  <th>Nama Obat</th>
                  <th>Jumlah</th>
                  <th>Aturan Pakai</th>
                </tr>
              </thead>
              <tbody>
                {obatExist.map((item, index) => (
                  <tr key={index}>
                    <td className='font-bold'>{index}</td>
                    <td className='font-bold'>{item.tgl_peresepan || '-'}</td>
                    <td className='font-bold'>{item.no_resep}</td>
                    <td className='font-bold'>{item.nama_brng}</td>
                    <td className='font-bold'>{item.jml}</td>
                    <td className='font-bold'>{item.aturan_pakai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* batas */}
      </div>
      <ToastContainer />
    </>
  )
}

export default PageRanapLayananObat
