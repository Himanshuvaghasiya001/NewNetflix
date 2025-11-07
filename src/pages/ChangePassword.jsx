import React, { useState } from "react";
import { useDispatch } from "react-redux";
import  API  from "../features/auth/axiosInstance";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.current_password || !form.new_password || !form.confirm_password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await API.post("/change-password/", form);
      setSuccess(res.data.message);
      setForm({ current_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => navigate("/userr"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#141414] p-6 rounded-md shadow-md w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

        <input
          type="password"
          name="current_password"
          placeholder="Current Password"
          value={form.current_password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
        />

        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={form.new_password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm New Password"
          value={form.confirm_password}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
        />

        {error && (
          <div className="text-red-500 mb-2 flex items-center gap-1">
            <CircleX size={18} /> {error}
          </div>
        )}

        {success && <div className="text-green-500 mb-2">{success}</div>}

        <button
          type="submit"
          className="w-full bg-red-600 py-2 rounded-md font-semibold mt-2"
        >
          Save Password
        </button>

        <div className="mt-3 text-sm text-center">
          <a href="/forgot-password" className="text-gray-400 hover:text-white">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../features/auth/axiosInstance";
// import { CircleX } from "lucide-react";

// const ChangePassword = () => {
//   const [form, setForm] = useState({
//     current_password: "",
//     new_password: "",
//     confirm_password: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Change password (for logged-in user)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!form.current_password || !form.new_password || !form.confirm_password) {
//       setError("All fields are required");
//       return;
//     }
//     if (form.new_password !== form.confirm_password) {
//       setError("New password and confirm password must match");
//       return;
//     }
   

//     try {
//       const res = await API.post("/change-password/", form);
//       setSuccess(res.data.message || "Password changed successfully!");
//       setForm({ current_password: "", new_password: "", confirm_password: "" });
//       setTimeout(() => navigate("/userr"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.error || "Something went wrong");
//     }
//   };

//   // 🔹 Forgot password — simple version (no email sending)
//   const handleForgotPassword = async () => {
//     const email = prompt("Enter your registered email:");
//     if (!email) return;

//     const newPass = prompt("Enter your new password:");
//     if (!newPass) return;

//     try {
//       const res = await API.post("/forgot-password/", {
//         email: email,
//         new_password: newPass,
//       });
//       alert(res.data.message || "Password reset successfully!");
//     } catch (err) {
//       alert(err.response?.data?.error || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#141414] p-6 rounded-md shadow-md w-[400px]"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

//         <input
//           type="password"
//           name="current_password"
//           placeholder="Current Password"
//           value={form.current_password}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
//         />

//         <input
//           type="password"
//           name="new_password"
//           placeholder="New Password"
//           value={form.new_password}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
//         />

//         <input
//           type="password"
//           name="confirm_password"
//           placeholder="Confirm New Password"
//           value={form.confirm_password}
//           onChange={handleChange}
//           className="w-full mb-3 p-2 rounded bg-transparent border border-gray-500 placeholder-gray-400"
//         />

//         {error && (
//           <div className="text-red-500 mb-2 flex items-center gap-1">
//             <CircleX size={18} /> {error}
//           </div>
//         )}

//         {success && <div className="text-green-500 mb-2">{success}</div>}

//         <button
//           type="submit"
//           className="w-full bg-red-600 py-2 rounded-md font-semibold mt-2"
//         >
//           Save Password
//         </button>

//         <div className="mt-3 text-sm text-center">
//           <button
//             type="button"
//             onClick={handleForgotPassword}
//             className="text-gray-400 hover:text-white underline"
//           >
//             Forgot Password?
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
