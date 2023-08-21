import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_URL } from "../utils/constants";

const initialState = {
  trendingMovies: [],
  popularMovies: [],
  popularSeries: [],
  ratedMovies: [],
  ratedSeries: [],
  genresLoaded: false,
  genres: [],
  movies: [],
};

export const getGenres = createAsyncThunk("flixxit/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_URL}/genre/movie/list?api_key=${API_KEY}`);

  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        title: movie?.original_name
          ? movie.original_name
          : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 2),
        type: movie.media_type,
        desc: movie.overview,
        date: movie?.release_date ? movie.release_date : movie.first_air_date,
        rating: movie.vote_average,
        ageLimit: movie.adult,
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "flixxit/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "flixxit/trending",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "flixxit/popularmovies",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/movie/popular?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchPopularSeries = createAsyncThunk(
  "flixxit/popularseries",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/tv/popular?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchRatedMovies = createAsyncThunk(
  "flixxit/ratedmovies",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/movie/top_rated?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchRatedSeries = createAsyncThunk(
  "flixxit/ratedseries",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/tv/top_rated?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);
// export const getUsersLikedMovies = createAsyncThunk(
//   "flixxit/getLiked",
//   async (email) => {
//     const {
//       data: { movies },
//     } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
//     return movies;
//   }
// );

// export const removeMovieFromLiked = createAsyncThunk(
//   "flixxit/deleteLiked",
//   async ({ movieId, email }) => {
//     const {
//       data: { movies },
//     } = await axios.put("http://localhost:5000/api/user/remove", {
//       email,
//       movieId,
//     });
//     return movies;
//   }
// );

const FlixxitSlice = createSlice({
  name: "Flixxit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMovies = action.payload;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchPopularSeries.fulfilled, (state, action) => {
      state.popularSeries = action.payload;
    });
    builder.addCase(fetchRatedMovies.fulfilled, (state, action) => {
      state.ratedMovies = action.payload;
    });
    builder.addCase(fetchRatedSeries.fulfilled, (state, action) => {
      state.ratedSeries = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    // builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
    // builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
  },
});
export const store = configureStore({
  reducer: {
    flixxit: FlixxitSlice.reducer,
  },
});

export const { setGenres, setMovies } = FlixxitSlice.actions;
