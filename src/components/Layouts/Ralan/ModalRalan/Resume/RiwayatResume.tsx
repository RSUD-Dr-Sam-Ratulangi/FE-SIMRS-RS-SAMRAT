import { forwardRef, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { api } from '../../../../../services/api/config.api'

interface RiwayatModalResume {
  onClose: () => void
  noRawat: string
}

interface PasienRecord {
  tgl_registrasi: string
  no_rawat: string
  no_rkm_medis: string
  nm_pasien: string
  kd_dokter: string
  nm_dokter: string
  kondisi_pulang: string
  keluhan_utama: string
  jalannya_penyakit: string
  pemeriksaan_penunjang: string
  hasil_laborat: string
  diagnosa_utama: string
  kd_diagnosa_utama: string
  diagnosa_sekunder: string
  kd_diagnosa_sekunder: string
  diagnosa_sekunder2: string
  kd_diagnosa_sekunder2: string
  diagnosa_sekunder3: string
  kd_diagnosa_sekunder3: string
  diagnosa_sekunder4: string
  kd_diagnosa_sekunder4: string
  prosedur_utama: string
  kd_prosedur_utama: string
  prosedur_sekunder: string
  kd_prosedur_sekunder: string
  prosedur_sekunder2: string
  kd_prosedur_sekunder2: string
  prosedur_sekunder3: string
  kd_prosedur_sekunder3: string
  obat_pulang: string
}

const RiwayatModalResume = forwardRef<PopupActions, RiwayatModalResume>((props, ref) => {
  const nmrRawat = props.noRawat
  const close = props.onClose
  const [dataResume, setDataResume] = useState<PasienRecord[]>([])

  const getResume = async () => {
    try {
      const response = await api.get(`/api/v1/resume-by-no-rawat?no_rawat=${nmrRawat}`)
      console.log('resume', response.data)
      setDataResume(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!nmrRawat) return
    getResume()
  }, [nmrRawat])

  return (
    <Popup
      onClose={close}
      ref={ref}
      modal
      closeOnDocumentClick={true}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
      contentStyle={{
        borderRadius: '12px',
        padding: '20px',
        width: '80rem',
        height: 'full',
        backgroundColor: 'whitesmoke',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <>
        <div className='flex justify-between items-center'>
          <p className='font-bold'>Riwayat Resume</p>
          <button className='btn btn-ghost btn-lg' onClick={close}>
            X
          </button>
        </div>
        {dataResume.length > 0 ? (
          <div>
            {dataResume.map((item, index) => (
              <div
                key={index}
                className='mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200'
              >
                <div className='ml-1 mt-2'>
                  <p className='text-2xl font-bold text-gray-800 mb-4'>{nmrRawat}</p>

                  <div className='flex justify-between p-3 mb-4 border-b border-gray-300'>
                    <p className='text-base text-gray-600'>
                      Nama Pasien: <span className='font-semibold'>{item?.nm_pasien || '-'}</span>
                    </p>
                    <p className='text-base text-gray-600'>
                      Tanggal: <span className='font-semibold'>{item?.tgl_registrasi || '-'}</span>
                    </p>
                  </div>

                  <div className='space-y-4'>
                    {/* Diagnoses Section */}
                    <div className='border-t border-b border-gray-300 p-4'>
                      <p className='text-base text-gray-700'>
                        Diagnosa Utama:{' '}
                        <span className='font-semibold'>{item?.diagnosa_utama || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Diagnosa Sekunder:{' '}
                        <span className='font-semibold'>{item?.diagnosa_sekunder || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Diagnosa Sekunder 2:{' '}
                        <span className='font-semibold'>{item?.diagnosa_sekunder2 || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Diagnosa Sekunder 3:{' '}
                        <span className='font-semibold'>{item?.diagnosa_sekunder3 || '-'}</span>
                      </p>
                    </div>

                    {/* Procedures Section */}
                    <div className='border-t border-b border-gray-300 p-4'>
                      <p className='text-base text-gray-700'>
                        Prosedur Utama:{' '}
                        <span className='font-semibold'>{item?.prosedur_utama || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Prosedur Sekunder:{' '}
                        <span className='font-semibold'>{item?.prosedur_sekunder || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Prosedur Sekunder 2:{' '}
                        <span className='font-semibold'>{item?.prosedur_sekunder2 || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Prosedur Sekunder 3:{' '}
                        <span className='font-semibold'>{item?.prosedur_sekunder3 || '-'}</span>
                      </p>
                    </div>

                    {/* Additional Information Section */}
                    <div className='border-t border-b border-gray-300 p-4'>
                      <p className='text-base text-gray-700'>
                        Kondisi Pulang:{' '}
                        <span className='font-semibold'>{item?.kondisi_pulang || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Keluhan Utama:{' '}
                        <span className='font-semibold'>{item?.keluhan_utama || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Jalan Penyakit:{' '}
                        <span className='font-semibold'>{item?.jalannya_penyakit || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Pemeriksaan Penunjang:{' '}
                        <span className='font-semibold'>{item?.pemeriksaan_penunjang || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Pemeriksaan Laborat:{' '}
                        <span className='font-semibold'>{item?.hasil_laborat || '-'}</span>
                      </p>
                      <p className='text-base text-gray-700'>
                        Obat Pulang:{' '}
                        <span className='font-semibold'>{item?.obat_pulang || '-'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-center'>
            <p className='font-bold text-lg'>
              TIDAK ADA DATA RESUME PADA <span className='text-lg'>{nmrRawat}</span>
            </p>
          </div>
        )}
      </>
    </Popup>
  )
})

RiwayatModalResume.displayName = 'ModalRiwayatTriase'

export default RiwayatModalResume
