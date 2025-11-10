import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './Navbar/index';
import React from 'react';

const RootLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow container mx-auto p-4'>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default RootLayout;
