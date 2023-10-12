import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
} from '@heroicons/react/24/solid'

type templateObject = {
  [key: string]: any
}

type Props = {
  data: templateObject[]
  columns: any[]
}

const TableData = ({ data, columns }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const newFilteredData = data
      ? data.filter((item) => {
          if (searchQuery === '') {
            return true
          } else {
            // ? bug
            const lowerCasedSearchQuery = searchQuery.toLowerCase()
            return Object.values(item).some((value) => {
              if (typeof value === 'string') {
                return value.toLowerCase().includes(lowerCasedSearchQuery)
              }
              return false
            })
          }
        })
      : null
    setFilteredData(newFilteredData)
  }, [searchQuery, data, columns])

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(1)
  }

  const paginatedData = filteredData
    ? filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : []

  return (
    <div>
      <div className='flex items-center w-full pb-4'>
        <div className='w-full'>
          <span className='text-[10px] flex'>
            <p className='font-bold'>Cari</p>{' '}
            <p className='ml-1'>berdasarkan No. RM, Nama, atau Nomor Rawat</p>
          </span>
          <div className='flex gap-2 '>
            <div className='relative w-full'>
              <MagnifyingGlassIcon className='absolute right-4 bottom-4 h-[16.02px] w-[16.02px] bg-none text-[#55A46B]' />
              <input
                type='text'
                placeholder='Cari...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full input input-bordered'
              />
            </div>
            <div className='relative'>
              <button className='flex btn w-72 text-white bg-[#55A46B]'>
                <FunnelIcon className='font-bold text-white h-[17px] w-[17px]' />
                Filter
              </button>
              <ChevronDownIcon className='absolute bottom-4 right-5 font-bold text-white h-[17px] w-[17px]' />
            </div>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={paginatedData} pagination={false} />
      {searchQuery === '' ? (
        <div className='flex justify-between p-2'>
          <div>
            <p>
              Halaman <span className='font-bold'>{currentPage}</span> dari{' '}
              <span className='font-bold'>{data ? Math.ceil(data.length / rowsPerPage) : []}</span>
            </p>
          </div>
          <div>
            <div className='flex gap-4'>
              <div className='space-x-2'>
                <button
                  className='btn btn-sm bg-[#55A46B] text-white w-11 h-11'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {' '}
                  <ChevronDoubleLeftIcon />{' '}
                </button>
                <button
                  className='btn btn-sm bg-[#55A46B] text-white w-11 h-11'
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {' '}
                  <ChevronLeftIcon />{' '}
                </button>
              </div>
              <div className='flex items-center gap-3'>
                <p>Pergi Ke Halaman: </p>
                {data && (
                  <input
                    className='input input-sm w-20 bg-[#E2E8F0] shadow'
                    type='number'
                    min='1'
                    max={Math.ceil(data.length / rowsPerPage)}
                    value={currentPage}
                    onChange={(e) => {
                      const pageNumber = parseInt(e.target.value, 10)
                      if (pageNumber >= 1 && pageNumber <= Math.ceil(data.length / rowsPerPage)) {
                        handlePageChange(pageNumber)
                      }
                    }}
                  />
                )}
                <div className='dropdown'>
                  <label tabIndex={0} className='btn w-full bg-[#E2E8F0]'>
                    menampilkan
                  </label>
                  <ul
                    tabIndex={0}
                    className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full'
                  >
                    <li>
                      <a onClick={() => handleRowsPerPageChange(15)}>15</a>
                    </li>
                    <li>
                      <a onClick={() => handleRowsPerPageChange(30)}>30</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='space-x-2'>
                <button
                  className='btn btn-sm bg-[#55A46B] text-white w-11 h-11'
                  onClick={() => {
                    if (data && currentPage < Math.ceil(data.length / rowsPerPage)) {
                      handlePageChange(currentPage + 1)
                    }
                  }}
                  disabled={!data || currentPage === Math.ceil(data.length / rowsPerPage)}
                >
                  <ChevronRightIcon />
                </button>
                <button
                  className='btn btn-sm bg-[#55A46B] text-white w-11 h-11'
                  onClick={() => {
                    if (data) {
                      handlePageChange(Math.ceil(data.length / rowsPerPage))
                    }
                  }}
                  disabled={!data || currentPage === Math.ceil(data.length / rowsPerPage)}
                >
                  <ChevronDoubleRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='font-bold text-lg text-center pt-5'>Cari Data ?</p>
      )}
    </div>
  )
}
export default TableData
