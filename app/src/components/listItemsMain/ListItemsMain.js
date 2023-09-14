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
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../../store";

//  LIST_ITEMS_MAIN - to span card for movies fetched from TMDB
export default function ListItemsMain(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

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

  return (
    <div
      className="list-item-page"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
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
                <Link to="/play" state={""}>
                  <PlayCircleOutline className="list-item-icon" />
                </Link>
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
                  {props.movieData.rating}
                  <StarBorderRounded style={{}} />
                </div>
              </div>
            </div>
            <div className="list-item-details">
              <h3 className="list-item-name">{props.movieData.title}</h3>
              <div className="list-item-genres">
                <ul className="list-item-genre-list">
                  <li>{props.movieData.genres}</li>
                </ul>
                {props.movieData.ageLimit === true && (
                  <span className="list-item-age-limit">18+</span>
                )}
                {props.movieData.ageLimit === false && (
                  <span className="list-item-age-limit">12+</span>
                )}
                <span className="list-item-year">{props.movieData.date}</span>
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
}
