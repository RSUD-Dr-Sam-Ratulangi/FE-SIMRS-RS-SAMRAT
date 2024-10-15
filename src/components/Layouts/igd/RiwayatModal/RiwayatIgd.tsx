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
    const [activeTabs, setActiveTabs] = useState<number>()

    useEffect(() => {
      activeTabs
      noRawat
    }, [activeTabs, noRawat])

    console.log('igd no rawat', noRawat)

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
            <p>Riwayat Triase</p>
            <button onClick={onClose} className='btn bg-primary border'>
              Close
            </button>
          </div>
          <div className='grid items-center bg-white border rounded-lg mt-3 w-[800px] h-14'>
            <div role='tablist' className='tabs w-[800px]'>
              <a
                role='tab'
                className={`tab ${activeTab === 1 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(1)}
              >
                Triase
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 2 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(2)}
              >
                Assesmen Awal
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 3 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(3)}
              >
                Assesmen Dokter
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 4 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(4)}
              >
                CPPT
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 5 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(5)}
              >
                Penunjang
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 6 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(6)}
              >
                Layanan & Obat
              </a>
              <a
                role='tab'
                className={`tab ${activeTab === 7 ? 'tab-active text-primary font-bold' : ''}`}
                onClick={() => setActiveTabs(7)}
              >
                Tindakan
              </a>
            </div>
          </div>
          <div className='mt-4'>
            {activeTab === 1 && <RiwayatTriaseContent />}
            {activeTab === 2 && <RiwayatAssesmenAwal />}
            {activeTab === 3 && <RiwayatAssesmenDokter />}
            {activeTab === 4 && <RiwayatCppt noRawat={noRawat} />}
            {activeTab === 5 && <RiwayatPenunjang />}
            {activeTab === 6 && <RiwayatLayananObat />}
            {activeTab === 7 && <RiwayatTindakan />}
          </div>
        </div>
      </Popup>
    )
  },
)

RiwayatModalIgd.displayName = 'ModalRiwayatTriase'

export default RiwayatModalIgd
