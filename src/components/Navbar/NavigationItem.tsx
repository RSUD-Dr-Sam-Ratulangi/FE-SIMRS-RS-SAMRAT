import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";
import {
  HomeIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

type TypeNavigationItem = {
  icon?: any;
  title?: string | JSX.Element;
  path?: string;
  info?: string;
};

export const NavigationItemList = (): TypeNavigationItem[] => [
  {
    icon: (
      <HomeIcon className="flex w-[30px] h-[18px] bg-none text-green-600 font-bold rounded-full" />
    ),
    title: <p className="font-bold text-black">Dashboard</p>,
    path: ROUTES.PAGE_DASHBOARD,
    info: "Dashboard",
  },
  {
    icon: (
      <BuildingOfficeIcon className="flex w-[30px] h-[18px] bg-none text-green-600 font-bold rounded-full" />
    ),
    title: <p className="font-bold text-black">Rawat Inap</p>,
    path: ROUTES.PAGE_RAWAT_INAP,
    info: "Rawat Inap",
  },
  {
    icon: (
      <HomeModernIcon className="flex w-[30px] h-[18px] bg-none text-green-600 font-bold rounded-full" />
    ),
    title: <p className="font-bold text-black">Rawat Jalan</p>,
    path: ROUTES.PAGE_RAWAT_JALAN,
    info: "Rawat Jalan",
  },
  {
    icon: (
      <UsersIcon className="flex w-[30px] h-[18px] bg-none text-green-600 font-bold rounded-full" />
    ),
    title: <p className="font-bold text-black">Pasien</p>,
    path: ROUTES.PAGE_PASIEN,
    info: "Pasien",
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
                  `flex flex-row items-center gap-2 justify-start rounded-lg  w-full pl-3 h-14 hover:bg-gray-200 hover:text-gray-900 ${
                    isActive
                      ? "bg-gray-50 shadow-xl text-gray-900"
                      : "text-gray-500"
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
