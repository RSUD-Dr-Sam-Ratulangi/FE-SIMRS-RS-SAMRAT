import pmsImage from '../../../../../assets/img/pms.jpg'

const RiwayatTriase = () => {
  return (
    <>
      <div className='h-[560px] overflow-auto'>
        <div className='flex justify-between'>
          <div>
            <label className='font-inter font-bold text-lg text-[#121713]'>Riwayat Triase</label>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='grid w-56'>
              <input type='date' className='input w-full border-primary text-sm' />
            </div>
            <div className='w-40'>
              <input
                type='time'
                className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                value='13:30'
              />
            </div>
            <div>
              <div className='p-1 border w-64 border-green-500 bg-white rounded-xl'>
                <p className='text text-xs font-semibold'>INSTALASI IGD - U2001</p>
                <p className=' font-bold text-xs text-[#121713] mt-2 '>
                  DOKTER : dr Gerry A.M. Supit
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* BATAS */}
          <div className='grid items-center'>
            <div className='w-96'>
              <label className='label text-disabled text-sm font-bold'>KELUHAN UTAMA</label>
              <h1>
                Demam, sesak nafas, nyeri pinggang, dll. Keluhan utama ini sebaiknya tidak lebih
                dari satu keluhan.
              </h1>
            </div>
            <div className='w-96'>
              <label className='label text-disabled text-sm font-bold'>CARA MASUK</label>
              <h1>Jalan</h1>
            </div>
            <div className='w-96'>
              <label className='label text-disabled text-sm font-bold'>ALAT TRANSPORTASI</label>
              <h1>Sendiri</h1>
            </div>
          </div>
          {/* Pengkajian */}
          <div className='border w-full rounded-xl bg-white'>
            <label className='label text-disabled text-lg font-bold'>Pengkajian</label>
            <div>
              <div>
                <label className='label text-sm font-bold'>JALAN NAFAS</label>
                <p className='text-red-500'>Obstruksi/ Obstruksi Partial</p>
              </div>
              <div>
                <label className='label text-sm font-bold'>SIRKULASI</label>
                <p className='text-red-500'>Obstruksi/ Obstruksi Partial</p>
              </div>
              <div>
                <label className='label text-sm font-bold'>KESADARAN</label>
                <p className='text-red-500'>Obstruksi/ Obstruksi Partial</p>
              </div>
            </div>
            <div>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex items-center'>
                  <label className='text-lg font-bold'>Lokasi :</label>
                  <p>1-3</p>
                </div>
                <div className='grid'>
                  {/* <div className='grid justify-center'>
                    <div className='bg-[#F74848] text-white h-[50px] w-56 flex items-center justify-center'>
                      RESUSCITATE
                    </div>
                    <div className='bg-[#F89500] text-white text-center h-[50px] w-56 flex items-center justify-center'>
                      EMERGENT
                    </div>
                    <div className='bg-[#FFE710] text-center h-[50px] w-56 flex items-center justify-center'>
                      URGENT
                    </div>
                    <div className='bg-[#33EF04] text-white text-center h-[50px] w-56 flex items-center justify-center'>
                      NON-URGENT
                    </div>
                    <div className='bg-gray-50 text-center h-[50px] w-56 flex items-center justify-center'>
                      FALSE EMERGENCY
                    </div>
                  </div> */}
                  <img src={pmsImage} className='w-[500px] mr-5' />
                </div>
              </div>
            </div>
            <div>
              <div>
                <label className='label text-sm font-bold'>KONDISI MENTAL</label>
                <p className=''>Obstruksi/ Obstruksi Partial</p>
              </div>
              <div>
                <label className='label text-sm font-bold'>DEATH ON ARRIVAL</label>
                <p className=''>Refleks Cahaya -/-</p>
              </div>
              <div>
                <label className='label text-sm font-bold'>DEATH ON ARRIVAL</label>
                <p className=''>Refleks Cahaya -/-</p>
              </div>
              <div>
                <div>
                  <label className='label text-sm font-bold'>DITERUSKAN KEPADA</label>
                  <p className=''>Hitam</p>
                </div>
                <div>
                  <label className='label text-sm font-bold'>TINDAK LANJUT</label>
                  <p className=''>Rawat Inap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RiwayatTriase
