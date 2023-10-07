import React, { useState } from 'react';
import logo from '../../assets/LOGORS2.png';

type TypeNavigation = {
  child: any;
};

const Navigation = (props: TypeNavigation) => {
  return (
    <div className="flex flex-col items-stretch justify-start h-full overflow-hidden">
      <div className="relative flex flex-row items-start justify-start h-full overflow-hidden">
        <div className="flex flex-col justify-start items-stretch h-screen overflow-hidden p-6 w-[15%] shadow-xl fixed left-0">
          <img src={logo} alt="logo" className="mb-5" />
          <div className="flex flex-col gap-3 flex-2 text-slate-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
