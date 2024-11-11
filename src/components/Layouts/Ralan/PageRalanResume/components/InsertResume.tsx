/* eslint-disable camelcase */
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../../../../services/api/config.api'
import { useEffect, useState } from 'react'
import {
  DataRiwayatSoapResume,
  RiwayatRadiologiResume,
  RiwayatLaborResume,
  PemeriksaanLabor,
  RiwayatDiagnosaResume,
  RiwayatProsedur,
  KondisiPulangResume,
} from '../type/InterfaceResume'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/solid'

const InsertResume = () => {
  const [riwayatSoap, setRiwayatSoap] = useState<DataRiwayatSoapResume[]>([])
  const [keluhanUtama, setKeluhanUtama] = useState<string>('')
  const [obatPulang, setObatPulang] = useState<string>('')
  const [riwayatRadiologi, setRiwayatRadiologi] = useState<RiwayatRadiologiResume | null>(null)
  const [riwayatLabor, setRiwayatLabor] = useState<PemeriksaanLabor[]>([])
  const [diagnosaRiwayat, setDiagnosaRiwayat] = useState<RiwayatDiagnosaResume[]>([])
  const [prosedurRiwayat, setProsedurRiwayat] = useState<RiwayatProsedur[]>([])
  const [jalanPenyakit, setJalanPenyakit] = useState<string>('')
  const [pemeriksaanPenunjang, setPemeriksaanPenunjang] = useState<string>('')
  const [pemeriksaanLabor, setPemeriksaanLabor] = useState<string>('')
  const [diagnosaUtama, setDiagnosaUtama] = useState<string>('')
  const [kdDiagnosaUtama, setKdDiagnosaUtama] = useState<string>('')
  const [prosedurUtama, setProsedurUtama] = useState<string>('')
  const [kdProsedurUtama, setKdProsedurUtama] = useState<string>('')
  const [kondisiPulang, setKondisiPulang] = useState<string>('Hidup')

  const navigate = useNavigate()

  const { id } = useParams()
  const nmrRawat = localStorage.getItem('no_rawat')

  const tokenValue = localStorage.getItem('token')
  const Kd = JSON.parse(tokenValue)
  let nipCredentials = ''
  const role = Object.keys(Kd)[0]

  if (role === 'dokter') {
    nipCredentials = Kd.dokter.kd_dokter
  } else if (role === 'petugas') {
    nipCredentials = Kd.petugas.nip
  }

  const getRiwayatSoap = async () => {
    try {
      const response = await api.get(
        `/api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${nmrRawat}`,
      )
      console.log(response.data)
      setRiwayatSoap(response.data)

      if (response.data.length > 0) {
        setKeluhanUtama(
          [
            `OBJECT :\n${response.data[0].pemeriksaan}\n`,
            `SUBJECT :\n${response.data[0].penilaian}`,
          ]
            .filter(Boolean)
            .join('\n'),
        )
        setObatPulang(response.data[0].rtl)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const hasilRadiologi = async () => {
    try {
      const response = await api.get(`/api/v1/radiology-results?noRawat=${nmrRawat}`)
      setRiwayatRadiologi(response.data)
      setPemeriksaanPenunjang(response.data.hasil)
    } catch (err) {
      console.log(err)
    }
  }

  const hasilLabor = async () => {
    try {
      const response = await api.get<RiwayatLaborResume[]>(
        '/api/v1/detailPeriksaLab?noRawat=2024/11/05/010568',
      )

      const mapPemeriksaanLabor = response.data.map((item) => {
        return {
          id: item.id_template,
          pemeriksaan: item.Pemeriksaan,
          value: `Id: ${item.id_template}\nPemeriksaan: ${item.Pemeriksaan} \n`,
        }
      })

      console.log('map labor', mapPemeriksaanLabor)

      setRiwayatLabor(mapPemeriksaanLabor)
      setPemeriksaanLabor(mapPemeriksaanLabor.map((item) => item.value).join('\n'))
    } catch (err) {
      console.log(err)
    }
  }

  const riwayatDiagnosa = async () => {
    try {
      const response = await api.get<RiwayatDiagnosaResume[]>(
        `/api/v1/getDiagnosaPasien?noRawat=${nmrRawat}`,
      )
      console.log('riwayat diagnosa', response.data)
      setDiagnosaRiwayat(response.data)

      setDiagnosaUtama(response.data[0].nm_penyakit)
      setKdDiagnosaUtama(response.data[0].kd_penyakit)
    } catch (err) {
      console.log(err)
    }
  }

  const riwayatProsedur = async () => {
    try {
      const response = await api.get(`/api/v1/getProsedurByNoRawat?noRawat=${nmrRawat}`)
      console.log('riwayat pros', response.data)
      setProsedurRiwayat(response.data)
      setProsedurUtama(response.data[0].deskripsi_panjang)
      setKdProsedurUtama(response.data[0].kode)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      await getRiwayatSoap()
      await hasilRadiologi()
      await hasilLabor()
      await riwayatDiagnosa()
      await riwayatProsedur()
    }

    fetchAll()
  }, [])

  const handleJalanPenyakit = (event) => {
    setKeluhanUtama(event.target.value)
  }

  const handlePemeriksaanPenunjang = (event) => {
    setPemeriksaanPenunjang(event.target.value)
  }

  const handlePemeriksaanLab = (event) => {
    setPemeriksaanLabor(event.target.value)
  }

  const handleDiagnosaUtama = (event) => {
    setDiagnosaUtama(event.target.value)
  }

  const handleDiagnosaRestIndex = (index, event) => {
    const updatedDiagnosaRiwayat = [...diagnosaRiwayat]
    updatedDiagnosaRiwayat[index] = {
      ...updatedDiagnosaRiwayat[index],
      nm_penyakit: event.target.value,
    }

    setDiagnosaRiwayat(updatedDiagnosaRiwayat)
  }

  const handleProsedurRestIndex = (index, event) => {
    const updatedProsedurRiwayat = [...prosedurRiwayat]
    updatedProsedurRiwayat[index] = {
      ...updatedProsedurRiwayat[index],
      deskripsi_panjang: event.target.value,
    }

    console.log('update prosedur riwayat', updatedProsedurRiwayat)
  }

  const handleObatPulang = (event) => {
    setObatPulang(event.target.value)
  }

  const postResume = async () => {
    const diagnosaSekunder = diagnosaRiwayat?.map((item) => item?.nm_penyakit || '')
    const kdDiagnosaSekunder = diagnosaRiwayat?.map((item) => item?.kd_penyakit || '')

    const prosedurSekunder = prosedurRiwayat?.map((item) => item?.deskripsi_panjang || '')
    const kdProsedurSekunder = prosedurRiwayat?.map((item) => item.kode || '')

    const cleanedData = obatPulang
      ?.replace(/-{10,}.*\n|Waktu Penyimpanan Pertama: .*\n/g, '')
      .trim()

    const result = {
      no_rawat: nmrRawat,
      kd_dokter: nipCredentials,
      keluhan_utama: keluhanUtama || 'N/A',
      jalannya_penyakit: jalanPenyakit || 'N/A',
      pemeriksaan_penunjang: pemeriksaanPenunjang || 'N/A',
      hasil_laborat: pemeriksaanLabor || 'N/A',
      diagnosa_utama: diagnosaUtama || 'N/A',
      kd_diagnosa_utama: kdDiagnosaUtama || 'N/A',
      diagnosa_sekunder: diagnosaSekunder[1] || 'N/A',
      kd_diagnosa_sekunder: kdDiagnosaSekunder[1] || 'N/A',
      diagnosa_sekunder2: diagnosaSekunder[2] || 'N/A',
      kd_diagnosa_sekunder2: kdDiagnosaSekunder[2] || 'N/A',
      diagnosa_sekunder3: diagnosaSekunder[3] || 'N/A',
      kd_diagnosa_sekunder3: kdDiagnosaSekunder[3] || 'N/A',
      diagnosa_sekunder4: diagnosaSekunder[4] || 'N/A',
      kd_diagnosa_sekunder4: kdDiagnosaSekunder[4] || 'N/A',

      prosedur_utama: prosedurUtama || 'N/A',
      kd_prosedur_utama: kdProsedurUtama || 'N/A',
      prosedur_sekunder: prosedurSekunder[1] || 'N/A',
      kd_prosedur_sekunder: kdProsedurSekunder[1] || 'N/A',
      prosedur_sekunder2: prosedurSekunder[2] || 'N/A',
      kd_prosedur_sekunder2: kdProsedurSekunder[2] || 'N/A',
      prosedur_sekunder3: prosedurSekunder[3] || 'N/A',
      kd_prosedur_sekunder3: kdProsedurSekunder[3] || 'N/A',

      kondisi_pulang: kondisiPulang || 'N/A',
      obat_pulang: cleanedData || 'N/A',
    }
    console.log(result)

    try {
      const isTrue = window.confirm('Kirim Data ?')

      if (isTrue) {
        if (role.includes('petugas')) {
          window.alert('Hanya dapat di isi oleh Dokter')
        } else {
          const response = await api.post('/api/v1/insertResumePasien', result)

          console.log('response send data post', response.data)
        }
      }
    } catch (err) {
      console.log('err post', err)
    } finally {
      navigate(`/rawat-jalan/soap-pemeriksaan/${id}`)
    }
  }

  return (
    <>
      {riwayatSoap.length > 0 ? (
        <div>
          <p>Nomor Rawat : {nmrRawat}</p>
          <p>param : {id}</p>
          <p>user : {nipCredentials}</p>
          <div>
            {riwayatSoap.length > 0 ? (
              <div>
                <div className='grid grid-cols-2 gap-3 border border-slate-300 rounded-lg p-3 mt-4'>
                  <div className='form-control'>
                    <label className='label font-semibold text-slate-700 text-md'>
                      <span>Keluhan Utama :</span>
                    </label>
                    <textarea
                      placeholder='-'
                      defaultValue={keluhanUtama}
                      onChange={handleJalanPenyakit}
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-64 pt-1'
                    />
                  </div>
                  <div className='form-control'>
                    <label className='label font-semibold text-slate-700 text-md'>
                      <span>Obat Pulang :</span>
                    </label>
                    <textarea
                      placeholder='-'
                      defaultValue={obatPulang}
                      onChange={handleObatPulang}
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-64 pt-1'
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>TIDAK ADA DATA.</p>
            )}
          </div>
          <div className='border border-slate-300 rounded-lg p-3 mt-4 flex items-center gap-3'>
            <div className='w-full'>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Jalannya Penyakit :</span>
              </label>
              <input
                placeholder='-'
                onChange={(e) => setJalanPenyakit(e.target.value)}
                className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full pt-1'
              />
            </div>
            <div>
              <label className='label font-semibold text-slate-700 text-md'>
                <span>Kondisi Pulang :</span>
              </label>
              <select
                className='select select-bordered w-56'
                value={kondisiPulang}
                onChange={(e) => setKondisiPulang(e.target.value)}
              >
                <option disabled value=''>
                  Hidup
                </option>
                {Object.values(KondisiPulangResume).map((kondisi) => (
                  <option key={kondisi} value={kondisi}>
                    {kondisi}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3 border border-slate-300 rounded-lg p-3 mt-4'>
            {riwayatRadiologi?.hasil.length > 0 ? (
              <div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Pemeriksaan Penunjang Radiologi:</span>
                  </label>
                  {riwayatRadiologi?.hasil ? (
                    <textarea
                      placeholder='-'
                      defaultValue={riwayatRadiologi?.hasil ? `${riwayatRadiologi?.hasil}` : '-'}
                      onChange={handlePemeriksaanPenunjang}
                      className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-32 pt-1'
                    />
                  ) : (
                    <p>Tidak Ada Data Radiologi</p>
                  )}
                </div>
              </div>
            ) : (
              <p>Tidak Ada Data</p>
            )}
            {riwayatLabor.length > 0 ? (
              <div className='form-control'>
                <label className='label font-semibold text-slate-700 text-md'>
                  <span>Pemeriksaan Laboratorium :</span>
                </label>
                <textarea
                  placeholder='-'
                  defaultValue={riwayatLabor.map((item) => {
                    return item.value
                  })}
                  onChange={handlePemeriksaanLab}
                  className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full h-32 pt-1'
                />
              </div>
            ) : (
              <p>Tidak Ada Data Labor</p>
            )}
          </div>
          <div className='border border-slate-300 rounded-lg p-3 mt-4'>
            <label className='label font-bold text-xl'>DIAGNOSA</label>
            {diagnosaRiwayat.length > 0 ? (
              <div>
                <div className='form-control'>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Diagnosa Utama :</span>
                  </label>
                  <input
                    placeholder='-'
                    onChange={handleDiagnosaUtama}
                    defaultValue={
                      diagnosaRiwayat[0]?.nm_penyakit === ''
                        ? '""'
                        : diagnosaRiwayat[0]?.nm_penyakit
                    }
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full '
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  {[1, 2, 3, 4].map((index) => {
                    const item = diagnosaRiwayat[index]
                    return (
                      <div key={index}>
                        <div className='form-control'>
                          <label className='label font-semibold text-slate-700 text-md'>
                            <span>Diagnosa Sekunder {index} :</span>
                          </label>
                          <input
                            placeholder='-'
                            disabled={!item}
                            defaultValue={item ? item.nm_penyakit : ''}
                            onChange={() => handleDiagnosaRestIndex(index, event)}
                            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full'
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <p>TIDAK ADA DATA DIAGNOSA</p>
            )}
          </div>
          <div className='border border-slate-300 rounded-lg p-3 mt-4'>
            <label className='label font-bold text-xl'>PROSEDUR</label>
            {prosedurRiwayat.length > 0 ? (
              <div className='form-control'>
                <div>
                  <label className='label font-semibold text-slate-700 text-md'>
                    <span>Prosedur :</span>
                  </label>
                  <input
                    placeholder='-'
                    defaultValue={prosedurRiwayat[0].deskripsi_panjang}
                    className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full'
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  {[1, 2, 3].map((index) => {
                    const item = prosedurRiwayat[index]
                    return (
                      <div key={index}>
                        <div className='form-control'>
                          <label className='label font-semibold text-slate-700 text-md'>
                            <span>Prosedur Sekunder {index} :</span>
                          </label>
                          <input
                            placeholder='-'
                            disabled={!item}
                            defaultValue={item ? item.deskripsi_panjang : ''}
                            onChange={() => handleProsedurRestIndex(index, event)}
                            className='input input-bordered text-sm rounded-2xl align-text-top border-disabled w-full'
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <p>TIDAK ADA DATA PROSEDUR</p>
            )}
          </div>

          <div>
            <button
              onClick={postResume}
              className='flex justify-center items-center font-semibold text-white text-base w-full h-[50px] py-2 mt-[20px] bg-primary rounded-xl hover:opacity-80'
            >
              <p className='flex justify-center items-center'>
                <ArchiveBoxArrowDownIcon className='mr-3' width={25} height={25} />
                Kirim
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center mt-96'>
          <p className='font-bold text-3xl'> TIDAK ADA DATA</p>
        </div>
      )}
    </>
  )
}

export default InsertResume
