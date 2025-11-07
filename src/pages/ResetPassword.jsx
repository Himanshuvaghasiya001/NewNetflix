// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import  API  from "../features/auth/axiosInstance";

// const ResetPassword = () => {
//   const { uidb64, token } = useParams();
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post(`/reset-password/${uidb64}/${token}/`, { password });
//       setMsg(res.data.message);
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setMsg("Invalid or expired link");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black text-white">
//       <form onSubmit={handleSubmit} className="bg-[#141414] p-6 rounded-md w-[400px]">
//         <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500"
//         />
//         <button type="submit" className="w-full bg-red-600 py-2 rounded-md font-semibold mt-2">
//           Reset
//         </button>
//         {msg && <p className="mt-3 text-center">{msg}</p>}
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
