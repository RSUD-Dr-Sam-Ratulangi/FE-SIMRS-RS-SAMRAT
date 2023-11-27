import DataTable from 'react-data-table-component'

type templateObject = {
  [key: string]: any
}

type Props = {
  dataDokter: templateObject[]
  dataPerawat: templateObject[]
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
      // marginRight: 'auto',
      // marginLeft: '0rem',
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

const TabelTindakanPerawatanDokterPerawat = ({ dataDokter, dataPerawat, columns }: Props) => {
  return (
    <div className='mb-2 mt-2'>
      <div className=' overflow-auto max-h-[100vh] border border-disabled rounded-xl mb-8'>
        <div className='ml-1 mr-1 flex '>
          <div className='border-r-2 border-solid border-[#f8f9fa] flex items-top p-2 max-w-[8rem] text-disabled text-sm'>
            Tindakan Rawat Jalan Dokter
          </div>
          <div className=' p-1 w-full'>
            <DataTable
              columns={columns}
              data={dataDokter}
              // pagination
              customStyles={tableStyles}
            />
          </div>
        </div>
      </div>
      <div className=' border overflow-auto max-h-[100vh] border-disabled rounded-xl'>
        <div className='ml-1 mr-1 flex '>
          <div className=' broder-r-2 border-solid border-[#f8f9fa] flex items-top p-2 max-w-[8rem] text-disabled text-sm'>
            Tindakan Rawat Jalan Perawat
          </div>
          <div className=' p-1 w-full'>
            <DataTable
              columns={columns}
              data={dataPerawat}
              // pagination
              customStyles={tableStyles}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabelTindakanPerawatanDokterPerawat
