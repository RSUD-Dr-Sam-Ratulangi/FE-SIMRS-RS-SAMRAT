import RmeRanap from '../../components/Rme/RmeRanap'
import SecNavbar from '../../components/SecNavbar/SecNavbar'

export default function PageRanapRME() {
  return (
    <div className='flex-row h-auto bg-lightgray p-4 '>
      <SecNavbar />
      <div>
        <RmeRanap />
      </div>
    </div>
  )
}
