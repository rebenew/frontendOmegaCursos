export interface User {
  id: number;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'student' | 'mentor';
  email: string;
  password?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: 'student' | 'mentor';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 