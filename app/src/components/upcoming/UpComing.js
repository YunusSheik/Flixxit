import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import "./UpComing.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { fetchUpComingMovies } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [currentMovie, setCurrentMovie] = useState();
  const upComingMovies = useSelector((state) => state.flixxit.upComingMovies);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpComingMovies({ type }));
  }, []);

  useEffect(() => {
    setCurrentMovie(
      upComingMovies[Math.floor(Math.random() * upComingMovies.length)]
    );
  }, [upComingMovies]);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  return (
    <div className="upcoming-featured">
      {type && (
        <div className="upcoming-category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Anime</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>
            <option value="drama">Drama</option>
            <option value="family">Family</option>
            <option value="fantasy">Fantasy</option>
            <option value="history">History</option>
            <option value="horror">Horror</option>
            <option value="music">Music</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="science Fiction">Sci-fi</option>
            <option value="TV Movie">TV Movie</option>
            <option value="thriller">Thriller</option>
            <option value="war">War</option>
            <option value="western">Western</option>
          </select>
        </div>
      )}
      <img
        className="upcoming_image"
        src={`https://image.tmdb.org/t/p/original${currentMovie?.image}`}
        alt=""
      />
      <div className="upcoming-info">
        <div className="upcoming-title">
          <h2>{currentMovie?.title}</h2>
          <h4>({currentMovie?.date})</h4>
        </div>
        {/* <img src={content.imgTitle} alt="" /> */}
        <p className="upcoming-desc">{currentMovie?.desc}</p>

        <button className="upcoming play">
          <PlayCircleOutline />
          <span
            className="play-button"
            onClick={() =>
              navigate(`/${currentMovie?.type}/${currentMovie?.id}`, {
                state: {
                  movieId: currentMovie?.id,
                  type: currentMovie?.type,
                },
              })
            }
          >
            Play Trailer
          </span>
        </button>
      </div>
    </div>
  );
}
