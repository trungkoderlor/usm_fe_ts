import { useAppDispatch, useAppSelector } from './index';
import { login, logout, fetchCurrentUser, selectAuth } from '../stores/slices/auth.slice';

interface UserLogin {
  email: string;
  password: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const loginUser = ({ email, password }: UserLogin) => {
    return dispatch(login({ email, password }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const getCurrentUser = () => {
    return dispatch(fetchCurrentUser());
  };

  return {
    ...auth,
    loginUser,
    logoutUser,
    getCurrentUser
  };
};