export interface User {
  id: number;
  email: string;
  mobile: string | null;
  role: 'USER' | 'ADMIN'; 
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface AuthState {
  currentUser: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationData {
  name: string;      
  email: string;
  password: string;
}

export interface VerificationData {
  name: string;      
  email: string;
  password: string;
  otp: string;       
}

export interface ResendOtpData {
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse extends ApiResponse {
  token: string;
  user: User;
}