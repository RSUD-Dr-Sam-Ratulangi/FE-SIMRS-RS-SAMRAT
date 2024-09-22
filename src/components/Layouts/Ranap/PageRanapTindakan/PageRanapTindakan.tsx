import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import HeaderRanap from '../../../Navbar/HeaderDetailRanap'

const PageRanapTindakan = () => {
  return (
    <>
      <HeaderRanap />
      <div>
        <p className='font-inter font-bold text-xl text-[#121713]'>TINDAKAN</p>
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
            <div className='w-96'>
              <label className='label'>Tindakan</label>
              <input
                type='text'
                className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
              />
            </div>
            <div className='w-96'>
              <label className='label'>Jenis</label>
              <input
                type='text'
                className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
              />
            </div>
          </div>
          <div className='border-4 rounded-3xl p-2 mb-2 mt-3'>
            <label className='label font-inter font-bold text-xl text-[#121713]'>
              Rincian Tindakan
            </label>
            <table className='table'>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Obat</th>
                  <th>Aturan Pakai</th>
                  <th>Provide</th>
                  <th>Tarif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-08-15</td>
                  <td>Energen 800mg</td>
                  <td>2x1 Pagi</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-08-15</td>
                  <td>Energen 800mg</td>
                  <td>2x1 Pagi</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-08-15</td>
                  <td>Energen 800mg</td>
                  <td>2x1 Pagi</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=' w-auto mt-4'>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default PageRanapTindakan
