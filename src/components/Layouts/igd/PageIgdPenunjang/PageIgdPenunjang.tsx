import { useState } from 'react'
import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
import IgdLabor from './Laboratorium/IgdLabor'
import IgdRadiologi from './Radiologi/IgdRadiologi'

const PageIgdPenunjang = () => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div>
      <HeaderIgd />
      <div role='tablist' className='tabs tabs-bordered mt-5'>
        <a
          role='tab'
          className={`tab ${activeTab === 1 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Laboratorium
        </a>
        <a
          role='tab'
          className={`tab ${activeTab === 2 ? 'tab-active' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Radiologi
        </a>
      </div>
      <div>
        {activeTab === 1 && <IgdLabor />}
        {activeTab === 2 && <IgdRadiologi />}
      </div>
    </div>
  )
}

export default PageIgdPenunjang
