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
      const response = await axios.post<ApiResponse>(`${API_BASE_URL}/register`, {
        fullName: userData.fullName,
        gender: userData.gender,
        dob: userData.dob,
        email: userData.email,
        mobile: userData.mobile,
        countryCode: userData.countryCode,
        city: userData.city,
        town: userData.town,
        state: userData.state,
        country: userData.country,
        password: userData.password,
        role: "USER",
      });

      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }

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
       const response = await axios.post<any>(`${API_BASE_URL}/verify-otp`, {
        identifier: verificationData.email,
        otp: verificationData.otp,
        fullName: verificationData.fullName,
        gender: verificationData.gender,
        dob: verificationData.dob,
        mobile: verificationData.mobile,
        countryCode: verificationData.countryCode,
        city: verificationData.city,
        town: verificationData.town,
        state: verificationData.state,
        country: verificationData.country,
        password: verificationData.password,
        role: "USER",
      });
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
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