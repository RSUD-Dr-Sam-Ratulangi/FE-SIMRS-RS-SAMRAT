import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api/config.api'
import RalanEditHeader from '../../components/RalanEdit/RalanEditHeader'
import TabelDiagnosaPenyakit from '../../components/Table/tableDiagnosaPenyakit'
import RenderDataPemeriksaan from '../../components/RalanEdit/pemeriksaanComponent'
import TindakanPerawatan from '../../components/RalanEdit/tindakanPerawatanComponent'
import { ArchiveBoxArrowDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'

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

type ApiData = userData[]

const PageRalanRME: React.FC = () => {
  // const [idPasien, setIdPasien] = useState(null)

  // console.log(window.location.pathname)
  // console.log(id)

  // useEffect(() => {
  //   if (id) {
  //     const parsedNumber = parseInt(id, 10)
  //     setIdPasien(parsedNumber)
  //   }
  //   // setIdPasien(id)
  // }, [id])

  // const data: DataItem = location.state.data

  // console.log('rme ralan', data)

  const [pemeriksaanRawatJalanState, setPemeriksaanRawatJalanState] = useState([])
  const [riwayatPerawatan, setRiwayatPerawatan] = useState<userData>()
  const [riwayatPerawatanData, setRiwayatPerawatanData] = useState([])
  const [dataRiwayat, setDataRiwayat] = useState([])

  const { id } = useParams()
  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const response = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
        const data: userData = await response.data
        setRiwayatPerawatan(data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchDiagnosa = async () => {
      try {
        const response = await api.get(`/api/v1/getDiagnosaPasien/${id}`)
        const data: ApiData = await response.data
        console.log(data)
        // perlu data diagnosa-> no.registrasi, penjamin, tanggal registrasi, unit/poliklinik, pemeriksaan, tindakan/perawatan
      } catch (err) {
        console.log(err)
      }
    }
    fetchPersonalData()
    fetchDiagnosa()
    console.log(riwayatPerawatanData)

    const apiData = [
      {
        noRm: '165647',
        namaPasien: 'Ranomerut',
        alamat: 'Ranomerut',
        umur: '19 Th 10 Bl 18 Hr Tahun',
        jenisKelamin: 'Perempuan',
        tanggalLahir: '2003-11-15',
        golonganDarah: '-',
        ibuKandung: '-',
        statusMenikah: 'Menikah',
        agama: 'Kristen',
        pendidikanTerakhir: '-',
        pertamaMendaftar: '2023-10-23',
        dataRiwayat: [
          {
            noRawat: '2023/10/03/000374',
            noRegis: '020',
            tanggalRegis: '2023-10-23',
            unitPoliklinik: '2023-10-23',
            dokter: 'DR. JANE DOE',
            penjamin: 'BPJS',
            status: 'RAWAT INAP',
            pemeriksaan: '-',
            diagnosaPenyakit: [
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
            ],
            pemeriksaanRawatJalan: [
              {
                tanggal: '2023-11-10',
                jam: '020',
                suhu: '36',
                tensi: '121///78',
                nadi: '69',
                rr: '-',
                tinggi: '-',
                berat: '-',
                gcs: '3, 5, 6',
                spo2: '90',
                alergi: '-',
                kesadaran: 'Compos Mentis',
                subjek: 'Nyeri +',
                objek: '-',
                assessment: 'Post Herpetika',
                plan: 'Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300 Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai 1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai',
              },
            ],
            tindakanRalanDokter: [
              {
                id: 1,

                date: '2023-10-10',
                kode: 'jj009192',
                namaTindakan: 'Anemia',
                pemeriksa: 'Dr. Aglesia Aguiero Gonzales',
              },
            ],
            tindakanRalanPerawat: [
              {
                id: 1,

                date: '2023-10-10',
                kode: 'jj009192',
                namaTindakan: 'Anemia',
                pemeriksa: 'Dr. Aglesia Aguiero Gonzales',
              },
            ],
            dataObat: [
              {
                id: 1,
                date: '2023-10-10',
                detailObat: [
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                ],
              },
              {
                id: 2,
                date: '2023-09-10',
                detailObat: [
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                ],
              },
            ],
          },
          {
            noRawat: '2023/10/03/000374',
            noRegis: '020',
            tanggalRegis: '2023-10-23',
            unitPoliklinik: '2023-10-23',
            dokter: 'DR. JANE DOE',
            penjamin: 'BPJS',
            status: 'RAWAT INAP',
            pemeriksaan: '-',
            diagnosaPenyakit: [
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
              { kode: 'Z36.9', nPenyakit: 'Antenatal Screening, unspecified', prioritas: '1' },
            ],
            pemeriksaanRawatJalan: [
              {
                tanggal: '2023-11-10',
                jam: '020',
                suhu: '36',
                tensi: '121///78',
                nadi: '69',
                rr: '-',
                tinggi: '-',
                berat: '-',
                gcs: '3, 5, 6',
                spo2: '90',
                alergi: '-',
                kesadaran: 'Compos Mentis',
                subjek: 'Nyeri +',
                objek: '-',
                assessment: 'Post Herpetika',
                plan: 'Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300 Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai 1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai',
              },
              {
                tanggal: '2023-11-10',
                jam: '020',
                suhu: '36',
                tensi: '121///78',
                nadi: '69',
                rr: '-',
                tinggi: '-',
                berat: '-',
                gcs: '3, 5, 6',
                spo2: '90',
                alergi: '-',
                kesadaran: 'Compos Mentis',
                subjek: 'Nyeri +',
                objek: '-',
                assessment: 'Post Herpetika',
                plan: 'Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300 Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai 1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai',
              },
              {
                tanggal: '2023-11-10',
                jam: '020',
                suhu: '36',
                tensi: '121///78',
                nadi: '69',
                rr: '-',
                tinggi: '-',
                berat: '-',
                gcs: '3, 5, 6',
                spo2: '90',
                alergi: '-',
                kesadaran: 'Compos Mentis',
                subjek: 'Nyeri +',
                objek: '-',
                assessment: 'Post Herpetika',
                plan: 'Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300 Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai 1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai',
              },
            ],
            tindakanRalanDokter: [
              {
                id: 1,

                date: '2023-10-10',
                kode: 'jj009192',
                namaTindakan: 'Anemia',
                pemeriksa: 'Dr. Aglesia Aguiero Gonzales',
              },
            ],
            tindakanRalanPerawat: [
              {
                id: 1,

                date: '2023-10-10',
                kode: 'jj009192',
                namaTindakan: 'Anemia',
                pemeriksa: 'Dr. Aglesia Aguiero Gonzales',
              },
            ],
            dataObat: [
              {
                id: 1,
                date: '2023-10-10',
                detailObat: [
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                ],
              },
              {
                id: 2,
                date: '2023-09-10',
                detailObat: [
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                  { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
                  { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
                ],
              },
            ],
          },
        ],
      },
    ]

    const { dataRiwayat } = apiData[0]
    const dataRiwayatArray = dataRiwayat
    setDataRiwayat(apiData[0].dataRiwayat)

    // const extractedDataRiwayatPerawatanPasien = apiData.map(({ dataRiwayat, ...otherData }) => {
    //   return { dataRiwayat, ...otherData }
    // })
    // const values = extractedDataRiwayatPerawatanPasien.map((item) => [
    //   item.noRm,
    //   item.namaPasien,
    //   item.alamat,
    //   item.umur,
    //   item.jenisKelamin,
    //   item.tanggalLahir,
    //   item.golonganDarah,
    //   item.ibuKandung,
    //   item.statusMenikah,
    //   item.agama,
    //   item.pendidikanTerakhir,
    //   item.pertamaMendaftar,
    // ])
    const values2 = apiData[0].dataRiwayat
    const extractedValues = values2.map((item) => ({
      noRawat: item.noRawat,
      noRegis: item.noRegis,
      tanggalRegis: item.tanggalRegis,
      unitPoliklinik: item.unitPoliklinik,
      dokter: item.dokter,
      penjamin: item.penjamin,
      status: item.status,
      pemeriksaan: item.pemeriksaan,
    }))

    setRiwayatPerawatanData(extractedValues)
    const newArray = dataRiwayatArray.map((item) => {
      return item.pemeriksaanRawatJalan.map((pemeriksaan) => {
        return { ...pemeriksaan } // You can modify this if you need to transform the data
      })
    })
    // const pemeriksaanRawatJalanArray = [].concat(
    //   ...dataRiwayatArray.map((riwayat) => riwayat.pemeriksaanRawatJalan),
    // )
    setPemeriksaanRawatJalanState(newArray)
  }, [])
  type DataItem = {
    kode: string
    nPenyakit: string
    prioritas: string
  }

  // const labelRiwayatPerawatan = [
  //   'NO.RM',
  //   'NAMA PASIEN',
  //   'ALAMAT',
  //   'UMUR',
  //   'JENIS KELAMIN',
  //   'TANGGAL LAHIR',
  //   'GOLONGAN DARAH',
  //   'IBU KANDUNG',
  //   'STATUS MENIKAH',
  //   'AGAMA',
  //   'PENDIDIKAN TERAKHIR',
  //   'PERTAMA DAFTAR',
  // ]

  const columnDiagnosa = [
    { name: 'Kode', selector: (row: DataItem) => row.kode, sortable: true, width: '5%' },
    {
      name: 'Nama Penyakit',
      selector: (row: DataItem) => row.nPenyakit,
      sortable: true,
      right: false,
    },
    { name: 'Prioritas', selector: (row: DataItem) => row.prioritas, sortable: true, right: true },
  ]

  const pemeriksaanValues = pemeriksaanRawatJalanState
  // const infoBlocks = []
  console.log(pemeriksaanValues)

  // const rowCount = 3

  //  split the number labels and values in each object based on rowCount

  // for (let i = 0; i < labelRiwayatPerawatan.length; i += rowCount) {
  //   const labelsSlice = labelRiwayatPerawatan.slice(i, i + rowCount)
  //   const valuesSlice = riwayatPerawatan.slice(i, i + rowCount)

  //   const infoObject = labelsSlice.map((label, index) => ({
  //     label,
  //     value: valuesSlice[index],
  //   }))

  //   infoBlocks.push(infoObject)
  // }
  // console.log(
  //   'this is riwayat perawatan',
  //   riwayatPerawatan,
  //   'this is riwayat perawatan raw',
  //   riwayatPerawatanData,
  // )

  return (
    <div>
      <RalanEditHeader />
      <div className='flex gap-4'>
        <div className='h-full rounded-xl shadow-soft mt-4'>
          <div className='mb-4 bg-white p-3'>
            <p className='text text-lg font-bold pb-3'>Riwayat Perawatan</p>
            <p className=' font-bold text-disabled'>Data Riwayat Perawatan Pasien</p>
            {/* <div className='flex font-sans text-base font-normal text-[#121713] leading-6 mt-2'>
              {infoBlocks.map((block, rowIndex) => (
                <div key={rowIndex} className={rowIndex !== 0 ? 'ml-32' : ''}>
                  {block.map(({ label, value }, index) => (
                    <div key={index} className={index % 2 === 0 ? 'my-2' : ''}>
                      <p className='font-bold text-gray-400 text-xs $'>{label}</p>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
            <div>
              {riwayatPerawatan ? (
                <div className=' flex font-sans text-base font-normal text-[#121713] leading-6 mt-2'>
                  <div>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>NO. RM</p>
                      <p>{riwayatPerawatan.no_rkm_medis}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-disabled text-xs'>NAMA PASIEN</p>
                      <p>{riwayatPerawatan.nm_pasien}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>ALAMAT</p>
                      <p>{riwayatPerawatan.alamat}</p>
                    </div>
                  </div>
                  <div className=' ml-32'>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>UMUR</p>
                      <p>{riwayatPerawatan.umur}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-disabled text-xs'>JENIS KELAMIN</p>
                      <p>{riwayatPerawatan.jk}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>TANGGAL LAHIR</p>
                      <p>{riwayatPerawatan.tgl_lahir}</p>
                    </div>
                  </div>
                  <div className=' ml-32'>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>GOLONGAN DARAH</p>
                      <p>{riwayatPerawatan.gol_darah}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-disabled text-xs'>IBU KANDUNG</p>
                      <p>{riwayatPerawatan.nm_ibu}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>STATUS MENIKAH</p>
                      <p>{riwayatPerawatan.stts_nikah}</p>
                    </div>
                  </div>
                  <div className=' ml-32'>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>AGAMA</p>
                      <p>{riwayatPerawatan.agama}</p>
                    </div>
                    <div className=' my-2'>
                      <p className=' font-bold text-disabled text-xs'>PENDIDIKAN TERAKHIR</p>
                      <p>{riwayatPerawatan.pnd}</p>
                    </div>
                    <div>
                      <p className=' font-bold text-disabled text-xs'>PERTAMA DAFTAR</p>
                      <p>{riwayatPerawatan.tgl_daftar}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>Loading . . .</>
              )}
            </div>
          </div>
          <div className=' mb-4'>
            <div className='flex gap-4 flex-col'>
              {dataRiwayat.map((data, index) => (
                <div key={index} className='bg-white p-3 rounded-xl'>
                  <p className='text text-lg font-bold'>Riwayat Perawatan</p>
                  <div className='flex gap-16'>
                    <div>
                      <label className='label-text-alt text-[12px] font-bold text-disabled'>
                        NO RAWAT
                      </label>
                      <p className='text'>{data.noRawat}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] font-bold text-disabled'>
                        NO REGISTRASI
                      </label>
                      <p className='text'>{data.noRegis}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] font-bold text-disabled'>
                        TANGGAL REGISTRASI
                      </label>
                      <p className='text'>{data.tanggalRegis}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] font-bold text-disabled'>
                        UNIT POLIKLINIK
                      </label>
                      <p className='text'>{data.unitPoliklinik}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] font-bold text-disabled'>
                        DOKTER
                      </label>
                      <p className='text'>{data.dokter}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] text-disabled font-bold'>
                        PENJAMIN
                      </label>
                      <p className='text'>{data.penjamin}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px]  text-disabled font-bold'>
                        STATUS
                      </label>
                      <p className='text'>{data.status}</p>
                    </div>
                    <div>
                      <label className='label-text-alt text-[12px] text-disabled font-bold'>
                        PEMERIKSAAN
                      </label>
                      <p className='text'>{data.pemeriksaan}</p>
                    </div>
                  </div>
                  <div className='pt-3'>
                    <label className='label-text text-[12px] font-bold text-disabled'>
                      DIAGNOSA/PENYAKIT/ICD 10
                    </label>
                  </div>
                  <div className='w-full  outline outline-1 rounded-xl outline-disabled'>
                    <TabelDiagnosaPenyakit columns={columnDiagnosa} data={data.diagnosaPenyakit} />
                  </div>
                  <div>
                    <label className='label-text text-[12px] font-bold text-disabled'>
                      PEMERIKSAAN
                    </label>
                  </div>

                  <div className='flex flex-col'>
                    <RenderDataPemeriksaan values={pemeriksaanValues[index]} />
                  </div>
                  <TindakanPerawatan
                    dataDokter={data.tindakanRalanDokter}
                    dataPerawat={data.tindakanRalanPerawat}
                    dataTindakan={data.dataObat}
                  />
                </div>
              ))}
            </div>
          </div>
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
    </div>
  )
}

export default PageRalanRME
