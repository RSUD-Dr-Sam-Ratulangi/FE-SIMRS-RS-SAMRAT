import { ArchiveBoxArrowDownIcon, ArrowUpTrayIcon, DocumentIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import SecNavbar from '../SecNavbar/SecNavbar'
import { useState } from 'react'

const RanapBerkasDigital: React.FC = () => {
    const [onFile, setOnFile] = useState(false);

    const changeFile = () => {
        setOnFile(true);
    }

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
                                <div className=" text-base text-[#121713] font-sans flex">
                                    <div className=" mr-6">
                                        <div className="flex">
                                            <div className="form-control">
                                                <label className="label">
                                                    <span>Tanggal</span>
                                                </label>
                                                <input type="date" className="input input-bordered text-sm rounded-2xl border-disabled w-[374px]"/>
                                            </div>
                                            <div className="form-control ml-4">
                                                <label className="label">
                                                    <span>Jam</span>
                                                </label>
                                                <input type="time" defaultValue="19:44" className="input input-bordered text-sm rounded-2xl border-disabled w-[150px]"/>
                                            </div>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>ID Rawat</span>
                                            </label>
                                            <input type="Text" placeholder="2023/10/19/000161" className="input input-bordered text-sm rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Nomor RM</span>
                                            </label>
                                            <input type="Text" placeholder="183138" className="input input-bordered text-sm rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Nama Pasien</span>
                                            </label>
                                            <input type="Text" placeholder="DELLY SEPANG" className="input input-bordered text-sm rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Kategori Berkas</span>
                                            </label>
                                            <select className="select join-item rounded-2xl border-disabled text-sm">
                                                <option disabled selected>Berkas SEP</option>
                                                <option>Berkas 1</option>
                                                <option>Berkas 2</option>
                                                <option>Berkas 3</option>
                                            </select>
                                        </div>
                                        <div className="form-control w-full mt-4">
                                            <label className="label">
                                                <span>Nama Pasien</span>
                                            </label>
                                            <div className='flex relative justify-between border-[1px] border-disabled rounded-2xl h-[50px] items-center px-5'>
                                                <input type="file" className={`cursor-pointer absolute text-sm w-[350px] ${onFile ? 'opacity-90' : 'opacity-0'}`} onChange={changeFile}/>
                                                <p className={`text-sm text-disabled ${onFile ? 'hidden' : ''}`}>Pilih File</p>
                                                <ArrowUpTrayIcon width={20} className={`text-primary ${onFile ? 'hidden' : ''}`}/>
                                            </div>
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
                                <p className='ml-1'>Selesai</p>
                            </button>
                            <button className='flex justify-center items-center font-semibold text-disabled text-base w-full h-[50px] py-2 mt-4 border-disabled border-2 rounded-xl hover:opacity-80'>
                                <DocumentIcon width={20} height={20} />
                                <p className='ml-1'>Masukan Rincian</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RanapBerkasDigital