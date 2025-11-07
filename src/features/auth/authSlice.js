// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // ✅ named import
import { loginUser, updateUsername, deleteUser, getUser } from './authAPI';

const token = localStorage.getItem('token');

const user = token ? jwtDecode(token) : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: token || null,
        user: user || null,
        isAuthenticated: !!token,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access;
                state.user = jwtDecode(action.payload.access);
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.access);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload.detail || "Login failed";
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
