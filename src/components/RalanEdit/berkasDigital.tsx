import {
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  DocumentIcon,
  ClockIcon,
} from '@heroicons/react/24/solid'

import RalanEditHeader from './RalanEditHeader'

const buttonsData = [
  {
    icon: <ArchiveBoxArrowDownIcon className='font-bold text-white h-[17px] w-[17px]' />,
    text: 'Filter',
    textColor: 'white',
    bgColor: '[#55A46B]',
  },
  {
    icon: <DocumentIcon className='font-bold text-disabled h-[17px] w-[17px]' />,
    text: 'Masukan Rincian',
    textColor: 'disabled',
    bgColor: 'white',
  },
]

const rawatPasienLabels = [
  {
    label: <label>Kategori Berkas</label>,
    input: <input className='input input-bordered w-full' placeholder='Berkas SEP' />,
  },
  {
    label: <label>ID Rawat</label>,
    input: <input className='input input-bordered w-full' placeholder='2023/10/9/000161' />,
  },
  {
    label: <label>Nama Pasien</label>,
    input: <input className='input input-bordered w-full' placeholder='Esthera Jackson' />,
  },
  {
    label: <label>Nomor RM</label>,
    input: <input className='input input-bordered w-full' placeholder='0000/00/00/000000' />,
  },
]

const BerkasDigitalRalan = () => {
  return (
    <>
      <RalanEditHeader />
      <div className='w-full h-full rounded-xl shadow-soft'>
        <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
          <p className='font-sans text-xl font-bold text-[#2D3748]'>Tambah Pasien</p>
          <p className='font-sans text-base text-disabled font-normal'>
            Isi semua data di bawah ini untuk menambahkan pasien ke dalam rawat jalan
          </p>
          <div className='flex gap-6 mt-4 mb-6'>
            <div className='w-[70%]'>
              <div className='grid grid-cols-2 gap-6 p-4'>
                <div className='col-span-1 flex gap-4'>
                  <div className='w-[60%] flex flex-col '>
                    <label>Tanggal</label>
                    <input type='date' className='input input-bordered w-full' />
                  </div>
                  <div className='relative w-[40%] flex flex-col'>
                    <label>Jam</label>
                    <input type='time' className='input input-bordered w-full' />
                    <div className='absolute -translate-y-1/2 right-1 top-12'>
                      <ClockIcon className='w-6 mr-1 text-[#55A46B]' />
                    </div>
                  </div>
                </div>
                {rawatPasienLabels.map((label, index) => (
                  <div key={index} className='flex flex-col'>
                    {label.label}
                    {label.input}
                  </div>
                ))}
              </div>
            </div>
            <div className=' w-[30%]'>
              <div className='flex gap-1'>
                <InformationCircleIcon className='w-6' />
                <p> Informasi</p>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='font-sans text-base text-disabled font-normal mb-4'>
                  Mohon pastikan data yang anda masukan sudah benar sebelum melanjutkan. Kesalahan
                  dalam pengisian data dapat berdampak pada perawatan pasiens
                </p>
                {buttonsData.map((button, index) => (
                  <button
                    key={index}
                    tabIndex={0}
                    className={`flex btn w-full text-${button.textColor} bg-${button.bgColor} border-2 border-${button.textColor}`}
                  >
                    {button.icon}
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BerkasDigitalRalan
