// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moviesReducer from '../features/Movies/movieSlice';
import wishlistReducer from '../features/Movies/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    wishlist: wishlistReducer,
  },
});
