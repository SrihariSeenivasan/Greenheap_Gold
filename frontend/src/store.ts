import { configureStore } from '@reduxjs/toolkit';
import authReducer from './app/features/slices/authSlice';
import adminReducer from './app/features/slices/adminSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
