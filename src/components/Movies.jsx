import { ChevronLeft, ChevronRight, Heart, Loader } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { fetchHorrorMovies, fetchMovieDetailsLogo, getGenre, getMovie, trendingMovies, upcomingMovies } from "../features/Movies/movieApi";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addToWishlist, removeFromWishlist } from "../features/Movies/wishlistSlice";
import LoaderScreen, { Shimmer2, Shimmer3 } from "../utils/Shimmer";

const Movies = () => {

    const [f1, setf1] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [initialLoad, setInitialLoad] = useState(true);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api_key = "df15779593d380482a6c0db915aacd62";

    const { movies, genres, upmovies, trending, backdrops, horror } = useSelector(state => state.movies);
    const { wishlist } = useSelector(state => state.wishlist);

    useEffect(() => {
        dispatch(getMovie()),
            dispatch(getGenre()),
            dispatch(upcomingMovies()),
            dispatch(trendingMovies()),
            dispatch(fetchHorrorMovies())
    }, [dispatch]);


    useEffect(() => {
        trending.forEach(movie => {
            dispatch(fetchMovieDetailsLogo(movie.id));
        })
    }, [dispatch, trending])

    useEffect(() => {
        const fetchGameofthrone = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/911430?api_key=${api_key}`);
            const data = await res.json();
            setf1(data);
        }
        fetchGameofthrone();
    }, [])


    const getGenreNames = (ids) => {
        if (!ids || !Array.isArray(ids)) return "";
        if (!genres || typeof genres !== 'object') return "";
        return ids.map(id => genres[id]).filter(Boolean).join(" | ");
    };

    const isWishlisted = (id) => {
        return wishlist.some(item => item.id === id);
    };

    const handleWishlist = () => {
        if (isWishlisted(movies.id)) {
            dispatch(removeFromWishlist(movies.id));
        } else {
            dispatch(addToWishlist(movies));
        }
    };

    useEffect(() => {
        setTimeout(() => {
                setLoading(false);
        }, 900);
    }, [])


    return (
        <>
            <div className="relative w-full h-full  overflow-hidden">
                <video src="https://netflix-node-2.onrender.com/upload/f111.mp4" autoPlay loop muted
                    className="absolute top-0 left-0 w-full h-full object-cover " />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-black/70 to-black text-white">
                </div>
                <div className="">
                    <Navbar />
                </div>
                <div className="z-3 xl:max-w-[1500px] 2xl:max-w-full mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12">
                    <div className="text-white">
                        <div className=" px-1 sm:px-3 py-10 sm:py-26 lg:py-40 flex flex-col justify-center gap-3">
                            <div className="z-0 text-white text-[12px] sm:text-2xl xl:text-3xl tracking-[1px]">
                                {f1.genres?.map((genre) => { return genre.name }).join(" | ")}
                            </div>
                            <div className="z-0 lg:pt-4 text-3xl sm:text-6xl lg:text-7xl font-bold">
                                {f1.original_title}
                            </div>
                            <div className="z-0">
                                <div className="lg:pt-3 text-white font-semibold tracking-widest text-[14px] sm:text-[20px] md:text-2xl lg:text-[28px] ">{f1?.release_date?.split('-')[0]} | DIRECTOR : <span className="font-extralight">Joseph Kosinski</span></div>
                            </div>
                            <span className="z-0 flex flex-col gap-3">
                                <p className="font-normal tracking-widest lg:tracking-wide text-[12px] sm:text-[16px] lg:text-[20px] sm:w-[90%] lg:w-[78%]">TAGLINE : " {f1?.tagline} "</p>
                                <p className="font-extralight tracking-widest lg:tracking-wide text-[12px] sm:text-[16px] lg:text-[20px] sm:w-[90%] lg:w-[78%]">{f1?.overview}</p>
                            </span>
                            <div className="z-3 lg:pt-3">
                                <button onClick={() => { navigate(`/movie/${f1.id}`), window.scrollTo(0, 0) }} className="flex flex-row gap-2 items-center tracking-wide text-black text-[14px] sm:text-[18px] lg:text-[20px] px-5 py-2 sm:px-7 sm:py-3 bg-white lg:py-3 lg:px-6  rounded-4xl">▶ Play</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative bg-black text-white pb-5">
                <div>
                    <h2 className="pl-4 sm:pl-10 lg:pl-14 mb-[-50px] lg:mb-[-30px] text-[20px] md:text-2xl pb-1 sm:pb-2 md:pb-5 lg:pb-0 lg:text-4xl font-bold tracking-wide">Popular on Netflix</h2>
                    <div className="relative w-full h-full  overflow-visible z-0 ">
                        <div className="absolute left-0 top-14 z-10 h-84 xl:h-[410px] w-18 bg-gradient-to-r from-black/80 via-black/40 " />
                        <div className="absolute right-0 top-14 z-10 h-84 xl:h-[410px] w-18 bg-gradient-to-l from-black/80 via-black/40 " />
                        <div ref={prevRef} className="absolute left-0 top-[50%] transform  -translate-y-1/2 z-10 cursor-pointer">
                            <ChevronLeft className=" sm:w-10 sm:h-8 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <div ref={nextRef} className="absolute right-0 top-[50%] transform  -translate-y-1/2 z-10 cursor-pointer">
                            <ChevronRight className=" sm:w-10 sm:h-8 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <div className="relative overflow-visible">
                            <Swiper
                                modules={[Navigation]}
                                speed={600}         // 👈 Transition duration in ms
                                allowTouchMove={true} // 👈 Allow mouse/touch scroll
                                grabCursor={true}     // 👈 Show grabbing cursor
                                resistanceRatio={0.85} // 👈 Softens edge resistance
                                loop={false}
                                onInit={(swiper) => {
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1.5,
                                    },
                                    375: {
                                        slidesPerView: 2,
                                    },
                                    425: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3.5,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 4.5,
                                    },
                                    1280: {
                                        slidesPerView: 5,
                                    },
                                    1600: {
                                        slidesPerView: 9,
                                    }
                                }}
                            >
                                {
                                    loading ? <Shimmer2 />
                                        :
                                        movies.map((movie) => (
                                            <SwiperSlide onClick={() => { navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="relative z-10 px-2 py-14 hover:z-20 lg:first:ml-10 group ">
                                                <div className="transform-all group-hover:scale-50 md:group-hover:scale-100 lg:group-hover:scale-125 duration-100 ease-in-out">
                                                    <div className="relative rounded-xl overflow-hidden bg-black cursor-pointer">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                            alt={movie.title}
                                                            className="rounded-xl h-full w-full object-cover"
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="flex items-center gap-1 mb-2">
                                                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-black text-sm">▶</button>
                                                                <button onClick={handleWishlist} className="w-7 h-7 flex items-center justify-center rounded-full text-sm">
                                                                    {isWishlisted(movie.id) ? (
                                                                        <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 fill-red-600 text-red-600`} />
                                                                    ) : (
                                                                        <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 `} />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <h3 className="font-bold text-lg">{movie.title}</h3>
                                                            <p className="text-[12px] text-gray-300">{getGenreNames(movie.genre_ids)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="pb-10">
                    <h2 className="pl-4 sm:pl-10 lg:pl-14 text-[20px] md:text-2xl pb-2 sm:pb-2 md:pb-5 lg:pb-6 lg:text-4xl font-bold tracking-wide">Upcoming Movies</h2>
                    <div className="lg:pl-10 relative w-full h-full overflow-visible z-0 ">
                        <div className="absolute left-0 top-0 z-10 h-21 xl:h-42 w-18 bg-gradient-to-r from-black/80 via-black/40 " />
                        <div className="absolute right-0 top-0 z-10 h-21 xl:h-42 w-18 bg-gradient-to-l from-black/80 via-black/40 " />
                        <div className="relative overflow-visible">
                            <Swiper
                                modules={[Navigation]}
                                speed={600}         // 👈 Transition duration in ms
                                allowTouchMove={true} // 👈 Allow mouse/touch scroll
                                grabCursor={true}     // 👈 Show grabbing cursor
                                resistanceRatio={0.85} // 👈 Softens edge resistance
                                loop={false}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2.5,
                                        width: 400,
                                    },
                                    640: {
                                        slidesPerView: 4.5,
                                        width: 900,
                                    },
                                    768: {
                                        slidesPerView: 5,
                                        width: 900,
                                    },
                                    1024: {
                                        slidesPerView: 5.5,
                                        width: 1000,
                                    },
                                    1280: {
                                        slidesPerView: 4.5,
                                        width: 1400,
                                    },
                                    1600: {
                                        slidesPerView: 9,
                                    }
                                }}
                            >
                                {
                                    loading ? <Shimmer3 />
                                        :
                                        upmovies.map((movie) => (
                                            <SwiperSlide onClick={() => { navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="relative z-10 px-2 hover:z-20 group">
                                                <div className="transform-all duration-100 ease-in-out">
                                                    <div className="relative rounded-xl overflow-hidden bg-black group cursor-pointer">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                                            alt={movie.title}
                                                            // className="rounded-xl w-full h-[210px] md:h-[240px]  xl:h-[340px]"
                                                            className="rounded-xl w-full h-full"
                                                        />
                                                        <div
                                                            className="py-6 pt-14 absolute bottom-[-100px] group-hover:bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 transition-all duration-100 ease-in-out ">
                                                            <h3 className="tracking-wide text-center font-bold text-sm md:text-lg">{movie.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="pl-4 sm:pl-10 lg:pl-14 mb-[-50px] lg:mb-[-30px] text-[20px] md:text-2xl pb-1 sm:pb-2 md:pb-5 lg:pb-0 lg:text-4xl font-bold tracking-wide">Trending Now</h2>
                    <div className="relative w-full h-full  overflow-visible z-0 ">
                        <div className="absolute left-0 top-14 z-10 h-84 xl:h-[410px] w-18 bg-gradient-to-r from-black/80 via-black/40 " />
                        <div className="absolute right-0 top-14 z-10 h-84 xl:h-[410px] w-18 bg-gradient-to-l from-black/80 via-black/40 " />
                        <div ref={prevRef} className="absolute left-0 top-[50%] transform  -translate-y-1/2 z-10 cursor-pointer">
                            <ChevronLeft className=" sm:w-10 sm:h-8 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <div ref={nextRef} className="absolute right-0 top-[50%] transform  -translate-y-1/2 z-10 cursor-pointer">
                            <ChevronRight className=" sm:w-10 sm:h-8 lg:w-12 lg:h-12 text-white" />
                        </div>
                        <div className="relative overflow-visible">
                            <Swiper
                                modules={[Navigation]}
                                speed={600}         // 👈 Transition duration in ms
                                allowTouchMove={true} // 👈 Allow mouse/touch scroll
                                grabCursor={true}     // 👈 Show grabbing cursor
                                resistanceRatio={0.85} // 👈 Softens edge resistance
                                loop={false}
                                onInit={(swiper) => {
                                    swiper.params.navigation.nextEl = nextRef.current;
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.navigation.init();
                                    swiper.navigation.update();
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1.5,
                                    },
                                    375: {
                                        slidesPerView: 2,
                                    },
                                    425: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3.5,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 4.5,
                                    },
                                    1280: {
                                        slidesPerView: 5,
                                    },
                                    1600: {
                                        slidesPerView: 9,
                                    }
                                }}
                            >
                                {
                                    loading ? <Shimmer2 />
                                        :
                                        trending.map((movie) => (
                                            <SwiperSlide onClick={() => { navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="relative z-10 px-2 py-14 hover:z-20 lg:first:ml-10 group ">
                                                <div className="transform-all group-hover:scale-50 md:group-hover:scale-100 lg:group-hover:scale-125 duration-100 ease-in-out">
                                                    <div className="relative rounded-xl overflow-hidden bg-black cursor-pointer">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${backdrops[movie.id]}`}
                                                            alt={movie.title}
                                                            className="rounded-xl h-full w-full "
                                                        />
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="flex items-center gap-1 mb-2">
                                                                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-black text-sm">▶</button>
                                                                <button onClick={handleWishlist} className="w-7 h-7 flex items-center justify-center rounded-full text-sm">
                                                                    {isWishlisted(movie.id) ? (
                                                                        <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 fill-red-600 text-red-600`} />
                                                                    ) : (
                                                                        <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 `} />
                                                                    )}
                                                                </button>                                                        </div>
                                                            <h3 className="font-bold text-lg">{movie.title}</h3>
                                                            <p className="text-[12px] text-gray-300">{getGenreNames(movie.genre_ids)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="pb-10">
                    <h2 className="pl-4 sm:pl-10 lg:pl-14 text-[20px] md:text-2xl pb-2 sm:pb-2 md:pb-5 lg:pb-6 lg:text-4xl font-bold tracking-wide">Horror Movies</h2>
                    <div className="lg:pl-10 relative w-full h-full overflow-visible z-0 ">
                        <div className="absolute left-0 top-0 z-10 h-21 xl:h-42 w-18 bg-gradient-to-r from-black/80 via-black/40 " />
                        <div className="absolute right-0 top-0 z-10 h-21 xl:h-42 w-18 bg-gradient-to-l from-black/80 via-black/40 " />
                        <div className="relative overflow-visible">
                            <Swiper
                                modules={[Navigation]}
                                speed={600}         // 👈 Transition duration in ms
                                allowTouchMove={true} // 👈 Allow mouse/touch scroll
                                grabCursor={true}     // 👈 Show grabbing cursor
                                resistanceRatio={0.85} // 👈 Softens edge resistance
                                loop={false}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2.5,
                                        width: 400,
                                    },
                                    640: {
                                        slidesPerView: 4.5,
                                        width: 900,
                                    },
                                    768: {
                                        slidesPerView: 5,
                                        width: 900,
                                    },
                                    1024: {
                                        slidesPerView: 5.5,
                                        width: 1000,
                                    },
                                    1280: {
                                        slidesPerView: 4.5,
                                        width: 1400,
                                    },
                                    1600: {
                                        slidesPerView: 9,
                                    }
                                }}
                            >
                                {
                                    loading ? <Shimmer3 />
                                        :
                                        horror.map((movie) => (
                                            <SwiperSlide onClick={() => { navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="relative z-10 px-2 hover:z-20 group">
                                                <div className="transform-all duration-100 ease-in-out">
                                                    <div className="relative rounded-xl overflow-hidden bg-black group cursor-pointer">
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                                            alt={movie.title}
                                                            // className="rounded-xl w-full h-[210px] md:h-[240px]  xl:h-[340px]"
                                                            className="rounded-xl w-full h-full"
                                                        />
                                                        <div
                                                            className="py-6 pt-14 absolute bottom-[-100px] group-hover:bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 transition-all duration-100 ease-in-out ">
                                                            <h3 className="tracking-wide text-center font-bold text-sm md:text-lg">{movie.title}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Movies;