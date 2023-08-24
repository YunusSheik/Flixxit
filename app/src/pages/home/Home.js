import React, { useEffect, useState } from "react";
import "./Home.css";
import ContentList from "../../components/contentList/ContentList";
import TrendingList from "../../components/mainLists/TrendingList";
import PopularMovies from "../../components/mainLists/PopularMovies";
import PopularSeries from "../../components/mainLists/PopularSeries";
import RatedMovies from "../../components/mainLists/RatedMovies";
import RatedSeries from "../../components/mainLists/RatedSeries";
import { Navbar } from "../../components/navbar/Navbar";
import UpComing from "../../components/upcoming/UpComing";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchRatedMovies,
  fetchRatedSeries,
  getGenres,
} from "../../store";

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
//               "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const trendingMovies = useSelector((state) => state.flixxit.trendingMovies);
  const popularMovies = useSelector((state) => state.flixxit.popularMovies);
  const popularSeries = useSelector((state) => state.flixxit.popularSeries);
  const ratedMovies = useSelector((state) => state.flixxit.ratedMovies);
  const ratedSeries = useSelector((state) => state.flixxit.ratedSeries);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTrendingMovies({ type: "all" }));
      dispatch(fetchPopularMovies({ type: "all" }));
      dispatch(fetchPopularSeries({ type: "all" }));
      dispatch(fetchRatedMovies({ type: "all" }));
      dispatch(fetchRatedSeries({ type: "all" }));
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
        setLists(res.data);
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

  if (lists !== null || undefined) {
    return (
      <div className="home">
        <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
          <Navbar isScrolled={isScrolled} />
        </div>
        <UpComing type={type} setGenre={setGenre} />
        <TrendingList movies={trendingMovies} />
        <PopularMovies movies={popularMovies} />
        <PopularSeries movies={popularSeries} />
        <RatedMovies movies={ratedMovies} />
        <RatedSeries movies={ratedSeries} />
        {lists.map((list) => (
          <ContentList list={list} />
        ))}
      </div>
    );
  }
}
