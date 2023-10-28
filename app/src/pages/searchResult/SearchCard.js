import React, { useContext, useState } from "react";
import "../../components/listItemsMain/ListItemsMain.css";
import {
  Add,
  PlayCircleOutline,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  StarBorderRounded,
  Close,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { removeMovieFromLiked } from "../../store";
import Img from "../../components/lazyLoad/lazyLoadImg";

//  LIST_ITEMS_MAIN - to span card for movies fetched from TMDB
export default function SearchCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genres = useSelector((state) => state.flixxit.genres);

  const addToList = async () => {
    try {
      await axios.post(
        "https://backend-3x8q.onrender.com/api/users/add",
        { email: user.email, data: props.movieData },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const movieGenres = [];
  props.movieData.genre_ids.forEach((genre) => {
    const name = genres.find(({ id }) => id === genre);
    if (name) movieGenres.push(name.name);
  });

  return (
    <div
      className="list-item-page"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Img
        className="list-item-img"
        src={`https://image.tmdb.org/t/p/w500${props.movieData.backdrop_path}`}
        alt="movie"
      />
      {isHovered && (
        <div className="list-item-hover">
          <div className="list-item-video-image">
            <img
              className="list-item-hovered-img"
              src={`https://image.tmdb.org/t/p/w500${props.movieData.backdrop_path}`}
              alt="movie"
            />
          </div>
          <div className="list-item-info">
            <div className="list-item-stats">
              <div className="list-item-icons">
                <PlayCircleOutline
                  className="list-item-icon"
                  onClick={() =>
                    navigate(
                      `/${props.movieData.media_type}/${props.movieData.id}`,
                      {
                        state: {
                          movieId: props.movieData.id,
                          type: props.movieData.media_type,
                        },
                      }
                    )
                  }
                />

                <ThumbUpOffAlt className="list-item-icon" />
                <ThumbDownOffAlt className="list-item-icon" />
                {props.isLiked ? (
                  <Close
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({
                          movieId: props.movieData.id,
                          email: user.email,
                        })
                      )
                    }
                  />
                ) : (
                  <Add className="list-item-icon" onClick={addToList} />
                )}
              </div>
              <div className="list-item-duration">
                <div className="list-item-rating">
                  {props.movieData.vote_average.toFixed(1)}
                  <StarBorderRounded />
                </div>
              </div>
            </div>
            <div className="list-item-details">
              <h3 className="list-item-name">{props.movieData.name}</h3>
              <div className="list-item-genres-age-year">
                <ul className="list-item-genre-list">
                  {movieGenres.slice(0, 2).map((genre) => (
                    <li>{genre}</li>
                  ))}
                </ul>
                <div className="list-item-age-year">
                  {props.movieData.adult === true && (
                    <span className="list-item-age-limit">18+</span>
                  )}
                  {props.movieData.adult === false && (
                    <span className="list-item-age-limit">12+</span>
                  )}
                  <span className="list-item-year">
                    {props.movieData.first_air_date
                      ? props.movieData.first_air_date
                      : props.movieData.release_date}
                  </span>
                </div>
              </div>
              <div className="list-item-description">
                {props.movieData.overview}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
