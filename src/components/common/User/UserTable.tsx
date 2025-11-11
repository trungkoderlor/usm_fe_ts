import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { selectUserIds, fetchUsers, selectAllUsers } from '../../../stores/slices/user.slice';
import { selectAuth } from '../../../stores/slices/auth.slice';
import UserTableRow from './UserTableRow';
import UserTableHeader from './UserTableHeader';
import UserTableLoadingIndicator from '../Loading/UserTableLoadingIndicator';
import { ButtonCommon } from '../Button';
import EditUserModal from '../Modal/EditUserModal';

interface UserTableProps {}

type SortField = 'fullname' | 'address' | null;
type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  field: SortField;
  order: SortOrder;
}

// Main UserTable Component
export const UserTable: React.FC<UserTableProps> = ({}) => {
  (UserTable as any).whyDidYouRender = true;
  const userIds = useAppSelector(selectUserIds);
  const users = useAppSelector(selectAllUsers);
  const { user: currentUser } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userIds.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userIds.length]);

  // Sort state - use single object to avoid state sync issues
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    order: null,
  });

  const toggleSort = useCallback((field: 'fullname' | 'address') => {
    setSortState((prev) => {
      if (prev.field !== field) {
        // Switch to new field, start with 'asc'
        return { field, order: 'asc' };
      }

      // Same field, cycle through asc -> desc -> null
      if (prev.order === 'asc') {
        return { field, order: 'desc' };
      }
      if (prev.order === 'desc') {
        return { field: null, order: null };
      }
      return { field, order: 'asc' };
    });
  }, []);

  // Filter out current logged-in user
  const filteredUsers = useMemo(() => {
    if (!currentUser) return users;
    return users.filter((user) => user.id !== currentUser.id);
  }, [users, currentUser]);

  const sortedUserIds = useMemo(() => {
    if (!sortState.field || !sortState.order) {
      return filteredUsers.map((user) => user.id);
    }

    // Create a copy and sort
    const copy = [...filteredUsers];
    copy.sort((a, b) => {
      let valueA = '';
      let valueB = '';

      if (sortState.field === 'fullname') {
        valueA = (a.fullname || '').toLowerCase();
        valueB = (b.fullname || '').toLowerCase();
      } else if (sortState.field === 'address') {
        valueA = (a.address || '').toLowerCase();
        valueB = (b.address || '').toLowerCase();
      }

      if (valueA < valueB) return sortState.order === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortState.order === 'asc' ? 1 : -1;
      return 0;
    });

    return copy.map((user) => user.id);
  }, [filteredUsers, sortState.field, sortState.order]);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold mb-6'>User Management</h1>
        <ButtonCommon className='!h-10' onClick={() => setIsModalOpen(true)}>
          Add User
        </ButtonCommon>
      </div>

      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <UserTableLoadingIndicator />
            <table className='min-w-full divide-y divide-gray-200'>
              <UserTableHeader
                onSortName={() => toggleSort('fullname')}
                onSortAddress={() => toggleSort('address')}
                nameSortOrder={sortState.field === 'fullname' ? sortState.order : null}
                addressSortOrder={sortState.field === 'address' ? sortState.order : null}
              />
              <tbody className='bg-white divide-y divide-gray-200'>
                {sortedUserIds.length > 0 ? (
                  sortedUserIds.map((userId) => <UserTableRow key={userId} userId={userId} />)
                ) : (
                  <tr>
                    <td colSpan={8} className='px-6 py-4 text-center'>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditUserModal userId={null} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default React.memo(UserTable);
