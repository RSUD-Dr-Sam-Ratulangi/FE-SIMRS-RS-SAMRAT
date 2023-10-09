import { useEffect, useState } from 'react'
import TableData from '../../components/Table/Table'
import { api } from '../../services/api/config.api'

export default function PageRawatInap() {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users')
        console.log(response.data.users)
        setData(response.data.users)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  type DataItem = {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: {
      color: string
      type: string
    }
    domain: string
    ip: string
  }

  const columns = [
    { name: 'ID', selector: (row: DataItem) => row.id, sortable: true },
    { name: 'First Name', selector: (row: DataItem) => row.firstName, sortable: true },
    {
      name: 'Last Name',
      selector: (row: DataItem) => row.lastName,
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row: DataItem) => (
        <p className='text-white btn btn-xs text-center text-[10px] bg-[#48BB78] rounded-xl'>
          {row.age}
        </p>
      ),
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row: DataItem) => row.gender,
      sortable: true,
    },
    { name: 'Email', selector: (row: DataItem) => row.email, sortable: true },
    { name: 'Birth Date', selector: (row: DataItem) => row.birthDate, sortable: true },
  ]
  return (
    <div>
      <TableData data={data} columns={columns} />
    </div>
  )
}
