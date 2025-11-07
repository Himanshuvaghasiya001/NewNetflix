import React, { useEffect, useState } from "react";
import avengers from "../assets/avengers.png";
import Navbar from "./Navbar";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Funnel, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies, getGenre } from "../features/Movies/movieApi";
import { useNavigate } from "react-router-dom";
import LoaderScreen, { RingLoader } from "../utils/Shimmer";

const AllMovies = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [lang, setLang] = useState("");
    const [year, setYear] = useState("");
    const [sort, setSort] = useState("");
    const [selgenre, setselGenre] = useState([]);
    const [localPage, setLocalPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { allMovies, genres, totalPages, allGenres } = useSelector(state => state.movies);

    const Year = 2025;
    const Years = [];

    for (let i = Year; i >= 1950; i--) {
        Years.push(i);
    }

    useEffect(() => {
        dispatch(fetchAllMovies({ page: localPage, lang, year, sort, genre: selgenre }));
        dispatch(getGenre());
    }, [dispatch, localPage]);

    const sortby = ["Popularity", "Rating(High to Low)", "Rating(Low to High)", "Name(A - Z)", "Name(Z - A)"];
    const Languages = [
        { label: "English", code: "en" },
        { label: "Spanish", code: "es" },
        { label: "French", code: "fr" },
        { label: "Chinese", code: "zh" },
        { label: "Hindi", code: "hi" }
    ];

    const getGenreNames = (ids) => {
        if (!ids || !Array.isArray(ids)) return "";
        if (!genres || typeof genres !== 'object') return "";
        return ids.slice(0, 3).map(id => {
            const genre = genres[id];
            return genre === "Science Fiction" ? "Sci-Fi" : genre;
        }).filter(Boolean).join(" | ");
    };

    const handlePageChange = (newPage) => {
        setLocalPage(newPage);
        dispatch(fetchAllMovies({ page: localPage, lang, year, sort, selgenre }));
    };

    const toggleGenre = (id) => {
        setselGenre((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((g) => g !== id)
                : [...prev, id];
            console.log("Selected genres:", updated); // ✅ ADD THIS
            return updated;
        });
    };


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [allMovies]);

    if (loading) {
        return <LoaderScreen />
    }
    return (
        <>
            <div className=" w-full h-full relative ">
                <div className="w-full  h-full min-h-screen bg-[url(../assets/filterBG.webp)] object-cover relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black z-0"></div>
                    <Navbar />
                    <div className="max-w-[300px] md:max-w-[650px] lg:max-w-[700px] xl:max-w-[900px] mx-auto bg-[#e7dbdb] rounded-lg text-white z-10">
                        <button onClick={() => setOpen(!open)} className="relative w-full text-left p-4 flex justify-between items-center tracking-wider font-semibold">
                            Filter Movies <Funnel className="absolute left-34 w-4 h-4 lg:w-4 xl:w-5 lg:h-4 xl:h-5" />
                            {open ? <ChevronUp className="lg:w-5 lg:h-5 " /> : <ChevronDown className="lg:w-5 lg:h-5 " />}
                        </button><hr className={`border-black border-1 ${open ? ' opacity-100' : 'transition-all duration-500 ease-in-out opacity-0'}`} />
                        <div className={`flex flex-col items-center md:gap-4 xl:gap-8 transition-all duration-300 ease-in-out px-4 text-gray-300 ${open ? ' max-h-40 opacity-100 py-4 pb-90 sm:pb-76 lg:pb-96 ' : 'max-h-0 py-0 opacity-0'}`}>
                            <div className="flex sm:flex-row flex-wrap md:gap-10 lg:gap-2 xl:gap-7 justify-between items-top  lg:px-6 xl:px-10 lg:tracking-wide xl:tracking-wider z-10">
                                <div >
                                    <button value={lang} onClick={() => setOpen2(!open2)} className="border border-[#545250] text-xs sm:text-sm text-white font-semibold flex flex-row justify-between items-center px-2 py-1 w-20 md:w-26 lg:w-38 xl:w-44 rounded">{lang || "Languages"}{open2 ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}</button>
                                    <div className={`transition-all duration-200 ease-in-out border cursor-pointer text-center text-white rounded border-[#545250] ${open2 ? 'mt-4 max-h-auto opacity-100' : 'mb-0 md:max-h-50 lg:max-h-50 xl:max-h-0 opacity-0'}`}>
                                        {Languages.map((lang, i) => (
                                            <div key={i}>
                                                <div onClick={() => { setLang(lang.code); setOpen2(false) }} className="py-1 text-xs md:text-[13px] lg:text-xs xl:text-sm  hover:bg-[#454444da] transition-all duration-200">{lang.label}</div><hr className="border-[#545250]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div >
                                    <button value={year} onClick={() => setOpen3(!open3)} className="border border-[#545250] text-xs sm:text-sm text-white font-semibold flex flex-row justify-between items-center px-2 py-1 w-15 md:w-24 lg:w-38 xl:w-44 rounded">{year || "Year"}{open3 ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}</button>
                                    <div className={`transition-all duration-200 ease-in-out cursor-pointer border text-center text-white rounded border-[#545250] overflow-y-scroll scrollbar-hide ${open3 ? 'mt-4 max-h-31 md:max-h-50 lg:max-h-50 xl:max-h-64 opacity-100' : 'mb-0 max-h-0 opacity-0'}`}>
                                        {
                                            Years.map((year, i) => (
                                                <div key={i}>
                                                    <div onClick={() => { setYear(year); setOpen3(false) }} className="py-1 text-xs md:text-[13px] lg:text-xs xl:text-sm  hover:bg-[#454444da] transition-all duration-200">{year}</div><hr className="border-[#545250]" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div >
                                    <button value={sort} onClick={() => setOpen4(!open4)} className="border border-[#545250] text-xs sm:text-sm text-white font-semibold flex flex-row justify-between items-center px-2 py-1 w-30 md:w-40 lg:w-38 xl:w-44 rounded">{sort || "Sort By"}{open4 ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}</button>
                                    <div className={`transition-all duration-200 ease-in-out cursor-pointer border text-center text-white rounded border-[#545250]  overflow-y-scroll scrollbar-hide ${open4 ? 'mt-4 md:max-h-50 max-h-31 lg:max-h-50 xl:max-h-auto opacity-100' : 'mb-0 max-h-0 opacity-0'}`}>
                                        {
                                            sortby.map((sort, i) => (
                                                <div key={i}>
                                                    <div onClick={() => { setSort(sort); setOpen4(false) }} className="py-2 text-xs md:text-[13px] lg:text-xs xl:text-sm  hover:bg-[#454444da] transition-all duration-200">{sort}</div><hr className="border-[#545250]" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div >
                                    <button className="pt-5 sm:p-0 text-sm text-white font-semibold  flex flex-row justify-between items-center px-2 py-1 lg:w-30 xl:w-44 rounded">Genres</button>
                                    <div className={`grid grid-cols-3 sm:grid-cols-1 sm:mt-4 transition-all duration-200 ease-in-out h-24 md:h-50 lg:h-50 xl:h-64 text-start text-white rounded overflow-x-scroll sm:overflow-y-scroll scrollbar-hide `}>
                                        {allGenres?.map((genre) => (
                                            <div key={genre.id} className="flex flex-row items-center gap-3 py-1 md:text-[13px] text-xs cursor-pointer  w-full">
                                                <input
                                                    type="checkbox"
                                                    id={`genre-${genre.id}`}
                                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                                                    checked={selgenre.includes(genre.id)}
                                                    onChange={() => toggleGenre(genre.id)}
                                                />
                                                <label htmlFor={`genre-${genre.id}`} className="cursor-pointer ">{genre.name}</label>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div className="z-10">
                                <button onClick={() => {
                                    setLocalPage(1);
                                    dispatch(fetchAllMovies({ page: 1, lang, year, sort, genre: selgenre }));
                                    setOpen(false);
                                }} className="bg-red-600 hover:bg-red-700 px-3 md:px-4 xl:px-5 py-1 text-sm xl:text-base font-semibold rounded flex items-center justify-center gap-2">Filter<Sparkles className="w-4 xl:w-5 h-4 xl:h-5" /></button>
                            </div>
                        </div>
                    </div>
                    <div className=" text-white px-5 sm:px-0 xl:w-[1300px] mx-auto  py-10 rounded-lg z-10 flex flex-col items-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {
                                loading ? (
                                    <RingLoader />
                                ) : allMovies?.filter(movie => movie.poster_path).length > 0 ? (
                                    allMovies
                                        .filter(movie => movie.poster_path)
                                        .map((movie) => (
                                            <div
                                                onClick={() => {
                                                    Navigate(`/movie/${movie.id}`);
                                                    window.scrollTo(0, 0);
                                                }}
                                                key={movie.id}
                                                className="relative group cursor-pointer overflow-hidden"
                                            >
                                                {/* Movie Image */}
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                    className="md:w-[200px] md:h-[250px] xl:w-[200px] xl:h-[290px] object-cover rounded-2xl"
                                                />

                                                {/* Gradient + Content */}
                                                <div className="absolute inset-0 flex items-end">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-2xl translate-y-full group-hover:translate-y-0 transition-all duration-200 ease-in-out z-0"></div>

                                                    <div className="z-10 w-full text-center px-4 pb-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out">
                                                        <h2 className="text-white font-semibold">{movie.title}</h2>
                                                        <p className="text-xs text-gray-200">{getGenreNames(movie.genre_ids)}</p>
                                                        <span className="text-xs text-gray-200">{Math.floor(movie.popularity)} M</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="z-1 py-10 sm:px-20 md:px-44 xl:px-52 ">
                                        <h2 className="text-white text-center font-bold sm:text-2xl whitespace-nowrap">No movies found</h2>
                                    </div>
                                )
                            }

                        </div>
                        <div className=" z-1">
                            <Pagination
                                currentPage={localPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMovies;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex flex-row items-center justify-between py-5 ">
            <button className={`flex flex-row items-center gap-3 px-4 py-2 rounded-lg text-sm sm:text-lg ${currentPage === 1 ? 'bg-[#1B1B1B]' : 'bg-red-600'}`} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                Prev
            </button>
            <span className="px-5"> {currentPage} </span>
            <button className={`flex flex-row items-center gap-3 px-4 py-2 rounded-lg text-sm sm:text-lg bg-red-600`} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
        </div>
    );
};
