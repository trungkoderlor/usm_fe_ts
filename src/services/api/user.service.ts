import axiosInstance from './axios.config';
import { User } from '../../types/user.type';

export const userService = {
  getAllUsers: async () => {
    const response = await axiosInstance.get<User[]>('/users');
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await axiosInstance.get<User>(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: number, userData: Partial<User>) => {
    const response = await axiosInstance.patch<User>(`/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: number) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  }

};