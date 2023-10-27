import React, { useEffect, useState } from "react";
import "./Home.css";
import ContentList from "../../components/contentList/ContentList";
import TrendingList from "../../components/mainLists/TrendingList";
import SimilarMovies from "../../pages/movieDetails/moreMovies/SimilarMovies";
import PlayingNow from "../../components/mainLists/PlayingNow";
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
  fetchSimilarMovies,
  fetchPlayingNow,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchRatedMovies,
  fetchRatedSeries,
  getGenres,
  getMovieGenres,
} from "../../store";

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const trendingMovies = useSelector((state) => state.flixxit.trendingMovies);
  const similarMovies = useSelector((state) => state.flixxit.similarMovies);
  const playingNow = useSelector((state) => state.flixxit.playingNow);
  const popularMovies = useSelector((state) => state.flixxit.popularMovies);
  const popularSeries = useSelector((state) => state.flixxit.popularSeries);
  const ratedMovies = useSelector((state) => state.flixxit.ratedMovies);
  const ratedSeries = useSelector((state) => state.flixxit.ratedSeries);
  const genresLoaded = useSelector((state) => state.flixxit.genresLoaded);
  const genres = useSelector((state) => state.flixxit.genres);
  const movieGenres = useSelector((state) => state.flixxit.movieGenres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieGenres());
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchTrendingMovies({ type: "all" }));
      dispatch(fetchSimilarMovies({ type: "movie" }));
      dispatch(fetchPlayingNow({ type: "movie" }));
      dispatch(fetchPopularMovies({ type: "movie" }));
      dispatch(fetchPopularSeries({ type: "tv" }));
      dispatch(fetchRatedMovies({ type: "movie" }));
      dispatch(fetchRatedSeries({ type: "tv" }));
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
        <PlayingNow movies={playingNow} />
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
