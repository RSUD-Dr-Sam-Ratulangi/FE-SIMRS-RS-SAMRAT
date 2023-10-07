import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';

export const ROUTES = {
  HOME: '/',
};

export const routerList = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
];

export const router = createBrowserRouter(routerList);
