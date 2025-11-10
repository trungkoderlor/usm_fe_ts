import axiosInstance from './axios.config';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  
 
};