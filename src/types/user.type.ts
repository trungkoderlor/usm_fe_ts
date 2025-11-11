export interface User {
  id: number;
  email: string;
  fullname: string;
  password?: string;
  address?: string;
  role: string;
  gender: string;
  status: string;
}
