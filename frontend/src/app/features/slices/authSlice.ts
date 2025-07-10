import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../thunks/authThunks';
import type { AuthState, User } from '../../types/type';

const getInitialUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

const getInitialToken = (): string | null => {
  return localStorage.getItem('authToken');
};

const initialState: AuthState = {
  currentUser: getInitialUser(),
  token: getInitialToken(),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        localStorage.setItem('authToken', action.payload.token ?? '');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
        localStorage.setItem('authToken', action.payload.token ?? '');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;