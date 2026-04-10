export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MessageResponse {
  message: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

