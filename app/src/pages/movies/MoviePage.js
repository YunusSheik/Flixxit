import React, { useEffect, useState } from "react";
import "./moviepage.css";
import ContentList from "../../components/contentList/ContentList";
import TrendingList from "../../components/mainLists/TrendingList";
import PopularMovies from "../../components/mainLists/PopularMovies";
import RatedMovies from "../../components/mainLists/RatedMovies";
import { Navbar } from "../../components/navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchRatedMovies,
  getGenres,
  fetchDataByGenre,
} from "../../store";
import NoContent from "../../components/NoContent";
import SelectGenre from "../../components/selectGenre/SelectGenre";
import FlixxitMovies from "../../components/mainLists/FlixxitMovies";

// export default function Home({ type }) {
// const [lists, setLists] = useState([]);
// const [genre, setGenre] = useState(null);

// useEffect(() => {
//   const getRandomLists = async () => {
//     try {
//       const res = await axios.get(
//         `lists${type ? "?type=" + type : ""}${
//           genre ? "&genre=" + genre : ""
//         }`,
//         {
//           headers: {
//             token:
//               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDBjZDdhMjdmNThlOTBmNjdmNGQ4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjE2MTE2MCwiZXhwIjoxNjkyNzY1OTYwfQ.o0vlALohBdtMvvSnPWgIAi-9SwopPCOOOScuKIgoLmI",
//           },
//         }
//       );
//       setLists(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   getRandomLists();
// }, [type, genre]);

export default function MoviePage({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const moviesListInfo = [];
  const [isScrolled, setIsScrolled] = useState(false);

  const trendingMovies = useSelector((state) => state.flixxit.trendingMovies);
  const popularMovies = useSelector((state) => state.flixxit.popularMovies);
  const ratedMovies = useSelector((state) => state.flixxit.ratedMovies);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const movies = useSelector((state) => state.flixxit.movies);
  const genres = useSelector((state) => state.flixxit.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTrendingMovies({ type: "movie" }));
      dispatch(fetchPopularMovies({ type: "movie" }));
      dispatch(fetchRatedMovies({ type: "movie" }));
      dispatch(fetchDataByGenre({ type: "movie", genre }));
    }
  }, [genresLoaded]);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDBjZDdhMjdmNThlOTBmNjdmNGQ4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjE2MTE2MCwiZXhwIjoxNjkyNzY1OTYwfQ.o0vlALohBdtMvvSnPWgIAi-9SwopPCOOOScuKIgoLmI",
            },
          }
        );
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === "movies") {
            moviesListInfo.push(res.data[i]);
            setLists(moviesListInfo);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="home">
      <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        {/* {lists.map((list) => (
        <UpComing type={list.type} setGenre={setGenre} />
      ))} */}
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? (
          <FlixxitMovies movies={movies} type="movie" />
        ) : (
          <NoContent />
        )}
        <TrendingList movies={trendingMovies} type="movie" />
        <PopularMovies movies={popularMovies} />
        <RatedMovies movies={ratedMovies} />
        {lists.map((list) => (
          <ContentList list={list} />
        ))}
      </div>
    </div>
  );
}
