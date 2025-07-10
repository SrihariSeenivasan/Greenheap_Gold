import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk<
  {
    token: string | null;
    user: any; name: string; email: string 
},       
  { email: string; password: string },           
  { rejectValue: string }
>('user/loginUser', async (credentials, thunkAPI) => {
  try {
    await new Promise((res) => setTimeout(res, 1000));

    if (credentials.email === 'test@example.com' && credentials.password === '1234') {
      const user = { name: 'Test User', email: credentials.email };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return {
        token: 'mock-token',
        user,
        name: user.name,
        email: user.email
      };
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (err) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const getCurrentUser = createAsyncThunk<
  { name: string; email: string },
  void,                             
  { rejectValue: string }
>('user/getCurrentUser', async (_, thunkAPI) => {
  try {
    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      return thunkAPI.rejectWithValue('No user in localStorage');
    }

    const parsed = JSON.parse(stored);
    if (!parsed.email || !parsed.name) {
      return thunkAPI.rejectWithValue('Invalid user data');
    }

    return parsed;
  } catch (err) {
    return thunkAPI.rejectWithValue('Failed to load user');
  }
});

export const registerUser = createAsyncThunk<
  {
    token: string | null;
    user: any; name: string; email: string 
},       
  { email: string; password: string },           
  { rejectValue: string }
>('user/registerUser', async (credentials, thunkAPI) => {
  try {
    await new Promise((res) => setTimeout(res, 1000));

    if (credentials.email === 'test@example.com' && credentials.password === '1234') {
      const user = { name: 'Test User', email: credentials.email };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return {
        token: 'mock-token',
        user,
        name: user.name,
        email: user.email
      };
    } else {
      return thunkAPI.rejectWithValue('Invalid credentials');
    }
  } catch (err) {
    return thunkAPI.rejectWithValue('Registration failed');
  }
});