import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'

const PageIgdSelesai = () => {
  return (
    <>
      <HeaderIgd />
      <div>
        <p className='font-inter font-bold text-xl text-[#121713]'>SELESAI</p>
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
          <div className='grid w-full h-full bg-white mt-3 p-2'>
            <label className='label font-inter font-bold text-lg text-[#121713]'>
              TAMBAH PASIEN
            </label>
            <p className=' font-bold text-sm text-disabled'>
              Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat inap
            </p>
            <div className='w-full'>
              <div className='flex justify-start items-center gap-3'>
                <div className='grid gap-1 w-96'>
                  <div className=''>
                    <label className='label text-sm font-bold'>DOKTER PENERIMA PASIEN :</label>
                    <select className='select select-bordered w-full max-w-xs'>
                      <option disabled selected>
                        tidak
                      </option>
                      <option>Lorem</option>
                      <option>Lorem</option>
                    </select>
                  </div>
                  <div className=''>
                    <label className='label font-bold'>DOKTER PEMBERI SARAN :</label>
                    <select className='select select-bordered w-full max-w-xs'>
                      <option disabled selected>
                        tidak
                      </option>
                      <option>Lorem</option>
                      <option>Lorem</option>
                    </select>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='grid'>
                      <label className='label'>Tanggal</label>
                      <input type='date' className='input w-full border-primary text-sm' />
                    </div>
                    <div className='w-full'>
                      <label className='label'>Jam</label>
                      <input
                        type='time'
                        className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        value='13:30'
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                {/* Batas */}
                <div className='w-full'>
                  <div>
                    <label className='text text-xl font-bold label'>Anamnesa</label>
                    <textarea
                      placeholder='-'
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    />
                  </div>
                  <div>
                    <label className='text text-xl font-bold label'>BHP RUANGAN</label>
                    <div className='flex items-center'>
                      <input type='checkbox' className='w-10 mr-2' />
                      <p>Tandai Jika Pasien Menggunakan BHP Ruangan</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='w-96 mt-4 border p-2 rounded-2xl'>
                    <div className='flex text-base text-[#121713] items-center font-bold font-sans my-[20px]'>
                      <InformationCircleIcon width={25} height={25} />
                      <p className='ml-[6px]'>Informasi</p>
                    </div>
                    <p className='w-full font-sans text-disabled  text-base font-normal leading-5'>
                      Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan.
                      Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien.
                    </p>
                    <div>
                      <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
                        <p className='flex'>
                          <ArchiveBoxArrowDownIcon width={20} height={20} className='mr-3' />{' '}
                          Selesai
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
            </div>
            <div className='mt-2'>
              <p className='text text-xl font-bold'>Status Pelayanan</p>
              <div className='flex gap-3'>
                <div className='flex gap-3'>
                  <input type='radio' name='radio-1' className='radio' defaultChecked />
                  <p className='text-sm'>Belum Dilayani</p>
                </div>
                <div className='flex gap-3'>
                  <input type='radio' name='radio-1' className='radio' />
                  <p className='text-sm'>Sudah Dilayani</p>
                </div>
                <div className='flex gap-3'>
                  <input type='radio' name='radio-1' className='radio' />
                  <p className='text-sm'>Dalam Perawatan</p>
                </div>
              </div>
            </div>
            <div className='flex gap-2 '>
              {/*  */}
              <div className='mt-2'>
                <p className='text text-sm font-bold'>Cara Keluar</p>
                <div className='grid gap-3 mt-2'>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' defaultChecked />
                    <p className='text-sm'>Belum Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Sudah Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Dalam Perawatan</p>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className='mt-2'>
                <p className='text text-sm font-bold'>Keadaan Keluar</p>
                <div className='grid gap-3 mt-2'>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' defaultChecked />
                    <p className='text-sm'>Belum Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Sudah Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Dalam Perawatan</p>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className='mt-2'>
                <p className='text text-sm font-bold'>Tanda Tangan Resume Medis</p>
                <div className='grid gap-3 mt-2'>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' defaultChecked />
                    <p className='text-sm'>Belum Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Sudah Dilayani</p>
                  </div>
                  <div className='flex gap-3'>
                    <input type='radio' name='radio-1' className='radio' />
                    <p className='text-sm'>Dalam Perawatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageIgdSelesai
