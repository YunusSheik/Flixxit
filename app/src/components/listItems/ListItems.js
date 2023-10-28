import React, { useEffect, useContext, useState } from "react";
import noposter from "../../assets/no-poster.png";
import "../listItemsMain/ListItemsMain.css";
import {
  Add,
  PlayCircleOutline,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  StarBorderRounded,
  Close,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

//  LISTITEMS - to span item-card for admin added movies
export default function ListItems({ item, isLiked = false, props }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);
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

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  const addToList = async () => {
    try {
      await axios.post(
        "https://backend-3x8q.onrender.com/api/users/add",
        { email: user.email, data: movie },
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

  if (movie !== null) {
    return (
      <div
        className="list-item-page"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="list-item-img"
          src={noposter}
          alt="img"
          style={{ height: "129.25px" }}
        />
        {isHovered && (
          <div className="list-item-hover">
            <div className="list-item-video-image">
              <img
                className="list-item-hovered-img"
                src={movie.img}
                alt="img"
              />
            </div>
            <div className="list-item-info">
              <div className="list-item-stats">
                <div className="list-item-icons">
                  <PlayCircleOutline
                    className="list-item-icon"
                    onClick={() =>
                      navigate(`/${movie.type}/${movie._id}`, {
                        state: {
                          movieId: movie._id,
                          type: movie.type,
                        },
                      })
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
                  {isLiked ? (
                    <Close title="Remove from List" />
                  ) : (
                    <Add className="list-item-icon" onClick={addToList} />
                  )}
                </div>
                <div className="list-item-duration">
                  <div className="list-item-rating">
                    {movie.rating}
                    <StarBorderRounded />
                  </div>
                </div>
              </div>
              <div className="list-item-details">
                <h3 className="list-item-name">{movie.title}</h3>
                <div className="list-item-genres-age-year">
                  <ul className="list-item-genre-list">
                    <li>{movie.genres}</li>
                  </ul>
                  <div className="list-item-age-year">
                    <span className="list-item-age-limit">
                      {movie.ageLimit}+
                    </span>
                    <span className="list-item-year">{movie.year}</span>
                  </div>
                </div>
                <div className="list-item-description">{movie.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
