import React, { useState } from 'react'
import HeaderRanap from '../../../Navbar/HeaderDetailRanap'
import RanapLabor from './Laboratorium/RanapLabor'
import RanapRadiologi from './Radiologi/RanapRadiologi'

const PageRanapPenunjang = () => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div>
      <HeaderRanap />
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
        {activeTab === 1 && <RanapLabor />}
        {activeTab === 2 && <RanapRadiologi />}
      </div>
    </div>
  )
}

export default PageRanapPenunjang
