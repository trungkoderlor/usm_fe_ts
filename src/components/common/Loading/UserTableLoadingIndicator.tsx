import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectUserLoading } from '../../../stores/slices/user.slice';

export const UserTableLoadingIndicator: React.FC = () => {
  const isLoading = useAppSelector(selectUserLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className='absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
    </div>
  );
};

export default React.memo(UserTableLoadingIndicator);
