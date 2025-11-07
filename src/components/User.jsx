import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoveLeft, User, Mail } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser, updateUsername } from "../features/auth/authAPI";

const Userr = ({ }) => {
    const { user } = useSelector(state => state.auth);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUser());
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user]);


    const handleSave = (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError("Username cannot be empty");
            return;
        }

        dispatch(updateUsername({ username }))
            .unwrap()
            .then(() => {
                alert('Username updated');
                navigate('/home'); // ✅ optional: go to home
            })
            .catch((err) => {
                setError(err);
            });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if (!confirm) return;

        try {
            dispatch(deleteUser());   // ✅ updated thunk
            navigate("/");             // ✅ go to login
        } catch (err) {
            alert("Failed to delete account");
            console.error(err);
        }
    };

    return (
        <>

            <div className="relative  h-screen bg-black">
                <div className="absolute top-1/2 left-1/2 w-[90vw] sm:w-[75vw] lg:w-[40vw] transform -translate-x-1/2 -translate-y-1/2 bg-[#161616] text-white px-4 md:px-8 lg:px-14 py-4 md:py-6 lg:py-10 rounded-md">
                    <MoveLeft onClick={() => { navigate('/login') }} className="absolute top-0 left-1" />
                    <h2 className="text-[18px] sm:text-[25px] mb-3 md:text-[35px] font-bold text-center whitespace-nowrap underline tracking-[1px]">My Account</h2>
                    {/* <div className="mb-3 text-sm sm:text-xl ">Profile Photo</div>
                        <div className="flex flex-row items-center gap-8 lg:gap-12">
                            <img className="w-15 h-15 sm:w-20 sm:h-20 lg:w-25 lg:h-25 rounded-md" src={profile} alt="Profile logo" />
                            <button className="text-sm sm:text-xl bg-red-600 py-2 px-4 rounded-md cursor-pointer">Chhose Profile</button>
                            <input type="file" className="hidden bg-gray-500 rounded-md" />
                        </div> */}
                    <div className="mt-3 lg:mt-5 mb-1 text-sm sm:text-xl ">Name</div>
                    <div className="flex flex-row text-sm sm:text-xl">
                        <div className="w-full flex flex-row items-center px-4 py-3 rounded-md border border-[#ffffff42]">
                            <User className="w-5 mr-3" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-transparent outline-none text-white w-full"
                            />

                        </div>
                    </div>
                    {error && <p className="text-red-600 mt-1">{error}</p>}
                    <div className="mt-3 lg:mt-5 mb-1 text-sm sm:text-xl ">Email</div>
                    <div className="flex flex-row text-sm sm:text-xl">
                        <div className="w-full flex flex-row items-center px-4 py-3 rounded-md border border-[#ffffff42]">
                            <Mail className="w-5 mr-3" />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent outline-none text-white w-full"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button
                            onClick={() => navigate('/change-password')}
                            className="mt-4 lg:mt-6 text-sm sm:text-base px-3 py-2 rounded-md bg-white text-black font-semibold border border-[#ffffff42]"
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="mt-4 text-sm sm:text-base flex flex-row items-center gap-4">
                        <button type="button" onClick={(e) => handleSave(e)} className="px-3 py-2 rounded-md bg-white text-black font-semibold">Save</button>
                        <button onClick={handleDelete} className="px-3 py-2 rounded-md bg-red-600 font-semibold">Delete Account</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Userr;