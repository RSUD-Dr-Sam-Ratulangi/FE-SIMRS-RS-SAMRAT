import RanapRme from '../../components/RanapRme/RanapRme'
import SecNavbar from '../../components/SecNavbar/SecNavbar'

export default function PageRanapRME() {
  return (
    <div className='flex-row h-auto bg-lightgray p-4 '>
      <SecNavbar />
      <div>
        <RanapRme />
      </div>
    </div>
  )
}
