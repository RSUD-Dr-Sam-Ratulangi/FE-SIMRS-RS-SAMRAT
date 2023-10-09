import React, { useState } from 'react'
import logo from '../../Assets/LOGORS2.png'
import NavigationItem from './NavigationItem'

type TypeNavigation = {
  child: any
}

const Navigation = (props: TypeNavigation) => {
  return (
    <div className='flex flex-col items-stretch justify-start h-full overflow-hidden'>
      <div className='relative flex flex-row items-start justify-start h-full overflow-hidden'>
        <div className='flex flex-col justify-start items-stretch h-screen overflow-hidden p-6 w-[15%] shadow-xl fixed left-0 bg-[#F3F3F3]'>
          <div className='flex flex-row justify-center items-center h-[10%] gap-2'>
            <img src={logo} alt='logo' className='flex w-[40px] h-[48px]' />
            <p className='text text-center text-3xl font-bold'>SIMRS</p>
          </div>
          <hr className='border border-black-100 w-full' />
          <div className='flex flex-col justify-start items-stretch h-56 gap-2 pt-2'>
            <NavigationItem />
          </div>
        </div>
        <div className={`h-full overflow-auto w-[85%] fixed right-0`}>
          <div className='p-3'>{props.child}</div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
