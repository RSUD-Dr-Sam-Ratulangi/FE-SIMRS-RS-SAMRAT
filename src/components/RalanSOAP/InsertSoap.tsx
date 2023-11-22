import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { ArchiveBoxArrowDownIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

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
  const [diagnosa, setDiagnosa] = useState('')
  const [asesmen, setAsesmen] = useState('')
  const [plan, setPlan] = useState('')
  const [instruksi, setInstruksi] = useState('')
  const [evaluasi, setEvaluasi] = useState('')
  const [listPenyakit, setListPenyakit] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPenyakitOptions = async () => {
      try {
        const response = await api.get('/api/v1/getAllPenyakit')
        const penyakitData = response.data.map((penyakit: any) => ({
          value: penyakit.kd_penyakit,
          label: penyakit.nm_penyakit,
        }))
        setListPenyakit(penyakitData)
        console.log('response', penyakitData)
      } catch (error) {
        console.error('Error fetching all penyakit:', error)
      }
    }

    fetchPenyakitOptions()
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

  const handlePenyakitChange = (selectedOption) => {
    setDiagnosa(selectedOption)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredOptions = listPenyakit.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='w-full mt-4'>
      <div>
        <p className=' font-bold text-xl text-[#121713]'>Pemeriksaan</p>
        <div className='text-base text-[#121713] font-sans flex'>
          <div className='w-full'>
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
                  value={suhu}
                  onChange={(e) => setSuhu(e.target.value)}
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
                  value={tensi}
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
                  value={nadi}
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
                  value={rr}
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
                  value={tinggi}
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
                  value={berat}
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
                  value={spo2}
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
                  value={gcs}
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
                  value={alergi}
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
                value={kesadaran}
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
          <label>Pilih Penyakit</label>
          <div className='relative mt-1'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchTermChange}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              placeholder='Cari penyakit...'
            />
          </div>
          <div className='mt-2'>
            <label className='block text-sm font-medium text-gray-700'>Penyakit</label>
            <select
              className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500'
              value={diagnosa}
              onChange={(e) =>
                handlePenyakitChange({
                  value: e.target.value,
                  label: e.target.options[e.target.selectedIndex].text,
                })
              }
            >
              {filteredOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='form-control'>
          <label className='label'>
            <span>Asesmen</span>
          </label>
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
          <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
            <ArchiveBoxArrowDownIcon width={20} height={20} />
            <p className='ml-1'>Selesai</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InsertSoapRalan
