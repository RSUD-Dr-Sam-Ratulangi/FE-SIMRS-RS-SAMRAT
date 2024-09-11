import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { ClockIcon, UserIcon } from '@heroicons/react/24/solid'
import Chart from 'react-apexcharts'
import { api } from '../../services/api/config.api'
import DataTable from 'react-data-table-component'

export default function PageDashboard() {
  const tokenValue = localStorage.getItem('token')
  const credentialsInfo = JSON.parse(tokenValue)
  const keys = Object.keys(credentialsInfo)
  let name = null
  let kodePekerja = null

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const year = currentYear

  const [totalPatientThisYear, setTotalPatientThisYear] = useState('')
  const [totalPatientThisDay, setTotalPatientThisDay] = useState('')
  const [totalTopVisiting, setTotalTopVisiting] = useState([])

  if (keys[0] === 'dokter') {
    keys
    name = credentialsInfo.dokter.nm_dokter
    kodePekerja = credentialsInfo.dokter.kd_dokter
  } else {
    keys
    name = credentialsInfo.petugas.nama
    kodePekerja = credentialsInfo.petugas.nip
  }

  const columns = [
    { name: 'NAMA', selector: (row) => row.nm_pasien, sortable: true },
    { name: 'JUMLAH KUNJUNGAN', selector: (row) => row.jumlah_kunjungan, sortable: true },
  ]

  const tableStyles = {
    table: {
      style: {
        width: '100%',
      },
    },
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headRow: {
      style: {
        color: '#4A5568',
        fontSize: '20px',
        borderBottom: '2px solid #CBD5E0',
        borderColor: '#CBD5E0',
        minHeight: '40px',
      },
    },
    cells: {
      style: {
        padding: '12px 16px',
        borderRight: '1px solid #CBD5E0',
        borderLeft: '1px solid #CBD5E0',
      },
    },
    headCells: {
      style: {
        padding: '12px 16px',
        borderRight: '1px solid #CBD5E0',
        borderLeft: '1px solid #CBD5E0',
      },
    },
  }

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Rawat Jalan',
        data: [],
      },
    ],
    options: {
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'Mei',
          'Jun',
          'Jul',
          'Agu',
          'Sep',
          'Okt',
          'Nov',
          'Des',
        ],
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      toolbar: {
        show: false,
      },
      colors: ['#55A46B', '#2D3748'],
    },
  })

  const statisticsDoctor = async () => {
    if (keys[0] !== 'dokter') {
      return
    }

    try {
      const responseTotalPatientThisYear = await api.get(
        `/api/v1/doctor-yearly-statistics?doctorId=${kodePekerja}&year=${year}`,
      )
      setTotalPatientThisYear(responseTotalPatientThisYear.data[0].total_patients)
    } catch (err) {
      console.log(err)
    }

    try {
      const responseTotalPatientThisDay = await api.get(
        `/api/v1/total-patients-for-today?doctorId=${kodePekerja}`,
      )
      setTotalPatientThisDay(responseTotalPatientThisDay.data)
    } catch (err) {
      console.log(err)
    }

    try {
      const responseDoctorStatistic = await api.get(
        `/api/v1/doctor-statistics?doctorId=${kodePekerja}&year=${year}`,
      )

      const data = responseDoctorStatistic.data
      const totalPatients = new Array(12).fill(0)
      setChartData((prevState) => ({
        ...prevState,
        series: [
          {
            name: 'Rawat Jalan',
            data: totalPatients,
          },
        ],
      }))
      data.forEach((item) => {
        totalPatients[item.month - 1] = item.total_patients
      })
    } catch (err) {
      console.log(err)
    }

    try {
      const responseTopVisiting = await api.get(
        `/api/v1/top-visiting-patients?doctorId=${kodePekerja}`,
      )

      setTotalTopVisiting(responseTopVisiting.data)
    } catch (err) {
      console.log('error')
    }
  }

  useEffect(() => {
    if (keys[0] === 'dokter') {
      statisticsDoctor()
    } else {
      return
    }
  }, [])

  return (
    <div>
      {keys[0] === 'dokter' ? (
        <>
          <div
            className='bg-primary-500 rounded-xl h-[250px] bg-cover p-4'
            // eslint-disable-next-line quotes
            style={{ backgroundImage: "url('/assets/images/dashboard_background.png')" }}
          >
            <div className='text-white flex justify-between'>
              <Breadcrumb />
              <div>
                <div className='flex items-center gap-3'>
                  <div className='flex bg-white h-fit p-2 rounded-full'>
                    <ClockIcon className='h-6 w-6 text-primary-500' />
                    {/* display time in 24:00 format in 24 hour format*/}
                    <span className='ml-2 text-black font-bold'>
                      {new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <span className='font-bold'>
                    {new Date().toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between bg-white/60 filter backdrop-blur-xl border border-white -mt-[60px] rounded-xl m-4 p-4 shadow-soft'>
            <div className='flex items-center'>
              <img src='/assets/images/rsud_img.svg' alt='' className='w-24 h-24 rounded-xl' />
              <div className='flex flex-col ml-4'>
                <span className='font-bold text-lg'>{name}</span>
                <span className='text-sm'>{keys}</span>
              </div>
            </div>
          </div>
          <div className='shadow-soft bg-white p-4 m-4 rounded-xl'>
            <div>
              <h1 className='font-bold text-xl'>Statistik Kunjungan Pasien</h1>
            </div>
            <Chart options={chartData.options} series={chartData.series} type='area' height='320' />
          </div>
          <div className='grid grid-cols-3 gap-4 m-4'>
            <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
              <div>
                <span className='font-bold text-disabled text-sm'>Total Pasien Hari Ini</span>
                <div className='flex gap-1'>
                  <span className='text-lg font-bold'>{totalPatientThisDay}</span>
                </div>
              </div>
            </div>
            <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
              <div>
                <span className='font-bold text-disabled text-sm'>Total Pasien Tahun Ini</span>
                <div className='flex gap-1'>
                  <span className='text-lg font-bold'>{totalPatientThisYear}</span>
                </div>
              </div>
            </div>
            <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
              <div>
                <span className='font-bold text-disabled text-sm'>Total Pasien Ranap</span>
                <div className='flex gap-1'>
                  <span className='text-lg font-extrabold'>COMING SOON</span>
                </div>
              </div>
              <div className='flex justify-center items-center bg-primary-200 p-4 rounded-xl'>
                <UserIcon className='h-6 w-6 text-primary-500' />
              </div>
            </div>
          </div>
          <div>
            <div>
              <label className='label font-bold text-xl'>Total Kunjungan Pasien Terbanyak</label>
              <DataTable columns={columns} data={totalTopVisiting} customStyles={tableStyles} />
            </div>
          </div>
        </>
      ) : (
        <div>
          <div
            className='bg-primary-500 rounded-xl h-[250px] bg-cover p-4'
            // eslint-disable-next-line quotes
            style={{ backgroundImage: "url('/assets/images/dashboard_background.png')" }}
          >
            <div className='text-white flex justify-between'>
              <Breadcrumb />
              <div>
                <div className='flex items-center gap-3'>
                  <div className='flex bg-white h-fit p-2 rounded-full'>
                    <ClockIcon className='h-6 w-6 text-primary-500' />
                    {/* display time in 24:00 format in 24 hour format*/}
                    <span className='ml-2 text-black font-bold'>
                      {new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                  <span className='font-bold'>
                    {new Date().toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between bg-white/60 filter backdrop-blur-xl border border-white -mt-[60px] rounded-xl m-4 p-4 shadow-soft'>
            <div className='flex items-center'>
              <img src='/assets/images/rsud_img.svg' alt='' className='w-24 h-24 rounded-xl' />
              <div className='flex flex-col ml-4'>
                <span className='font-bold text-lg'>{name}</span>
                <span className='text-sm'>{keys}</span>
              </div>
            </div>
          </div>
          <div className='shadow-soft bg-white p-4 m-4 rounded-xl'>
            <div>
              <h1 className='font-bold text-xl'>Statistik Kunjungan Pasien</h1>
              <br />
              <h1 className='font-bold text-center animate-pulse text-3xl'>COMING SOON</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
