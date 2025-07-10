import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance'; 
import { Ornament } from '../../types/type'; 

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as { response?: { data?: { message?: string } } };
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
  }
  if (error instanceof Error) return error.message;
  return 'An unknown server error occurred';
};

type AddOrnamentData = Omit<Ornament, 'id' | 'mainImage' | 'subImages'>;
interface AddOrnamentPayload {
  data: AddOrnamentData;
  mainImage: File;
  subImages: File[];
}


type UpdateOrnamentData = Omit<Ornament, 'id' | 'mainImage' | 'subImages'>;
interface UpdateOrnamentPayload {
  id: number;
  data: UpdateOrnamentData;
  mainImage?: File; 
  subImages?: File[];
}

interface FetchOrnamentsPayload {
  page: number;
  size: number;
}

export const addOrnament = createAsyncThunk<Ornament, AddOrnamentPayload>(
  'admin/addOrnament',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
    
      formData.append('data', new Blob([JSON.stringify(payload.data)], { type: 'application/json' }));
      formData.append('mainImage', payload.mainImage);
      payload.subImages.forEach(file => {
        formData.append('subImages', file);
      });

      const response = await axiosInstance.post<Ornament>('/admin/ornaments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const fetchAllOrnaments = createAsyncThunk(
  'admin/fetchAllOrnaments',
  async ({ page, size }: FetchOrnamentsPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/ornaments', {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const updateOrnament = createAsyncThunk<Ornament, UpdateOrnamentPayload>(
  'admin/updateOrnament',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify(payload.data)], { type: 'application/json' }));
      if (payload.mainImage) {
        formData.append('mainImage', payload.mainImage);
      }
      if (payload.subImages && payload.subImages.length > 0) {
        payload.subImages.forEach(file => {
          formData.append('subImages', file);
        });
      }

      const response = await axiosInstance.put<Ornament>(`/admin/ornaments/${payload.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


export const deleteOrnament = createAsyncThunk<number, number>(
  'admin/deleteOrnament',
  async (ornamentId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/admin/ornaments/${ornamentId}`);
      return ornamentId;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);