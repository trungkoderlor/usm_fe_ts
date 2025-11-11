import axios from 'axios';
import { getToken } from './token.service';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor để thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Xử lý logout nếu token hết hạn
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;