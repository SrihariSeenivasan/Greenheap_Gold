import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AdminState, Ornament } from '../../types/type'; 
import {
    addOrnament,
    fetchAllOrnaments,
    updateOrnament,
    deleteOrnament,
} from '../thunks/adminThunks';

const initialState: AdminState = {
    ornaments: [],
    status: 'idle',
    error: null,
    currentPage: 0,
    totalPages: 1, 
    pageSize: 5,
    currentOrnament: null,
    totalElements: 0
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchAllOrnaments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
             .addCase(fetchAllOrnaments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ornaments = action.payload;
                state.currentPage = action.meta.arg.page; 
                state.totalPages = action.payload.length < action.meta.arg.size 
                    ? state.currentPage + 1 
                    : state.currentPage + 2;
            })
            .addCase(fetchAllOrnaments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            .addCase(addOrnament.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updateOrnament.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(deleteOrnament.fulfilled, (state) => {
                state.status = 'succeeded';
            })

            
            .addMatcher(
                (action) => [addOrnament.pending, updateOrnament.pending, deleteOrnament.pending].includes(action.type as any),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => [addOrnament.rejected, updateOrnament.rejected, deleteOrnament.rejected].includes(action.type as any),
                (state, action) => {
                    state.status = 'failed';
                    state.error = ((action as any).payload as string) ?? 'An error occurred';
                }
            );
    },
});

export const { setCurrentPage } = adminSlice.actions;
export default adminSlice.reducer;