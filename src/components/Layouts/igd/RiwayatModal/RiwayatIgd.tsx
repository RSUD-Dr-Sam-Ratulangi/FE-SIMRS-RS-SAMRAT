import React, { forwardRef, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions } from 'reactjs-popup/dist/types'
import RiwayatTriaseContent from './Riwayat/RiwayatTriase'
import RiwayatAssesmenAwal from './Riwayat/RiwayatAssesmenAwal'
import RiwayatAssesmenDokter from './Riwayat/RiwayatAssesmenDokter'
import RiwayatCppt from './Riwayat/RiwayatCppt'
import RiwayatLayananObat from './Riwayat/RiwayatLayananObat'
import RiwayatTindakan from './Riwayat/RiwayatTindakan'
import RiwayatPenunjang from './Riwayat/RiwayatPenunjang'

interface RiwayatModalIgd {
  isOpen: boolean
  onClose: () => void
  activeTab: number
  noRawat: string
}

const RiwayatModalIgd = forwardRef<PopupActions, RiwayatModalIgd>(
  ({ isOpen, onClose, activeTab, noRawat }, ref) => {
    const [activeTabs, setActiveTabs] = useState<number>(activeTab)

    // Sync local state with prop changes
    useEffect(() => {
      setActiveTabs(activeTab)
    }, [activeTab])

    return (
      <Popup
        open={isOpen}
        onClose={onClose}
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
          height: 'full',
          backgroundColor: 'whitesmoke',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div>
          <div className='flex justify-between items-center'>
            <p>Riwayat</p>
            <button onClick={onClose} className='btn bg-primary border'>
              Close
            </button>
          </div>
          <div className='grid items-center bg-white border rounded-lg mt-3 w-[800px] h-14'>
            <div role='tablist' className='tabs w-[800px]'>
              {[1, 2, 3, 4, 5, 6, 7].map((tab) => (
                <a
                  key={tab}
                  role='tab'
                  className={`tab ${activeTabs === tab ? 'tab-active text-primary font-bold' : ''}`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab === 1 && 'Triase'}
                  {tab === 2 && 'Assesmen Awal'}
                  {tab === 3 && 'Assesmen Dokter'}
                  {tab === 4 && 'CPPT'}
                  {tab === 5 && 'Penunjang'}
                  {tab === 6 && 'Layanan & Obat'}
                  {tab === 7 && 'Tindakan'}
                </a>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            {activeTabs === 1 && <RiwayatTriaseContent />}
            {activeTabs === 2 && <RiwayatAssesmenAwal />}
            {activeTabs === 3 && <RiwayatAssesmenDokter modalOpen={isOpen} />}
            {activeTabs === 4 && <RiwayatCppt noRawat={noRawat} />}
            {activeTabs === 5 && <RiwayatPenunjang />}
            {activeTabs === 6 && <RiwayatLayananObat />}
            {activeTabs === 7 && <RiwayatTindakan />}
          </div>
        </div>
      </Popup>
    )
  },
)

RiwayatModalIgd.displayName = 'ModalRiwayatTriase'

export default RiwayatModalIgd
