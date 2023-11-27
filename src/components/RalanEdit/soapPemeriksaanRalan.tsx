import { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'
import { useParams } from 'react-router-dom'
// import RiwayatSoap from './RiwayatSoap';
import RalanEditHeader from './RalanEditHeader'
import RiwayatSoapRalan from '../RalanSOAP/RiwayatSoap'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'
import InsertSoapRalan from '../RalanSOAP/InsertSoap'
//     kd_penyakit: string
//     prioritas: number
//     nm_penyakit: string
// };

// type ApiData = userData[];

type userData = {
  no_rkm_medis: string
  nm_pasien: string
  no_ktp: string
  pnd: string
  jk: string
  tmp_lahir: string
  tgl_lahir: string
  nm_ibu: string
  alamat: string
  gol_darah: string
  stts_nikah: string
  agama: string
  tgl_daftar: string
  umur: string
  tgl_perawatan: string
  jam_rawat: string
  suhu_tubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  gcs: string
  spo2: string
  kesadaran: string
  keluhan: string
  pemeriksaan: string
  alergi: string
  lingkar_perut: string
  rtl: string
  penilaian: string
  instruksi: string
  evaluasi: string
  nip: string
  nama: string
  jbtn: string
  no_rawat: string
  kd_penyakit: string
  status: string
  prioritas: number
  status_penyakit: string
  nm_penyakit: string
  tgl_registrasi: string
  kd_dokter: string
  nm_dokter: string
}

const RanapSoapPemeriksaan: React.FC = () => {
  const { id } = useParams()
  const [personalData, setPersonalData] = useState<userData>()

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
        const data: userData = await response.data
        setPersonalData(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPersonalData()
  }, [])

  return (
    <div className='flex-1 w-auto min-w-fit overflow-x-auto p-4'>
      <RalanEditHeader />
      <div className='flex mt-4 min-w-fit'>
        <div>
          <p className='font-inter font-bold text-2xl text-[#121713]'>Riwayat</p>
          <div className='w-auto max-w-fit bg-white rounded-xl mt-4 p-4'>
            <p className=' font-bold text-xl text-[#121713]'>Data Pasien</p>
            {personalData ? (
              <div className=' flex font-sans justify-between text-base font-normal text-[#121713] leading-6 mt-2'>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>NO. RM</p>
                    <p className=''>{personalData.no_rkm_medis}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>NAMA PASIEN</p>
                    <p className=' whitespace-nowrap'>{personalData.nm_pasien}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>ALAMAT</p>
                    <p>{personalData.alamat}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. RAWAT</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>DOKTER</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>UMUR</p>
                    <p className=' whitespace-nowrap'>{personalData.umur}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>JENIS KELAMIN</p>
                    <p>{personalData.jk}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>TANGGAL LAHIR</p>
                    <p>{personalData.tgl_lahir}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>NO. REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PENJAMIN</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      GOLONGAN DARAH
                    </p>
                    <p>{personalData.gol_darah}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs'>IBU KANDUNG</p>
                    <p>{personalData.nm_ibu}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>STATUS MENIKAH</p>
                    <p>{personalData.stts_nikah}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>STATUS</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs'>AGAMA</p>
                    <p>{personalData.agama}</p>
                  </div>
                  <div className=' my-2'>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      PENDIDIKAN TERAKHIR
                    </p>
                    <p className='whitespace-nowrap'>{personalData.pnd}</p>
                  </div>
                  <div>
                    <p className=' font-bold text-gray-400 text-xs whitespace-nowrap'>
                      PERTAMA DAFTAR
                    </p>
                    <p className='whitespace-nowrap'>{personalData.tgl_daftar}</p>
                  </div>
                  <div className='mt-8'>
                    <div>
                      <p className=' font-bold text-gray-400 text-xs'>UNIT/POLIKLINIK</p>
                      <p className=''>{'-'}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-gray-400 text-xs'>PEMERIKSAAN</p>
                      <p className=' whitespace-nowrap'>{'-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>Loading...</>
            )}
          </div>
          <RiwayatSoapRalan />
          <button className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] mt-4 py-2 bg-primary rounded-xl hover:opacity-80'>
            <ArchiveBoxArrowDownIcon width={20} height={20} />
            <p className='ml-1'>Cetak</p>
          </button>
        </div>
        <div className='max-w-5xl ml-4'>
          <p className='font-inter font-bold text-2xl text-[#121713] mb-4'>SOAP & Pemeriksaan</p>
          <div className=' bg-white rounded-xl mt-4 p-4'>
            <p className=' font-bold text-xl text-[#121713]'>SOAP</p>
            <p className='text-disabled whitespace-nowrap'>
              Isi semua data dibawah ini untuk menambahkan SOAP baru kedalam daftar
            </p>
            <InsertSoapRalan />
          </div>
        </div>
      </div>
      {/* <RiwayatSoap /> */}
      {/* <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
                <p className=" text-xl text-[#121713] font-sans font-bold">SOAP</p>
                <p className=" text-base text-disabled font-sans">Isi semua data dibawah ini untuk menambahkan SOAP baru kedalam daftar rawat jalan</p>
                <div className='flex pt-4'>
                    <div className="w-full "> */}
      {/* <div className="text-base text-[#121713] font-sans flex">
                            <div className="w-full">
                                <div className="flex">
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span>Tanggal</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                            value={tanggal}
                                            onChange={(e) => setTanggal(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-control ml-4">
                                        <label className="label">
                                            <span>Jam</span>
                                        </label>
                                        <input 
                                            type="time"
                                            defaultValue="19:44"
                                            className="input input-bordered text-sm rounded-2xl border-disabled w-[150px]"
                                            value={jam}
                                            onChange={(e) => setJam(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Nama Pasien</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={namaPasien}
                                        onChange={(e) => setNamaPasien(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>ID Rawat</span>
                                    </label>
                                    <input
                                        type="Text" 
                                        placeholder="2023/10/13/000342" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={idRawat}
                                        onChange={(e) => setIdRawat(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Nomor RM</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="0000/00/00/000000" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={nomorRM}
                                        onChange={(e) => setNomorRM(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className=" text-xl text-[#121713] font-sans font-bold mb-4">SOAP</p>
                            <div className="flex">
                                <div className="w-full">
                                    <div className="form-control">
                                        <label className="label">
                                            <span>Subjektif</span>
                                        </label>
                                        <textarea
                                            placeholder="-" 
                                            className="input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1"
                                            value={subjektif}
                                            onChange={(e) => setSubjektif(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-control mt-4">
                                        <label className="label">
                                            <span>Asesmen</span>
                                        </label>
                                        <textarea 
                                            placeholder="-" 
                                            className="input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1"
                                            value={asesmen}
                                            onChange={(e) => setAsesmen(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span>Objektif</span>
                                        </label>
                                        <textarea 
                                            placeholder="-" 
                                            className="input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1"
                                            value={objektif}
                                            onChange={(e) => setObjektif(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-control mt-4">
                                        <label className="label">
                                            <span>Plan</span>
                                        </label>
                                        <textarea 
                                            placeholder="-" 
                                            className="input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-36 pt-1"
                                            value={plan}
                                            onChange={(e) => setPlan(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> */}
      {/* <div>
                            <div className="form-control mt-6">
                                <label className="label">
                                    <span>No Rawat</span>
                                </label>
                                <input 
                                    type="Text" 
                                    placeholder="2023/11/17/000002" 
                                    className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                    value={noRawat}
                                    onChange={(e) => setNoRawat(e.target.value)}
                                />
                            </div>
                            <div className='flex'>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Tensi</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={tensi}
                                        onChange={(e) => setTensi(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Suhu</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={suhu}
                                        onChange={(e) => setSuhu(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Nadi</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={nadi}
                                        onChange={(e) => setNadi(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Rr</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={rr}
                                        onChange={(e) => setRr(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Tinggi</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={tinggi}
                                        onChange={(e) => setTinggi(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Berat</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={berat}
                                        onChange={(e) => setBerat(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Kesadaran</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={kesadaran}
                                        onChange={(e) => setKesadaran(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>SPO2</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={spo2}
                                        onChange={(e) => setSpo2(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>GCS</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={gcs}
                                        onChange={(e) => setGcs(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <label className="label">
                                        <span>Alergi</span>
                                    </label>
                                    <input 
                                        type="Text" 
                                        placeholder="Esthera Jackson" 
                                        className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                        value={alergi}
                                        onChange={(e) => setAlergi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <label className="label">
                                    <span>Subjek</span>
                                </label>
                                <input 
                                    type="Text" 
                                    placeholder="Esthera Jackson" 
                                    className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                    value={subjektif}
                                    onChange={(e) => setSubjektif(e.target.value)}
                                />
                            </div>
                        </div> */}
      {/* <div className="form-control mt-6">
                            <label className="label">
                                <span>No Rawat</span>
                            </label>
                            <input 
                                type="Text" 
                                placeholder="2023/11/17/000002" 
                                className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                value={noRawat}
                                onChange={(e) => setNoRawat(e.target.value)}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span>Asesmen/Penilaian</span>
                            </label>
                            <input 
                                type="Text" 
                                placeholder="2023/11/17/000002" 
                                className="input input-bordered text-sm rounded-2xl border-disabled w-full"
                                value={diagnosa}
                                onChange={(e) => setDiagnosa(e.target.value)}
                            />
                        </div> */}
      {/* <div className=" w-full mt-4">
                            <div className='flex text-base text-[#121713] items-center font-bold font-sans'>
                                <InformationCircleIcon width={20} height={20} />
                                <p className='ml-[6px]'>Informasi</p>
                            </div>
                            <p className='w-[440px] font-sans text-disabled text-base font-normal my-[20px] leading-5'>Mohon pastikan data yang Anda masukkan sudah benar sebelum melanjutkan. Kesalahan dalam pengisian data dapat berdampak pada perawatan pasien.</p>
                            <button 
                                className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 bg-primary rounded-xl hover:opacity-80'
                            >
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
            </div> */}
      {/* <div className='bg-white h-auto w-full p-4 mt-4 rounded-xl'>
                <p className='font-sans font-bold text-xl text-[#121713]'>ICD 9 & ICD 10</p>
                <div className=' h-[360px] overflow-y-auto'>
                    {diagnosa.map((diagnosa, index) => (
                        <div key={index} className='flex w-full h-[70px] border border-disabled p-2 mt-2 rounded-xl font-sans font-bold text-xs text-disabled'>
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
                                            <p className='w-[100px]'>{diagnosa.kd_penyakit}</p>
                                            <p className='w-[100px]'>{diagnosa.prioritas}</p>
                                            <p>{diagnosa.nm_penyakit}</p>
                                        </div>
                                        <button className=' text-danger text-xs font-bold hover:opacity-80 mr-8'>Hapus</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
    </div>
  )
}

export default RanapSoapPemeriksaan
