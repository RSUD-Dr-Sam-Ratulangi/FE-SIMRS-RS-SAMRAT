/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import pmsImage from '../../../../../assets/img/pms.jpg'
import { DataPemeriksaanTriase, DataSkalaTriase } from '../type/InterfaceTriase'
import { api } from '../../../../../services/api/config.api'

type ScaleDataType = {
  [kodePemeriksaan: string]: DataSkalaTriase[]
}

const PengkajianTriase: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  const [dataPemeriksaanTriase, setDataPemeriksaanTriase] = useState<DataPemeriksaanTriase[]>([])
  const [scaleData, setScaleData] = useState<ScaleDataType>({})
  const [skalaNyeri, setSkalaNyeri] = useState<number>(0)

  const toggleButton = () => {
    setIsActive(!isActive)
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkalaNyeri(Number(event.target.value))
  }

  const fetchDataPemeriksaanTriase = async () => {
    try {
      const response = await api.get('/api/v1/PemeriksaanTriase')

      setDataPemeriksaanTriase(response.data)
    } catch (err) {
      console.log('error get Pemeriksaan Triase.')
    }
  }

  useEffect(() => {
    fetchDataPemeriksaanTriase()
  }, [])

  useEffect(() => {
    const fetchScaleData = async (kodePemeriksaan) => {
      try {
        const scalePromises = [1, 2, 3, 4, 5].map(async (scale) => {
          const response = await api.get(`/api/v1/skala${scale}?kodePemeriksaan=${kodePemeriksaan}`)
          return response.data
        })

        const results = await Promise.all(scalePromises)
        setScaleData((prev) => ({ ...prev, [kodePemeriksaan]: results }))
      } catch (err) {
        console.log('Error getting scale data:', err)
      }
    }

    dataPemeriksaanTriase.forEach((exam) => {
      fetchScaleData(exam.kode_pemeriksaan)
    })
  }, [dataPemeriksaanTriase])

  return (
    <div>
      <div className='grid justify-start items-center p-1 gap-1 bg-white rounded-lg shadow mt-5 '>
        {/* Header */}
        <p className='font-inter font-bold text-xl text-[#121713]'>PENGKAJIAN</p>

        <div className='grid grid-cols-7 gap-0 mb-2'>
          <div className='col-span-2 font-semibold'></div>
          <div className='bg-[#F74848] rounded-l-2xl text-white h-[50px] flex items-center justify-center'>
            RESUSCITATE
          </div>
          <div className='bg-[#F89500] text-white text-center h-[50px] flex items-center justify-center'>
            EMERGENT
          </div>
          <div className='bg-[#FFE710] text-center h-[50px] flex items-center justify-center'>
            URGENT
          </div>
          <div className='bg-[#33EF04] text-white text-center h-[50px] flex items-center justify-center'>
            NON-URGENT
          </div>
          <div className='bg-gray-50 rounded-r-2xl text-center flex items-center justify-center'>
            FALSE EMERGENCY
          </div>
        </div>

        {dataPemeriksaanTriase.map((exam) => (
          <div key={exam.kode_pemeriksaan} className='grid grid-cols-7 gap-2 mb-4'>
            <div className='col-span-2 font-semibold'>{exam.nama_pemeriksaan}</div>

            <div className='col-span-5 grid grid-cols-5 gap-2'>
              {/* Resuscitate */}
              <div className='col-span-1'>
                {scaleData[exam.kode_pemeriksaan]?.[0]?.length > 1 ? (
                  <select className='select border border-gray-300 rounded-md p-2 w-full bg-white'>
                    <option disabled selected>
                      -
                    </option>
                    {scaleData[exam.kode_pemeriksaan][0].map((scale) => (
                      <option key={scale.kode_skala1} value={scale.kode_skala1}>
                        {scale.pengkajian_skala1}
                      </option>
                    ))}
                  </select>
                ) : (
                  scaleData[exam.kode_pemeriksaan]?.[0]?.length === 1 && (
                    <button className='btn border border-gray-300 rounded-md p-2 w-full bg-white'>
                      {scaleData[exam.kode_pemeriksaan][0][0].pengkajian_skala1}
                    </button>
                  )
                )}
              </div>

              {/* Emergent */}
              <div className='col-span-1'>
                {scaleData[exam.kode_pemeriksaan]?.[1]?.length > 1 ? (
                  <select className='select border border-gray-300 rounded-md p-2 w-full bg-white'>
                    <option disabled selected>
                      -
                    </option>
                    {scaleData[exam.kode_pemeriksaan][1].map((scale) => (
                      <option key={scale.kode_skala2} value={scale.kode_skala2}>
                        {scale.pengkajian_skala2}
                      </option>
                    ))}
                  </select>
                ) : (
                  scaleData[exam.kode_pemeriksaan]?.[1]?.length === 1 && (
                    <button className='btn border border-gray-300 rounded-md p-2 w-full bg-white'>
                      {scaleData[exam.kode_pemeriksaan][1][0].pengkajian_skala2}
                    </button>
                  )
                )}
              </div>

              {/* Urgent */}
              <div className='col-span-1'>
                {scaleData[exam.kode_pemeriksaan]?.[2]?.length > 1 ? (
                  <select className='select border border-gray-300 rounded-md p-2 w-full bg-white'>
                    <option disabled selected>
                      -
                    </option>
                    {scaleData[exam.kode_pemeriksaan][2].map((scale) => (
                      <option key={scale.kode_skala3} value={scale.kode_skala3}>
                        {scale.pengkajian_skala3}
                      </option>
                    ))}
                  </select>
                ) : (
                  scaleData[exam.kode_pemeriksaan]?.[2]?.length === 1 && (
                    <button className='btn border border-gray-300 rounded-md p-2 w-full bg-white'>
                      {scaleData[exam.kode_pemeriksaan][2][0].pengkajian_skala3}
                    </button>
                  )
                )}
              </div>

              {/* Non-Urgent */}
              <div className='col-span-1'>
                {scaleData[exam.kode_pemeriksaan]?.[3]?.length > 1 ? (
                  <select className='select border border-gray-300 rounded-md p-2 w-full bg-white'>
                    <option disabled selected>
                      -
                    </option>
                    {scaleData[exam.kode_pemeriksaan][3].map((scale) => (
                      <option key={scale.kode_skala4} value={scale.kode_skala4}>
                        {scale.pengkajian_skala4}
                      </option>
                    ))}
                  </select>
                ) : (
                  scaleData[exam.kode_pemeriksaan]?.[3]?.length === 1 && (
                    <button className='btn border border-gray-300 rounded-md p-2 w-full bg-white'>
                      {scaleData[exam.kode_pemeriksaan][3][0].pengkajian_skala4}
                    </button>
                  )
                )}
              </div>

              {/* False Emergency */}
              <div className='col-span-1'>
                {scaleData[exam.kode_pemeriksaan]?.[4]?.length > 1 ? (
                  <select className='select border border-gray-300 rounded-md p-2 w-full bg-white'>
                    <option disabled selected>
                      -
                    </option>
                    {scaleData[exam.kode_pemeriksaan][4].map((scale) => (
                      <option key={scale.kode_skala5} value={scale.kode_skala5}>
                        {scale.pengkajian_skala5}
                      </option>
                    ))}
                  </select>
                ) : (
                  scaleData[exam.kode_pemeriksaan]?.[4]?.length === 1 && (
                    <button className='btn border border-gray-300 rounded-md p-2 w-full bg-white'>
                      {scaleData[exam.kode_pemeriksaan][4][0].pengkajian_skala5}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Skala nyeri */}
        <div className='flex items-center gap-[1px] mb-4'>
          <div className='col-span-2 font-semibold mr-[349px]'>SKALA NYERI</div>
          <div className='grid items-center gap-2 ml-20'>
            <div>
              <img src={pmsImage} className='w-full' />
            </div>
            <div>
              <label className='label'>Lokasi</label>
              <input
                type='range'
                min={0}
                max={10}
                value={skalaNyeri}
                className={
                  skalaNyeri >= 0 && skalaNyeri <= 2
                    ? 'range [--range-shdw:#26d500]'
                    : skalaNyeri >= 2 && skalaNyeri <= 3
                    ? 'range [--range-shdw:#7af804]'
                    : skalaNyeri >= 3 && skalaNyeri <= 4
                    ? 'range [--range-shdw:#c2f318]'
                    : skalaNyeri >= 4 && skalaNyeri <= 5
                    ? 'range [--range-shdw:#ffcf43]'
                    : skalaNyeri >= 5 && skalaNyeri <= 6
                    ? 'range [--range-shdw:#ffb624]'
                    : skalaNyeri >= 6 && skalaNyeri <= 7
                    ? 'range [--range-shdw:#f39402]'
                    : skalaNyeri >= 7 && skalaNyeri <= 8
                    ? 'range [--range-shdw:#e17f01]'
                    : skalaNyeri >= 8 && skalaNyeri <= 9
                    ? 'range [--range-shdw:#f04500]'
                    : skalaNyeri >= 9 && skalaNyeri <= 10
                    ? 'range [--range-shdw:#ff1300]'
                    : 'range range-error'
                }
                step={1}
                onChange={handleSliderChange}
              />
              <div className='flex w-full justify-between px-2 text-xs'>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <div className='flex items-center'>
            <label className='font-inter font-bold text-sm text-[#121713] mr-2 w-48'>
              DITERUSKAN KEPADA
            </label>
            <textarea
              placeholder='Diteruskan Kepada'
              className='textarea textarea-bordered textarea-lg w-full'
            />
          </div>
          <div className='flex items-center'>
            <label className='font-inter font-bold text-sm text-[#121713] mr-2 w-48'>
              TINDAK LANJUT
            </label>
            <textarea
              placeholder='Tindak Lanjut'
              className='textarea textarea-bordered textarea-lg w-full'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PengkajianTriase
