import React from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { ArrowLeftOnRectangleIcon, ClockIcon, UserIcon } from '@heroicons/react/24/solid'
import Chart from 'react-apexcharts'

export default function PageDashboard() {
  const data = {
    series: [
      {
        name: 'Rawat Inap',
        data: [31, 40, 28, 51, 42, 109, 100, 109, 120, 99, 132, 101],
      },
      {
        name: 'Rawat Jalan',
        data: [11, 32, 45, 32, 34, 52, 41, 32, 39, 52, 31, 39],
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
  }

  return (
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
          <img src='/assets/images/profile.png' alt='' className='w-20 h-20 rounded-xl' />
          <div className='flex flex-col ml-4'>
            <span className='font-bold text-lg'>Esthera Jackson</span>
            <span className='text-sm'>Admin</span>
          </div>
        </div>
        <div className='flex justify-center items-center gap-1'>
          <ArrowLeftOnRectangleIcon className='h-6 w-6' />
          <span className='font-bold'>Keluar</span>
        </div>
      </div>
      <div className='shadow-soft bg-white p-4 m-4 rounded-xl'>
        <div>
          <h1 className='font-bold text-xl'>Pasien</h1>
          <div>
            <span className='text-success-500 font-bold'>(+5) Pasien </span>
            di bulan ini
          </div>
        </div>
        <Chart options={data.options} series={data.series} type='area' height='320' />
      </div>
      <div className='grid grid-cols-3 gap-4 m-4'>
        <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
          <div>
            <span className='font-bold text-disabled text-sm'>Pasien</span>
            <div className='flex gap-1'>
              <span className='text-lg font-bold'>3000</span>
              <span className='text-sm font-bold text-success-500'>+55</span>
            </div>
          </div>
          <div className='flex justify-center items-center bg-primary-200 p-4 rounded-xl'>
            <UserIcon className='h-6 w-6 text-primary-500' />
          </div>
        </div>
        <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
          <div>
            <span className='font-bold text-disabled text-sm'>Pasien</span>
            <div className='flex gap-1'>
              <span className='text-lg font-bold'>3000</span>
              <span className='text-sm font-bold text-success-500'>+55</span>
            </div>
          </div>
          <div className='flex justify-center items-center bg-primary-200 p-4 rounded-xl'>
            <UserIcon className='h-6 w-6 text-primary-500' />
          </div>
        </div>
        <div className='bg-white shadow-soft p-4 rounded-xl flex justify-between items-center'>
          <div>
            <span className='font-bold text-disabled text-sm'>Pasien</span>
            <div className='flex gap-1'>
              <span className='text-lg font-bold'>3000</span>
              <span className='text-sm font-bold text-success-500'>+55</span>
            </div>
          </div>
          <div className='flex justify-center items-center bg-primary-200 p-4 rounded-xl'>
            <UserIcon className='h-6 w-6 text-primary-500' />
          </div>
        </div>
      </div>
    </div>
  )
}
