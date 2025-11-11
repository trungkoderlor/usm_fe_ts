import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonCommon } from '../components/common/Button';
import { InputCommon } from '../components/common/Input';
import { useAppDispatch } from '../hooks';
import { register } from '../stores/slices/auth.slice';
import { useAuth } from '../hooks/useAuth';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !fullname) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      setLoading(true);
      await dispatch(
        register({
          email,
          password,
          fullname,
        }),
      ).unwrap();

      // Redirect to home or dashboard after successful registration
      navigate('/');
    } catch (err: any) {
      setError(err || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-92px)]'>
      <div className='w-1/3 p-4 bg-white border border-gray-300 rounded-lg shadow-md'>
        <h2 className='text-3xl text-center font-semibold mb-4'>Đăng ký</h2>
        <form className='w-full mx-auto border border-gray-300 rounded-lg p-4 bg-gray-50' onSubmit={handleSubmit}>
          {error && <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>{error}</div>}

          <InputCommon
            type='text'
            value={fullname}
            label='Họ tên'
            placeholder='Nhập họ tên của bạn'
            onChange={handleFullnameChange}
            required
            disabled={loading}
          />

          <InputCommon
            type='email'
            value={email}
            label='Email'
            placeholder='Nhập email của bạn'
            onChange={handleEmailChange}
            required
            disabled={loading}
          />

          <InputCommon
            type='password'
            value={password}
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
            onChange={handlePasswordChange}
            required
            disabled={loading}
          />

          <div className='mb-4'>
            <ButtonCommon color='primary' className='w-full' type='submit' disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </ButtonCommon>
          </div>
        </form>

        <div className='text-center mt-4 flex items-center justify-center p-4'>
          <span className='text-gray-600'>Đã có tài khoản?</span>
          <Link to='/auth/login' className='text-blue-500 hover:text-blue-700 underline ml-1'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
