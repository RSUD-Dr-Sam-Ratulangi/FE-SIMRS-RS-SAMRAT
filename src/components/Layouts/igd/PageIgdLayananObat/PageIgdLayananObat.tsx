import HeaderIgd from '../../../Navbar/HeaderDetailIGD'

import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  BellIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

const PageIgdLayananObat = () => {
  return (
    <>
      <HeaderIgd />
      <div className='p-1'>
        <p className='font-inter font-bold text-xl text-[#121713]'>Layanan & Obat</p>
        <div className='flex w-full h-full bg-white mt-3 p-2'>
          <div className='w-full'>
            <div className=''>
              <p className='font-inter font-bold text-lg text-[#121713]'>Tambah Pasien</p>
              <p className='text-sm text-disabled '>
                Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat jalan
              </p>
              <div>
                <div className='flex gap-3 items-center'>
                  <div className='grid gap-2 w-full'>
                    <div className='flex gap-2'>
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
                    <div>
                      <div className='w-full'>
                        <label className='label'>Nama Pasien</label>
                        <input
                          type='text'
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid w-full'>
                    <div className='grid w-full gap-3'>
                      <div className='grid w-full'>
                        <label className='label'>ID Rawat</label>
                        <input
                          type='text'
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                      <div className='grid w-full'>
                        <label className='label'>Nomor RM</label>
                        <input
                          type='text'
                          className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* BATA */}
              <div>
                <div className='grid gap-3 items-center'>
                  <div className='grid gap-2 w-full'>
                    <div className='flex gap-3 w-full'>
                      <div className='flex gap-2 w-full'>
                        <div className='w-full'>
                          <label className='label'>Tindakan</label>
                          <input type='text' className='input w-full border-primary text-sm' />
                        </div>
                      </div>
                      <div className='flex gap-2 w-full'>
                        <div className='w-full'>
                          <label className='label'>Jenis</label>
                          <input type='text' className='input w-full border-primary text-sm' />
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                      <div className='flex gap-2'>
                        <div className='w-full'>
                          <label className='label'>Obat (e-resep)</label>
                          <input
                            type='text'
                            placeholder='input obat/bhp'
                            className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          />
                        </div>
                        <div className='w-full'>
                          <label className='label'>Aturan Pakai</label>
                          <input
                            type='text'
                            placeholder='input obat/bhp'
                            className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          />
                        </div>
                        <div className='w-full'>
                          <label className='label'>Aturan Pakai</label>
                          <input
                            type='text'
                            placeholder='input obat/bhp'
                            className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          />
                        </div>
                        <div className='w-full'>
                          <label className='label'>Aturan Pakai</label>
                          <input
                            type='text'
                            placeholder='input obat/bhp'
                            className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          />
                        </div>
                      </div>
                      <div className='grid w-full gap-3'>
                        <div className='grid w-full'>
                          <label className='label'>Biaya</label>
                          <input
                            placeholder={'Rp. 100.000'}
                            type='text'
                            className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
              <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
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
        {/* Batas */}
        <div className='w-full h-full bg-white mt-3 p-2'>
          <div className='pt-3'>
            <label className='label font-inter font-bold text-xl text-[#121713]'>
              RINCIAN TINDAKAN
            </label>
          </div>
          <div className='border-4 rounded-3xl p-2 mb-2'>
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
        </div>
        <div className='w-full h-full bg-white mt-3 p-2'>
          <div className='pt-3'>
            <label className='label font-inter font-bold text-xl text-[#121713]'>
              PERMINTAAN E-RESEP
            </label>
          </div>
          <div className='border-4 rounded-3xl p-2 mb-2'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nomor Resep</th>

                  <th>Provide</th>
                  <th>Tarif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-08-15</td>
                  <td>10029394819</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-08-15</td>
                  <td>12093840198</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-08-15</td>
                  <td>12093840198</td>
                  <td>RSUD</td>
                  <td>Rp.100.000</td>
                  <td>
                    <button className='text-red-400'>Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* batas */}
      </div>
    </>
  )
}

export default PageIgdLayananObat
