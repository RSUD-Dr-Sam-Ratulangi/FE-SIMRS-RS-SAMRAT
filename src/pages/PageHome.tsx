import React from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navbar/Navigation';

const PageHome = () => {
  return (
    <>
      <Navigation child={<Outlet />} />
    </>
  );
};

export default PageHome;
