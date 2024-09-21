import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import HeaderRanap from '../../../Navbar/HeaderDetailRanap'

const PageRanapPenunjang = () => {
  return (
    <div>
      <HeaderRanap />
      <div className='w-full p-3 bg-slate-100'>
        <div>
          <div className='flex justify-between'>
            <p className=' font-bold text-xl text-[#121713] mb-5 underline'>
              INPUT DATA LABORATORIUM
            </p>
          </div>
          <p className=' font-bold text-xl text-[#121713]'>DATA PERMINTAAN LABORATORIUM</p>
          <span className='text text-gray-400 font-light'>
            Isi semua data dibawah ini untuk menambahkan data permintaan laboratorium kedalam daftar
            rawat jalan
          </span>
        </div>
        <div className='grid grid-cols-2 gap-6 mt-5 justify-evenly'>
          <div>
            <label className='text text-xl font-bold label'>Indikasi/Klinis</label>
            <textarea
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
          <div>
            <label className='text text-xl font-bold label'>Informasi Tambahan</label>
            <textarea
              placeholder='-'
              className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
            />
          </div>
        </div>
        <div>
          <div className='flex items-center'>
            <label className='label'>Tanggal Permintaan :</label>
            <input type='date' className='input input-md border border-slate-500 mt-3' />
          </div>
          <div className='grid gap-3 mt-5'>
            <label className='text text-xl font-bold label'>PEMERIKSAAN</label>
            <div className='relative w-full mb-2'>
              <button className='absolute right-5 bottom-3 h-[25.02px] w-[25.02px] bg-none text-[#55A46B]'>
                <MagnifyingGlassIcon />
              </button>
              <input
                type='text'
                placeholder='Cari...'
                value='-'
                className='w-full input input-bordered'
              />
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full table border border-gray-300'>
                <thead>
                  <tr className='bg-gray-200 text-gray-700'>
                    <th className='py-2 px-4 border-b border-gray-300 text-left'>NO</th>
                    <th className='py-2 px-4 border-b border-gray-300 text-left'>KODE PERIKSA</th>
                    <th className='py-2 px-4 border-b border-gray-300 text-left'>
                      NAMA PEMERIKSAAN
                    </th>
                    <th className='py-2 px-4 border-b border-gray-300 text-left'>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='py-2 px-4 border-b border-gray-300'>1</td>
                    <td className='py-2 px-4 border-b border-gray-300'>101 - K.3</td>
                    <td className='py-2 px-4 border-b border-gray-300'>HEMATOLOGI RUTIN</td>
                    <td className='py-2 px-4 border-b border-gray-300'>
                      <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                        PILIH
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4 border-b border-gray-300'>2</td>
                    <td className='py-2 px-4 border-b border-gray-300'>101 - K.3</td>
                    <td className='py-2 px-4 border-b border-gray-300'>HEMATOLOGI RUTIN</td>
                    <td className='py-2 px-4 border-b border-gray-300'>
                      <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                        PILIH
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className='py-2 px-4 border-b border-gray-300'>3</td>
                    <td className='py-2 px-4 border-b border-gray-300'>101 - K.3</td>
                    <td className='py-2 px-4 border-b border-gray-300'>HEMATOLOGI RUTIN</td>
                    <td className='py-2 px-4 border-b border-gray-300'>
                      <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                        PILIH
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <label className='text text-xl font-bold label'>LIST PERMINTAAN LABOR</label>
          <div className='relative w-full mb-2'>
            <button className='absolute right-5 bottom-3 h-[25.02px] w-[25.02px] bg-none text-[#55A46B]'>
              <MagnifyingGlassIcon />
            </button>
            <input
              type='text'
              placeholder='Cari...'
              value='-'
              className='w-full input input-bordered'
            />
          </div>
          <div className='overflow-x-auto'>
            <table className='table min-w-full border border-gray-300'>
              <thead>
                <tr className='bg-gray-200 text-gray-700'>
                  <th className='py-2 px-4 border-b border-gray-300 text-left'>NO</th>
                  <th className='py-2 px-4 border-b border-gray-300 text-left'>PEMERIKSAAN</th>
                  <th className='py-2 px-4 border-b border-gray-300 text-left'>SATUAN</th>
                  <th className='py-2 px-4 border-b border-gray-300 text-left'>NILAI RUJUKAN</th>
                  <th className='py-2 px-4 border-b border-gray-300 text-left'>AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 px-4 border-b border-gray-300'>1</td>
                  <td className='py-2 px-4 border-b border-gray-300'>MCHC</td>
                  <td className='py-2 px-4 border-b border-gray-300'>%</td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    LD: 32-0-720, LA 23.0-23.0PA: 32-0
                  </td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                      PILIH
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border-b border-gray-300'>2</td>
                  <td className='py-2 px-4 border-b border-gray-300'>MCHC</td>
                  <td className='py-2 px-4 border-b border-gray-300'>%</td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    LD: 32-0-720, LA 23.0-23.0PA: 32-0
                  </td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                      PILIH
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className='py-2 px-4 border-b border-gray-300'>3</td>
                  <td className='py-2 px-4 border-b border-gray-300'>MCHC</td>
                  <td className='py-2 px-4 border-b border-gray-300'>%</td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    LD: 32-0-720, LA 23.0-23.0PA: 32-0
                  </td>
                  <td className='py-2 px-4 border-b border-gray-300'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded'>
                      PILIH
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=' w-auto mt-4'>
          <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
            <InformationCircleIcon width={25} height={25} />
            <p className='ml-[6px]'>Informasi</p>
          </div>
          <p className='w-full font-sans text-red-400  text-base font-normal leading-5'>
            Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam
            pengisian data dapat berdampak pada perawatan pasien.
          </p>
          <div>
            <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
              <p className='flex'>
                <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' /> Selesai
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageRanapPenunjang
