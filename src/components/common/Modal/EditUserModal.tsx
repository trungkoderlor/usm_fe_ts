import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUserById, updateUser, createUser } from '../../../stores/slices/user.slice';
import { User } from '../../../types/user.type';
import { ButtonCommon } from '../Button';

interface EditUserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ userId, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Partial<User>>({
    fullname: '',
    email: '',
    password: '',
    role: 'user',
    gender: 'male',
    status: 'active',
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return userId ? selectUserById(state, userId) : null;
  });

  const isEditMode = userId !== null;

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
    } else {
      // Reset form for create mode
      setFormData({
        fullname: '',
        email: '',
        password: '',
        role: 'user',
        gender: 'male',
        status: 'active',
      });
    }
  }, [user, isOpen]);

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

    if (isEditMode && user) {
      // Update existing user
      dispatch(updateUser({ ...user, ...formData }));
    } else {
      // Create new user
      dispatch(createUser(formData));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div ref={modalRef} className='bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>{isEditMode ? 'Chỉnh sửa thông tin người dùng' : 'Thêm người dùng mới'}</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700 text-2xl'>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Họ tên</label>
            <input
              type='text'
              name='fullname'
              value={formData.fullname || ''}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email || ''}
              onChange={handleChange}
              disabled={isEditMode}
              required
              className={
                'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
                (isEditMode ? 'bg-gray-100 cursor-not-allowed' : '')
              }
            />
          </div>

          {!isEditMode && (
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Mật khẩu</label>
              <input
                type='password'
                name='password'
                value={formData.password || ''}
                onChange={handleChange}
                required
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          )}

          <div className='mb-4'>
            <label className='block text-gray-700 font-semibold mb-2'>Vai trò</label>
            <select
              name='role'
              value={formData.role || 'user'}
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
              value={formData.gender || 'male'}
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
              value={formData.status || 'active'}
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
              {isEditMode ? 'Lưu thay đổi' : 'Tạo mới'}
            </ButtonCommon>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
