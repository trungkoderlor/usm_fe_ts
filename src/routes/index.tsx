import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from '../pages/HomePage';
import RootLayout from '../layouts/RootLayout';
const LoginPage = lazy(() => import('../pages/LoginPage'));
const ListUser = lazy(() => import('../pages/ListUser'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <ListUser />,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

export default router;
