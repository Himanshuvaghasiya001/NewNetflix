import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, loginUser } from '../features/auth/authAPI';
import netflixlogo from '../assets/netflixlogo.png';
import { Eye, EyeOff, CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RingLoader2 } from '../utils/Shimmer';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error1, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { email: '', password: '' };
    let hasError = false;

    const emailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    else if (!formData.email.match(emailPattern)) {
      newErrors.email = "Email not valid";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setError(newErrors);
      return;
    }

    setError(newErrors); // Clear previous errors
    setLoading(true);
    
    const { email, password } = formData;
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate("/home")
      })
      .catch((errMsg) => {
        setError({email: errMsg || ''});
        setError({password:  'Invalid password'});
        setLoading(false); // stop loader even on error
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="relative bg-black sm:bg-[url('/src/assets/net-bg.jpg')] w-full h-full min-h-screen bg-cover bg-no-repeat">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-0"></div>
          <div className='max-w-5xl mx-auto'>
            <div className='text-white z-10'>
              <div className="w-full h-full relative z-20 pl-7 sm:pl-0">
                <img className='w-32 lg:w-40' src={netflixlogo} alt="Netflix Logo" />
              </div>
              <div className='w-[90%] sm:w-[450px] px-6 sm:px-10 py-10 gap-6 flex flex-col justify-center sm:items-center  border-white  bg-black/70  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <h2 className='text-3xl md:text-4xl tracking-[1px] font-bold '>Sign In</h2>
                <div className='flex flex-col justify-center gap-5 w-full text-md sm:text-[15px] md:text-[20px] tracking-[2px]'>
                  <div className='flex flex-col gap-1'>
                    <input type="text" className='border border-gray-400  py-4 px-4 rounded placeholder:text-gray-300 w-full' name="email" placeholder="Enter Email" onChange={handleChange} />
                    {error1.email && <div className='text-red-700 text-md sm:text-[16px]'>
                      <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                      {error1.email}</div>}
                  </div>
                  <div className='relative flex flex-col gap-1'>
                    <input type={showPassword ? "text" : "password"} className=' border border-gray-400 py-4 px-4  rounded  placeholder:text-gray-300 w-full' name="password" placeholder="Enter Password" onChange={handleChange} />
                    <span className=' cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <Eye className='absolute top-5 right-4' /> : <EyeOff className='absolute top-5 right-[15px]' />}</span>
                    {error1.password && <div className='text-red-700 text-md sm:text-[16px]'>
                      <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                      {error1.password}</div>}
                  </div>
                </div>
                {
                loading ? <button className='w-full bg-red-600 py-1 flex flex-row items-center justify-center rounded-md'><RingLoader2 /></button>
                  : <button type="submit" className='w-full bg-red-600 md:text-[20px] sm:text-[17px] text-[15px] font-bold py-2 rounded-md ' >Sign Up</button>
              }
                <Link to="/forgot-password/" className='text-white tracking-[1px] md:text-[20px] sm:text-[17px] text-[13px] '>Forgot Password?</Link>
                <div className='text-gray-400 tracking-[1px] md:text-[20px] sm:text-[17px] text-[13px] flex flex-row'>
                  New to Netflix? <Link to="/register" className='text-white'>Sign Up now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </>
  );
};

export default Login;
