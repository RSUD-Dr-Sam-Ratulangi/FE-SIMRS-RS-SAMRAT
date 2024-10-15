import { useEffect, useState } from 'react'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
import { useParams } from 'react-router-dom'
import DiagnosaProsedurIcd from './component/DiagnosaProsedurIcd'

const PageIgdIcd = () => {
  const [jam, setJam] = useState<string>('')
  const [tanggal, setTanggal] = useState<string>('')

  const nmrRawat = localStorage.getItem('no_rawat')
  const { id } = useParams()
  const storedRow = localStorage.getItem('dataRow')
  const dataRow = storedRow ? JSON.parse(storedRow) : null

  const setTimeAndDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const hours = today.getHours().toString().padStart(2, '0')
    const minutes = today.getMinutes().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    const formattedTime = `${hours}:${minutes}`
    setJam(formattedTime)
    setTanggal(formattedDate)
  }

  useEffect(() => {
    setTimeAndDate()
  }, [])

  return (
    <>
      <HeaderIgd />
      <div>
        <div className='border rounded-2xl p-2 bg-white'>
          <div className='flex gap-3 items-center'>
            <div className='grid gap-2 w-full'>
              <div className='flex gap-2'>
                <div className='grid'>
                  <label className='label'>Tanggal</label>
                  <input
                    type='date'
                    value={tanggal}
                    disabled
                    className='input w-full border-primary text-sm'
                  />
                </div>
                <div className='w-full'>
                  <label className='label'>Jam</label>
                  <input
                    type='time'
                    disabled
                    className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                    value={jam}
                  />
                </div>
              </div>
              <div>
                <div className='w-full'>
                  <label className='label'>Id Rawat</label>
                  <input
                    type='text'
                    value={nmrRawat}
                    disabled
                    className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                  />
                </div>
              </div>
            </div>
            <div className='grid w-full'>
              <div className='grid w-full gap-3'>
                <div className='grid w-full'>
                  <label className='label'>Nomor.RM</label>
                  <input
                    type='text'
                    value={id}
                    disabled
                    className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                  />
                </div>
                <div className='grid w-full'>
                  <label className='label'>Nama Pasien</label>
                  <input
                    type='text'
                    disabled
                    value={dataRow?.nm_pasien ? dataRow.nm_pasien : '-'}
                    className='input w-full border border-primary disabled:bg-slate-200 disabled:text-black'
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <DiagnosaProsedurIcd />
          </div>
        </div>
      </div>
    </>
  )
}

export default PageIgdIcd
