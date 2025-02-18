import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import HeaderRanap from '../../../Navbar/HeaderDetailRanap'
import RiwayatTindakanRanap from './component/RiwayatTindakanRanap'

const PageRanapTindakan = () => {
  const handleWindowTindakan = () => {
    const width = Math.floor(window.screen.width * 0.5)
    const height = Math.floor(window.screen.height * 0.7)
    const left = Math.floor((window.screen.width - width) / 2)
    const top = Math.floor((window.screen.height - height) / 2)

    const popup = window.open(
      '/tindakan-search',
      'tindakan',
      `width=${width},height=${height},left=${left},top=${top}`,
    )

    if (!popup) {
      console.error('Popup gagal dibuka. Pastikan pop-up tidak diblokir oleh browser.')
      return
    }
  }

  return (
    <>
      <HeaderRanap />
      <div>
        <div className='grid w-full h-full bg-white mt-3 p-2'>
          <p className='font-inter font-bold text-xl text-[#121713]'>Riwayat Perawatan</p>
          <div className='p-1'>
            <p className=' font-bold text-sm text-disabled'>Data Riwayat Perawatan Pasien</p>
            <div className=''>
              <div className='grid grid-cols-4 mt-2 gap-2 '>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                  <p className=''>165647</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                  <p>Esthera Jackson</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                  <p>Ranomerut</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                  <p className=''>2023//10/03/000374</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                  <p>{'-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                  <p>Perempuan</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>TANGGAL LAHIR</p>
                  <p>2003-11-15</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                  <p className=''>{'-'}</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                  <p>{'-'}</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs '>GOLONGAN DARAH</p>
                  <p>020</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                  <p>-</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                  <p>Menikah</p>
                </div>

                <div>
                  <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                  <p className=''>2023-10-23</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                  <p>-</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                  <p>Kristen</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs '>PENDIDIKAN TERAKHIR</p>
                  <p className=''>-</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs '>PERTAMA DAFTAR</p>
                  <p className=''>2023-10-23</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                  <p className=''>Instalasi IGD (siang)</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                  <p className=''>dr. Andre Imbar</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                  <p className=''>BPJS</p>
                </div>
                <div>
                  <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                  <p className=''>RAWAT INAP</p>
                </div>
                <div className=''>
                  <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                  <p>-</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <label className='label font-bold'>Cari Tindakan</label>
              <button
                onClick={handleWindowTindakan}
                className='btn bg-primary text-slate-100 flex items-center gap-2 hover:bg-primary hover:border-slate-400 hover:shadow-lg'
              >
                <MagnifyingGlassIcon width={25} height={25} />
                <span>Cari Tindakan</span>
              </button>
            </div>
          </div>
          <RiwayatTindakanRanap />
          {/* <div className=' w-auto mt-4'>
            <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
              <InformationCircleIcon width={25} height={25} />
              <p className='ml-[6px]'>Informasi</p>
            </div>
            <p className='w-full font-sans text-disabled  text-base font-normal leading-5'>
              Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan
              dalam pengisian data dapat berdampak pada perawatan pasien.
            </p>
            <div>
              <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
                <p className='flex'>
                  <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' /> Selesai
                </p>
              </button>
              <button className='flex justify-center items-center font-semibold text-black text-base w-full h-[50px] py-2 mt-[20px] bg-gray-200 border rounded-xl hover:opacity-80'>
                <p className='flex'>
                  <ArchiveBoxIcon width={20} height={20} className='mr-3' /> Masukan Rincian
                </p>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default PageRanapTindakan
