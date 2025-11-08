// pages/Register.jsx
import React, { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import '../assets/index.css';
import { Link } from 'react-router-dom';
import netflixlogo from '../assets/netflixlogo.png';
import { useEffect } from 'react';
import { loginUser } from '../features/auth/authAPI';
import { Eye, EyeOff, CircleX, Loader } from 'lucide-react';
import { RingLoader2 } from '../utils/Shimmer';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const savedEmail = localStorage.getItem('user_email');
    if (savedEmail) {
      setFormData({ ...formData, email: savedEmail });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let newErrors = { username: '', email: '', password: '' };
    let hasError = false;
  
    // Validation
    if (!formData.username) {
      newErrors.username = "Name is required";
      hasError = true;
    }
  
    const emailPattern = /^[a-z0-9._%+-]+@gmail\.com$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    else if (!formData.email.match(emailPattern)) {
      newErrors.email = "Email not valid";
      hasError = true;
    }
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }
    else if (!formData.password.match(passwordPattern)) {
      newErrors.password = "Password not valid";
      hasError = true;
    }
  
    if (hasError) {
      setError(newErrors);
      return; // Loader start hi nahi hoga
    }
  
    // Agar yaha tak aagaye to mtlb validation pass ho gaya
    setError(newErrors); // Clear previous errors
    setLoading(true);
  
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        let errorMsg = {email : '',password:''};
      
        if (err?.email) {
          errorMsg.email = err.email[0];
        }
        if (err?.password) {
          errorMsg.password = err.password[0];
        }
        if (err?.detail) {
          errorMsg.email = err.detail;
        }
      
        setError(errorMsg);
      });
      
  };
  



  return (
    <form onSubmit={handleSubmit}>
      <div className="relative sm:bg-[url('/src/assets/net-bg.jpg')] bg-black w-full h-full min-h-screen bg-cover bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-0"></div>
        <div className='max-w-5xl mx-auto'>
          <div className='text-white z-10 '>
            <div className="w-full h-full relative z-20 pl-7 sm:pl-0">
              <img className='w-32 lg:w-40' src={netflixlogo} alt="Netflix Logo" />
            </div>
            <div className='w-[90%] sm:w-[450px] px-6 sm:px-10 py-10 gap-6 flex flex-col justify-center  sm:items-center  border-white  bg-black/70  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
              <h2 className='text-3xl md:text-4xl tracking-[1px] font-bold '>Sign Up</h2>
              <div className='flex flex-col justify-center gap-5 w-full text-md md:text-[20px] sm:text-[15px] tracking-[2px]'>
                <div className='flex flex-col gap-1'>
                  <input type="text" className='border border-gray-400  py-3 px-5 rounded placeholder:text-gray-300 w-full' name="username" placeholder="Enter First Name" onChange={handleChange} />
                  {error.username && <div className='text-red-700 text-sm  sm:text-base'>
                    <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                    {error.username}</div>}
                </div>
                <div className='flex flex-col gap-1'>
                  <input type="text" className='border border-gray-400 py-3 px-5 rounded placeholder:text-gray-300 w-full' name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                  {error.email && <div className='text-red-700 text-sm sm:text-base'>
                    <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                    {error.email}</div>}
                </div>
                <div className='relative flex flex-col gap-1'>
                  <input type={showPassword ? "text" : "password"} className=' border border-gray-400 py-3 px-5  rounded placeholder:text-gray-300 w-full' name="password" placeholder="Enter Password" onChange={handleChange} />
                  <span className=' cursor-pointer' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <Eye className='absolute top-5 right-4' /> : <EyeOff className='absolute top-5 right-[15px]' />}</span>
                  {error.password && <div className='text-red-700 text-sm sm:text-base'>
                    <CircleX className="inline-block mr-1 mb-1 h-5 w-6" />
                    {error.password}</div>}
                </div>
              </div>
              {
                loading ? <button className='w-full bg-red-600 py-1 flex flex-row items-center justify-center rounded-md'><RingLoader2 /></button>
                  : <button type="submit" className='w-full bg-red-600 md:text-[20px] sm:text-[17px] text-[15px] font-bold py-2 rounded-md ' >Sign Up</button>
              }
              <div className='text-gray-400 tracking-[1px] text-[15px] md:text-[20px] sm:text-[17px] flex flex-row'>
                Already a User? <Link to="/login" className='text-white'>Sign In now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
