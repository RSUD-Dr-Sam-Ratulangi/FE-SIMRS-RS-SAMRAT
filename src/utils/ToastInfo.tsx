import { toast } from 'react-toastify'

export const editSuccess = () =>
  toast('Schedule berhasil di edit', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'green' },
  })

export const createSuccess = () =>
  toast('Schedule berhasil dibuat', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'green' },
  })

export const errorToast = () =>
  toast('Terjadi Kesalahan, Mohon Periksa Kembali', {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
    style: {
      fontSize: '20px', // Adjust the font size
      padding: '16px', // Add more padding
      minWidth: '300px', // Set a minimum width
    },
  })

export const createFailed = () =>
  toast('Eror, Schedule tidak berhasil dibuat', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
  })

export const locSuccess = () =>
  toast('Lokasi berhasil dibuat', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'green' },
  })

export const locFailed = () =>
  toast('Eror, lokasi tidak berhasil di buat', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
  })
