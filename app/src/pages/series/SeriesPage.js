import React, { useEffect, useState } from "react";
import "./seriesPage.css";
import ContentList from "../../components/contentList/ContentList";
import TrendingList from "../../components/mainLists/TrendingList";
import PopularSeries from "../../components/mainLists/PopularSeries";
import RatedSeries from "../../components/mainLists/RatedSeries";
import { Navbar } from "../../components/navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovies,
  fetchPopularSeries,
  fetchRatedSeries,
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
//              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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

export default function SeriesPage({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const seriesListInfo = [];
  const [isScrolled, setIsScrolled] = useState(false);

  const trendingMovies = useSelector((state) => state.flixxit.trendingMovies);
  const popularSeries = useSelector((state) => state.flixxit.popularSeries);
  const ratedSeries = useSelector((state) => state.flixxit.ratedSeries);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const movies = useSelector((state) => state.flixxit.movies);
  const genres = useSelector((state) => state.flixxit.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTrendingMovies({ type: "tv" }));
      dispatch(fetchPopularSeries({ type: "tv" }));
      dispatch(fetchRatedSeries({ type: "tv" }));
      dispatch(fetchDataByGenre({ type: "tv", genre }));
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
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].type === "series") {
            seriesListInfo.push(res.data[i]);
            setLists(seriesListInfo);
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
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? (
          <FlixxitMovies movies={movies} type="tv" />
        ) : (
          <NoContent />
        )}
        <TrendingList movies={trendingMovies} type="tv" />
        <PopularSeries movies={popularSeries} />
        <RatedSeries movies={ratedSeries} />
        {lists.map((list) => (
          <ContentList list={list} />
        ))}
      </div>
    </div>
  );
}
