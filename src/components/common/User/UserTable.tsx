import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { selectUserIds, fetchUsers } from '../../../stores/slices/user.slice';
import UserTableRow from './UserTableRow';
import UserTableHeader from './UserTableHeader';
import UserTableLoadingIndicator from '../Loading/UserTableLoadingIndicator';
interface UserTableProps {}

// Main UserTable Component
export const UserTable: React.FC<UserTableProps> = ({}) => {
  (UserTable as any).whyDidYouRender = true;
  const userIds = useAppSelector(selectUserIds);
  const userIdsMemo = useMemo(() => userIds, [userIds]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userIds.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userIds.length]);
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <UserTableLoadingIndicator />
            <>
              <table className='min-w-full divide-y divide-gray-200'>
                <UserTableHeader />
                <tbody className='bg-white divide-y divide-gray-200'>
                  {userIdsMemo.length > 0 ? (
                    userIdsMemo.map((userId) => <UserTableRow key={userId} userId={userId} />)
                  ) : (
                    <tr>
                      <td colSpan={7} className='px-6 py-4 text-center'>
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserTable);
