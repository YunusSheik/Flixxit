import React, { useEffect, useState } from "react";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_KEY, TMDB_URL } from "../../utils/api";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import SimilarMovies from "./moreMovies/SimilarMovies";
import RecommenededMovies from "./moreMovies/Recommended";
import { Navbar } from "../../components/navbar/Navbar";

export default function MovieDetails() {
  let { type, id } = useParams();
  const [data, setData] = useState({});
  const [credits, setCredits] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_URL}/${type}/${id}/videos?api_key=${API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchVideosData();

    const fetchCreditsData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_URL}/${type}/${id}/credits?api_key=${API_KEY}`
        );
        setCredits(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchCreditsData();
  }, [id, API_KEY]);

  return (
    <div style={{ backgroundColor: "black", overflow: "hidden" }}>
      <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
        <Navbar isScrolled={isScrolled} />
      </div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits.cast} />
      <VideosSection data={data} />
      <SimilarMovies />
      <RecommenededMovies />
    </div>
  );
}
