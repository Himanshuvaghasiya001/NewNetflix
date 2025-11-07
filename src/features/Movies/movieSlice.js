import { createSlice } from "@reduxjs/toolkit";
import { getGenre, getMovie, upcomingMovies, trendingMovies, fetchMovieDetails, fetchMovieDetailsLogo, fetchAllMovies, fetchSearchMovies, fetchHorrorMovies } from "./movieApi"; // ✅ thunk import

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres: [],
    allGenres: [],
    upmovies: [],
    trending: [],
    horror: [],
    movieDetails: {},
    movieDetailsLogo: [],
    backdrops: {},
    detailImage: {},
    allMovies: [],
    currentPage: 1,
    totalPages: 0,
    searchall: [],
    loading: true,
    error: null,
    isSearchOpen: false,
  },
  reducers: {
    setSearchOPen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    clearSearch: (state) => {
      state.searchall = [];
      state.isSearchOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movies = [];
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.genres = action.payload.genres;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.loading = false;
        state.movies = [];
        state.genres = [];
        state.error = action.payload;
      })
      .addCase(getGenre.fulfilled, (state, action) => {
        state.genres = action.payload.genres;
        state.allGenres = action.payload.allGenres;
      })
      .addCase(upcomingMovies.fulfilled, (state, action) => {
        state.upmovies = action.payload.upmovies;
      })
      .addCase(trendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload.trending;
      })
      .addCase(fetchHorrorMovies.fulfilled, (state, action) => {
        state.horror = action.payload.horror;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetailsLogo.fulfilled, (state, action) => {
        state.movieDetailsLogo = action.payload;
        const { id, backdrops } = action.payload;
        state.backdrops[id] = backdrops;
        state.detailImage = action.payload.detailImage;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.allMovies = action.payload.allMovies;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.searchall = action.payload.searchall;
        console.log(state.searchall);
      })
  },
});

export const { clearSearch,setSearchOPen } = movieSlice.actions;
export default movieSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { getGenre, getMovie, upcomingMovies, trendingMovies, fetchMovieDetails, fetchMovieDetailsLogo, fetchAllMovies, fetchSearchMovies, fetchHorrorMovies } from "./movieApi"; // ✅ thunk import

// const movieSlice = createSlice({
//   name: "movies",
//   initialState: {
//     movies: [],
//     genres: [],
//     allGenres: [],
//     upmovies: [],
//     trending: [],
//     horror: [],
//     movieDetails: {},
//     movieDetailsLogo: [],
//     backdrops: {},
//     detailImage: {},
//     allMovies: [],
//     currentPage: 1,
//     totalPages: 0,
//     searchall: [],
//     loading: true,
//     error: null,
//     isSearchOpen: false,
//   },
//   reducers: {
//     setSearchOPen: (state, action) => {
//       state.isSearchOpen = action.payload;
//     },
//     clearSearch: (state) => {
//       state.searchall = [];
//       state.isSearchOpen = false;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getMovie.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.movies = [];
//         state.genres = [];
//       })
//       .addCase(getMovie.fulfilled, (state, action) => {
//         state.loading = false;
//         state.movies = action.payload.movies;
//         state.genres = action.payload.genres;
//       })
//       .addCase(getMovie.rejected, (state, action) => {
//         state.loading = false;
//         state.movies = [];
//         state.genres = [];
//         state.error = action.payload;
//       })

//       .addCase(getGenre.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getGenre.fulfilled, (state, action) => {
//         state.genres = action.payload.genres;
//         state.allGenres = action.payload.allGenres;
//       })
//       .addCase(getGenre.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.genres = [];
//         state.allGenres = [];
//       })

//       .addCase(upcomingMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.upmovies = [];
//       })
//       .addCase(upcomingMovies.fulfilled, (state, action) => {
//         state.upmovies = action.payload.upmovies;
//       })
//       .addCase(upcomingMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.upmovies = [];
//       })

//       .addCase(trendingMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.trending = [];
//       })
//       .addCase(trendingMovies.fulfilled, (state, action) => {
//         state.trending = action.payload.trending;
//       })
//       .addCase(trendingMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.trending = [];
//       })

//       .addCase(fetchHorrorMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.horror = [];
//       })
//       .addCase(fetchHorrorMovies.fulfilled, (state, action) => {
//         state.horror = action.payload.horror;
//       })
//       .addCase(fetchHorrorMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.horror = [];
//       })

//       .addCase(fetchMovieDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.movieDetails = {};
//       })
//       .addCase(fetchMovieDetails.fulfilled, (state, action) => {
//         state.movieDetails = action.payload;
//       })
//       .addCase(fetchMovieDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.movieDetails = {};
//       })

//       .addCase(fetchMovieDetailsLogo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.movieDetailsLogo = [];
//         state.backdrops = {};
//         state.detailImage = {};
//       })
//       .addCase(fetchMovieDetailsLogo.fulfilled, (state, action) => {
//         state.movieDetailsLogo = action.payload;
//         const { id, backdrops } = action.payload;
//         state.backdrops[id] = backdrops;
//         state.detailImage = action.payload.detailImage;
//       })
//       .addCase(fetchMovieDetailsLogo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.movieDetailsLogo = [];
//         state.backdrops = {};
//         state.detailImage = {};
//       })

//       .addCase(fetchAllMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.allMovies = [];
//         state.currentPage = 1;
//         state.totalPages = 0;
//       })
//       .addCase(fetchAllMovies.fulfilled, (state, action) => {
//         state.allMovies = action.payload.allMovies;
//         state.currentPage = action.payload.currentPage;
//         state.totalPages = action.payload.totalPages;
//       })
//       .addCase(fetchAllMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.allMovies = [];
//         state.currentPage = 1;
//         state.totalPages = 0;
//       })

//       .addCase(fetchSearchMovies.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.searchall = [];
//       })
//       .addCase(fetchSearchMovies.fulfilled, (state, action) => {
//         state.searchall = action.payload.searchall;
//         console.log(state.searchall);
//       })
//       .addCase(fetchSearchMovies.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.searchall = [];
//       })
//   },
// });

// export const { clearSearch,setSearchOPen } = movieSlice.actions;
// export default movieSlice.reducer;
