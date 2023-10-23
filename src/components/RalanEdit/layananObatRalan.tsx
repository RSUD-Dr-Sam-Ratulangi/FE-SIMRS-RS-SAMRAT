import {
  InformationCircleIcon,
  ArchiveBoxArrowDownIcon,
  ClockIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid'
import DataTable from 'react-data-table-component'
import RalanEditHeader from './RalanEditHeader'

type Props = {
  columns: any[]
}

const tableStyles = {
  rows: {
    style: {
      minHeight: '30px',

      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
    },
  },
  headRow: {
    style: {
      color: '#A0AEC0',
      fontSize: '12px',
      borderBottomWidth: '1px',
      minHeight: '30px',
    },
  },
  cells: {
    style: {
      padding: '0px',
    },
  },
  headCells: {
    style: {
      padding: '0px',
    },
  },
}

const dataPemeriksaan = [
  {
    tanggal: '2023-10-10 11:03:06',
    namaItem: 'Paracetamol 600mg',
    provider: 'RSUD',
    tarif: 'Rp. 100.000',
  },
  {
    tanggal: '2023-10-10 11:03:06',
    namaItem: 'Paracetamol 600mg',
    provider: 'RSUD',
    tarif: 'Rp. 100.000',
  },
  {
    tanggal: '2023-10-10 11:03:06',
    namaItem: 'Paracetamol 600mg',
    provider: 'RSUD',
    tarif: 'Rp. 100.000',
  },
  // { id: 2, firstName: "Rick", lastName: "Frown", date: "2023-02-19" },
  // Add more data objects here
]

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
    label: <label>Nomor RM</label>,
    input: <input className='input input-bordered w-full' placeholder='0000/00/00/000000' />,
  },
  {
    label: <label>ID Rawat </label>,
    input: <input className='input input-bordered w-full' placeholder='2023/10/9/000161' />,
  },
  {
    label: <label>Nama Pasien</label>,
    input: <input className='input input-bordered w-full' placeholder='Esthera Jackson' />,
  },
  {
    label: <label>Tindakan</label>,
    input: <input className='input input-bordered w-full' placeholder='Input Tindakan/layanan' />,
  },
  {
    label: <label>Jenis</label>,
    input: (
      <input className='input input-bordered w-full' placeholder='Nama Tindakan/layanan/obat/BHP' />
    ),
  },
  {
    label: <label>Obat (e-resep)</label>,
    input: <input className='input input-bordered w-full' placeholder='Input Obat/BHP' />,
  },
  {
    label: <label>Biaya</label>,
    input: <input className='input input-bordered w-full' placeholder='Rp. 100.000' />,
  },
]

const LayananObatRalan = ({ columns }: Props) => {
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
          <p className='font-sans text-xl font-bold text-[#2D3748] mt-4 mb-4'>Rincian Tindakan</p>
          <div className=' max-h-[100vh] border border-disabled rounded-xl w-full'>
            <div className=' p-1 w-full'>
              <DataTable columns={columns} data={dataPemeriksaan} customStyles={tableStyles} />
            </div>
          </div>
          <div className=' text-right '>
            <p className='font-sans text-sm font-bold text-disabled mt-2 mr-6'>
              Total <span className='text-black ml-1'>Rp. 300.000</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LayananObatRalan
