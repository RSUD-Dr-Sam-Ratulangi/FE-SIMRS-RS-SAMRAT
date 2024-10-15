import HeaderIgd from '../../../Navbar/HeaderDetailIGD'
import AwalLayananObat from './component/AwalLayananObat'
import RincianTindakanObat from './component/RincianTindakanObat'

const PageIgdLayananObat = () => {
  return (
    <>
      <HeaderIgd />
      <div className='p-1'>
        <AwalLayananObat />
        {/* Batas */}
        <RincianTindakanObat />
        {/* batas */}
      </div>
    </>
  )
}

export default PageIgdLayananObat
