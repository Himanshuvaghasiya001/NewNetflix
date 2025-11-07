import React, { useEffect, useState } from 'react';

const Prac = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/541671/images?api_key=590aea04d220db1227327cf0517c90');
        const data = await response.json();
        setData(data);
    }

    return (
        <>
            <img src={`https://image.tmdb.org/t/p/original${data[1]?.file_path}`} alt="prabhu" />
        </>
    )
}

export default Prac;