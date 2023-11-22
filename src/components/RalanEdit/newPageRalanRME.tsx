import RalanEditHeader from './RalanEditHeader'

import NewRalanRME from './newRalanRME'
import RalanSoapPemeriksaan from './newSoapComponent'

export default function NewPageRalanRME() {
  return (
    <div className='flex-row h-auto w-full min-w-fit p-4'>
      <RalanEditHeader />
      <div className='flex pt-[55px] '>
        <div>
          <p className='className=text-[#121713] text-2xl font-sans font-bold mb-8'>
            Elektronik Rekam Medis
          </p>
          <NewRalanRME />
        </div>
        <div className='ml-4'>
          <p className='className=text-[#121713] text-2xl font-sans font-bold mb-8'>
            SOAP & Pemeriksaan
          </p>
          <RalanSoapPemeriksaan />
        </div>
      </div>
    </div>
  )
}
