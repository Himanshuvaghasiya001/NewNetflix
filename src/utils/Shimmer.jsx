import React from 'react';

const LoaderScreen = () => {
    return (
        <div className="min-h-dvh max-h-dvh overflow-hidden max-w-screen flex justify-center items-center bg-black">
            <div className="loader"></div>
        </div>
    );
};

export default LoaderScreen;

export const RingLoader = () => {
    return (
        <>
            <div className='relative  py-10'>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    <div className="red-ring-loader"></div>
                </div>
            </div>
        </>
    );
};

export const RingLoader2 = () => {
    return (
        <>
            <span class="loader2"></span>
        </>
    );
};

export const Shimmer = () => {
    return (
        <>
            <div className='w-full h-screen bg-black px-5 sm:px-10 xl:px-10 py-5 text-white flex flex-col gap-2 sm:gap-5 xl:gap-3'>
                <div className='bg-[#272727] rounded-2xl h-44 sm:h-92 xl:h-[470px] xl:w-full'></div>
                <div className='bg-[#272727] rounded-3xl h-8 w-24 sm:h-10 sm:w-58 xl:h-9 xl:w-[430px]'></div>
                <div className='bg-[#272727] rounded-3xl h-8 w-36 sm:h-10 sm:w-86 xl:h-9 xl:w-[650px]'></div>
                <div className='bg-[#272727] rounded-[50px] h-12 w-58 sm:h-20 sm:w-[500px] xl:h-18 xl:w-[1000px]'></div>
                <div className='bg-[#272727] rounded-3xl h-6 w-full sm:h-0 sm:w-0'></div>
                <div className='bg-[#272727] rounded-2xl h-54 w-full sm:h-0 sm:w-0'></div>  
            </div>
        </>
    );
};

export const Shimmer2 = () => {
    return (
        <>
            <div className='py-14 sm:pl-2 lg:pl-12 xl:pl-12 px-2 sm:px-0 flex flex-row gap-0 sm:gap-5 xl:gap-5 w-full'>
                <div className='bg-[#272727] w-full mx-2 sm:mx-0 lg:h-86 h-72 xl:h-[392px] rounded-2xl'></div>
                <div className='bg-[#272727] w-[44%] sm:w-full lg:h-86 mx-2 sm:mx-0 h-72 xl:h-[392px] rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-full lg:h-86 xl:w-full xl:h-[392px] rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-full lg:h-86 xl:w-full xl:h-[392px] rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-0 lg:w-[30%] lg:h-86 xl:w-[88%] xl:h-[392px] rounded-2xl'></div>
            </div>
        </>
    );
};

export const Shimmer3 = () => {
    return (
        <>
            <div className='pl-2 flex flex-row gap-1 sm:gap-3 xl:gap-4 w-full'>
                <div className='bg-[#272727] w-full h-22 mx-1 sm:mx-0 lg:w-full xl:w-full xl:h-42 rounded-2xl'></div>
                <div className='bg-[#272727] w-full h-22 mx-1 sm:mx-0 lg:w-full xl:w-full xl:h-42 rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-full lg:w-full xl:w-full xl:h-42 rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-full lg:w-full xl:w-full xl:h-42 rounded-2xl'></div>
                <div className='bg-[#272727] w-0 sm:w-[40%] lg:w-full xl:w-[30%] xl:h-42 rounded-2xl'></div>
                <div className='bg-[#272727] lg:w-[40%] xl:w-0 rounded-2xl'></div>
            </div>
        </>
    );
};


