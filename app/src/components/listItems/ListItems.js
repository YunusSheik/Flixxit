import React, { useEffect, useContext, useState } from "react";
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
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";

//  LISTITEMS - to span item-card for admin added movies
export default React.memo(function ListItems({ item, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const { user } = useContext(AuthContext);

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
        "http://localhost:8000/api/users/add",
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
        <img className="list-item-img" src={movie.img} alt="img" />
        {isHovered && (
          <div className="list-item-hover">
            <div className="list-item-video-image">
              <video
                className="list-item-video"
                src={movie.trailer}
                autoPlay={true}
                loop
                muted
              />
            </div>
            <div className="list-item-info">
              <div className="list-item-stats">
                <div className="list-item-icons">
                  <Link to="/play" state={{ movie }}>
                    <PlayCircleOutline className="list-item-icon" />
                  </Link>
                  <ThumbUpOffAlt className="list-item-icon" />
                  <ThumbDownOffAlt className="list-item-icon" />
                  {isLiked ? (
                    <Close title="Remove from List" />
                  ) : (
                    <Add className="list-item-icon" onClick={addToList} />
                  )}
                </div>
                <div className="list-item-duration">
                  {/* <span className="list-item-movie-duration">
                    {movie.duration}
                  </span> */}
                  <div className="list-item-rating">
                    {movie.rating}
                    <StarBorderRounded style={{}} />
                  </div>
                </div>
              </div>
              <div className="list-item-details">
                <h3 className="list-item-name">{movie.title}</h3>
                <div className="list-item-genres">
                  <ul className="list-item-genre-list">
                    <li>{movie.genre}</li>
                  </ul>
                  <span className="list-item-age-limit">{movie.ageLimit}+</span>
                  <span className="list-item-year">{movie.year}</span>
                </div>
                <div className="list-item-description">{movie.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
});
