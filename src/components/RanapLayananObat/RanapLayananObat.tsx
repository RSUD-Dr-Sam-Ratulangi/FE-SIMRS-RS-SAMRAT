import { ArchiveBoxArrowDownIcon, DocumentIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import SecNavbar from '../SecNavbar/SecNavbar'

const RanapLayananObat: React.FC = () => {

    const data = [
        {tanggal: '2023-09-15 11:03:36', namaItem: 'Energen 600mg', provider: 'RSUD', tarif: '100.000', namaDokter: 'dr. Leon', nomorResep: '123123'},
        {tanggal: '2023-09-15 11:03:36', namaItem: 'Energen 600mg', provider: 'RSUD', tarif: '100.000', namaDokter: 'dr. Leon', nomorResep: '123123'},
        {tanggal: '2023-09-15 11:03:36', namaItem: 'Energen 600mg', provider: 'RSUD', tarif: '100.000', namaDokter: 'dr. Leon', nomorResep: '123123'}
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
                                                <span>ID Rawat</span>
                                            </label>
                                            <input type="Text" placeholder="2023/10/19/000161" className="input input-bordered rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Tindakan</span>
                                            </label>
                                            <input type="Text" placeholder="Input Tindakan/layanan" className="input input-bordered rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Obat (e-Resep)</span>
                                            </label>
                                            <input type="Text" placeholder="Input obat/BHP" className="input input-bordered rounded-2xl border-disabled w-[540px]"/>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="form-control">
                                            <label className="label">
                                                <span>Nomor RM</span>
                                            </label>
                                            <input type="Text" placeholder="0000/00/00/000000" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Nama Pasien</span>
                                            </label>
                                            <input type="Text" placeholder="Esthera Jackson" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Jenis</span>
                                            </label>
                                            <input type="Text" placeholder="Nama tindakan/layanan/obat/BHP" className="input input-bordered rounded-2xl border-disabled w-full"/>
                                        </div>
                                        <div className="form-control mt-4">
                                            <label className="label">
                                                <span>Biaya</span>
                                            </label>
                                            <input type="Text" placeholder="Rp. 100.000" className="input input-bordered rounded-2xl border-disabled w-full"/>
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
                    <div className='h-auto w-auto mt-6'>
                        <p className='font-sans font-bold text-xl text-[#121713]'>Rincian Tindakan</p>
                        <div className='flex w-full h-auto border border-disabled p-2 mt-2 rounded-xl font-sans font-bold text-disabled'>
                            <div className='w-full text-[10px]'>
                                <div className='flex ml-2 pb-2 border-b-[1px] border-disabled'>
                                    <div className='flex w-full text-[10px]'>
                                        <p className='w-[160px] mr-[35px]'>TANGGAL</p>
                                        <p className='w-[100px] whitespace-nowrap'>NAMA ITEM</p>
                                    </div>
                                    <div className='flex justify-end mr-2 w-[900px]'>
                                        <p className='w-[200px] mr-[35px]'>PROVIDER</p>
                                        <p className='w-[90px] mr-[147px]'>TARIF</p>
                                        <div className='w-10 flex justify-end'>
                                            <p className=''>AKSI</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full ml-2 text-base text-[#121713] font-normal'>
                                    {data.map((item, index) => (
                                        <div key={index} className='flex mt-2'>
                                            <div className='flex w-full'>
                                                <p className='w-[160px] mr-[35px]'>{item.tanggal}</p>
                                                <p className='w-[100px] whitespace-nowrap'>{item.namaItem}</p>
                                            </div>
                                            <div className='flex justify-end mr-2 w-[900px]'>
                                                <p className='w-[200px] mr-[35px]'>{item.provider}</p>
                                                <p className='w-[90px] mr-[147px]'>Rp. {item.tarif}</p>
                                                <div className='w-10 flex justify-end text-xs font-bold text-[#D3444A] cursor-pointer'>
                                                    <p className=''>HAPUS</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end pr-8 mt-2 font-sans text-base '>
                            <p className='text-disabled font-bold mr-2'>TOTAL</p>
                            <p className='text-[#121713]'>Rp. 300.000</p>
                        </div>
                    </div>
                    <div className='h-auto w-auto mt-6'>
                        <p className='font-sans font-bold text-xl text-[#121713]'>Permintaan e-Resep</p>
                        <div className='flex w-full h-auto border border-disabled p-2 mt-2 rounded-xl font-sans font-bold text-disabled'>
                            <div className='w-full text-[10px]'>
                                <div className='flex ml-2 pb-2 border-b-[1px] border-disabled'>
                                    <div className='flex w-full text-[10px]'>
                                        <p className='w-[400px]'>TANGGAL PERESEPAN</p>
                                        <p className='w-[400px]'>NOMOR RESEP</p>
                                        <p className='w-[400px]'>NAMA DOKTER</p>
                                        <p className='w-[200px]'>TARIF</p>
                                        <div className='w-10 flex justify-end'>
                                            <p className=''>AKSI</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full ml-2 '>
                                    {data.map((item, index) => (
                                        <div key={index} className='flex mt-2'>
                                            <div className='flex w-full text-base text-[#121713] font-normal pr-2'>
                                                <p className='w-[400px]'>{item.tanggal}</p>
                                                <p className='w-[400px]'>{item.nomorResep}</p>
                                                <p className='w-[400px]'>{item.namaDokter}</p>
                                                <p className='w-[200px]'>Rp. {item.tarif}</p>
                                                <div className='w-10 flex justify-end text-xs font-bold text-[#D3444A] cursor-pointer'>
                                                    <p className=''>HAPUS</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-end pr-8 mt-2 font-sans text-base '>
                            <p className='text-disabled font-bold mr-2'>TOTAL</p>
                            <p className='text-[#121713]'>Rp. 300.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RanapLayananObat