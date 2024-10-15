import { ClockIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { CaraMasuk, AlatTransportasi, AlasanKedatangan } from '../type/EnumTriase'
import { api } from '../../../../../services/api/config.api'
import { DataPemeriksaanTriase } from '../type/InterfaceTriase'
import RiwayatModalIgd from '../../RiwayatModal/RiwayatIgd'

interface PemeriksaanUtamaTriaseProps {
  onValuesChange: (
    caraMasuk: string,
    alatTransportasi: string,
    alasanKedatangan: string,
    macamKasus: string,
    keteranganKedatangan: string,
    nadi: string,
    pernapasan: string,
    tekananDarah: string,
    suhu: string,
    saturasiO2: string,
    respirasi: string,
    nyeri: string,
  ) => void
}

const PemeriksaanUtamaTriase: React.FC<PemeriksaanUtamaTriaseProps> = ({ onValuesChange }) => {
  const [activeTab, setActiveTab] = useState<number>()
  const [dataKasus, setDataKasus] = useState<DataPemeriksaanTriase[]>([])
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [caraMasuk, setCaraMasuk] = useState<string>('')
  const [alatTransportasi, setAlatTransportasi] = useState<string>('')
  const [alasanKedatangan, setAlasanKedatangan] = useState<string>('')
  const [keteranganKedatangan, setKeteranganKedatangan] = useState<string>('')
  const [macamKasus, setMacamKasus] = useState<string>('')
  const [tekananDarah, setTekananDarah] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [pernapasan, setPernapasan] = useState<string>('')
  const [suhu, setSuhu] = useState<string>('')
  const [saturasiO2, setSaturasiO2] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [nyeri, setNyeri] = useState<string>('')

  useEffect(() => {
    onValuesChange(
      caraMasuk,
      alatTransportasi,
      alasanKedatangan,
      macamKasus,
      keteranganKedatangan,
      nadi,
      pernapasan,
      tekananDarah,
      suhu,
      saturasiO2,
      respirasi,
      nyeri,
    )
  }, [
    caraMasuk,
    alatTransportasi,
    alasanKedatangan,
    macamKasus,
    keteranganKedatangan,
    nadi,
    pernapasan,
    tekananDarah,
    suhu,
    saturasiO2,
    respirasi,
    nyeri,
    onValuesChange,
  ])

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

  const fetchDataMacamKasus = async () => {
    try {
      const response = await api.get('/api/v1/PemeriksaanTriase')

      setDataKasus(response.data)
    } catch (err) {
      console.log('error get macam kasus.')
    }
  }

  useEffect(() => {
    setTimeAndDate()
    fetchDataMacamKasus()
  }, [])

  const [isPopupOpenModalRiwayat, setIsPopupOpenModalRiwayat] = useState(false)

  const openPopupModal = () => {
    setActiveTab(1)
    setIsPopupOpenModalRiwayat(true)
  }
  const closePopupModal = () => setIsPopupOpenModalRiwayat(false)

  return (
    <div>
      <div className='mt-3'>
        <div className='flex justify-between items-center'>
          <div>
            <label className='font-inter font-bold text-xl text-[#121713]'>
              Di isi oleh Dokter/Perawat
            </label>
            <p className='text-sm text-disabled '>Isi semua data dibawah ini.</p>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='w-36'>
              <label className='label font-bold'>Tanggal</label>
              <input
                value={tanggal}
                type='date'
                disabled
                className='disabled:bg-slate-200 disabled:text-black input w-full disabled:border-primary text-sm'
              />
            </div>
            <div className='w-36'>
              <label className='label font-bold'>Jam</label>
              <input
                type='time'
                disabled
                className='input w-full border disabled:border-primary disabled:bg-slate-200 disabled:text-black'
                value={jam}
              />
            </div>
            <div>
              <label className='label font-bold'>Info</label>
              <div className='p-1 border w-64 border-green-500 bg-white rounded-xl'>
                <p className='text text-xs font-semibold'>INSTALASI IGD - U2001</p>
                <p className=' font-bold text-sm text-[#121713] mt-2 '>
                  DOKTER : dr Gerry A.M. Supit
                </p>
              </div>
            </div>
            <div className='w-80 mt-10'>
              <button
                onClick={openPopupModal}
                className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[65px]  bg-white rounded-xl hover:opacity-80'
              >
                <p className='flex justify-center items-center'>
                  <ClockIcon className='mr-3' width={25} height={25} />
                  RIWAYAT PEMERIKSAAN PASIEN
                </p>
              </button>
            </div>
          </div>
        </div>
        {/* BATAS / Pemeriksaan Utama */}
        <div className='grid gap-3'>
          <div className='flex gap-5'>
            <div>
              <label className='label font-bold text-sm'>Cara Masuk :</label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setCaraMasuk(e.target.value)}
              >
                <option disabled selected>
                  Cara Masuk
                </option>
                {Object.values(CaraMasuk).map((cara) => (
                  <option key={cara} value={cara}>
                    {cara}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label font-bold text-sm'>Alat Transportasi :</label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setAlatTransportasi(e.target.value)}
              >
                <option disabled selected>
                  Alat Transportasi
                </option>
                {Object.values(AlatTransportasi).map((transportasi) => (
                  <option key={transportasi} value={transportasi}>
                    {transportasi}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label font-bold text-sm'>Alsan Kedatangan :</label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setAlasanKedatangan(e.target.value)}
              >
                <option disabled selected>
                  Alasan Kedatangan
                </option>
                {Object.values(AlasanKedatangan).map((kedatangan) => (
                  <option key={kedatangan} value={kedatangan}>
                    {kedatangan}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='label font-bold text-sm'>Macam Kasus :</label>
              <select
                className='select select-bordered w-56'
                onChange={(e) => setMacamKasus(e.target.value)}
              >
                <option disabled selected>
                  Macam Kasus
                </option>
                {dataKasus.map((data) => (
                  <option key={data.kode_pemeriksaan} value={data.kode_pemeriksaan}>
                    {data.nama_pemeriksaan}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-control 3'>
              <label className='label font-bold text-sm'>
                <span>Keterangan Kedatangan</span>
              </label>
              <input
                type='Text'
                onChange={(e) => setKeteranganKedatangan(e.target.value)}
                placeholder='Keterangan'
                className='input input-bordered text-sm rounded-2xl  disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <div className='w-full'>
              <label className='text text-xl label'>Keluhan Utama</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              />
            </div>
            <div className='w-full'>
              <label className='text text-xl label'>Anamnesa Singkat</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              />
            </div>
          </div>
        </div>
      </div>
      {/* BATAS */}
      <div className='flex gap-5'>
        <div className='mt-3 border p-2 rounded-xl w-full'>
          <label className='label font-inter font-bold text-xl text-[#121713]'>
            Tanda - Tanda Vital
          </label>
          <div className='flex gap-5'>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Suhu (C)</span>
              </label>
              <input
                type='Text'
                onChange={(e) => setSuhu(e.target.value)}
                placeholder='Suhu'
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Nyeri</span>
              </label>
              <input
                type='Text'
                placeholder='null'
                onChange={(e) => setNyeri(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Tekanan Darah</span>
              </label>
              <input
                type='Text'
                onChange={(e) => setTekananDarah(e.target.value)}
                placeholder='Tekanan Darah'
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Nadi(/menit)</span>
              </label>
              <input
                type='Text'
                placeholder='Nadi'
                onChange={(e) => setNadi(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Pernapasan</span>
              </label>
              <input
                type='Text'
                placeholder='Pernapasan'
                onChange={(e) => setPernapasan(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Saturasi O2(%)</span>
              </label>
              <input
                type='Text'
                placeholder='Saturasi'
                onChange={(e) => setSaturasiO2(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Respirasi (/menit)</span>
              </label>
              <input
                type='Text'
                placeholder='Respirasi'
                onChange={(e) => setRespirasi(e.target.value)}
                className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
              />
            </div>
            <div className='form-control 3'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Kebutuhan Khusus</span>
              </label>
              <select className='select select-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'>
                <option disabled selected>
                  Pilih Lokasi
                </option>
                <option>Lorem</option>
                <option>Lorem</option>
              </select>
            </div>
          </div>
          {/* <div>
            <label className='label font-inter font-bold text-xl text-[#121713]'>GCS</label>
            <div className='grid gap-5 items-center'>
              <div className='flex gap-3'>
                <div className='flex items-center gap-4'>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>E</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='null'
                    disabled
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='flex items-center gap-4'>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>V</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='null'
                    disabled
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='flex items-center gap-4 '>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>M</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='null'
                    disabled
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center gap-4 '>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>Akral</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='null'
                    disabled
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='flex gap-2'>
                  <label className='label font-bold text-sm'>Status Alergi</label>
                  <select className='select select-bordered w-56' disabled>
                    <option disabled selected>
                      tidak ada
                    </option>
                    <option>Ada</option>
                    <option>Tidak ada</option>
                  </select>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* MODAL */}
      <RiwayatModalIgd
        activeTab={activeTab}
        isOpen={isPopupOpenModalRiwayat}
        onClose={closePopupModal}
        noRawat={undefined}
      />
    </div>
  )
}

export default PemeriksaanUtamaTriase
