import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoaderScreen from './utils/Shimmer';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword ';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import First from './pages/First';
// import ResetPassword from './pages/ResetPassword';
// import Home from './pages/Home';
// import Userr from './components/User';
// import MoviesDetails from './components/MoviesDetails';
// import AllMovies from './components/AllMovies';
// import Wishlist from './components/Wishlist';

const App = () => {

  const First = lazy(() => import('./pages/First'));
  const Login = lazy(() => import('./pages/Login'));
  const Register = lazy(() => import('./pages/Register'));
  const ResetPassword = lazy(() => import('./pages/ResetPassword'));
  const Home = lazy(() => import('./pages/Home'));
  const Userr = lazy(() => import('./components/User'));
  const MoviesDetails = lazy(() => import('./components/MoviesDetails'));
  const AllMovies = lazy(() => import('./components/AllMovies'));
  const Wishlist = lazy(() => import('./components/Wishlist'));

  return (
    <Routes>
      <Route
        path="/"
        element={<Suspense fallback={<LoaderScreen />}>
          <PublicRoute>
            <First />
          </PublicRoute>
        </Suspense>}
      />
      <Route
        path="/login"
        element={<Suspense fallback={<LoaderScreen />}>
          <PublicRoute>
            <Login />
          </PublicRoute>
        </Suspense>}
      />
      <Route
        path="/register"
        element={<Suspense fallback={<LoaderScreen />}>
          <PublicRoute>
            <Register />
          </PublicRoute>
        </Suspense>}
      />
      <Route
        path="/change-password"
        element={
          <Suspense fallback={<LoaderScreen />}>
            <ChangePassword />
          </Suspense>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route
        path="/reset-password/:uidb64/:token"
        element={<Suspense fallback={<LoaderScreen />}>
          <ResetPassword />
        </Suspense>}
      /> */}
      <Route
        path="/home"
        element={<Suspense fallback={<LoaderScreen />}>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Suspense>}
      />
      <Route
        path="/userr"
        element={<Suspense fallback={<LoaderScreen />}>
          <ProtectedRoute>
            <Userr />
          </ProtectedRoute>
        </Suspense>}
      />
      <Route
        path='movie/:id'
        element={<Suspense fallback={<LoaderScreen />}>
          <MoviesDetails />
        </Suspense>}
      />
      <Route
        path="/allmovies"
        element={<Suspense fallback={<LoaderScreen />}>
          <AllMovies />
        </Suspense>}
      />
      <Route
        path="/wishlist"
        element={<Suspense fallback={<LoaderScreen />}>
          <Wishlist />
        </Suspense>}
      />
    </Routes>
  );
};

export default App;
