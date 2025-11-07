// import React, { useEffect } from 'react';
// import netflixlogo from '../assets/netflixlogo.png';
// import { useNavigate } from 'react-router-dom';
// import Slider from "react-slick";
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { FaTv, FaDownload, FaMicrophone, FaSmile } from 'react-icons/fa';
// import { Plus, X, ChevronRight } from 'lucide-react';

// const First = () => {

//     const [movies, setMovies] = useState([]);
//     const [email, setEmail] = useState('');

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchdata();
//     }, []);

//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />,
//         // breakpoints: [
//         //     {
//         //         breakpoint: 1024,
//         //         settings: {
//         //             slidesToShow: 8,
//         //             slidesToScroll: 8,
//         //         }
//         //     },
//         //     {
//         //         breakpoint: 768,
//         //         settings: {
//         //             slidesToShow: 4,
//         //             slidesToScroll: 4,
//         //         }
//         //     },
//         //     {
//         //         breakpoint: 1536,
//         //         settings: {
//         //             slidesToShow: 8,
//         //             slidesToScroll: 8,
//         //         }
//         //     },
//         // ]
//     }

//     function SampleNextArrow(props) {
//         const { onClick } = props;
//         return (
//             <div
//                 className="absolute right-3 top-[45%] z-10 cursor-pointer text-white text-4xl"
//                 onClick={onClick}
//             >
//                 <FontAwesomeIcon icon={faAngleRight} />
//             </div>
//         );
//     }

//     function SamplePrevArrow(props) {
//         const { onClick } = props;
//         return (
//             <div
//                 className="absolute left-3 top-[45%] z-10 cursor-pointer text-white text-4xl"
//                 onClick={onClick}
//             >
//                 <FontAwesomeIcon icon={faAngleLeft} />
//             </div>
//         );
//     }


//     const fetchdata = async () => {
//         const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=590aea04d220db1227327cf0517c902a');
//         const data = await response.json();
//         console.log(data.results);
//         setMovies(data.results);
//     }

//     const handlesubmit = () => {
//         localStorage.setItem('user_email', email);
//         navigate('/register')
//     }

//     return (
//         <>
//             <div className="relative bg-[url('/src/assets/net-bg.jpg')] w-full h-screen bg-cover bg-no-repeat">
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black/100 z-0"></div>
//                 <div className="w-full mx-auto xl:max-w-[1000px]">
//                     <div className="text-white ">
//                         <div className="z-10 relative text-white">
//                             <div className="flex flex-row justify-between items-center ">
//                                 <div className="w-full h-full ">
//                                     <img className='w-52' src={netflixlogo} alt="Netflix Logo" />
//                                 </div>
//                                 <button onClick={() => { navigate('/register') }} className='bg-red-700 whitespace-nowrap  text-white text-[18px] font-semibold py-2 px-5 rounded hover:bg-red-800'>
//                                     Sign Up
//                                 </button>

//                                 {/* <div className="bg-red-700 tracking-[2px] text-white rounded text-[18px] cursor-pointer">
//                                     <button onClick= className='whitespace-nowrap cursor-pointer font-semibold py-2 px-5 hover:bg-red-700 hover:rounded-md'>Sign Up</button>
//                                 </div> */}
//                             </div>
//                             <div className="px-5 mt-30 flex flex-col items-center">
//                                 <h2 className='text-[80px] leading-20 text-center font-bold tracking-[2px]'>Unlimited movies,<br /> TV shows and more</h2>
//                                 <p className='py-7 tracking-[2px] font-semibold'>Starts at ₹149. Cancel at any time.</p>
//                                 <p className='pb-5 tracking-[1px]  text-[14px] '>Ready to watch? Enter your email to create or restart your membership.</p>
//                                 <div className="max-w-[65%] w-full flex flex-row items-center justify-between gap-4">
//                                     <input className='w-[65%] py-4 px-4 border border-gray-500 text-white rounded-md focus:outline-none bg-black/10' type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                     <button onClick={handlesubmit} className='text-[20px] bg-red-700 font-semibold  py-3.5 w-[35%] tracking-[2px] rounded-md whitespace-nowrap hover:bg-red-800 flex flex-row items-center justify-center'>Get Started <ChevronRight /></button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full h-full bg-black">
//                 <div className="w-full max-w-[1000px] mx-auto">
//                     <div className="inner">
//                         <div className="flex flex-col">
//                             <div>
//                                 <h2 className='text-4xl text-white py-5 font-bold tracking-[4px] pl-8'>Top Rated</h2>
//                                 <div className=' w-full h-full '>
//                                     <Slider {...settings}>
//                                         {movies.map((movie) => (
//                                             <div className='px-1 focus:outline-none' key={movie.id}>
//                                                 <img className='border border-gray-800 rounded-2xl' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//                                             </div>
//                                         ))}
//                                     </Slider>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-20 text-white flex flex-wrap gap-4 justify-center">
//                             <div>
//                                 <h2 className='text-4xl py-5 font-bold tracking-[4px] pl-8'>More reasons to join</h2>
//                                 <div className='h-[600px] gap-5 flex flex-row justify-center'>
//                                     <FirstProps
//                                         title="Enjoy on your TV"
//                                         overview="Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
//                                         icon={<FaTv />}
//                                     />
//                                     <FirstProps
//                                         title="Download your shows to watch offline"
//                                         overview="Save your favourites easily and always have something to watch."
//                                         icon={<FaDownload />}
//                                     />
//                                     <FirstProps
//                                         title="Watch everywhere"
//                                         overview="Stream unlimited movies and TV shows on your phone, tablet, laptop and TV."
//                                         icon={<FaMicrophone />}
//                                     />
//                                     <FirstProps
//                                         title="Create profiles for kids"
//                                         overview="Send kids on adventures with their favourite characters in a space made just for them — free with your membership."
//                                         icon={<FaSmile />}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-20 text-white flex flex-col ">
//                             <div>
//                                 <h2 className='text-4xl font-bold tracking-[4px] py-3 pl-8'>Frequently Asked Questions</h2>
//                                 <FirstProps3
//                                     title="What is Netflix?"
//                                     overview="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
//                                 />
//                                 <FirstProps3
//                                     title="How much does Netflix cost?"
//                                     overview="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
//                                 />
//                                 <FirstProps3
//                                     title="Where can I watch?"
//                                     overview="Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device."
//                                 />
//                                 <FirstProps3
//                                     title="How do I cancel?"
//                                     overview="Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
//                                 />
//                                 <FirstProps3
//                                     title="What can I watch on Netflix?"
//                                     overview="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more."
//                                 />
//                             </div>
//                         </div>
//                         <div className="px-5 mt-10 flex flex-col items-center text-white">
//                             <p className='pb-5 tracking-[1px]  text-[14px] '>Ready to watch? Enter your email to create or restart your membership.</p>
//                             <div className="max-w-[65%] w-full flex flex-row items-center justify-between gap-4">
//                                 <input className='w-[65%] py-4 px-4 border border-gray-500 text-white rounded-md focus:outline-none bg-black/10' type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 <button onClick={handlesubmit} className='text-[20px] bg-red-700 font-semibold  py-3.5 w-[35%] tracking-[2px] rounded-md whitespace-nowrap hover:bg-red-800 flex flex-row items-center justify-center'>Get Started <ChevronRight /></button>
//                             </div>
//                         </div>
//                         <div className="mt-20 text-gray-300 flex flex-col ">
//                             <div className='tracking-[1px]'>
//                                 Questions? Call <div className='inline-block underline'>000-800-919-1743</div>
//                             </div>
//                             <div className='flex flex-row gap-5 tracking-[1px]'>
//                                 <FirstProps2
//                                     first="FAQ"
//                                     sec="Investor Relations"
//                                     third="Privacy"
//                                     forth="Speed Test"
//                                 />
//                                 <FirstProps2
//                                     first="Help Centre"
//                                     sec="Jobs"
//                                     third="Cookie Preferences"
//                                     forth="Legal Notices"
//                                 />
//                                 <FirstProps2
//                                     first="Account"
//                                     sec="Ways to Watch"
//                                     third="Corporate Information"
//                                     forth="Only on Netflix"
//                                 />
//                                 <FirstProps2
//                                     first="Media Centre"
//                                     sec="Terms of Use"
//                                     third="Contact Us"
//                                 />
//                             </div>
//                             <div className='my-15'>
//                                 Netflix India
//                             </div>
//                             <div className='text-gray-500'>
//                                 This page is protected by Google reCAPTCHA to ensure you're not a bot. <div className='mb-30 text-blue-800 inline-block underline'>Learn more.</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default First;

// export const FirstProps = ({ title, overview, icon }) => {
//     return (
//         <>
//             <div className='relative w-full h-full px-6 py-2 flex flex-col border border-gray-800 rounded-2xl bg-gradient-to-br from-[#1a2144] via-[#241b38] via-[#26152c] via-[#251121] to-[#210e18]'>
//                 <h3 className='text-white text-left text-3xl font-bold tracking-[1px] py-3'>{title}</h3>
//                 <p className='text-gray-400 text-left text-[22px] tracking-[1px] py-3'>{overview}</p>
//                 <div className='absolute bottom-10 right-7 text-5xl'>{icon}</div>
//             </div>
//         </>
//     )
// };

// export const FirstProps2 = ({ first, sec, third, forth }) => {
//     return (
//         <>
//             <div className='w-full mt-10 flex flex-col gap-4 underline'>
//                 <div className=''>{first}</div>
//                 <div className=''>{sec}</div>
//                 <div className=''>{third}</div>
//                 <div className=''>{forth}</div>
//             </div>
//         </>
//     )
// };

// export const FirstProps3 = ({ title, overview }) => {
//     const [isopen, setIsopen] = useState(false);

//     const toggleaccordian = () => {
//         setIsopen(!isopen);
//     }
//     return (
//         <>
//             <div className='w-full mt-3 bg-[#2d2d2d] relative max-w-[93%] mx-auto'>
//                 <div onClick={toggleaccordian} className={`flex flex-row justify-between items-center text-white transition-all duration-200 ease-in-out hover:bg-gray-400/10 text-left text-2xl font-normal tracking-[2px] py-6  px-8`}>{title}{isopen ? <X /> : <Plus />}</div>

//                 <hr className='border-black w-full' />
//                 <div
//                     className={`transition-all duration-300 ease-in-out overflow-hidden  text-[20px]  tracking-[1px] text-white rounded px-8 ${isopen ? 'max-h-40 py-4' : 'max-h-0 py-0'}`}
//                 >{overview}</div>
//             </div>
//         </>
//     )
// };

// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import netflixlogo from '../assets/netflixlogo.png';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Slider from 'react-slick';
import { FaTv, FaDownload, FaMicrophone, FaSmile } from 'react-icons/fa';
import { X, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoaderScreen from '../utils/Shimmer';

const Home = () => {
    const [email, setEmail] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            fetchTopRated();
            setLoading(false);
        }, 2000);
    }, []);

    const fetchTopRated = async () => {
        const res = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=df15779593d380482a6c0db915aacd62');
        const data = await res.json();
        setMovies(data.results);
    };

    const handleStart = () => {
        localStorage.setItem('user_email', email);
        navigate('/register');
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    };

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className="absolute right-3 top-[45%] z-10 cursor-pointer text-white text-4xl"
                onClick={onClick}
            >
                <ChevronRight />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className="absolute left-3 top-[45%] z-10 cursor-pointer text-white text-4xl"
                onClick={onClick}
            >
                <ChevronLeft />
            </div>
        );
    }



    if (loading) {
        return <LoaderScreen />
    }
    return (
        <main className="bg-black text-white">
            {/* Hero Section */}
            <section className="relative bg-[url('/src/assets/net-bg.jpg')] bg-cover bg-center h-screen pb-40">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
                <div className="relative z-20 px-6 max-w-4xl mx-auto ">
                    <header className="flex justify-between items-center">
                        <img src={netflixlogo} alt="Logo" className="w-32 sm:w-40" />
                        <button onClick={() => navigate('/register')} className=" bg-red-700 hover:bg-red-600 px-4 py-2 md:px-5 md:py-1 text-sm md:text-base font-semibold rounded">
                            Sign Up
                        </button>
                    </header>

                    <div className="mt-32 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Unlimited movies,<br /> TV shows and more</h1>
                        <p className="text-lg mb-3">Starts at ₹149. Cancel anytime.</p>
                        <p className="text-sm mb-6">Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full sm:w-2/3 p-3 rounded bg-gray-50/5 border border-[#606060] focus:outline-none"
                            />
                            <button onClick={handleStart} className="bg-red-700 hover:bg-red-600 px-6 py-3 text-lg font-semibold rounded flex items-center justify-center tracking-wider gap-2">
                                Get Started <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Rated Movies */}
            <section className="py-12 xl:max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Top Rated</h2>
                <Slider {...settings}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="px-2 focus:outline-none">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-xl border border-gray-800"
                            />
                        </div>
                    ))}
                </Slider>
            </section>

            {/* Features */}
            <section className="py-12 max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">More reasons to join</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:h-[200px]">
                    <FeatureCard icon={<FaTv />} title="Enjoy on your TV" desc="Watch on smart TVs, PlayStation, Xbox, Chromecast and more." />
                    <FeatureCard icon={<FaDownload />} title="Download to watch offline" desc="Save your favourites easily." />
                    <FeatureCard icon={<FaMicrophone />} title="Watch everywhere" desc="Stream on phone, tablet, laptop and TV." />
                    <FeatureCard icon={<FaSmile />} title="Create profiles for kids" desc="Send kids on adventures in their space." />
                </div>
            </section>

            {/* FAQ */}
            <section className="py-12 max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                {faqData.map((item, i) => <Accordion key={i} title={item.q} desc={item.a} />)}
            </section>

            <div className=" max-w-5xl mx-auto px-6 text-center">
                <p className="text-sm mb-6">Ready to watch? Enter your email to create or restart your membership.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full sm:w-2/3 p-3 rounded bg-black/50 border border-gray-400 focus:outline-none"
                    />
                    <button onClick={handleStart} className="bg-red-700 hover:bg-red-600 px-6 py-3 text-lg font-semibold rounded flex items-center justify-center gap-2">
                        Get Started <ChevronRight />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 max-w-5xl mx-auto px-6 text-gray-400">
                <p>Questions? Call <span className="underline">000-800-919-1743</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm underline cursor-pointer">
                    <span>FAQ</span><span>Help Centre</span><span>Account</span><span>Media Centre</span>
                    <span>Investor Relations</span><span>Jobs</span><span>Ways to Watch</span><span>Terms of Use</span>
                    <span>Privacy</span><span>Cookie Preferences</span><span>Corporate Information</span><span>Contact Us</span>
                    <span>Speed Test</span><span>Legal Notices</span><span>Only on Netflix</span>
                </div>
                <p className="mt-10">Netflix India</p>
            </footer>
        </main>
    );
};

export default Home;

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-gradient-to-br from-[#1a2144] to-[#210e18] p-6 rounded-xl relative h-full">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{desc}</p>
        <div className="absolute bottom-4 right-4 text-3xl">{icon}</div>
    </div>
);

const Accordion = ({ title, desc }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-[#2d2d2d]  mb-3 overflow-hidden ">
            <button onClick={() => setOpen(!open)} className="w-full text-left p-4 flex justify-between items-center text-lg hover:bg-gray-400/10">
                {title}
                {open ? <X /> : <Plus />}
            </button><hr className="border-black" />
            <div className={`transition-all duration-300 ease-in-out px-4  text-gray-300 ${open ? 'max-h-40 opacity-100 py-4' : 'max-h-0 py-0'}`}>{desc}</div>
        </div>
    );
};

const faqData = [
    { q: "What is Netflix?", a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices." },
    { q: "How much does Netflix cost?", a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." },
    { q: "Where can I watch?", a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device." },
    { q: "How do I cancel?", a: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime." },
    { q: "What can I watch on Netflix?", a: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more." },
];
