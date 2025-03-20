export type LoginType = {
  login: string;
  password: string;
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;

  setUser: (user: User | null) => void;
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  createAt: Date
  updateAt: Date
}