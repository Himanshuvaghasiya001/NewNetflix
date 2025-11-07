import { createAsyncThunk } from "@reduxjs/toolkit";

const api_key = "df15779593d380482a6c0db915aacd62";


export const getMovie = createAsyncThunk(
    "movies/getMovies",
    async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
        const data = await response.json();
        return { movies: data.results };
x    }
);

export const getGenre = createAsyncThunk(
    "movies/getGenres",
    async () => {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`);
        const data = await response.json();
        const genreMap = {};
        data.genres.forEach((g) => {
            genreMap[g.id] = g.name;
            // console.log(g.id);
        });
        return {
            genres: genreMap,
            allGenres: data.genres
        };
    }
);

export const upcomingMovies = createAsyncThunk(
    "movies/upcomingMovies",
    async () => {
        const totalPage = 10;
        const allUpcoming = [];

        for (let Page = 1; Page <= totalPage; Page++) {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&page=${Page}`
            );
            const data = await response.json();

            // ✅ Only keep movies with poster_path (image)
            const filtered = data.results
                .filter(
                    (movie) =>
                        movie.poster_path !== null && movie.backdrop_path !== null
                )
                .slice(0, 5); // first 5 valid images per page

            allUpcoming.push(...filtered);
        }

        const today = new Date();

        const upcoming = allUpcoming.filter((movie) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate > today;
        });

        return { upmovies: upcoming };
    }
);


export const trendingMovies = createAsyncThunk(
    "movies/trendingMovies",
    async () => {

        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);
        const data = await response.json();
        return { trending: data.results };
    }
);

export const fetchMovieDetails = createAsyncThunk(
    "movies/MoviesDetails",
    async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`);
        const data = await response.json();
        return data;    
    }
);

export const fetchMovieDetailsLogo = createAsyncThunk(
    "movies/MoviesDetailsLogo",
    async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${api_key}`);
        const data = await response.json();

        const englishLogo = data.logos.find(logo => logo.iso_639_1 === "en");
        const enPoster = data.posters.find((poster) => poster.iso_639_1 === "en" && poster.height === 1500 && poster.file_path);

        return {
            id,
            logos: englishLogo || data.logos[0],
            backdrops: (enPoster && enPoster.file_path) || data.posters[1].file_path || null,
            detailImage :data
        };
    }
);

export const fetchAllMovies = createAsyncThunk(
    "movies/allMovies",
    async ({ page = 1, lang = "", year = "", sort = "", genre = [] }) => {

        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&page=${page}`;

        if (lang) url += `&with_original_language=${lang}`;

        if (year) url += `&primary_release_year=${year}`;

        if (sort) {
            const sortMap = {
                "Popularity": "popularity.desc",
                "Rating(High to Low)": "vote_average.desc",
                "Rating(Low to High)": "vote_average.asc",
                "Name(A - Z)": "original_title.asc",
                "Name(Z - A)": "original_title.desc"
            };
            url += `&sort_by=${sortMap[sort] || "popularity.desc"}`;
        }

        if (genre.length > 0) {
            url += `&with_genres=${genre.join(",")}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        // const filterd = data.results.filter(movie => movie.poster_path !== null && movie.backdrop_path !== null);
        // const allMovies = filterd.slice(0, 20);
        const allMovies = data.results;
        return {
            allMovies,
            totalPages: data.total_pages,
            currentPage: page
        }
    }
);


export const fetchSearchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (search) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`);
        const data = await response.json();
        console.log(data.results);
        const filtered = data.results.filter(movie => movie.poster_path !== null && movie.backdrop_path !== null);
        return {
            searchall: filtered
        }
    }
);

export const fetchHorrorMovies = createAsyncThunk(
    "movies/horrorMovies",
    async () => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=27&with_original_language=en`);
        const data = await response.json();
        const filtered = data.results.filter(movie => movie.poster_path !== null && movie.backdrop_path !== null);
        return {
            horror: filtered
        }
    }
);
    