/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  BellIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'
import { ListObat, MedicineObat } from '../type/InterfaceObat'
import { api } from '../../../../../services/api/config.api'
import { useParams } from 'react-router-dom'

const AwalLayananObat: React.FC = () => {
  const [jam, setJam] = useState<string>('')
  const [tanggal, setTanggal] = useState<string>('')
  const [listObat, setListObat] = useState<ListObat[]>([])
  const [searchTermObat, setSearchTermObat] = useState<string>('')
  const [jumlahObat, setJumlahObat] = useState<number>(0)
  const [aturanPakai, setAturanPakai] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [selectedMedicines, setSelectedMedicines] = useState<{ [kode: string]: MedicineObat }>({})
  const [editObat, setEditObat] = useState<boolean>(false)
  const [editedRowIndex, setEditedRowIndex] = useState(null)
  const [nmrResep, setNmrResep] = useState<string>('')
  const [haveNoResep, setHaveNoResep] = useState<boolean>(false)
  const [obatExist, setObatExist] = useState([])

  console.log('obat exis', obatExist)

  const nmrRawat = localStorage.getItem('no_rawat')
  const { id } = useParams()
  const storedRow = localStorage.getItem('dataRow')
  const dataRow = storedRow ? JSON.parse(storedRow) : null
  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  const role = Object.keys(Kd)[0]
  let nipCredentials = ''
  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
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

  // cek no resep jika sudah ada
  const checkExistNoResep = async () => {
    try {
      const response = await api.get(
        `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${nmrRawat}`,
      )
      console.log('reseeppp', response.data)
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

  const handleGetObat = async () => {
    try {
      if (searchTermObat.trim().length >= 2) {
        const response = await api.get(`/api/v1/searchDatabarang?searchString=${searchTermObat}`)
        setListObat(response.data)
        console.log('List Obat', response.data)
      } else {
        setListObat([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetObat()
  }, [searchTermObat])

  useEffect(() => {
    setTimeAndDate()
    checkExistNoResep()
  }, [])

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
  }, [nmrResep])

  const handlePilihObat = (kode: string, nama: string, jumlahObat: any, aturanPakai: string) => {
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }

      if (newSelectedMedicines[kode]) {
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
      setPlan(
        `-------------------------------------------------------------------------------- \n${planString}\n`,
      )
      return newSelectedMedicines
    })
  }

  const handleEditObat = (index) => {
    setEditObat(true)
    setEditedRowIndex(index)
  }

  const handleHapusObat = (kode: string) => {
    setSelectedMedicines((prev) => {
      const newSelectedMedicines = { ...prev }
      delete newSelectedMedicines[kode]

      const planString = generatePlanString(newSelectedMedicines)
      setPlan(
        `-------------------------------------------------------------------------------- \n${planString}\n`,
      )

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

  console.log('plan obat', plan)
  console.log(nipCredentials)

  return (
    <>
      <p className='font-inter font-bold text-xl text-[#121713]'>Layanan & Obat</p>
      <div className='flex w-full h-full bg-white mt-3 p-2'>
        <div className='w-full'>
          <div className=''>
            <p className='font-inter font-bold text-lg text-[#121713]'>Layanan Obat</p>
            <p className='text-sm text-disabled '>
              Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat jalan
            </p>
            <div>
              <div className='flex gap-3 items-center'>
                <div className='grid gap-2 w-full'>
                  <div className='flex gap-2'>
                    <div className='grid'>
                      <label className='label'>Tanggal</label>
                      <input
                        type='date'
                        value={tanggal}
                        disabled
                        className='input w-full border-primary text-sm'
                      />
                    </div>
                    <div className='w-full'>
                      <label className='label'>Jam</label>
                      <input
                        type='time'
                        disabled
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        value={jam}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='w-full'>
                      <label className='label'>Id Rawat</label>
                      <input
                        type='text'
                        value={nmrRawat}
                        disabled
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                  </div>
                </div>
                <div className='grid w-full'>
                  <div className='grid w-full gap-3'>
                    <div className='grid w-full'>
                      <label className='label'>Nomor.RM</label>
                      <input
                        type='text'
                        value={id}
                        disabled
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                    <div className='grid w-full'>
                      <label className='label'>Nama Pasien</label>
                      <input
                        type='text'
                        disabled
                        value={dataRow?.nm_pasien ? dataRow.nm_pasien : '-'}
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BATA */}
            <div>
              <label className='label'>Plan</label>
              <textarea
                placeholder='-'
                value={plan || undefined}
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
              />
            </div>
            <div className='grid w-full'>
              <label className='label'>Cari Obat</label>
              <input
                type='text'
                placeholder='Paracetamol?'
                onChange={(e) => setSearchTermObat(e.target.value)}
                className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
              />
            </div>
            {listObat.length > 0 ? (
              <div className='overflow-auto h-56'>
                {' '}
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
            ) : (
              <div className='text-center py-4'>No data available</div>
            )}
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
                </div>
              </>
            ) : null}
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
              onClick={postResep}
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            >
              <p className='flex justify-center items-center'>
                <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
                Mengirim
              </p>
            </button>
            <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
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
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AwalLayananObat
