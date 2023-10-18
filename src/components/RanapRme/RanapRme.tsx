import { useEffect } from 'react'
import { ArchiveBoxArrowDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

const RanapRme: React.FC = () => {

    const data = [
        {
            NO_RM: '16547',
            NAMA_PASIEN: 'ESTHERA JACKSON',
            ALAMAT: 'RANOMERUT',
            UMUR: '19 Th 10 Bl 18 Hr THN',
            JENIS_KELAMIN: 'Perempuan',
            TANGGAL_LAHIR: '2003-11-15',
            GOLONGAN_DARAH: '-',
            IBU_KANDUNG: '-',
            STATUS_MENIKAH: 'MENIKAH',
            AGAMA: 'KRISTEN',
            PENDIDIKAN_TERAKHIR: '-',
            PERTAMA_DAFTAR: '2023-10-03',
            DATA_RIWAYAT: [
                {
                    NO_RAWAT: '2023/10/03/000374',
                    NO_REGISTRASI: '020',
                    TANGGAL_REGISTRASI: '2023-10-03',
                    UNIT_POLIKLINIK: 'Instalasi IGD (Siang)',
                    DOKTER: 'dr. Andre Imbar',
                    PENJAMIN: 'BPJS',
                    STATUS: 'Rawat Inap',
                    PEMERIKSAAN: '-',
                    KODE: 'Z36.9',
                    NAMA_PENYAKIT: 'Antenatal Screening, unspecified',
                    PRIORITAS: '1'
                },
                {
                    NO_RAWAT: '2023/10/05/000849',
                    NO_REGISTRASI: '052',
                    TANGGAL_REGISTRASI: '2023-10-05',
                    UNIT_POLIKLINIK: 'Instalasi IGD (Siang)',
                    DOKTER: 'dr. Andre Imbar',
                    PENJAMIN: 'BPJS',
                    STATUS: 'Rawat Inap',
                    PEMERIKSAAN: '-',
                    KODE: 'Z36.9',
                    NAMA_PENYAKIT: 'Antenatal Screening, unspecified',
                    PRIORITAS: '1'
                },
                {
                    NO_RAWAT: '2023/10/12/001023',
                    NO_REGISTRASI: '120',
                    TANGGAL_REGISTRASI: '2023-10-12',
                    UNIT_POLIKLINIK: 'Instalasi IGD (Siang)',
                    DOKTER: 'dr. Andre Imbar',
                    PENJAMIN: 'BPJS',
                    STATUS: 'Rawat Inap',
                    PEMERIKSAAN: '-',
                    KODE: 'Z36.9',
                    NAMA_PENYAKIT: 'Antenatal Screening, unspecified',
                    PRIORITAS: '1'
                },
            ]
        }
    ]

    useEffect(() => {
        console.log('data:', data)
    }, [data])


  return (
    <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
        <p className='font-sans text-xl font-bold text-[#2D3748] mb-4'>Riwayat Perawatan</p>
        <div>
            <p className='font-sans text-lg text-disabled font-normal'>Data Riwayat Perawatan Pasien</p>
            <div className=' flex font-sans text-base font-normal text-[#121713] leading-6 mt-2'>
                <div>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                        <p>{data[0].NO_RM}</p>
                    </div>
                    <div className=' my-2'>
                        <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                        <p>{data[0].NAMA_PASIEN}</p>
                    </div>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                        <p>{data[0].ALAMAT}</p>
                    </div>
                </div>
                <div className=' ml-32'>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>UMUR</p>
                        <p>{data[0].UMUR}</p>
                    </div>
                    <div className=' my-2'>
                        <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                        <p>{data[0].JENIS_KELAMIN}</p>
                    </div>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>TANGGAL LAHIR</p>
                        <p>{data[0].TANGGAL_LAHIR}</p>
                    </div>
                </div>
                <div className=' ml-32'>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>GOLONGAN DARAH</p>
                        <p>{data[0].GOLONGAN_DARAH}</p>
                    </div>
                    <div className=' my-2'>
                        <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                        <p>{data[0].IBU_KANDUNG}</p>
                    </div>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                        <p>{data[0].STATUS_MENIKAH}</p>
                    </div>
                </div>
                <div className=' ml-32'>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                        <p>{data[0].AGAMA}</p>
                    </div>
                    <div className=' my-2'>
                        <p className=' font-bold text-gray-400 text-xs'>PENDIDIKAN TERAKHIR</p>
                        <p>{data[0].PENDIDIKAN_TERAKHIR}</p>
                    </div>
                    <div>
                        <p className=' font-bold text-gray-400 text-xs'>PERTAMA DAFTAR</p>
                        <p>{data[0].PERTAMA_DAFTAR}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='mt-4'>
            <p className='font-sans text-lg text-disabled font-normal'>Data Riwayat</p>
            {data[0].DATA_RIWAYAT.map((riwayat, index) => (
                <div key={index} className=' overflow-x-auto'>
                    <div className='flex font-sans text-base font-normal text-[#121713] leading-6 mt-2 whitespace-nowrap'>
                        <div>
                            <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                            <p>{riwayat.NO_RAWAT}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                            <p>{riwayat.NO_REGISTRASI}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                            <p>{riwayat.TANGGAL_REGISTRASI}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                            <p>{riwayat.UNIT_POLIKLINIK}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                            <p>{riwayat.DOKTER}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                            <p>{riwayat.PENJAMIN}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                            <p>{riwayat.STATUS}</p>
                        </div>
                        <div className='ml-16'>
                            <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                            <p>{riwayat.PEMERIKSAAN}</p>
                        </div>
                    </div>
                    <div key={index} className={`border-b pb-12 ${index === data[0].DATA_RIWAYAT.length - 1 ? 'pb-0 mb-4 border-b-0' : 'mb-12'}`}>
                        <p className=' font-bold text-gray-400 text-xs my-2'>DIAGNOSA/PENYAKIT/ICD 10</p>
                        <div className=' text-gray-400 whitespace-nowrap font-sans font-bold text-[10px] h-auto w-auto p-2 border border-disabled rounded-xl'>
                            <div className='flex border-b pb-2 mb-2'>
                                <p>KODE</p>
                                <p className='ml-[51px]'>NAMA PENYAKIT</p>
                                <div className='flex justify-end w-full'>
                                    <p>PIORITAS</p>
                                </div>
                            </div>
                            <div className=' text-[#121713] text-base font-normal '>
                                <div className='flex mb-2'>
                                    <p>{riwayat.KODE}</p>
                                    <p className='ml-[35px]'>{riwayat.NAMA_PENYAKIT}</p>
                                    <div className='flex justify-end w-full'>
                                        <p>{riwayat.PRIORITAS}</p>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <p>{riwayat.KODE}</p>
                                    <p className='ml-[35px]'>{riwayat.NAMA_PENYAKIT}</p>
                                    <div className='flex justify-end w-full'>
                                        <p>{riwayat.PRIORITAS}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className='flex text-white justify-end'>
                <button className='flex justify-center items-center font-semibold text-base w-[360px] h-auto py-2 bg-primary rounded-xl hover:opacity-80'>
                    <ArchiveBoxArrowDownIcon width={20} height={20} />
                    <p className='ml-1'>Cetak</p>
                </button>
                <button className='flex justify-center items-center font-semibold text-base text-[#8B8B8B] w-[360px] h-auto py-2 ml-4 border-2 border-[#8B8B8B] rounded-xl hover:opacity-80'>
                    <ArrowLeftOnRectangleIcon width={20} height={20} />
                    <p className='ml-1'>Tutup</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default RanapRme