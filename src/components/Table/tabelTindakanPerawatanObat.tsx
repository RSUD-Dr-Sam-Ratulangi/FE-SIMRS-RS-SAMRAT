import DataTable from 'react-data-table-component'

type templateObject = {
  [key: string]: any
}

type Props = {
  data: templateObject[]
  columns: any[]
}

const tableStyles = {
  rows: {
    style: {
      minHeight: '30px',

      '&:not(:last-of-type)': {
        borderBottomWidth: '0px',
      },
    },
  },
  headRow: {
    style: {
      color: '#A0AEC0',
      fontSize: '12px',
      borderBottomWidth: '1px',
      borderColor: '#f8f9fa',
      minHeight: '30px',
    },
  },
  cells: {
    style: {
      padding: '0px',
    },
  },
  headCells: {
    style: {
      padding: '0px',
    },
  },
}

const TabelTindakanPerawatan = ({ data, columns }: Props) => {
  return (
    <div className=' overflow-auto max-h-[100vh] border border-disabled rounded-xl mt-2'>
      <div className='ml-1 mr-1 flex '>
        <div className=' p-1 w-full'>
          <DataTable columns={columns} data={data} customStyles={tableStyles} />
        </div>
      </div>
    </div>
  )
}

export default TabelTindakanPerawatan
