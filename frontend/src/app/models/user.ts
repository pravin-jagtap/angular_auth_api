export interface User {
  id: number;
  fullName: string;
  username: string;
  mobileNumber: string | null;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface MessageResponse {
  message: string;
}

export interface UsernameAvailabilityResponse {
  available: boolean;
  message: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
