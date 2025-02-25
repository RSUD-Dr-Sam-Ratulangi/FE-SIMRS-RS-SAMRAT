import React, { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'
import { useParams } from 'react-router-dom'
import { RincianRiwayat } from '../../PageIgdInsertSoap/type/InterfaceCppt'

interface RiwayatCpptProps {
  noRawat: string
}

const RiwayatCppt: React.FC<RiwayatCpptProps> = ({ noRawat }) => {
  const [riwayat, setRiwayat] = useState<RincianRiwayat[]>([])
  const { id } = useParams()

  const fetchRincianRiwayat = async () => {
    try {
      const response = await api.get(
        `/api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${noRawat}`,
      )
      console.log('riwayat', response.data)
      setRiwayat(response.data)
    } catch (err) {
      console.log('err get rincian riwayat', err)
    }
  }

  useEffect(() => {
    fetchRincianRiwayat()
  }, [])

  return (
    <div>
      <p>Riwayat CCPT</p>
      <div className='h-96 overflow-auto'>
        {riwayat.map((riwayat, index) => (
          <div
            key={index}
            className='min-w-fit bg-slate-100 rounded-xl mt-4 p-4 border border-slate-300'
          >
            <div className='flex justify-between'>
              <div>
                <p className=' font-bold text-xl text-[#121713] mb-2'>RIWAYAT SOAP (IGD)</p>
              </div>
            </div>
            <div className='mt-5'>
              <div className='mt-5 mb-3 p-2'>
                <label className='font-semibold text-slate-700 text-sm'>SUBJEK</label>
                <p className='whitespace-pre'>{riwayat.keluhan || '-'}</p>
              </div>
              <div className='mt-5 mb-3 p-2'>
                <label className=' font-semibold text-slate-700 text-sm'>OBJECT</label>
                <p className='whitespace-pre'>{riwayat.pemeriksaan || '-'}</p>
              </div>
              <div className='border border-slate-400 p-2 rounded-lg'>
                <label className=' font-semibold text-slate-700 text-md'>VITALITY SIGN</label>
                <div className='flex w-full justify-between mt-3'>
                  <div>
                    <div>
                      <label className=' font-semibold text-slate-700 text-sm'>SUHU(C))</label>
                      <p className=''>{riwayat.suhu_tubuh || '-'}</p>
                    </div>
                    <div className=' my-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>GCS(E,V,M)</label>
                      <p>{riwayat.gcs || '-'}</p>
                    </div>
                    <div className=''>
                      <label className=' font-semibold text-slate-700 text-sm'>KESADARAN</label>
                      <p>{riwayat.kesadaran || '-'}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className=' font-semibold text-slate-700 text-sm'>TENSI(mmHg)</label>
                      <p className=''>{riwayat.tensi || '-'}</p>
                    </div>
                    <div className=' my-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>SlabelO2</label>
                      <p className=' whitespace-nowrap'>{riwayat.spo2 || '-'}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className=' font-semibold text-slate-700 text-sm'>NADI(/menit)</label>
                      <p className=''>{riwayat.nadi || '-'}</p>
                    </div>
                    <div className=' my-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>TINGGI(cm)</label>
                      <p>{riwayat.tinggi || '-'}</p>
                    </div>
                  </div>
                  <div className=' mr-24'>
                    <div>
                      <label className=' font-semibold text-slate-700 text-sm'>RR(/menit)</label>
                      <p className=''>{riwayat.respirasi || '-'}</p>
                    </div>
                    <div className=' my-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>BERAT(kg)</label>
                      <p>{riwayat.berat || '-'}</p>
                    </div>
                    <div className=' my-2'>
                      <label className=' font-semibold text-slate-700 text-sm'>ALERGI</label>
                      <p>{riwayat.alergi || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-2 p-2'>
                <label className=' font-semibold text-slate-700 text-sm'>PLAN</label>
                <p className='whitespace-pre'>{riwayat.rtl || '-'}</p>
              </div>
              <div className='mt-2 p-2'>
                <label className=' font-semibold text-slate-700 text-sm'>ASESMEN</label>
                <p className='whitespace-pre'>{riwayat.penilaian || '-'}</p>
              </div>
              <div className='mt-2 p-2'>
                <label className=' font-semibold text-slate-700 text-sm'>INSTRUKSI</label>
                <p className='whitespace-pre'>{riwayat.instruksi || '-'}</p>
              </div>
              <div className='mt-2 p-2'>
                <label className=' font-semibold text-slate-700 text-sm'>EVALUASI</label>
                <p className='whitespace-pre'>{riwayat.evaluasi || '-'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiwayatCppt
