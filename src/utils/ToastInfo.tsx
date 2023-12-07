import { toast } from 'react-toastify'

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

export const errorSearchToast = () =>
  toast('Data Tidak Ditemukan', {
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
      fontWeight: 'bold',
    },
  })

export const errorCopyResep = () =>
  toast('Gagal Mengambil Obat, Poli berbeda atau tidak ada obat.', {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
    style: {
      fontSize: '20px', // Adjust the font size
      padding: '16px', // Add more padding
      minWidth: '300px', // Set a minimum width
      fontWeight: 'bold',
    },
  })

export const errorPostSoap = () =>
  toast('Gagal mengirim Rencana Kontrol, Rencana Kontrol Sudah ada atau ada masalah lainnya.', {
    position: 'top-right',
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
    style: {
      fontSize: '20px', // Adjust the font size
      padding: '16px', // Add more padding
      minWidth: '300px', // Set a minimum width
      fontWeight: 'bold',
    },
  })

export const spesificError = ({ errMessage }) =>
  toast.error(errMessage, {
    position: 'top-right',
    closeButton: false,
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'red' },
    style: {
      textAlign: 'center',
      color: 'black',
      fontSize: '18px', // Adjust the font size
      padding: '16px', // Add more padding
      minWidth: '300px', // Set a minimum width
      fontWeight: 'bold',
      borderRadius: '10px', // Add border radius for rounded corners
      background: '#FFFFFF', // Set the background color,
    },
  })
