import RanapSoapPemeriksaan from '../../components/RanapSoapPemeriksaan/RanapSoapPemeriksaan'
import RmeRanap from '../../components/Rme/RmeRanap'
import SecNavbar from '../../components/SecNavbar/SecNavbar'

export default function PageRanapRME() {
  return (
    <div className='flex-row h-auto w-full min-w-fit p-4'>
      <SecNavbar />
      <div className='flex pt-[55px] '>
        <div>
          <p className='className=text-[#121713] text-2xl font-sans font-bold mb-8'>Elektronik Rekam Medis</p>
          <RmeRanap />
        </div>
        <div className='ml-4'>
          <p className='className=text-[#121713] text-2xl font-sans font-bold mb-8'>SOAP & Pemeriksaan</p>
          <RanapSoapPemeriksaan />
        </div>
      </div>
    </div>
  )
}
