import DataTable from 'react-data-table-component'
import { tableCustomStyles } from './TableCustomStyle'

export type DataItem = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

type Props = {
  data: DataItem[]
  columns: any[]
}

const TableData = ({ data, columns }: Props) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={tableCustomStyles}
      pagination
      paginationPerPage={15}
      paginationRowsPerPageOptions={[15, 30, 50]}
    />
  )
}
export default TableData
