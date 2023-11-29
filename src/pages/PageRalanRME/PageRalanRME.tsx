import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api/config.api'
import RalanEditHeader from '../../components/RalanEdit/RalanEditHeader'
// import TabelDiagnosaPenyakit from '../../components/Table/tableDiagnosaPenyakit'
// import RenderDataPemeriksaan from '../../components/RalanEdit/pemeriksaanComponent'
// import TindakanPerawatan from '../../components/RalanEdit/tindakanPerawatanComponent'
import { ArchiveBoxArrowDownIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import RenderDataRiwayatRalan from './renderDataRiwayatRalan'

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
  const [riwayatPerawatan, setRiwayatPerawatan] = useState<userData>()
  const [diagnosa, setDiagnosa] = useState([])
  const [soap, setSoap] = useState([])
  const [mergedData, setMergedData] = useState([])

  const { id } = useParams()
  useEffect(() => {
    const mergedArray = [...diagnosa, ...soap].sort((a, b) => {
      const dateA = a.tgl_perawatan || a.tgl_registrasi
      const dateB = b.tgl_perawatan || b.tgl_registrasi
      return dateA.localeCompare(dateB)
    })
    const groupedArray = mergedArray.reduce((acc, item) => {
      const existingItem = acc.find((group) => {
        const groupDate = group.Date || group.date || group.tgl_registrasi
        const itemDate = item.tgl_perawatan || item.tgl_registrasi
        return groupDate === itemDate
      })

      if (existingItem) {
        if (item.no_rawat !== undefined) {
          existingItem.noRawat = item.no_rawat
          existingItem.tglRegistrasi = item.tgl_registrasi
          existingItem.nmDokter = item.nm_dokter
          existingItem.status = item.status
          existingItem.noRegis = '-'
          existingItem.penjamin = '-'
          existingItem.unitPoli = '-'
          existingItem.pemeriksaan = '-'
        }
        if (item.no_rawat !== undefined) {
          existingItem.icd10.push({
            kdPenyakit: item.kd_penyakit,
            nmPenyakit: item.nm_penyakit,
            prioritas: item.prioritas,
          })
        }
        if (item.tgl_registrasi !== undefined) {
          // const existingDiagnosa = existingItem.diagnosa.find(
          //   (diagnosaItem) => diagnosaItem.tgl_perawatan === item.tgl_perawatan,
          // )
          existingItem.diagnosa.push({
            tglRegistrasi: item.tgl_registrasi,
            kdPenyakit: item.kd_penyakit,
            pemeriksaan: item.pemeriksaan,
            nmDokter: item.nm_dokter,
          })
        }
        if (item.jam_rawat !== undefined) {
          // const existingPemeriksaanRalan = existingItem.pRalan.find(
          //   (pRalanItem) => pRalanItem.tgl_perawatan === item.tgl_perawatan,
          // )
          existingItem.pemeriksaanRawatJalan.push({
            tglPerawatan: item.tgl_perawatan,
            jamRawat: item.jam_rawat,
            suhuTubuh: item.suhu_tubuh,
            tensi: item.tensi,
            nadi: item.tensi,
            respirasi: item.tensi,
            tinggi: item.tensi,
            gcs: item.gcs,
            spo2: item.spo2,
            kesadaran: item.kesadaran,
            berat: item.berat,
            rtl: item.rtl,
            subjek: '-',
            objek: '-',
            asesmen: '-',
          })
        }
      } else {
        const newItem = {
          Date: item.tgl_registrasi || item.tgl_perawatan,
          noRawat: item.no_rawat !== undefined ? item.no_rawat : '-',
          tglRegistrasi: item.tgl_registrasi !== undefined ? item.tgl_registrasi : '-',
          nmDokter: item.nm_dokter !== undefined ? item.nm_dokter : '-',
          status: item.status !== undefined ? item.status : '-',
          noRegis: '-',
          penjamin: '-',
          unitPoli: '-',
          pemeriksaan: '-',
          diagnosa: [],
          pemeriksaanRawatJalan: [],
          icd10: [],
        }

        if (item.tgl_registrasi !== undefined) {
          newItem.diagnosa.push({
            tglRegistrasi: item.status !== undefined ? item.tgl_registrasi : '-',
            kdPenyakit: item.kd_penyakit !== undefined ? item.kd_penyakit : '-',
            pemeriksaan: item.pemeriksaan !== undefined ? item.pemeriksaan : '-',
            nmDokter: item.nm_dokter !== undefined ? item.nm_dokter : '-',
          })
        }
        if (item.no_rawat !== undefined) {
          newItem.icd10.push({
            kdPenyakit: item.kd_penyakit !== undefined ? item.kd_penyakit : '-',
            nmPenyakit: item.nm_penyakit !== undefined ? item.nm_penyakit : '-',
            prioritas: item.prioritas !== undefined ? item.prioritas : '-',
          })
        }
        if (item.jam_rawat !== undefined) {
          newItem.pemeriksaanRawatJalan.push({
            tglPerawatan: item.tgl_perawatan !== undefined ? item.tgl_perawatan : '-',
            jamRawat: item.jam_rawat !== undefined ? item.jam_rawat : '-',
            suhuTubuh: item.suhu_tubuh !== undefined ? item.suhu_tubuh : '-',
            tensi: item.tensi !== undefined ? item.tensi : '-',
            nadi: item.nadi !== undefined ? item.nadi : '-',
            respirasi: item.respirasi !== undefined ? item.respirasi : '-',
            tinggi: item.tinggi !== undefined ? item.tinggi : '-',
            gcs: item.gcs !== undefined ? item.gcs : '-',
            spo2: item.spo2 !== undefined ? item.spo2 : '-',
            kesadaran: item.kesadaran !== undefined ? item.kesadaran : '-',
            berat: item.berat !== undefined ? item.berat : '-',
            rtl: item.rtl !== undefined ? item.rtl : '-',
            subjek: '-',
            objek: '-',
            asesmen: '-',
          })
        }

        acc.push(newItem)
      }
      console.log('finish')
      return acc
    }, [])
    console.log('log c')

    setMergedData(groupedArray)
  }, [diagnosa, soap])

  useEffect(() => {
    const fetchSoap = async () => {
      try {
        const response = await api.get(`/api/v1/riwayatsoap?noRkmMedis=${id}`)
        const data: ApiData = await response.data
        setSoap(data)
        // perlu data soap -> subjek, objek, asesmen
      } catch (err) {
        console.log(err)
      }
    }
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
        setDiagnosa(data)

        // perlu data diagnosa-> no.registrasi, penjamin, tanggal registrasi, unit/poliklinik, pemeriksaan, tindakan/perawatan
      } catch (err) {
        console.log(err)
      }
    }
    // fetchPersonalData()
    // fetchDiagnosa()
    // fetchSoap()

    const fetchData = async () => {
      try {
        await Promise.all([fetchPersonalData(), fetchDiagnosa(), fetchSoap()])
        // const data = await processData(diagnosa, soap)
      } catch (error) {
        console.error('Error fetching dat:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <RalanEditHeader />
      <div className='flex gap-4 min-w-fit'>
        <div className='h-full rounded-xl shadow-soft mt-4 w-full'>
          <div className='mb-4 bg-white p-3'>
            <p className='text text-lg font-bold pb-3'>Riwayat Perawatan</p>
            <p className=' font-bold text-disabled'>Data Riwayat Perawatan Pasien</p>

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
          <div className='mb-4'>
            {mergedData ? <RenderDataRiwayatRalan mergedData={mergedData} /> : <>Loading . . .</>}
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
