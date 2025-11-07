import React, { useState } from 'react';
import API from '../features/auth/axiosInstance';
import { CircleX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import netflixlogo from '../assets/netflixlogo.png';
import { RingLoader2 } from '../utils/Shimmer';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: '', new_password: '' });
  const [error, setError] = useState({ email: '', new_password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: '', new_password: '' };
    let hasError = false;

    // Validation
    const emailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!formData.email.match(emailPattern)) {
      newErrors.email = "Email not valid";
      hasError = true;
    }

    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
      hasError = true;
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (hasError) {
      setError(newErrors);
      return;
    }

    // API call
    try {
      setLoading(true);
      const res = await API.post('/forgot-password/', formData);
      alert(res.data.message || "Password changed successfully!");
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong!";
      setError({ email: msg, new_password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-black sm:bg-[url('/src/assets/net-bg.jpg')] w-full h-full min-h-screen bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-0"></div>

      <div className="max-w-5xl mx-auto text-white  ">
        <div className="w-full h-full pl-7 sm:pl-0 relative">
          <img className="w-32 lg:w-40" src={netflixlogo} alt="Netflix Logo" />
        </div>

        <div className="w-[90%] sm:w-[450px] px-6 sm:px-10 py-10 gap-6 flex flex-col justify-center sm:items-center  border-white  bg-black/70  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl md:text-4xl tracking-[1px] font-bold">Reset Password</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full text-md sm:text-[15px] md:text-[18px] tracking-[1px]">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="email"
                placeholder="Enter your registered Email"
                className="border border-gray-400 py-3 px-4 rounded placeholder:text-gray-300 w-full"
                onChange={handleChange}
              />
              {error.email && (
                <div className="text-red-700 text-md sm:text-[16px]">
                  <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                  {error.email}
                </div>
              )}
            </div>

            {/* New Password Field */}
            <div className="flex flex-col gap-1">
              <input
                type="password"
                name="new_password"
                placeholder="Enter new password"
                className="border border-gray-400 py-3 px-4 rounded placeholder:text-gray-300 w-full"
                onChange={handleChange}
              />
              {error.new_password && (
                <div className="text-red-700 text-md sm:text-[16px]">
                  <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                  {error.new_password}
                </div>
              )}
            </div>

            {/* Submit Button */}
            {loading ? (
              <button className="w-full bg-red-600 py-1 flex flex-row items-center justify-center rounded-md">
                <RingLoader2 />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-red-600 md:text-[20px] sm:text-[17px] text-[15px] font-bold py-2 rounded-md"
              >
                Reset Password
              </button>
            )}
          </form>

          <Link
            to="/login"
            className="text-gray-300 hover:text-white tracking-[1px] md:text-[20px] sm:text-[17px] text-[13px] underline mt-4"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
