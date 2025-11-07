// features/auth/authAPI.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import API from './axiosInstance'; // 👈 move this to top

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }, {rejectWithValue}) => {
    try {
      // console.log("Register Payload:", { username, email, password });
      // const response = await axios.post('http://127.0.0.1:8000/auth/register/', {
      //   username,
      //   email,
      //   password,
      // });
      // const response = await axios.post('http://127.0.0.1:8080/api/user/createUser', {
      const response = await API.post('/register/', {
        username,
        email,
        password,
      }); 
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call Django login endpoint
      const response = await API.post('/login/', { email, password });

      // Backend returns { message, email, refresh, access }
      const { access, refresh, email: userEmail } = response.data;

      // Save tokens (keys: access, refresh)
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('email', userEmail);

      return { 
        access: response.data.access, 
        refresh: response.data.refresh, 
        email: response.data.email 
      };
    } catch (error) {
      const errMsg = error.response?.data || error.message;
      return rejectWithValue(errMsg);
    }
  }
);


export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await API.post('/forgot-password/', { email });
      return res.data; // e.g. { message: "Password reset email sent successfully" }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async ({ uidb64, token, password }, { rejectWithValue }) => {
//     try {
//       const res = await API.post(`/reset-password/${uidb64}/${token}/`, { password });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ old_password, new_password }, { rejectWithValue }) => {
    try {
      const res = await API.post('/change-password/', {
        old_password,
        new_password
      });
      return res.data; // { message: "Password changed successfully" }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, thunkAPI) => {
    try {
      // Profile uses Authorization header (axios interceptor attaches access)
      const res = await API.get('/profile/');
      return res.data;  // expecting { id, email, username }
    } catch (error) {
      // If 401 due to expired token, we can attempt refresh here or let interceptor handle it
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// updateUsername thunk ka andar
export const updateUsername = createAsyncThunk(
  'auth/updateUsername',
  async ({ username }, thunkAPI) => {
    try {
      const token = localStorage.getItem('access');
      if (!token) throw new Error('No token found');

      // const res = await fetch(`http://127.0.0.1:8080/api/user/updateUserBYId/${userId}`, {
      const res = await fetch(`https://newnetflixbackend.onrender.com/update-profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.detail || 'Failed to update username');
      return data; // ✅ Yahi payload banega
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('access');
      if (!token) throw new Error('No token found');

      const res = await fetch(`https://newnetflixbackend.onrender.com/delete-profile/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete');
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

  