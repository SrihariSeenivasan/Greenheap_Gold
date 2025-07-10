import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { 
  LoginCredentials, 
  RegistrationData, 
  VerificationData, 
  LoginResponse,
  ResendOtpData,
  ApiResponse 
} from '../../types/type';

const API_BASE_URL = 'http://localhost:8080/auth';

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
};


export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
    
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const sendRegistrationOtp = createAsyncThunk<ApiResponse, RegistrationData>(
  'auth/sendRegistrationOtp',
  async (userData, { rejectWithValue }) => {
    try {
    
      const nameParts = userData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName;

      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/register`, {
        firstName,
        lastName,
        email: userData.email,
        password: userData.password,
        role: "USER",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const verifyOtpAndRegister = createAsyncThunk<LoginResponse, VerificationData>(
  'auth/verifyOtpAndRegister',
  async (verificationData, { rejectWithValue }) => {
    try {
      const nameParts = verificationData.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || firstName;

      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/verify-otp`, {
        identifier: verificationData.email,
        otp: verificationData.otp,
        firstName,
        lastName,
        password: verificationData.password,
        role: "USER",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const resendOtp = createAsyncThunk<ApiResponse, ResendOtpData>(
    'auth/resendOtp',
    async (resendData, { rejectWithValue }) => {
        try {
            const response = await axios.post<ApiResponse>(`${API_BASE_URL}/resend-otp`, {
                identifier: resendData.email,
                role: 'USER',
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);