

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminState } from '../../types/type';
import {
    addOrnament,
    fetchAllOrnaments,
    updateOrnament,
    deleteOrnament,
} from '../thunks/adminThunks';

const initialState: AdminState = {
    ornaments: [],
    currentOrnament: null,
    status: 'idle',
    error: null,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        setCurrentOrnament: (state, action: PayloadAction<number | null>) => {
            if (action.payload === null) {
                state.currentOrnament = null;
            } else {
                state.currentOrnament = state.ornaments.find(o => o.id === action.payload) || null;
            }
        }
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
                if (action.payload.length < action.meta.arg.size) {
                    state.totalPages = state.currentPage + 1;
                } else {
                    state.totalPages = state.currentPage + 2;
                }
            })
            .addCase(fetchAllOrnaments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            .addCase(addOrnament.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })

            // Update Ornament
            .addCase(updateOrnament.fulfilled, (state, action) => {
                const index = state.ornaments.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.ornaments[index] = action.payload;
                }
                state.status = 'succeeded';
                state.currentOrnament = action.payload;
            })

            // Delete Ornament
            .addCase(deleteOrnament.fulfilled, (state, action) => {
                state.ornaments = state.ornaments.filter(o => o.id !== action.payload);
                state.status = 'succeeded';
            })

            // Handle pending and rejected states for add, update, delete
            .addMatcher(
                (action) => [addOrnament.pending, updateOrnament.pending, deleteOrnament.pending].includes(action.type),
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => [addOrnament.rejected, updateOrnament.rejected, deleteOrnament.rejected].includes(action.type),
                (state, action) => {
                    state.status = 'failed';
                    state.error = (action as PayloadAction<string>).payload ?? 'Unknown error';
                }
            );
    },
});


export const { setCurrentOrnament } = adminSlice.actions;
export default adminSlice.reducer;