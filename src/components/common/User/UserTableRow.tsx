import React, { useCallback, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { makeSelectUserById, deleteUser } from '../../../stores/slices/user.slice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../../types/user.type';
import { ButtonCommon } from '../Button';
import EditUserModal from '../Modal/EditUserModal';
// UserTableRow Component
interface UserTableRowProps {
  userId: number;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectUser = useMemo(() => makeSelectUserById(), []);
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => selectUser(state, userId));
  const onEdit = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDelete = useCallback(
    (userId: number) => {
      dispatch(deleteUser(userId));
    },
    [dispatch],
  );
  const onView = useCallback((userId: number) => {
    console.log('View user with ID:', userId);
  }, []);
  return (
    <>
      <tr className='hover:bg-gray-50'>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.id}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>{user.fullname}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>{user.email}</div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}
          >
            {user.role}
          </span>
        </td>

        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.gender}</td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user.address || ''}</td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {user.status}
          </span>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
          <div className='flex space-x-2'>
            {/* <ButtonCommon size='sm' color='primary' onClick={() => onView(userId)} icon={<EyeOutlined />}>
              View
            </ButtonCommon> */}

            <ButtonCommon size='sm' color='secondary' onClick={() => onEdit()} icon={<EditOutlined />}>
              Edit
            </ButtonCommon>

            <ButtonCommon size='sm' color='danger' onClick={() => onDelete(userId)} icon={<DeleteOutlined />}>
              Delete
            </ButtonCommon>
          </div>
        </td>
      </tr>
      <EditUserModal userId={userId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
export default React.memo(UserTableRow);
