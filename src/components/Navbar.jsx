import React, { useEffect } from "react";
import netflixlogo from '../assets/netflixlogo.png';
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, SquareUser, LogOut, AlignJustify, X, ChevronUp } from 'lucide-react';
import profile from '../assets/profile.jpg';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { fetchSearchMovies } from "../features/Movies/movieApi";
import { clearSearch } from "../features/Movies/movieSlice";

const Navbar = ({ }) => {

    const [show, setShow] = useState(false);
    const [searchBar, setSearchBar] = useState(false);
    const [menu, setMenu] = useState(false);
    const [comSoon, setcomSoon] = useState(false);
    const [search, setSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { searchall, isSearchOpen } = useSelector(state => state.movies);

    useEffect(() => {
        if (search.length > 1) {
            setIsLoading(true); // Start loading
            dispatch(fetchSearchMovies(search))
                .then(() => setIsLoading(false))  // Stop loading
                .catch(() => setIsLoading(false));
        } else {
            dispatch(clearSearch());
        }
    }, [dispatch, search]);


    const handleselect = (movie) => {
        Navigate(`/movie/${movie.id}`);
        dispatch(clearSearch());
        setSearch("");
    }

    const handlesignout = () => {
        dispatch(logout());
        Navigate("/");
    }

    const handleMenu = () => {
        setMenu(!menu);
    }

    const handlesoon = () => {
        setcomSoon(true);
        setTimeout(() => {
            setcomSoon(false);
        }, 2000);
    }

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto'; // Cleanup on unmount
        };
    }, [menu]);


    return (
        <>
            <div className={`fixed inset-0 bg-black z-10 flex flex-col items-center justify-center gap-10 text-white text-[20px] tracking-widest  md:hidden transition-transform duration-500 ease-in-out
                    ${menu ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <X onClick={handleMenu} className="absolute top-5 left-5 text-white cursor-pointer" />
                <Link to={'/home'} onClick={handleMenu}>Home</Link>
                <div className="relative group">
                    <Link onClick={handlesoon} className="">TV Shows</Link>
                    {comSoon && <div className="transition-all duration-500 ease-in-out absolute right-[-15px] top-5 mt-3  bg-[#2D2D2D] text-[13px] text-white px-3 py-2 whitespace-nowrap rounded shadow-lg">
                        Coming Soon !
                    </div>}
                </div>
                <Link to={'/allmovies'} onClick={handleMenu}>All Movies</Link>
                <Link to={'/wishlist'} onClick={handleMenu}>Wishlist</Link>
            </div>
            <div className={`xl:max-w-[1500px] 2xl:max-w-full mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 ${menu ? 'hidden' : 'block'}`}>
                <div className="text-white">
                    <div className="flex flex-row justify-between items-center py-3 sm:py-5 md:py-2">
                        <div className="flex flex-row items-center gap-1 h-full z-1">
                            <AlignJustify className={`md:hidden ${searchBar ? 'hidden' : 'block'}`} onClick={handleMenu} />
                            <img className={`w-20 h-10  md:w-28 md:h-16 ${searchBar ? '' : ''}`} src={netflixlogo} alt="Netflix Logo" />
                        </div>
                        <div className={`pt-1 z-1 flex flex-row items-center gap-10 lg:gap-13 xl:gap-30 text-[17px] tracking-[1.5px] whitespace-nowrap`}>
                            <Link to={'/home'} className="hidden md:block">Home</Link>
                            <div className="relative group">
                                <Link className={`hidden md:block ${searchBar ? 'md:hidden lg:block' : 'block'}`}>TV Shows</Link>
                                <div className="transition-all duration-500 right-[-15px] hidden ease-in-out absolute  mt-3 group-hover:block bg-[#2D2D2D] text-[13px] text-white px-3 py-2 whitespace-nowrap rounded shadow-lg">
                                    Coming Soon !
                                </div>
                            </div>
                            <Link to={'/allmovies'} className={`hidden md:block ${searchBar ? 'md:hidden lg:block' : 'block'}`}>All Movies</Link>
                            <Link to={'/wishlist'} className="hidden xl:block">Wishlist</Link>
                        </div>
                        <div className="z-1 flex flex-row items-center gap-2 md:gap-6 text-2xl">
                            <div className="flex flex-row items-center gap-2 relative">
                                <div><input type="text"
                                    value={search}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearch(value);
                                        if (value.trim() !== "") {
                                            setShowSuggestions(true);
                                        } else {
                                            setShowSuggestions(false);
                                        }
                                    }}
                                    onFocus={() => {
                                        if (search.trim() !== "") {
                                            setShowSuggestions(true);
                                        }
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => setShowSuggestions(false), 200); // Hide suggestions after 200ms
                                    }}
                                    className={` z-10 focus:outline-none border border-white transition-all duration-300 ease-in-out  rounded-[20px] text-sm sm:text-[17px] sm:rounded-[25px] h-8 ${searchBar ? 'w-40 px-3 sm:w-74 ' : 'pl-0 w-0'}`} />
                                    <div className={`absolute top-10 z-10 left-0 w-full rounded-lg shadow  max-h-[150px] sm:max-h-[300px] overflow-y-scroll scrollbar-hide cursor-pointer ${searchBar ? 'opacity-100' : 'opacity-0'}`}>
                                        {showSuggestions && (
                                            <div className="bg-black/90 text-white mt-1 w-full">
                                                {searchall.length > 0 ? (
                                                    searchall.map((movie) => (
                                                        <div
                                                            key={movie.id}
                                                            onClick={() => handleselect(movie)}
                                                            className="px-4 py-2 text-[12px] tracking-widest cursor-pointer hover:bg-[#454444da] border-gray-700"
                                                        >
                                                            {movie.title}
                                                        </div>
                                                    ))
                                                ) : (
                                                    !isLoading &&
                                                    search.length > 1 &&
                                                    searchall.length === 0 && (
                                                        <div className="px-4 py-2 text-[12px] tracking-widest text-white">Movies not found</div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="cursor-pointer"
                                    onClick={() => {
                                        setSearchBar(!searchBar);
                                    }}><Search /></div>
                            </div>
                            <div className="relative group">
                                <Bell className="hidden md:block" />
                                <div className="transition-all duration-500 right-[-50px] hidden  ease-in-out absolute  mt-3 group-hover:block bg-[#2D2D2D] text-[13px] text-white px-3 py-2 whitespace-nowrap rounded shadow-lg">
                                    Coming Soon !
                                </div>
                            </div>
                            <div className={`${searchBar ? 'hidden lg:block' : 'block'}`}>
                                <div className="flex flex-row items-center gap-2 ">
                                    <img className="w-7 h-7 sm:w-10 sm:h-10 rounded-md " src={profile} alt="Profile logo" />
                                    <div>
                                        <div onClick={() => { setShow(!show) }} >{show ? <ChevronUp className="cursor-pointer" /> : <ChevronDown className="cursor-pointer" />}</div>
                                        <div className={`transition-all duration-500 ease-in-out absolute right-8  mt-4 group-hover:block bg-black/70 text-[11px] sm:text-[14px] font-semibold tracking-[1px] text-white px-3 py-3 sm:px-6 sm:py-5 whitespace-nowrap rounded shadow-lg ${show ? 'block' : 'hidden'}`}>
                                            <div className="flex flex-col gap-2 ">
                                                <Link to='/userr' className="bg-[#2D2D2D] rounded-md py-1 px-3 sm:py-2 sm:px-5  flex flex-row gap-2 items-center"><SquareUser className="w-4 sm:w-5" />My Account</Link>
                                                <Link onClick={handlesignout} className="bg-[#2D2D2D] rounded-md py-1 px-3 sm:py-2 sm:px-5 flex flex-row gap-2 items-center"><LogOut className="w-4 sm:w-5" />Sign Out</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default Navbar;