import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_URL } from "../utils/api";

const initialState = {
  upComingMovies: [],
  trendingMovies: [],
  playingNow: [],
  popularMovies: [],
  popularSeries: [],
  ratedMovies: [],
  ratedSeries: [],
  similarMovies: [],
  recommendedMovies: [],
  genresLoaded: false,
  genres: [],
  movies: [],
  likedMovies: [],
  movieGenres: [],
};

export const getGenres = createAsyncThunk("flixxit/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_URL}/genre/tv/list?api_key=${API_KEY}`);

  return genres;
});

export const getMovieGenres = createAsyncThunk(
  "flixxit/moviegenres",
  async () => {
    const {
      data: { genres },
    } = await axios.get(`${TMDB_URL}/genre/movie/list?api_key=${API_KEY}`);

    return genres;
  }
);

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
        type: movie?.release_date ? "movie" : "tv",
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

export const fetchUpComingMovies = createAsyncThunk(
  "flixxit/upcoming",
  async ({ type, id }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/movie/upcoming?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "flixxit/trending",
  async ({ type, id }, thunkAPI) => {
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

export const fetchPlayingNow = createAsyncThunk(
  "flixxit/playingnow",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/${type}/now_playing?api_key=${API_KEY}`,
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
      `${TMDB_URL}/${type}/popular?api_key=${API_KEY}`,
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

export const fetchSimilarMovies = createAsyncThunk(
  "flixxit/similar",
  async ({ type, id }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/${type}/${id}/similar?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchRecommendedMovies = createAsyncThunk(
  "flixxit/recommended",
  async ({ type, id }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_URL}/${type}/${id}/recommendations?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "flixxit/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:8000/api/users/liked/${email}`);
    return movies;
  }
);

export const removeMovieFromLiked = createAsyncThunk(
  "flixxit/deleteLiked",
  async ({ movieId, email }) => {
    const {
      data: { movies },
    } = await axios.put("http://localhost:8000/api/users/remove", {
      email,
      movieId,
    });
    return movies;
  }
);

const FlixxitSlice = createSlice({
  name: "Flixxit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMovieGenres.fulfilled, (state, action) => {
      state.movieGenres = action.payload;
      // state.genresLoaded = true;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = state.movieGenres.concat(action.payload);
      state.genresLoaded = true;
    });
    builder.addCase(fetchUpComingMovies.fulfilled, (state, action) => {
      state.upComingMovies = action.payload;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.trendingMovies = action.payload;
    });
    builder.addCase(fetchPlayingNow.fulfilled, (state, action) => {
      state.playingNow = action.payload;
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
    builder.addCase(fetchSimilarMovies.fulfilled, (state, action) => {
      state.similarMovies = action.payload;
    });
    builder.addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
      state.recommendedMovies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.likedMovies = action.payload;
    });
  },
});
export const store = configureStore({
  reducer: {
    flixxit: FlixxitSlice.reducer,
  },
});

export const { setGenres, setMovies } = FlixxitSlice.actions;
