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
  cells: {
    style: {
      padding: '0px',
      '&:not(:last-of-type)': {
        marginRight: '15rem',
      },
    },
  },
  headCells: {
    style: {
      padding: '0px',

      '&:not(:last-of-type)': {
        marginRight: '15rem',
      },
    },
  },
  headRow: {
    style: {
      color: '#A0AEC0',
      fontSize: '16px',
      borderBottomWidth: '0px',
      minHeight: '30px',
    },
  },
}

const TabelObat = ({ data, columns }: Props) => {
  return (
    <div>
      <DataTable
        noHeader
        columns={columns}
        data={data}
        pagination={false}
        customStyles={tableStyles}
      />
    </div>
  )
}

export default TabelObat
