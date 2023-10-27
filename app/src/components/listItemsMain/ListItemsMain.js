import React, { useContext, useState } from "react";
import "./ListItemsMain.css";
import {
  Add,
  PlayCircleOutline,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  StarBorderRounded,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { removeMovieFromLiked } from "../../store";
import Img from "../lazyLoad/lazyLoadImg";

//  LIST_ITEMS_MAIN - to span card for movies fetched from TMDB
export default function ListItemsMain(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [upVote, setUpVote] = useState(7);
  const [downVote, setDownVote] = useState(4);

  const [upVoteActive, setUpVoteActive] = useState(false);
  const [downVoteActive, setDownVoteActive] = useState(false);

  function likeMovie() {
    if (upVoteActive) {
      setUpVoteActive(false);
      setUpVote(upVote - 1);
    } else {
      setUpVoteActive(true);
      setUpVote(upVote + 1);
      if (downVoteActive) {
        setDownVoteActive(false);
        setUpVote(upVote + 1);
        setDownVote(downVote - 1);
      }
    }
  }

  function disLikeMovie() {
    if (downVoteActive) {
      setDownVoteActive(false);
      setDownVote(downVote - 1);
    } else {
      setDownVoteActive(true);
      setDownVote(downVote + 1);
      if (upVoteActive) {
        setUpVoteActive(false);
        setDownVote(downVote + 1);
        setUpVote(upVote - 1);
      }
    }
  }

  const genres = useSelector((state) => state.flixxit.genres);
  const movieGenres = [];
  props.movieData?.genre_ids?.forEach((genre) => {
    const name = genres.find(({ id }) => id === genre);
    if (name) movieGenres.push(name.name);
  });

  const addToList = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/users/add",
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

  if (props.movieData.isSeries !== undefined) {
    return (
      <div
        className="list-item-page"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Img className="list-item-img" src={props.movieData.img} alt="movie" />
        {isHovered && (
          <div className="list-item-hover">
            <div className="list-item-video-image">
              <img
                className="list-item-hovered-img"
                src={props.movieData.img}
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
                        `/${props.movieData.type}/${props.movieData._id}`,
                        {
                          state: {
                            movieId: props.movieData._id,
                            type: props.movieData.type,
                          },
                        }
                      )
                    }
                  />
                  <ThumbUpOffAlt
                    style={{ color: upVoteActive ? "blue" : "white" }}
                    className="list-item-icon"
                    onClick={likeMovie}
                  />
                  <ThumbDownOffAlt
                    style={{ color: downVoteActive ? "blue" : "white" }}
                    className="list-item-icon"
                    onClick={disLikeMovie}
                  />
                  {props.isLiked ? (
                    <Close
                      title="Remove from List"
                      onClick={() =>
                        dispatch(
                          removeMovieFromLiked({
                            movieId: props.movieData._id,
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
                    {props.movieData.rating}
                    <StarBorderRounded />
                  </div>
                </div>
              </div>
              <div className="list-item-details">
                <h3 className="list-item-name">{props.movieData.title}</h3>
                <div className="list-item-genres-age-year">
                  <ul className="list-item-genre-list">
                    {props.movieData.genre}
                  </ul>
                  <div className="list-item-age-year">
                    {props.movieData.ageLimit === true && (
                      <span className="list-item-age-limit">18+</span>
                    )}
                    {props.movieData.ageLimit === false && (
                      <span className="list-item-age-limit">12+</span>
                    )}
                    <span className="list-item-year">
                      {props.movieData.year}
                    </span>
                  </div>
                </div>
                <div className="list-item-description">
                  {props.movieData.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (props.movieData.desc !== undefined) {
    return (
      <div
        className="list-item-page"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Img
          className="list-item-img"
          src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
          alt="movie"
        />
        {isHovered && (
          <div className="list-item-hover">
            <div className="list-item-video-image">
              <img
                className="list-item-hovered-img"
                src={`https://image.tmdb.org/t/p/w500${props.movieData.image}`}
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
                        `/${props.movieData.type}/${props.movieData.id}`,
                        {
                          state: {
                            movieId: props.movieData.id,
                            type: props.movieData.type,
                          },
                        }
                      )
                    }
                  />
                  <div className="vote">
                    <ThumbUpOffAlt
                      style={{ color: upVoteActive ? "blue" : "white" }}
                      className="list-item-icon"
                      onClick={likeMovie}
                    />
                    {upVote}
                  </div>
                  <div className="vote">
                    <ThumbDownOffAlt
                      style={{ color: downVoteActive ? "blue" : "white" }}
                      className="list-item-icon"
                      onClick={disLikeMovie}
                    />
                    {downVote}
                  </div>
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
                    {props.movieData.rating.toFixed(1)}
                    <StarBorderRounded />
                  </div>
                </div>
              </div>
              <div className="list-item-details">
                <h3 className="list-item-name">{props.movieData.title}</h3>
                <div className="list-item-genres-age-year">
                  <ul className="list-item-genre-list">
                    {props.movieData.genres.map((genre) => (
                      <li>{genre}</li>
                    ))}
                  </ul>
                  <div className="list-item-age-year">
                    {props.movieData.ageLimit === true && (
                      <span className="list-item-age-limit">18+</span>
                    )}
                    {props.movieData.ageLimit === false && (
                      <span className="list-item-age-limit">12+</span>
                    )}
                    <span className="list-item-year">
                      {props.movieData.date}
                    </span>
                  </div>
                </div>
                <div className="list-item-description">
                  {props.movieData.desc}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (props.movieData.adult !== undefined) {
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

                  <ThumbUpOffAlt
                    className="list-item-icon"
                    style={{ color: upVoteActive ? "blue" : "white" }}
                    onClick={likeMovie}
                  />
                  <ThumbDownOffAlt
                    style={{ color: upVoteActive ? "blue" : "white" }}
                    className="list-item-icon"
                    onClick={likeMovie}
                  />
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
                <h3 className="list-item-name">{props.movieData.title}</h3>
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
                      {props.movieData.release_date}
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
}
