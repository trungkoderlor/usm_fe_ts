// import { useCallback } from 'react';

import HomeItem from '../components/common/Home/HomeItem';
import { useAuth } from '../hooks/useAuth';
const HomePage = () => {
  console.log('HomePage');
  const { isAuthenticated } = useAuth();
  return (
    <div className='container mx-auto p-4 flex flex-col mt-8 gap-12'>
      <div className='container mx-auto flex flex-col justify-center items-center '>
        <h2 className='text-4xl font-bold mb-4'>Welcome to the User Management System</h2>
        <p className='text-lg mb-4 font-thin'>
          This is a simple user management system built with React and TypeScript.
        </p>
      </div>
      <div className='container mx-auto flex flex-row gap-4 justify-center items-center'>
        {!isAuthenticated ? (
          <>
            <HomeItem
              title='New User?'
              shortDescription='Register to create an account and access our system.'
              ButtonText='Register'
              url='/auth/register'
            />
            <HomeItem
              title='Already a User?'
              shortDescription='Login to access your account and manage your profile.'
              ButtonText='Login'
              ButtonColor='success'
              url='/auth/login'
            />
          </>
        ) : (
          <>
            <HomeItem
              title='User Management'
              shortDescription='Manage your profile and view user details.'
              ButtonText='View Users'
              ButtonColor='success'
              url='/users'
            />
            <HomeItem
              title='Profile'
              shortDescription='View and edit your profile information.'
              ButtonText='View Profile'
              url='/profile'
            />
          </>
        )}
      </div>
      <div className='container mt-8 mx-auto min-h-[200  px] border border-grey-500 rounded-lg  shadow-md p-4 bg-gray-50'>
        <h3 className='text-2xl font-medium mb-4'>About This System</h3>
        <p className='text-base mb-4'>
          This User Management System allows administrators to manage user accounts efficiently. Users can register,
          login, and manage their own profiles. Administrators have additional capabilities to manage all users in the
          system.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
