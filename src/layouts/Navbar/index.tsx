import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

interface NavBarProps {}
const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isAuthenticated, loading, getCurrentUser, user, logoutUser } = useAuth();
  useEffect(() => {
    if (isAuthenticated && !user) {
      getCurrentUser();
    }
  }, [isAuthenticated, user, getCurrentUser]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/auth/login');
    }
    if (isAuthenticated && user) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <nav className='bg-black text-white p-4 '>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='container flex justify-start items-center'>
          <Link to='/' className='text-xl font-medium mr-4 '>
            User Management System
          </Link>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'text-lg font-bold ' : 'text-lg font-normal text-gray-400')}
          >
            Home
          </NavLink>
        </div>
        {!isAuthenticated ? (
          <div className='container flex justify-end items-center'>
            <NavLink
              to='/auth/login'
              className={({ isActive }) =>
                isActive ? 'text-lg font-bold mr-4' : 'text-lg font-normal mr-4 text-gray-400'
              }
            >
              Login
            </NavLink>
            <NavLink
              to='/auth/register'
              className={({ isActive }) => (isActive ? 'text-lg font-bold ' : 'text-lg font-normal text-gray-400')}
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className='container flex justify-end items-center'>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <>
                {user && (
                  <>
                    <span className='text-lg font-medium mr-4'>Welcome, {user.fullname || user.email}</span>
                    <button
                      onClick={() => logoutUser()}
                      className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md'
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
