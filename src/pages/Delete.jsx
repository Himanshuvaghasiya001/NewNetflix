// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { deleteAccount } from "../features/auth/authAPI";

// const User = () => {
//     const token = localStorage.getItem("token");
//     const dispatch = useDispatch();
//     const navigate = useNavigate(); // Note: Capital "N" NOT "Navigate"

//     const handleDelete = async (e) => {
//         e.preventDefault();
//         const confirmDelete = window.confirm("Are you sure you want to delete your account?");
//         if (!confirmDelete) return;

//         try {
//             console.log("Token before delete:", token);
//             await deleteAccount(token);            // ✅ API call
//             dispatch(logout());                    // ✅ Redux clear
//             localStorage.removeItem("token");      // ✅ Local token clear
//             navigate("/login");                    // ✅ Navigate not "Navigate()"
//         } catch (err) {
//             console.error(err);
//             alert("Failed to delete account");
//         }
//     };

//     return (
//         <button onClick={handleDelete} className="text-black">
//             Delete Account
//         </button>
//     );
// };

// export default User;
