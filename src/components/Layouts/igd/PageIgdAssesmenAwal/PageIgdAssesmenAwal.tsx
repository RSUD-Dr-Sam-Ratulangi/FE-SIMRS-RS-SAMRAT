import { ArchiveBoxArrowDownIcon, BellIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/solid'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'

const PageIgdAssesmenAwal = () => {
  return (
    <>
      <HeaderIgd />
      <div className='p-1'>
        <p className='font-inter font-bold text-xl text-[#121713]'>ASSESMEN AWAL</p>
        <div className='flex'></div>
        <div className='grid w-full h-full bg-white mt-3 p-2'>
          <div className='mt-3'>
            <label className='label font-inter font-bold text-xl text-[#121713]'>
              Tanda - Tanda Vital
            </label>
            <p className='text-sm text-disabled '>Isi semua data dibawah ini.</p>
            <div className='grid grid-cols-7 gap-3'>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Suhu(C)</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Kesadaran</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>TD</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>mmHg Nadi</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>x/m Respirasi</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
              <div className='form-control 3'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>x/m SB</span>
                </label>
                <input
                  type='Text'
                  placeholder='-'
                  className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                />
              </div>
            </div>
          </div>
          {/* Batas */}
          <div>
            <label className='label font-inter font-bold text-xl text-[#121713]'>GCS</label>
            <div className='flex gap-3 items-center'>
              <div className='grid gap-3'>
                <div className='flex items-center gap-4'>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>E</span>
                    <strong>=</strong>
                  </label>
                  <input
                    type='Text'
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
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
                <div className='flex items-center gap-4 '>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>M</span>
                    <strong>=</strong>
                  </label>
                  <input
                    type='Text'
                    placeholder='-'
                    className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black w-full'
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center gap-4 '>
                  <label className='flex font-semibold text-slate-700 text-md'>
                    <span>AKRAL</span>
                    <strong>=</strong>
                  </label>
                  <input
                    type='Text'
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
          </div>
          {/* BATAS */}
          <div className='grid justify-start items-center p-1 gap-1 bg-white rounded-lg shadow mt-5 '>
            {/* Header */}
            <div className='grid grid-cols-7 gap-1 mb-2'>
              <div className='col-span-2 font-semibold'>PENGKAJIAN</div>
              <div className='bg-red-500 text-white text-center'>RESUSCITATE</div>
              <div className='bg-orange-500 text-white text-center'>EMERGENT</div>
              <div className='bg-yellow-500 text-center'>URGENT</div>
              <div className='bg-green-500 text-white text-center'>NON-URGENT</div>
              <div className='bg-gray-300 text-center'>FALSE EMERGENCY</div>
            </div>

            {/* JALAN NAFAS */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>JALAN NAFAS</div>
              <div>
                <input type='checkbox' className='mr-2' />
                Obstruksi/Obstruksi Partial
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Bebas
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Bebas
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Bebas
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Bebas
              </div>
              <div></div>
            </div>

            {/* PERNAFASAN */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>PERNAFASAN</div>
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
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>RR {'>'} 32x/m</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Wheezing</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>RR 24-32x/m</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Wheezing</p>
                </div>
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Normal
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Normal
              </div>
              <div></div>
            </div>

            {/* SIRKULASI */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>SIRKULASI</div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Henti Jantung</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Nadi TT</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Akral Dingin</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Nadi Teraba Lemah</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>HR {'<'} 50x/m</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>HR {'<'} 150x/m</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Akral Dingin</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>CRT {'>'} 2 detik</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>RR 24-32x/m</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>TD Sislotik {'>'} 160 mmHg</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>TD Sislotik {'>'} 100 mmHg</p>
                </div>
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Normal
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                Normal
              </div>
              <div></div>
            </div>

            {/* KESADARAN */}
            <div className='grid grid-cols-7 gap-2'>
              <div className='col-span-2 font-semibold'>KESADARAN</div>
              <div>
                <input type='checkbox' className='mr-2' />
                GCS &lt; 9
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                GCS 9-12
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                GCS 13-14
              </div>
              <div>
                <input type='checkbox' className='mr-2' />
                GCS 15
              </div>
              <div></div>
            </div>

            {/* Skala nyeri */}
            <div className='flex items-center gap-[1px] mb-4'>
              <div className='col-span-2 font-semibold mr-[349px]'>SKALA NYERI</div>
              <div className='grid gap-1'>
                <div className='flex'>
                  <div>
                    <div>
                      <p className='text-end font-bold text-sm'>0</p>
                      <div className='w-20 h-4 bg-[#009718] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>1</p>
                      <div className='w-20 h-4 bg-[#01B91F] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>2</p>
                      <div className='w-20 h-4 bg-[#00C821] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>3</p>
                      <div className='w-20 h-4 bg-[#00DA24] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>4</p>
                      <div className='w-20 h-4 bg-[#AEDA00] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>5</p>
                      <div className='w-20 h-4 bg-[#DAAA00] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>6</p>
                      <div className='w-20 h-4 bg-[#EA7F00] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>7</p>
                      <div className='w-20 h-4 bg-[#FA744A] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>8</p>
                      <div className='w-20 h-4 bg-[#FE3C3C] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>9</p>
                      <div className='w-20 h-4 bg-[#FF2E2E] rounded-full'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <p className='text-end font-bold text-sm'>10</p>
                      <div className='w-20 h-4 bg-[#D21717] rounded-full'></div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='bg-[#009718] w-32 h-32 rounded-full'></div>
                  <div className='bg-[#00C821] w-32 h-32 rounded-full'></div>
                  <div className='bg-[#DAAA00] w-32 h-32 rounded-full'></div>
                  <div className='bg-[#EA7F00] w-32 h-32 rounded-full'></div>
                  <div className='bg-[#EA7F00] w-32 h-32 rounded-full'></div>
                  <div className='bg-[#D00404] w-32 h-32 rounded-full'></div>
                </div>

                <div className='flex justify-evenly mt-5 items-center'>
                  <p>Lokasi : </p>
                  <div className='flex justify-center gap-2'>
                    <p>1-3</p>
                    <input type='checkbox' className='mr-2' />
                  </div>
                  <div className='flex justify-center gap-2'>
                    <p>4-6</p>
                    <input type='checkbox' className='mr-2' />
                  </div>
                  <div className='flex justify-center gap-2'>
                    <p>6-10</p>
                    <input type='checkbox' className='mr-2' />
                  </div>
                </div>
              </div>
            </div>

            {/* kondisi mental */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>KONDISI MENTAL</div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Tidak Kooperatif</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Kooperatif</p>
                </div>
              </div>
              <div></div>
            </div>

            {/* doa */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>DEATH ON ARRIVAL</div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Tidak ada tanda kehidupan</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Tidak ada denyut nadi</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Reflek Cahaya -/-</p>
                </div>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>EKG Flat</p>
                </div>
              </div>
              <div></div>
            </div>

            {/* ? */}
            <div className='flex items-center gap-[1px] mb-4'>
              <div className='col-span-2 font-semibold mr-[315px]'>Diteruskan Kepada</div>
              <div className='grid gap-1'>
                <div className='flex'>
                  <div>
                    <div>
                      <div className='w-20 h-10 bg-[#F74848] border '></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <div className='w-20 h-10 bg-[#F89500] border'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <div className='w-20 h-10 bg-[#FFE710] border'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <div className='w-20 h-10 bg-[#33EF04] border'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <div className='w-20 h-10 bg-gray-100 border'></div>
                    </div>
                  </div>
                  <div className='flex gap-1'>
                    <div>
                      <div className='w-20 h-10 bg-[#000000] border'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tindak lanjut */}
            <div className='grid grid-cols-7 gap-2 mb-4'>
              <div className='col-span-2 font-semibold'>KONDISI MENTAL</div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Rawat Jalan</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Rawat Inap</p>
                </div>
              </div>
              <div className='grid items-center'>
                <div className='flex items-center'>
                  <input type='checkbox' className='mr-2' />
                  <p>Dirujuk</p>
                </div>
              </div>
              <div></div>
            </div>

            {/* Pengkajian p */}
            <div>
              <label className='label font-inter font-bold text-xl text-[#121713]'>
                Pengkajian Perawatan
              </label>
              <div className='grid'>
                <div className='flex gap-3'>
                  <div className='grid'>
                    <div>
                      <div>
                        <label className='label font-bold'>Informasi Diperoleh Dari :</label>
                        <select className='select select-bordered w-full max-w-xs'>
                          <option disabled selected>
                            Autoanamnesa
                          </option>
                          <option>Lorem</option>
                          <option>Lorem</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Cara Masuk</span>
                        </label>
                        <input
                          placeholder='Kursi Roda'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Nama</span>
                        </label>
                        <input
                          type='Text'
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid'>
                    <div>
                      <div>
                        <label className='label font-bold'>Merokok</label>
                        <select className='select select-bordered w-full max-w-xs'>
                          <option disabled selected>
                            tidak
                          </option>
                          <option>Lorem</option>
                          <option>Lorem</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Prosedur Masuk</span>
                        </label>
                        <input
                          placeholder='Rujukan'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Hubungan</span>
                        </label>
                        <input
                          type='Text'
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid'>
                    <div>
                      <div>
                        <label className='label font-bold'>Alkohol :</label>
                        <select className='select select-bordered w-full max-w-xs'>
                          <option disabled selected>
                            tidak
                          </option>
                          <option>Lorem</option>
                          <option>Lorem</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>TP/PB</span>
                        </label>
                        <input
                          type='text'
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Berat Badan</span>
                        </label>
                        <input
                          type='Text'
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid'>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Riwayat Penyakit Sekarang</span>
                        </label>
                        <textarea
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                        <div className='flex justify-evenly mt-2'>
                          <button className='btn btn-md w-20 bg-primary text-gray-50 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-primary'>
                            Hipertensi
                          </button>
                          <button className='btn btn-md w-20 bg-primary text-gray-50 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-primary'>
                            Ginjal
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='form-control 3'>
                        <label className='label font-semibold text-slate-700 text-md'>
                          <span>Riwayat Penyakit Dahulu</span>
                        </label>
                        <textarea
                          placeholder='-'
                          className='input input-bordered text-sm rounded-2xl border-disabled disabled:bg-slate-200 disabled:text-black '
                        />
                        <div className='flex justify-evenly mt-2'>
                          <button className='btn btn-md w-20 bg-primary text-gray-50 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-primary'>
                            Hipertensi
                          </button>
                          <button className='btn btn-md w-20 bg-primary text-gray-50 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-primary'>
                            Ginjal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </>
  )
}

export default PageIgdAssesmenAwal
