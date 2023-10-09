import { useEffect, useState } from 'react'
import TableData, { DataItem } from '../../components/Table/Table'
import { api } from '../../services/api/config.api'

export default function PageRawatJalan() {
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products')
        console.log(response.data.products)
        setData(response.data.products)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const columns = [
    { name: 'ID', selector: (row: DataItem) => row.id, sortable: true },
    { name: 'Title', selector: (row: DataItem) => row.title, sortable: true },
    {
      name: 'Description',
      selector: (row: DataItem) => row.description,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row: DataItem) => (
        <p className='text-white btn btn-xs text-center text-[10px] bg-[#48BB78] rounded-xl'>
          {row.price}
        </p>
      ),
      sortable: true,
    },
    {
      name: 'Discount Percentage',
      selector: (row: DataItem) => row.discountPercentage,
      sortable: true,
    },
    { name: 'Rating', selector: (row: DataItem) => row.rating, sortable: true },
    { name: 'Stock', selector: (row: DataItem) => row.stock, sortable: true },
    { name: 'Brand', selector: (row: DataItem) => row.brand, sortable: true },
    {
      name: 'Category',
      selector: (row: DataItem) => row.category,
      sortable: true,
    },
  ]

  return (
    <div>
      <TableData data={data} columns={columns} />
    </div>
  )
}
