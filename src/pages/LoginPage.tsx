import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonCommon } from '../components/common/Button';
import { InputCommon } from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await loginUser({ email: email, password: password });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-92px)]'>
      <div className='w-1/3 p-4 bg-white border border-gray-300 rounded-lg shadow-md '>
        <h2 className='text-3xl text-center font-semibold mb-4'>Login</h2>
        <form className='w-full mx-auto border border-gray-300 rounded-lg p-4 bg-gray-50' onSubmit={handleSubmit}>
          <InputCommon
            type='email'
            value={email}
            label='Email'
            placeholder='Enter your email'
            onChange={handleEmailChange}
          />
          <InputCommon
            type='password'
            value={password}
            label='Password'
            placeholder='Enter your Password'
            onChange={handlePasswordChange}
          />
          <div className='mb-4'>
            <ButtonCommon color='primary' className='w-full' type='submit'>
              Login
            </ButtonCommon>
          </div>
        </form>
        <div className='text-center mt-4 flex items-center justify-center p-4'>
          <span className='text-gray-600'>Don't have an account?</span>
          <Link to='/register' className='text-blue-500 hover:text-blue-700 underline ml-1'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
