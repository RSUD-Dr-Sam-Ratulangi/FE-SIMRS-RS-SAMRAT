import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api/config.api'

const RiwayatSoapRanap = () => {
  const [dataRiwayat, setDataRiwayat] = useState<any | null>(null)
  const nmrRawat = localStorage.getItem('no_rawat')

  const getRiwayat = async () => {
    try {
      const response = await api.get(`/api/v1/getPemeriksaanRanap?no_rawat=${nmrRawat}`)
      console.log('data riwayat ranap', response.data)
      setDataRiwayat(response.data)
    } catch (err) {
      console.log('fetch data pasien ranap', err)
    }
  }

  useEffect(() => {
    getRiwayat()
  }, [])

  return (
    <div className='w-full h-full bg-white mt-3'>
      {dataRiwayat && dataRiwayat.length > 0 ? (
        <div>
          <label className='label font-inter font-bold text-xl text-[#121713]'>
            Rincian Riwayat
          </label>
          <table className='table font-bold'>
            <thead>
              <tr className='font-bold text-black'>
                <th>No rawat</th>
                <th>Jam Rawat</th>
                <th>Tanggal</th>
                <th>Vital Signs</th>
                <th>Soap</th>
              </tr>
            </thead>
            <tbody>
              {dataRiwayat && dataRiwayat.length > 0 ? (
                dataRiwayat.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.no_rawat}</td>
                    <td>{item.jam_rawat}</td>
                    <td>{item.tgl_perawatan}</td>
                    <td>
                      <div className='grid grid-cols-3 gap-2'>
                        <div>
                          <strong>Suhu Tubuh: </strong>
                          {item.suhu_tubuh} °C
                        </div>
                        <div>
                          <strong>Tensi: </strong>
                          {item.tensi}
                        </div>
                        <div>
                          <strong>Nadi: </strong>
                          {item.nadi} bpm
                        </div>
                        <div>
                          <strong>Respirasi: </strong>
                          {item.respirasi} rpm
                        </div>
                        <div>
                          <strong>Tinggi: </strong>
                          {item.tinggi} cm
                        </div>
                        <div>
                          <strong>Berat: </strong>
                          {item.berat} kg
                        </div>
                        <div>
                          <strong>SPO2: </strong>
                          {item.spo2} %
                        </div>
                        <div>
                          <strong>GCS: </strong>
                          {item.gcs}
                        </div>
                        <div>
                          <strong>Kesadaran: </strong>
                          {item.kesadaran}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>Keluhan: </strong>
                        {item.keluhan}
                      </div>
                      <div>
                        <strong>Pemeriksaan: </strong>
                        {item.pemeriksaan}
                      </div>
                      <div>
                        <strong>Penilaian: </strong>
                        {item.penilaian}
                      </div>
                      <div>
                        <strong>Instruksi: </strong>
                        {item.instruksi}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>null</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='font-bold text-center text-lg'>No Data !!</p>
      )}
    </div>
  )
}

export default RiwayatSoapRanap
