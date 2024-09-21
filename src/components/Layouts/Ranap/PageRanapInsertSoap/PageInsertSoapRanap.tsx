import {
  ArchiveBoxArrowDownIcon,
  InformationCircleIcon,
  BellIcon,
  CheckIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

enum KesadaranOptions {
  defaultValue = 'Pilih Kesadaran',
  ComposMentis = 'Compos Mentis',
  Somnolence = 'Somnolence',
  Sopor = 'Sopor',
  Coma = 'Coma',
  Alert = 'Alert',
  Confusion = 'Confusion',
  Voice = 'Voice',
  Pain = 'Pain',
  Unresponsive = 'Unresponsive',
}

const PageInsertSoapRanap = () => {
  return (
    <div className='p-1'>
      <p className='font-inter font-bold text-xl text-[#121713]'>CPPT / SOAP</p>
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
            {/* Batas */}
            <div className='mt-3'>
              <label className='label font-inter font-bold text-xl text-[#121713]'>
                Pemeriksaan
              </label>
              <div className='grid grid-cols-6 gap-3'>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Suhu(C)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Tensi(mmHg)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Nadi(/mnt)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>RR(/mnt)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Tinggi(cm)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Berat(kg)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>SPO2</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>GCS(E,V,M)</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Alergi</span>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control mt-6'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Kesadaran</span>
                  </label>
                  <select className='input w-full input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black'>
                    {Object.values(KesadaranOptions).map((option) => (
                      <option
                        key={option}
                        value={option}
                        disabled={option === KesadaranOptions.defaultValue}
                        hidden={option === KesadaranOptions.defaultValue}
                        selected={option === KesadaranOptions.defaultValue}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Batas */}
            <div className='mt-3'>
              <label className='label font-inter font-bold text-xl text-[#121713]'>SOAP</label>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='label'>Subjektif</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                  />
                </div>
                <div>
                  <label className='label'>Objektif</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                  />
                </div>
                <div>
                  <label className='label'>Assesmen</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                  />
                </div>
                <div>
                  <label className='label'>Plan</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled disabled:bg-slate-200 disabled:text-black w-full h-36 pt-1'
                  />
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
          <label className='label font-inter font-bold text-xl text-[#121713]'>ICD 9 & 10</label>
        </div>
        <div className='border-4 rounded-3xl p-2 mb-2'>
          <label className='label'>Prosedur Tindakan ICD 9</label>
          <table className='table'>
            <thead>
              <tr>
                <th>Kode</th>
                <th>labelrioritas</th>
                <th>Nama Penyakit</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Z33</td>
                <td>1</td>
                <td>Pregnant state, incidental</td>
                <td>
                  <button className='text-red-400'>Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='border-4 rounded-3xl p-2'>
          <label className='label'>Prosedur Tindakan ICD 10</label>
          <table className='table'>
            <thead>
              <tr>
                <th>Kode</th>
                <th>labelrioritas</th>
                <th>Nama Penyakit</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Z33</td>
                <td>1</td>
                <td>Pregnant state, incidental</td>
                <td>
                  <button className='text-red-400'>Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* batas */}
      <div className='w-full h-full bg-white mt-3'>
        <label className='label font-inter font-bold text-xl text-[#121713]'>Rincian Riwayat</label>
        <table className='table font-bold'>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Soap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>032345</td>
              <td>2024-10-03</td>
              <td>Lorem Ipsum dolor sit amet</td>
            </tr>
            <tr>
              <td>032345</td>
              <td>2024-10-03</td>
              <td>Lorem Ipsum dolor sit amet</td>
            </tr>
            <tr>
              <td>032345</td>
              <td>2024-10-03</td>
              <td>Lorem Ipsum dolor sit amet</td>
            </tr>
            <tr>
              <td>032345</td>
              <td>2024-10-03</td>
              <td>Lorem Ipsum dolor sit amet</td>
            </tr>
            <tr>
              <td>032345</td>
              <td>2024-10-03</td>
              <td>Lorem Ipsum dolor sit amet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PageInsertSoapRanap
