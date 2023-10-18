import { ArchiveBoxArrowDownIcon, CheckIcon, ClockIcon, DocumentIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import SecNavbar from '../SecNavbar/SecNavbar'
import TableNoSearch from '../Table/TableNoSearch'
import { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'

const RanapSoapPemeriksaan: React.FC = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await api.get('/users')
            console.log(response.data.users)
            setData(response.data.users)
            } catch (err) {
            console.log(err)
            }
        }
        fetchData()
    }, [])

    type DataItem = {
        id: number
        age: number
        birthDate: string
        height: number
        weight: number
        userAgent: string
    }

    const columns = [
        { name: 'NO', selector: (row: DataItem) => row.id, sortable: true },
        { name: 'TANGGAL', selector: (row: DataItem) => row.birthDate, sortable: true },
        { name: 'SUHU(C)', selector: (row: DataItem) => row.age, sortable: true, },
        { name: 'TENSI(mmHg)', selector: (row: DataItem) => (row.age), sortable: true, },
        { name: 'NADI(/MENIT)', selector: (row: DataItem) => row.age, sortable: true },
        { name: 'RR(/MENIT)', selector: (row: DataItem) => row.age, sortable: true },
        { name: 'TINGGI(cm)', selector: (row: DataItem) => row.height, sortable: true },
        { name: 'BERAT(kg)', selector: (row: DataItem) => row.weight, sortable: true },
        { name: 'GCS(E,VM)', selector: (row: DataItem) => row.age, sortable: true },
        { name: 'SPO2', selector: (row: DataItem) => row.age, sortable: true },
        { name: 'ALERGI', selector: (row: DataItem) => row.age, sortable: true },
        { name: 'INSTRUKSI & EVALUASI', selector: (row: DataItem) => row.userAgent, sortable: true }
    ]

    return (
        <div className='flex-1 p-4'>
            <SecNavbar />
            <div className=' overflow-x-auto mb-4'>
                <div className='bg-white h-auto w-screen p-4 mt-4 rounded-xl'>
                    <p className=" text-xl text-[#121713] font-sans font-bold">Tambah Pasien</p>
                    <p className=" text-base text-disabled font-sans">Isi semua data dibawah ini untuk menambahkan pasien baru kedalam daftar rawat inap</p>
                    <div className='flex pt-4'>
                        <div className="w-full ">
                            <div>
                                <div className="text-base text-[#121713] font-sans flex">
                                    <div className=" mr-6">
                                        <div className="flex">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span>Tanggal</span>
                                                </label>
                                                <input type="date" className="input input-bordered rounded-2xl border-disabled w-[374px]"/>
                                            </div>
                                            <div className="form-control ml-4">
                                                <label className="label">
                                                    <span>Jam</span>
                                                </label>
                                                <input type="time" defaultValue="19:44" className="input input-bordered rounded-2xl border-disabled w-[150px]"/>
                                            </div>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Nama Pasien</span>
                                            </label>
                                            <input type="Text" placeholder="Esthera Jackson" className="input input-bordered rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>ID Rawat</span>
                                            </label>
                                            <input type="Text" placeholder="2023/10/13/000342" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Nomor RM</span>
                                            </label>
                                            <input type="Text" placeholder="0000/00/00/000000" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className=" text-xl text-[#121713] font-sans font-bold">Pemeriksaan</p>
                                <div className="flex pt-4 w-full">
                                    <div className="form-control">
                                        <label className="label">
                                            <span>Tensi(mmHg)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>Suhu(C)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>Nadi(/mnt)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>RR(/mnt)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>Tinggi(cm)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>Berat(kg)</span>
                                        </label>
                                        <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                    </div>
                                </div>
                                <div className="mt-4 flex">
                                    <div className="w-full">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Kesadaran</span>
                                            </label>
                                            <input type="Text" placeholder="Compos Mentis" className="input input-bordered rounded-2xl border-disabled"/>
                                        </div>
                                    </div>
                                    <div className="w-full flex ml-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>SPO2</span>
                                            </label>
                                            <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control mx-4">
                                            <label className="label">
                                                <span>GCS(E,VM)</span>
                                            </label>
                                            <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Alergi</span>
                                            </label>
                                            <input type="Text" placeholder="-" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className=" text-xl text-[#121713] font-sans font-bold mb-4">SOAP</p>
                                <div className="flex">
                                    <div className="w-full">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Subjektif</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Asesmen</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Instruksi</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                    </div>
                                    <div className="w-full ml-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Objektif</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Plan</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Evaluasi</span>
                                            </label>
                                            <textarea placeholder="-" className="input input-bordered rounded-2xl align-text-top border-disabled w-full h-36 pt-1"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[440px] ml-6 mt-[9px]">
                            <div className='flex text-base text-[#121713] items-center font-bold font-sans'>
                                <InformationCircleIcon width={20} height={20} />
                                <p className='ml-[6px]'>Informasi</p>
                            </div>
                            <p className='w-[440px] font-sans text-disabled text-base font-normal mt-[6px] leading-5'>Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien.</p>
                            <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-8 bg-primary rounded-xl hover:opacity-80'>
                                <ArchiveBoxArrowDownIcon width={20} height={20} />
                                <p className='ml-1'>Simpan</p>
                            </button>
                            <button className='flex justify-center items-center font-semibold text-disabled text-base w-full h-[50px] py-2 mt-4 border-disabled border-2 rounded-xl hover:opacity-80'>
                                <DocumentIcon width={20} height={20} />
                                <p className='ml-1'>ICD 10 & 9</p>
                            </button>
                            <button className='flex justify-center items-center font-semibold text-disabled text-base w-full h-[50px] py-2 mt-4 border-disabled border-2 rounded-xl hover:opacity-80'>
                                <ClockIcon width={20} height={20} />
                                <p className='ml-1'>Riwayat</p>
                            </button>
                            <button className='flex justify-center items-center font-semibold text-disabled text-base w-full h-[50px] py-2 mt-4 border-disabled border-2 rounded-xl hover:opacity-80'>
                                <CheckIcon width={20} height={20} />
                                <p className='ml-1'>Selesai</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='bg-white h-auto w-screen p-4 mt-4 rounded-xl'>
                    <p className='font-sans font-bold text-xl text-[#121713]'>ICD 9 & ICD 10</p>
                    <div className='flex w-full h-[70px] border border-disabled p-2 mt-2 rounded-xl font-sans font-bold text-xs text-disabled'>
                        <div className=' border-r-2 border-lightgray w-[156px]'>
                            <p>Prosedur</p>
                            <p>Tindakan/ICD 10</p>
                        </div>
                        <div className='w-full text-[10px]'>
                            <div className='flex ml-2 pb-2 border-b-2 border-lightgray'>
                                <div className='flex w-full'>
                                    <p className='w-[100px]'>KODE</p>
                                    <p className='w-[100px]'>PRIORITAS</p>
                                    <p>NAMA PENYAKIT</p>
                                </div>
                                <p className='mr-8'>AKSI</p>
                            </div>
                            <div className='w-full py-2'>
                                <div className='flex ml-2 text-base text-[#121713] font-normal'>
                                    <div className='flex w-full'>
                                        <p className='w-[100px]'>Z33</p>
                                        <p className='w-[100px]'>1</p>
                                        <p>Pregnant state, incidental</p>
                                    </div>
                                    <button className=' text-danger text-xs font-bold hover:opacity-80 mr-8'>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full h-[70px] border border-disabled p-2 mt-8 rounded-xl font-sans font-bold text-xs text-disabled'>
                        <div className=' border-r-2 border-lightgray w-[156px]'>
                            <p>Prosedur</p>
                            <p>Tindakan/ICD 10</p>
                        </div>
                        <div className='w-full text-[10px]'>
                            <div className='flex ml-2 pb-2 border-b-2 border-lightgray'>
                                <div className='flex w-full'>
                                    <p className='w-[100px]'>KODE</p>
                                    <p className='w-[100px]'>PRIORITAS</p>
                                    <p>NAMA TINDAKAN</p>
                                </div>
                                <p className='mr-8'>AKSI</p>
                            </div>
                            <div className='w-full py-2'>
                                <div className='flex ml-2 text-base text-[#121713] font-normal'>
                                    <div className='flex w-full'>
                                        <p className='w-[100px]'>Z33</p>
                                        <p className='w-[100px]'>1</p>
                                        <p>Pregnant state, incidental</p>
                                    </div>
                                    <button className=' text-danger text-xs font-bold hover:opacity-80 mr-8'>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white h-auto w-screen p-4 mt-4 rounded-xl'>
                    <p >Rincian Riwayat</p>
                    <TableNoSearch data={data} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default RanapSoapPemeriksaan