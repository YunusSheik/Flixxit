import React, { useContext, useEffect, useState } from "react";
import "./ListItemsMain.css";
import {
  Add,
  PlayCircleOutline,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  StarBorderRounded,
  Close,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../../store";

export default React.memo(function ListItemsMain({
  movieData,
  isLiked = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const addToList = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/users/add",
        { email: user.email, data: movieData },
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

  return (
    <div
      className="list-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="item-video-image">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
            />
          </div>
          <div className="item-info">
            <div className="item-stats">
              <div className="item-icons">
                <Link to="/play" state={""}>
                  <PlayCircleOutline className="item-icon" />
                </Link>
                <ThumbUpOffAlt className="item-icon" />
                <ThumbDownOffAlt className="item-icon" />
                {isLiked ? (
                  <Close
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({
                          movieId: movieData.id,
                          email: user.email,
                        })
                      )
                    }
                  />
                ) : (
                  <Add className="item-icon" onClick={addToList} />
                )}
              </div>
              <div className="item-duration">
                <div className="item-rating">
                  {movieData.rating}
                  <StarBorderRounded style={{}} />
                </div>
              </div>
            </div>
            <div className="item-details">
              <h3 className="item-name">{movieData.title}</h3>
              <div className="genres">
                <ul className="genre-list">
                  <li>{movieData.genres}</li>
                </ul>
                {movieData.ageLimit === true && (
                  <span className="item-age-limit">18+</span>
                )}
                {movieData.ageLimit === false && (
                  <span className="item-age-limit">12+</span>
                )}
                <span className="item-year">{movieData.date}</span>
              </div>
              <div className="item-description">{movieData.desc}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
