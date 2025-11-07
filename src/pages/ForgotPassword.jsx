// // src/pages/ForgotPassword.jsx
// import React, { useState } from 'react';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://127.0.0.1:8000/auth/users/reset_password/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     });

//     if (res.ok) {
//       setMessage("Password reset link sent to your email.");
//     } else {
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div className='text-white p-8'>
//       <h2 className='text-2xl mb-4'>Forgot Password</h2>
//       <form onSubmit={handleReset} className='flex flex-col gap-4'>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="p-3 rounded text-black"
//         />
//         <button type="submit" className="bg-red-600 p-3 rounded">Send Reset Link</button>
//         {message && <p>{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
