// ModalLabor.jsx
import React, { forwardRef } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import 'react-medium-image-zoom/dist/styles.css'

interface ValidationModalProps {
  onYes: () => void
  onNo: () => void
  buttonOne: string
  buttonTwo: string
}

const ValidationModal = forwardRef<PopupActions, ValidationModalProps>((props, ref) => {
  const { onYes, onNo, buttonOne, buttonTwo } = props

  return (
    <div>
      <Popup
        ref={ref}
        modal
        closeOnDocumentClick={false}
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
          width: '20rem',
          // maxHeight: 'full',
          height: 'full',
          backgroundColor: 'whitesmoke',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className='grid'>
          <div className='flex gap-2 items-center justify-between p-2'>
            <p className='text-xs text-center'>MOHON PERIKSA KEMBALI</p>
            <button
              onClick={() => (ref as React.RefObject<PopupActions>)?.current?.close()}
              className='btn'
            >
              Close
            </button>
          </div>
          <div className='flex gap-2 mt-2'>
            <button className='btn' onClick={onYes}>
              {buttonOne}
            </button>
            <button className='btn' onClick={onNo}>
              {buttonTwo}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  )
})

// Set displayName for the component
ValidationModal.displayName = 'Validation Modal'

export default ValidationModal
