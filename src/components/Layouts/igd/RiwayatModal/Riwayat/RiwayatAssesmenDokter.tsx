import { useEffect, useState } from 'react'
import img from '../../../../../assets/img/lokalis.png'
import { api } from '../../../../../services/api/config.api'
import { useParams } from 'react-router-dom'

interface AssesmenDokterProps {
  modalOpen: boolean
}

interface RiwayatAssesmenDokter {
  no_rawat: string
  no_rkm_medis: string
  nm_pasien: string
  jk: string
  tgl_lahir: string
  tanggal: string
  kd_dokter: string
  anamnesis: string
  hubungan: string
  keluhan_utama: string
  rps: string
  rpk: string
  rpd: string
  rpo: string
  alergi: string
  keadaan: string
  gcs: string
  kesadaran: string
  td: string
  nadi: string
  rr: string
  suhu: string
  spo: string
  bb: string
  tb: string
  kepala: string
  mata: string
  gigi: string
  leher: string
  thoraks: string
  abdomen: string
  ekstremitas: string
  genital: string
  ket_fisik: string
  ket_lokalis: string
  ekg: string
  rad: string
  lab: string
  diagnosis: string
  tata: string
  nm_dokter: string
}

// eslint-disable-next-line react/prop-types
const RiwayatAssesmenDokter: React.FC<AssesmenDokterProps> = ({ modalOpen }) => {
  const { id } = useParams()
  const [riwayat, setRiwayat] = useState<RiwayatAssesmenDokter[]>([])

  const fetchRiwayat = async () => {
    try {
      const response = await api.get(`/api/v1/awal-igd/norm?noRkmMedis=${id}`)
      console.log('riwayat assemen', response.data)
      setRiwayat(response.data)
    } catch (err) {
      console.log('fetch riwayat', err)
    }
  }

  useEffect(() => {
    fetchRiwayat()
  }, [modalOpen])

  return (
    <div className='grid gap-3 h-96 overflow-auto'>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>I. RIWAYAT KESEHATAN</label>
        <div className='flex items-center'>
          <label className='label text-disabled'>Keluhan Utama :</label>
          <p>{riwayat[0]?.keluhan_utama ? riwayat[0]?.keluhan_utama : '-'}</p>
        </div>
        <div className='flex items-center'>
          <label className='label text-disabled'>Riwayat Penyakit Sekarang :</label>
          <p>{riwayat[0]?.rps ? riwayat[0]?.rps : '-'}</p>
        </div>
        <div className='flex items-center'>
          <label className='label text-disabled'>Riwayat Penyakit Dahulu :</label>
          <p>{riwayat[0]?.rpd ? riwayat[0]?.rpd : '-'}</p>
        </div>
        <div className='flex items-center'>
          <label className='label text-disabled'>Riwayat Pengobatan :</label>
          <p>{riwayat[0]?.rpo ? riwayat[0]?.rpo : '-'}</p>
        </div>
        <div className='flex items-center'>
          <label className='label text-disabled'>Riwayat Penyakit Dalam Keluarga :</label>
          <p>{riwayat[0]?.rpk ? riwayat[0]?.rpk : '-'}</p>
        </div>
        <div className='flex items-center'>
          <label className='label text-disabled'>Riwayat Alergi :</label>
          <p>{riwayat[0]?.alergi ? riwayat[0]?.alergi : '-'}</p>
        </div>
      </div>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>II. PEMERIKSAAN FISIK</label>
        <div>
          <div className='flex justify-evenly'>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>Keadaan Umum:</label>
              <p>{riwayat[0]?.keadaan ? riwayat[0]?.keadaan : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>Kesadaran:</label>
              <p>{riwayat[0]?.kesadaran ? riwayat[0]?.kesadaran : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>GCS(E,V,M):</label>
              <p>{riwayat[0]?.gcs ? riwayat[0]?.gcs : '-'}</p>
            </div>
          </div>
          <div className='flex justify-evenly'>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>Tanda Vital :</label>
              <p>{riwayat[0]?.genital ? riwayat[0]?.genital : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>TD :</label>
              <p>{riwayat[0]?.td ? riwayat[0]?.td : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>N :</label>
              <p>{riwayat[0]?.nadi ? riwayat[0]?.keluhan_utama : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>R :</label>
              <p>{riwayat[0]?.rr ? riwayat[0]?.rr : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>S :</label>
              <p>{riwayat[0]?.suhu ? riwayat[0]?.suhu : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>SPO2 :</label>
              <p>{riwayat[0]?.spo ? riwayat[0]?.spo : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>BB :</label>
              <p>{riwayat[0]?.bb ? riwayat[0]?.bb : '-'}</p>
            </div>
            <div className='flex items-center'>
              <label className='label text-disabled font-bold'>TB :</label>
              <p>{riwayat[0]?.tb ? riwayat[0]?.tb : '-'}</p>
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <div className='flex items-center gap-3'>
              <div className='grid'>
                <div className='flex items-center'>
                  <label className='label font-bold'>Kepala :</label>
                  <p>{riwayat[0]?.kepala ? riwayat[0]?.kepala : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Mata :</label>
                  <p>{riwayat[0]?.mata ? riwayat[0]?.mata : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Gigi & Mulut :</label>
                  <p>{riwayat[0]?.gigi ? riwayat[0]?.gigi : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Leher :</label>
                  <p>{riwayat[0]?.leher ? riwayat[0]?.leher : '-'}</p>
                </div>
              </div>
              <div className='grid'>
                <div className='flex items-center'>
                  <label className='label font-bold'>Thoraks :</label>
                  <p>{riwayat[0]?.thoraks ? riwayat[0]?.thoraks : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Abdomen :</label>
                  <p>{riwayat[0]?.abdomen ? riwayat[0]?.abdomen : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Genital & Anus :</label>
                  <p>{riwayat[0]?.genital ? riwayat[0]?.genital : '-'}</p>
                </div>
                <div className='flex items-center'>
                  <label className='label font-bold'>Ekstremitas :</label>
                  <p>{riwayat[0]?.ekstremitas ? riwayat[0]?.ekstremitas : '-'}</p>
                </div>
              </div>
            </div>
            <div className='grid items-center ml-2'>
              <label className='label font-bold'>Keterangan :</label>
              <p>{riwayat[0]?.ket_fisik ? riwayat[0]?.ket_fisik : '-'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>III. STATUS LOKALIS</label>
        <div>
          <img src={img} className='w-full' />
          <div className='flex items-center'>
            <label className='label'>Keterangan : </label>
            <p>Tidak ada keterangan</p>
          </div>
        </div>
      </div>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>IV. PEMERIKSAAN PENUNJANG</label>
        <div>
          <div className='flex justify-start gap-5'>
            <div className='grid items-center'>
              <label className='label text-disabled font-bold'>EKG :</label>
              <p>{riwayat[0]?.ekg ? riwayat[0]?.ekg : '-'}</p>
            </div>
            <div className='grid items-center'>
              <label className='label text-disabled font-bold'>RADIOLOGI :</label>
              <p>{riwayat[0]?.rad ? riwayat[0]?.rad : '-'}</p>
            </div>
            <div className='grid items-center'>
              <label className='label text-disabled font-bold'>LABORATORIUM :</label>
              <p>{riwayat[0]?.lab ? riwayat[0]?.lab : '-'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>V. DIAGNOSIS</label>
        <p>{riwayat[0]?.diagnosis ? riwayat[0]?.diagnosis : '-'}</p>
      </div>
      <div className='border-2 rounded-xl p-2'>
        <label className='label font-bold'>VI. TATALAKSANA</label>
        <p>{riwayat[0]?.tata ? riwayat[0]?.tata : '-'}</p>
      </div>
    </div>
  )
}

export default RiwayatAssesmenDokter
