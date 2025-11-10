import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ButtonCommon } from '../components/common/Button';
import { InputCommon } from '../components/common/Input';
import { User } from '../types/user.type';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updated profile data:', formData);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-92px)]'>
        <p className='text-red-500'>User not found. Please login first.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
          {/* Header */}
          <div className='bg-gray-800 text-white p-6'>
            <div className='flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>User Profile</h1>
              <ButtonCommon color='primary' onClick={toggleEdit} icon={<EditOutlined />}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </ButtonCommon>
            </div>
          </div>

          <div className='p-6'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex-1'>
                  <div className='mb-6'>
                    <InputCommon
                      label='Full Name'
                      name='fullname'
                      value={formData.fullname || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className='mb-6'>
                    <InputCommon
                      label='Email Address'
                      name='email'
                      value={formData.email || ''}
                      disabled={true} // Email can't be edited
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block text-gray-700 font-semibold mb-2'>Role</label>
                    <div className='px-3 py-2 border border-gray-300 rounded-md bg-gray-50'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='flex-1'>
                  <div className='mb-6'>
                    <InputCommon
                      label='Gender'
                      name='gender'
                      value={formData.gender || ''}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block text-gray-700 font-semibold mb-2'>Status</label>
                    <div className='px-3 py-2 border border-gray-300 rounded-md bg-gray-50'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <label className='block text-gray-700 font-semibold mb-2'>Account ID</label>
                    <div className='px-3 py-2 border border-gray-300 rounded-md bg-gray-50'>{user.id}</div>
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className='mt-6 text-right'>
                  <ButtonCommon type='submit' color='primary' icon={<SaveOutlined />}>
                    Save Changes
                  </ButtonCommon>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
