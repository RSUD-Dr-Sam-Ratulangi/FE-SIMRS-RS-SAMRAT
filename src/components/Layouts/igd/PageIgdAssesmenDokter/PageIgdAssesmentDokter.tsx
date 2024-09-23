import { ArchiveBoxArrowDownIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'

const PageIgdAssesmenDokter = () => {
  return (
    <>
      <HeaderIgd />
      <div>
        <div>
          <p className=' font-bold text-xl text-[#121713]'>Data Pasien</p>
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
        {/* BATAS */}
        <div className='flex gap-8'>
          <div className='grid w-full gap-0'>
            <div>
              <label className='text text-xl font-bold label'>Anamnesa</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              />
            </div>
            <div>
              <label className='text text-xl font-bold label'>Riwayat Penyakit Sekarang</label>
              <textarea
                placeholder='-'
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
              />
            </div>
            <div className='flex gap-3'>
              <div className='form-control w-full'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Riwayat Penyakit Dahulu</span>
                </label>
                <select className='select select-bordered w-full'>
                  <option disabled selected>
                    Riwayat Penyakit Dahulu
                  </option>
                  <option>Hipertensi</option>
                  <option>Penyakit Ginjal</option>
                  <option>DM</option>
                  <option>Kanker</option>
                  <option>Jantung</option>
                  <option>PPOK</option>
                  <option>Hepatitis</option>
                  <option>Gangguan Jiwa</option>
                  <option>Asma</option>
                  <option>Ulkus</option>
                  <option>TB</option>
                  <option>Lorem</option>
                </select>
              </div>
            </div>
            <div className='flex items-center gap-3 w-full'>
              <div className='grid items-center gap-3'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>TP/PB</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black'
                  />
                </div>
                <div className='w-full'>
                  <div className='form-control w-full'>
                    <label className='label font-semibold text-slate-700 text-md'>
                      <span>Berat Badan</span>
                    </label>
                    <input
                      type='text'
                      placeholder='-'
                      className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <div className='grid w-full'>
                  <div className='w-full'>
                    <label className='label font-bold'>Alkohol :</label>
                    <select className='select select-bordered w-full'>
                      <option disabled selected>
                        tidak
                      </option>
                      <option>Lorem</option>
                      <option>Lorem</option>
                    </select>
                  </div>
                  <div className='w-full'>
                    <label className='label font-bold'>Merokok :</label>
                    <select className='select select-bordered w-full'>
                      <option disabled selected>
                        tidak
                      </option>
                      <option>Lorem</option>
                      <option>Lorem</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid gap-3 mt-5'>
              <label className='font-bold text-slate-700 text-md'>
                <span>PEMERIKSAAN FISIK</span>
              </label>
              <div className='flex gap-3'>
                <div className='form-control w-full'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Normal</span>
                  </label>
                  <select className='select select-bordered w-full'>
                    <option disabled selected>
                      Normal
                    </option>
                    <option>Gigi & mulut</option>
                    <option>Mata</option>
                    <option>Tenggorokan</option>
                    <option>Telinga</option>
                  </select>
                </div>
                <div className='form-control w-full'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>AbNormal</span>
                  </label>
                  <select className='select select-bordered w-full'>
                    <option disabled selected>
                      Abnormal
                    </option>
                    <option>Gigi & mulut</option>
                    <option>Mata</option>
                    <option>Tenggorokan</option>
                    <option>Telinga</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className='label font-inter font-bold text-xl text-[#121713]'>
                RENCANA KERJA
              </label>
              <div className='flex justify-center items-center gap-3'>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Terapi</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div>
                  <label className='text text-md font-bold label'>Kebutuhan Pelayanan</label>
                  <div className='grid items-center'>
                    <div className='flex items-center'>
                      <input type='checkbox' className='mr-2' />
                      <p>Henti Nafas</p>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' className='mr-2' />
                      <p>RR {'<'} 10 mnt</p>
                    </div>
                    <div className='flex items-center'>
                      <input type='checkbox' className='mr-2' />
                      <p>Sianosis</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Ruangan</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Meninggal</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Dipulangkan</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Minggat</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
                <div className='w-full'>
                  <label className='text text-xl font-bold label'>Pulang Paksa</label>
                  <textarea
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='mt-3'>
              <label className='label font-inter font-bold text-xl text-[#121713]'>
                Tanda - Tanda Vital
              </label>
              <p className='text-sm text-disabled'>Isi semua data dibawah ini.</p>
              <div className='grid grid-cols-7 gap-3'>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>Suhu(C)</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>Kesadaran</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>TD</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>mmHg Nadi</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>x/m Respirasi</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-sm'>
                    <span>x/m SB</span>
                  </label>
                  <input
                    type='text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
              </div>
            </div>

            <div className='grid'>
              <label className='label font-inter font-bold text-xl text-[#121713]'>GCS</label>
              <div className='grid'>
                <div className='flex gap-3 items-center'>
                  <div className='grid gap-3'>
                    <div className='flex items-center gap-4'>
                      <label className='flex font-semibold text-slate-700 text-sm'>
                        <span>E</span>
                        <strong>=</strong>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                    <div className='flex items-center gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>V</span>
                        <strong>=</strong>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                    <div className='flex items-center gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>M</span>
                        <strong>=</strong>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                  </div>
                  <div className='grid gap-2'>
                    <div className='flex items-center gap-4'>
                      <label className='flex font-semibold text-slate-700 text-md'>
                        <span>AKRAL</span>
                        <strong>=</strong>
                      </label>
                      <input
                        type='text'
                        placeholder='-'
                        className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                      />
                    </div>
                    <div className='flex items-center gap-4 '>
                      <label className='label font-semibold text-slate-700 text-md'>
                        <span>Status Alergi</span>
                      </label>
                      <div className='grid gap-3'>
                        <div className='flex gap-3'>
                          <input type='radio' name='radio-1' className='radio' defaultChecked />
                          <p>Tidak ada</p>
                        </div>
                        <div className='flex gap-3'>
                          <input type='radio' name='radio-1' className='radio' />
                          <p>Ada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-full gap-3'>
                  <div className='w-full'>
                    <label className='text text-xl font-bold label'>Diagnosa Kerja</label>
                    <textarea
                      placeholder='-'
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    />
                  </div>
                  <div className='w-full'>
                    <label className='text text-xl font-bold label'>Diagnosa Banding</label>
                    <textarea
                      placeholder='-'
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-3'>
          <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
              Mengirim
            </p>
          </button>
          <button className='flex justify-center items-center font-semibold text-gray-500 border-2 text-base w-full h-[50px] py-2 mt-[20px] bg-white rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ClockIcon className='mr-3' width={25} height={25} />
              RIWAYAT
            </p>
          </button>
          <button className='flex justify-center items-center font-semibold text-base w-full h-[50px] py-2 mt-[20px] bg-gray-100 border text-black rounded-xl hover:opacity-80'>
            <p className='flex justify-center items-center'>
              <ArchiveBoxIcon className='mr-3' width={25} height={25} />
              Tutup
            </p>
          </button>
        </div>
      </div>
    </>
  )
}

export default PageIgdAssesmenDokter
