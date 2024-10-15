/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
// import RiwayatModal from '../RiwayatModal/RiwayatIgd'
import PemeriksaanUtamaTriase from './component/PemeriksaanUtamaTriase'
import PengkajianTriase from './component/PengkajianTriase'
import { useState } from 'react'

const PageIgdTriase: React.FC = () => {
  const nmrRawat = localStorage.getItem('no_rawat')
  const [caraMasuk, setCaraMasuk] = useState<string>('')
  const [alatTransportasi, setAlatTransportasi] = useState<string>('')
  const [alasanKedatangan, setAlasanKedatangan] = useState<string>('')
  const [macamKasus, setMacamKasus] = useState<string>('')
  const [keteranganKedatangan, setKeteranganKedatangan] = useState<string>('')
  const [tekananDarah, setTekananDarah] = useState<string>('')
  const [nadi, setNadi] = useState<string>('')
  const [pernapasan, setPernapasan] = useState<string>('')
  const [suhu, setSuhu] = useState<string>('')
  const [saturasiO2, setSaturasiO2] = useState<string>('')
  const [respirasi, setRespirasi] = useState<string>('')
  const [nyeri, setNyeri] = useState<string>('')
  // const [isPopupOpenModalRiwayat, setIsPopupOpenModalRiwayat] = useState(false)

  // const openPopupModal = () => setIsPopupOpenModalRiwayat(true)
  // const closePopupModal = () => setIsPopupOpenModalRiwayat(false)

  const handleValuesChange = (
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
  ) => {
    console.log('Cara Masuk: ', caraMasuk)
    console.log('alat transportasi :', alatTransportasi)
    console.log('alasan kedatangan', alasanKedatangan)
    console.log('Macam Kasus', macamKasus)
    console.log('keteranganKedatangan : ', keteranganKedatangan)
    console.log('Nadi:', nadi)
    console.log('Pernapasan:', pernapasan)
    console.log('tekananDarah ', tekananDarah)
    console.log('neyri ', nyeri)
    console.log('respirasi ', respirasi)
    console.log('saturasiO2 ', saturasiO2)
    console.log('suhu ', suhu)

    setCaraMasuk(caraMasuk)
    setAlatTransportasi(alatTransportasi)
    setAlasanKedatangan(alasanKedatangan)
    setMacamKasus(macamKasus)
    setKeteranganKedatangan(keteranganKedatangan)
    setTekananDarah(tekananDarah)
    setNadi(nadi)
    setPernapasan(pernapasan)
    setSuhu(suhu)
    setSaturasiO2(saturasiO2)
    setRespirasi(respirasi)
    setNyeri(nyeri)
  }

  return (
    <>
      <HeaderIgd />
      <div className='p-1'>
        <div className='grid w-full h-full bg-white mt-1 p-2'>
          <PemeriksaanUtamaTriase onValuesChange={handleValuesChange} />
          {/* BATAS */}
          <PengkajianTriase />
        </div>
        <div className='grid '>
          <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
              SIMPAN {nmrRawat}
            </p>
          </button>
        </div>
      </div>
    </>
  )
}

export default PageIgdTriase
