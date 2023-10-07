import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { HomeIcon, BuildingOfficeIcon } from '@heroicons/react/24/solid';

type TypeNavigationItem = {
  icon?: any;
  title?: string;
  path?: string;
  info?: string;
};

export const NavigationItemList = (): TypeNavigationItem[] => [
  {
    icon: <HomeIcon className="flex w-[20px] h-[20px]" />,
    title: 'Dashboard',
    path: ROUTES.PAGE_DASHBOARD,
    info: 'Dashboard',
  },
  {
    icon: <BuildingOfficeIcon className="flex w-[20px] h-[20px]" />,
    title: 'Rawat Inap',
    path: ROUTES.PAGE_RAWAT_INAP,
    info: 'Rawat Inap',
  },
];

const NavigationItem = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      {NavigationItemList().map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.title && (
              <NavLink
                title={item.info}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-row items-center gap-3 justify-start rounded-lg bg-white shadow-md" w-full pl-3 h-14 hover:bg-gray-100 hover:text-gray-900 ${
                    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                  }`
                }
              >
                {item.icon}
                <span className="text-xs">{item.title}</span>
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default NavigationItem;
