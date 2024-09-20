import { forwardRef } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ModalPulangRanapProps {
  onClose: () => void
}

const ModalPulangRanap = forwardRef<PopupActions, ModalPulangRanapProps>((props, ref) => {
  return (
    <Popup
      ref={ref}
      modal
      closeOnDocumentClick={true}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
      contentStyle={{
        borderRadius: '12px',
        padding: '20px',
        width: '80rem',
        // maxHeight: 'full',
        height: 'full',
        backgroundColor: 'whitesmoke',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='grid gap-1'>
        <div className='flex justify-between items-center'>
          <p>Input Pulang Pasien ranap</p>
          <button className='btn flex justify-end btn-ghost'>
            <XMarkIcon width={25} height={25} />
            Close
          </button>
        </div>
        <div className='grid gap-3 p-2'>
          <div className='flex gap-3 items-center '>
            <p>Detail Pasien : </p>
            <input className='input w-80 border border-slate-500' placeholder='No Rawat' />
            <input className='input w-80 border border-slate-500' placeholder='No Rm' />
            <input className='input w-80 border border-slate-500' placeholder='Nm Pasien' />
          </div>
          <div className='flex gap-3 items-center '>
            <p>Detail Kamar : </p>
            <input className='input w-56 border border-slate-500' placeholder='Kd_Kamar' />
            <input className='input w-56 border border-slate-500' placeholder='kd_bangsal' />
            <input className='input w-56 border border-slate-500' placeholder='nm_bangsal' />
            <input
              className='input w-56 border border-slate-500 ml-10'
              placeholder='Status Kamar'
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex'>
              <label className='label'>Tanggal : </label>
              <input
                type='date'
                className='input border border-disabled disabled:bg-slate-200 disabled:text-black'
              />
              <label className='label'>Time: </label>
              <input
                className='input border border-disabled disabled:bg-slate-200 disabled:text-black'
                type='time'
                value='13:30'
              />
            </div>
            <div className='flex items-center'>
              <label className='label'>Diagnosa Masuk : </label>
              <input className='input w-52 border border-slate-500' placeholder='nm_bangsal' />
              <label className='label'>Diagnosa Keluar : </label>
              <input className='input w-52 border border-slate-500' placeholder='nm_bangsal' />
            </div>
          </div>
          <div className='flex gap-3 items-center '>
            <p>Biaya : </p>
            <div className='flex gap-1 items-center'>
              <input className='input w-80 border border-slate-500' placeholder='0' />
              X
              <input className='input w-80 border border-slate-500' placeholder='0' />
            </div>
            =
            <input className='input w-80 border border-slate-500' placeholder='0' />
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <label className='label'>Status Pulang/Keluar</label>
              <select className='select select-bordered w-full max-w-xs'>
                <option disabled selected>
                  Who shot first?
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
            <div>
              <button className='btn'>Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
})

ModalPulangRanap.displayName = 'ModalPulangRanap'

export default ModalPulangRanap
