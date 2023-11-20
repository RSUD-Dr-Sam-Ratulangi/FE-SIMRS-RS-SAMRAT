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

const TabelDiagnosaPenyakit = ({ data, columns }: Props) => {
  return (
    <div className=' p-1 w-full border-[#A0AEC0]'>
      <DataTable columns={columns} data={data} customStyles={tableStyles} />
    </div>
  )
}

export default TabelDiagnosaPenyakit
