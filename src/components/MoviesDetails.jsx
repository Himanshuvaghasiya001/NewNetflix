import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieDetailsLogo, getGenre } from "../features/Movies/movieApi";
import nlogo from '../assets/nlogo.png'
import { Heart } from "lucide-react";
import { addToWishlist, removeFromWishlist } from "../features/Movies/wishlistSlice";
import LoaderScreen, { Shimmer } from "../utils/Shimmer";

const MoviesDetails = ({ }) => {

    const [genresname, setGenresname] = useState([]);
    const [genrerelated, setGenrerelated] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [trailerFetched, setTrailerFetched] = useState(false);
    const [loading, setLoading] = useState(true);

    const api_key = "df15779593d380482a6c0db915aacd62";

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { movieDetails, movieDetailsLogo, genres } = useSelector(state => state.movies);
    const { wishlist } = useSelector(state => state.wishlist);

    useEffect(() => {
        setShowTrailer(false);
        setTrailerKey(null);
        setTrailerFetched(false);
    }, [id]);

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
        dispatch(fetchMovieDetailsLogo(id));
        dispatch(getGenre());
    }, [dispatch, id])

    useEffect(() => {
        setGenresname(movieDetails.genres);
    }, [movieDetails])

    useEffect(() => {
        const fetchGenresrelated = async () => {

            if (movieDetails.genres?.length > 0) {
                const genreIds = movieDetails.genres.map(g => g.id).join(",");
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreIds}`);
                const data = await response.json();
                const filtered = data.results.filter(movie => movie.id !== movieDetails.id);
                setGenrerelated(filtered);
            }
        }
        fetchGenresrelated();
    }, [movieDetails])

    const getGenreNames = (ids) => {
        if (!ids || !Array.isArray(ids)) return "";
        if (!genres || typeof genres !== 'object') return "";
        return ids.map(id => genres[id]).filter(Boolean).join(" | ");
    };

    const handlePlay = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}`);
            const data = await res.json();

            const youtubeTrailer = data.results.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
            );

            setTrailerFetched(true);

            if (youtubeTrailer) {
                setTrailerKey(youtubeTrailer.key);
                setShowTrailer(true);
            }
            else {
                setTrailerKey(null);
                setShowTrailer(false);
            }
        }
        catch (err) {
            console.log(err);
            setTrailerFetched(true); // still set, even on error
            setTrailerKey(null);
            setShowTrailer(false);
        }
    };

    const isWishlisted = wishlist.some(item => item.id === movieDetails?.id);

    const handleWishlist = () => {
        if (isWishlisted) {
            dispatch(removeFromWishlist(movieDetails.id));
        } else {
            dispatch(addToWishlist(movieDetails));
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (movieDetails && genrerelated.length > 0) {
                setLoading(false);
            }
        }, 1000);
    }, [movieDetails, genrerelated]);

    if (loading) {
        return <Shimmer />
    }
    return (
        <>
            <div>
                {
                    
                    showTrailer && trailerKey ?
                        (
                            <iframe
                                key={`${id}-${trailerKey}`}
                                width="100%"
                                height="600"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                                title="YouTube Trailer"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                // className="w-full h-full sm:h-[60vh]  xl:h-[70vh] object-cover"
                                className="w-full  h-48 sm:h-96 object-top object-cover"

                            ></iframe>
                        ) : trailerFetched && !trailerKey ? (
                            <>
                                <div className="flex items-center justify-center h-[35vh] sm:h-[70vh] bg-black text-white text-xl font-semibold">
                                    Video not found ❌
                                </div>
                            </>
                        ) : (
                            <><div className="relative overflow-hidden">
                                <div className="">
                                    <img src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                                        alt={movieDetails.title}
                                        className="w-full h-full lg:scale-[1.1] xl:h-[500px] object-top object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/100 via-black/70 to-black/0 "></div>
                                <div className="absolute top-4 left-5 sm:left-10 lg:left-14 flex flex-row gap-3 sm:gap-4 items-center">
                                    <img src={nlogo} onClick={() => { navigate(`/home`) }} alt="netflix logo" className="w-3 sm:w-4 lg:w-5.5" />
                                    <div className="text-white text-sm sm:text-lg lg:text-2xl font-bold tracking-wide uppercase">Movies</div>
                                </div>
                                <div className="absolute top-25 sm:top-70 lg:top-70 xl:top-50 left-5 sm:left-10 lg:left-14 ">
                                    <img src={`https://image.tmdb.org/t/p/original/${movieDetailsLogo.logos?.file_path}`} alt=""
                                        className="w-20 lg:w-1/9 xl:w-1/3 object-cover"
                                    />
                                </div>
                                <div className=" absolute bottom-0 left-5 sm:left-10 lg:left-14  flex flex-row items-center gap-4">
                                    <button onClick={handlePlay} className="text-black bg-white text-sm sm:text-lg lg:text-[22px] tracking-wide font-bold px-4 sm:px-5 lg:px-10 py-1 rounded-md"><span className="text-sm md:text-lg pr-1">▶</span> Play</button>
                                    <div className="relative group flex flex-col justify-center items-center">
                                        <button onClick={handleWishlist} className="text-white border-2 border-1/2 p-1 flex items-center justify-center rounded-full text-sm group ">{isWishlisted ? (
                                            <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 fill-red-600 text-red-600`} />
                                        ) : (
                                            <Heart className={`w-5 h-5 sm:w-7 sm:h-7 lg:w-9  lg:h-9 xl:w-7 xl:h-7 `} />
                                        )}</button>
                                        <div className="absolute bottom-10  w-[160px] text-center mb-4 text-sm font-bold py-1 rounded-md hidden group-hover:block text-black bg-white">Add to Favourite !</div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}
                <div className="bg-black w-full h-full pt-5 md:py-10  xl:px-4 tracking-wide">
                    <div className="flex flex-col sm:flex-row justify-between items-top w-full px-5 sm:px-10">
                        <div className="w-full md:w-[75%]">
                            <div className="text-white py-1 text-sm xl:text-[19px]"><span className="text-gray-300 text-sm xl:text-[22px]">Released on : </span>{movieDetails?.release_date}</div>
                            <div className="text-white py-1 text-sm xl:text-[19px]"><span className="text-gray-300 text-sm xl:text-[22px]">Name : </span>{movieDetails.original_title}</div>
                        </div>
                        <div className="w-full md:w-[25%]">
                            <div className="text-white py-1 text-sm xl:text-[19px]"><span className="text-gray-300 text-sm xl:text-[22px]">Genres : </span>{genresname?.map((genre) => { return genre.name }).join(", ")}</div>
                            <div className="text-white py-1 text-sm xl:text-[19px]"><span className="text-gray-300 text-sm xl:text-[22px]">Popularity : </span>{movieDetails.popularity}</div>
                        </div>
                    </div>
                    <p className="text-gray-300 px-5 sm:px-10 lg:tracking-wider text-sm xl:text-[19px] tracking-widest w-full md:w-1/2 pt-5">{movieDetails.overview}</p>
                    <div className="pt-10 lg:pt-20 flex flex-col items-center px-1">
                        <h2 className="text-white text-lg md:text-[20px] lg:text-[24px] xl:text-2xl pb-2 sm:pb-2 md:pb-5 lg:pb-6 font-bold tracking-widest md:tracking-wide">Related Movies</h2>
                        <div className="sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] w-full cursor-pointer ">
                            {
                                genrerelated.filter(movie => movie.backdrop_path).map((movie) => (
                                    <div onClick={() => { navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="flex flex-row items-center  lg:gap-4 gap-2 text-white  bg-[#161616] p-1 md:p-3 my-3 rounded-lg md:rounded-2xl">
                                        <div className=" sm:w-[34%]">
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                                alt={movie.title}
                                                className="w-50 sm:w-78 object-cover rounded-lg md:rounded-2xl" />
                                        </div>
                                        <div className="w-[66%] flex flex-col gap-0 sm:gap-2 tracking-widest xl:tracking-normal">
                                            <div className="text-[10px] sm:text-[15px] xl:text-[21px] font-bold">{movie.title}</div>
                                            <p className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Genres : {getGenreNames(movie.genre_ids)}</p>
                                            <div className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Released on : {movie.release_date?.split('-')[0]}</div>
                                            <div className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Popularity : {Math.floor(movie.popularity)} M</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default MoviesDetails;