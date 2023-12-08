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
      fontSize: '20px',
      padding: '16px',
      minWidth: '300px',
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
      fontSize: '20px',
      padding: '16px',
      minWidth: '300px',
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
      fontSize: '20px',
      padding: '16px',
      minWidth: '300px',
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
      fontSize: '20px',
      padding: '16px',
      minWidth: '300px',
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
      fontSize: '18px',
      padding: '16px',
      minWidth: '300px',
      fontWeight: 'bold',
      borderRadius: '10px',
      background: '#FFFFFF',
    },
  })

export const spesificSuccess = ({ doneMessage }) =>
  toast.info(doneMessage, {
    position: 'top-right',
    closeButton: false,
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    theme: 'light',
    progressStyle: { background: 'green' },
    style: {
      textAlign: 'center',
      color: 'black',
      fontSize: '18px',
      padding: '16px',
      minWidth: '300px',
      fontWeight: 'bold',
      borderRadius: '10px',
      background: '#FFFFFF',
    },
  })
