import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserById, updateUser, selectUserLoading } from '../../../stores/slices/user.slice';
import { User } from '../../../types/user.type';
import { InputCommon } from '../Input';
import { ButtonCommon } from '../Button';

interface EditUserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return userId ? selectUserById(state, userId) : null;
  });
  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        gender: user.gender,
        status: user.status,
      });
    }
  }, [user]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && formData) {
      dispatch(updateUser({ ...user, ...formData }));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div ref={modalRef} className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Chỉnh sửa thông tin người dùng</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <InputCommon
            label='Họ tên'
            name='fullname'
            value={formData.fullname || ''}
            onChange={handleChange}
            className='mb-4'
          />

          <InputCommon
            label='Email'
            name='email'
            type='email'
            value={formData.email || ''}
            onChange={handleChange}
            disabled
            className='mb-4'
          />

          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Vai trò</label>
            <select
              name='role'
              value={formData.role || ''}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Giới tính</label>
            <select
              name='gender'
              value={formData.gender || ''}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='male'>Nam</option>
              <option value='female'>Nữ</option>
              <option value='other'>Khác</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Trạng thái</label>
            <select
              name='status'
              value={formData.status || ''}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='active'>Hoạt động</option>
              <option value='inactive'>Không hoạt động</option>
            </select>
          </div>

          <div className='flex justify-end space-x-3 mt-6'>
            <ButtonCommon onClick={onClose} color='secondary' type='button'>
              Hủy
            </ButtonCommon>
            <ButtonCommon type='submit' color='primary'>
              Lưu thay đổi
            </ButtonCommon>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
