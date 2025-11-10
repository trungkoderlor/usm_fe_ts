import { User } from "./user.type";

export interface NormalizedUsers {
  byId: Record<number, User>;
  allIds: number[];
}

export interface UserState {
  entities: NormalizedUsers;
  loading: boolean;
  error: string | null;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}