import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, TMDB_URL } from "../../../utils/api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "./DetailsBanner.css";
import { PlayIcon } from "../PlayBtn";
import PlayItem from "../../../components/playItem/PlayItem";
import CircleRating from "../../../components/circularRating/CircularRating";
import Img from "../../../components/lazyLoad/lazyLoadImg";

export default function DetailsBanner({ video, crew }) {
  let { type, id } = useParams();
  const [movieData, setMovieData] = useState({});
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const genres = movieData.genres;

  const directors = crew?.filter((f) => f.job === "Director");
  const writers = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `${TMDB_URL}/${type}/${id}?api_key=${API_KEY}`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
  }, [id, API_KEY]);

  return (
    <>
      {Object.keys(movieData).length > 0 ? (
        <div className="details-banner">
          <Img
            className="details-banner-backdrop-img"
            src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          />
          <div className="details-banner-content">
            <div className="details-banner-left">
              {movieData.poster_path ? (
                <Img
                  className="details-banner-posterImg"
                  src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
                />
              ) : (
                <p>Image not found!</p>
              )}
            </div>
            <div className="details-banner-right">
              <div className="details-banner-title">
                {`${movieData.title || movieData.name} (${dayjs(
                  movieData.release_date
                ).format("YYYY")})`}
              </div>
              <div className="details-banner-subtitle">{movieData.tagline}</div>

              <div className="details-banner-genres">
                <ul>
                  {genres.map((g, i) => (
                    <li key={i}>{g.name}</li>
                  ))}
                </ul>
              </div>

              <div className="details-banner-row">
                <CircleRating rating={movieData.vote_average.toFixed(1)} />
                <div
                  className="details-banner-playbtn"
                  onClick={() => {
                    setShow(true);
                    setVideoId(video?.key);
                  }}
                >
                  <PlayIcon />
                  <span className="details-banner-text">Watch Trailer</span>
                </div>
              </div>
              <div className="details-banner-overview">
                <div className="details-banner-heading">Overview :</div>
                <div className="details-banner-description">
                  {movieData.overview}
                </div>
              </div>
              <div className="details-banner-info">
                {movieData.status && (
                  <div className="details-banner-infoItem">
                    <span className="details-banner-text details-banner-bold">
                      Status:{" "}
                    </span>
                    <span className="details-banner-text">
                      {movieData.status}
                    </span>
                  </div>
                )}
                {movieData.release_date && (
                  <div className="details-banner-infoItem">
                    <span className="details-banner-text details-banner-bold">
                      Release Date:{" "}
                    </span>
                    <span className="details-banner-text">
                      {dayjs(movieData.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                )}
                {movieData.runtime && (
                  <div className="details-banner-infoItem">
                    <span className="details-banner-text details-banner-bold">
                      Run Time:{" "}
                    </span>
                    <span className="details-banner-text">
                      {toHoursAndMinutes(movieData.runtime)}
                    </span>
                  </div>
                )}
              </div>
              {directors?.length > 0 && (
                <div className="details-banner-info">
                  <span className="details-banner-text details-banner-bold">
                    Directors:{" "}
                  </span>
                  <span className="details-banner-text">
                    {directors.map((d, i) => (
                      <span key={i}>
                        {d.name} {directors.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {writers?.length > 0 && (
                <div className="details-banner-info">
                  <span className="details-banner-text details-banner-bold">
                    Writers:{" "}
                  </span>
                  <span className="details-banner-text">
                    {writers.map((d, i) => (
                      <span key={i}>
                        {d.name} {writers.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {movieData?.created_by?.length > 0 && (
                <div className="details-banner-info">
                  <span className="details-banner-text details-banner-bold">
                    Creators:{" "}
                  </span>
                  <span className="details-banner-text">
                    {movieData.created_by.map((d, i) => (
                      <span key={i}>
                        {d.name} {movieData.created_by.length - 1 !== i && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
          <PlayItem
            show={show}
            setShow={setShow}
            videoId={videoId}
            setVideoId={setVideoId}
          />
        </div>
      ) : (
        <div>Data not found!</div>
      )}
    </>
  );
}
