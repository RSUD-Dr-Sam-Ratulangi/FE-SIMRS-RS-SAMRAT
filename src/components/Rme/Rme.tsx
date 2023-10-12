import React, { useEffect, useState } from 'react'
import { api } from '../../services/api/config.api'

const Rme = () => {
    const [getData, setGetData] = useState({})

    const data = [
        {
            title: 'NO. RM',
            desc: `${getData[0].brand}`
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/products/1')
                console.log(response.data)
                setGetData(response.data)
                // setData(response.data.users)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        console.log(getData)
    }, [])

  return (
    <div className='bg-white h-auto w-full p-4 rounded-xl'>
        <p className='font-sans text-sm font-bold text-[#2D3748]'>Riwayat Perawatan</p>
        <div>
            <p>Data Riwayat Perawatan Pasien</p>
            <div>
                {data[0].desc}
            </div>
        </div>
    </div>
  )
}

export default Rme