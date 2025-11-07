import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import LoaderScreen from "../utils/Shimmer";

const Wishlist = () => {

    const [loading, setLoading] = React.useState(true);
    const Navigate = useNavigate();
    const { wishlist } = useSelector(state => state.wishlist);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [wishlist]);

    if (loading) {
        return <LoaderScreen />
    }
    return (
        <>
            <div className=" w-full h-full relative ">
                <div className="w-full  h-full min-h-screen bg-[url(../assets/filterBG.webp)] object-cover relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black z-0"></div>
                    <Navbar className="z-1"/>
                    <div className="pt-10 lg:pt-20 flex flex-col items-center px-1 z-1">
                        <h2 className="text-white text-lg md:text-[20px] lg:text-[24px] xl:text-2xl pb-2 sm:pb-2 md:pb-5 lg:pb-6 font-bold tracking-widest md:tracking-wide z-1">Related Movies</h2>
                        <div className="sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] w-full cursor-pointer z-1">
                            {
                                wishlist.map((movie) => (
                                    <div onClick={() => { Navigate(`/movie/${movie.id}`), window.scrollTo(0, 0) }} key={movie.id} className="flex flex-row items-center  lg:gap-4 gap-2 text-white  bg-[#161616] p-1 md:p-3 my-3 rounded-lg md:rounded-2xl">
                                        <div className=" sm:w-[34%]">
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                                alt={movie.title}
                                                className="w-50 sm:w-78 object-cover rounded-lg md:rounded-2xl" />
                                        </div>
                                        <div className="w-[66%] flex flex-col gap-0 sm:gap-2 tracking-widest xl:tracking-normal">
                                            <div className="text-[10px] sm:text-[15px] xl:text-[21px] font-bold">{movie.original_title}</div>
                                            <p className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Genres : {movie.genres?.map((genre) => { return genre.name }).join(", ")}</p>
                                            <div className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Released on : {movie.release_date?.split('-')[0]}</div>
                                            <div className="text-[10px] sm:text-[13px]  xl:text-lg font-medium">Popularity : {Math.floor(movie.popularity)} M</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Wishlist;