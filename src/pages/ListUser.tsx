import React from 'react';
import UserTable from '../components/common/User/UserTable';

const ListUser: React.FC = () => {


  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-6'>User Management</h1>
      <UserTable />
    </div>
  );
};

export default ListUser;
