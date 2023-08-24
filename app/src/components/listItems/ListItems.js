import React, { useEffect, useContext, useState } from "react";
import "./ListItems.css";
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
      // <div
      //   className="list-item"
      //   onMouseEnter={() => setIsHovered(true)}
      //   onMouseLeave={() => setIsHovered(false)}
      // >
      //   <img src={movie.img} alt="img" />
      //   {isHovered && (
      //     <div className="hover">
      //       <div className="item-video-image">
      //         <video src={movie.trailer} autoPlay={true} loop muted />
      //       </div>
      //       <div className="item-info">
      //         <div className="item-stats">
      //           <div className="item-icons">
      //             <Link to="/play" state={{ movie }}>
      //               <PlayCircleOutline className="item-icon" />
      //             </Link>
      //             <ThumbUpOffAlt className="item-icon" />
      //             <ThumbDownOffAlt className="item-icon" />
      //             <Add className="item-icon" />
      //           </div>
      //           <div className="item-duration">
      //             <span>{movie.duration}</span>
      //             <div className="item-rating">
      //               {movie.rating}
      //               <StarBorderRounded style={{}} />
      //             </div>
      //           </div>
      //         </div>
      //         <div className="item-details">
      //           <h3 className="item-name">{movie.title}</h3>
      //           <div className="genres">
      //             <ul className="genre-list">
      //               <li>{movie.genre}</li>
      //             </ul>
      //             <span className="item-age-limit">{movie.ageLimit}+</span>
      //             <span className="item-year">{movie.year}</span>
      //           </div>
      //           <div className="item-description">{movie.description}</div>
      //         </div>
      //       </div>
      //     </div>
      //   )}
      // </div>

      <div
        className="list-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="img" />
        {isHovered && (
          <div className="hover">
            <div className="item-video-image">
              <video src={movie.trailer} autoPlay={true} loop muted />
            </div>
            <div className="item-info">
              <div className="item-stats">
                <div className="item-icons">
                  <Link to="/play" state={{ movie }}>
                    <PlayCircleOutline className="item-icon" />
                  </Link>
                  <ThumbUpOffAlt className="item-icon" />
                  <ThumbDownOffAlt className="item-icon" />
                  {isLiked ? (
                    <Close title="Remove from List" />
                  ) : (
                    <Add className="item-icon" onClick={addToList} />
                  )}
                </div>
                <div className="item-duration">
                  <span>{movie.duration}</span>
                  <div className="item-rating">
                    {movie.rating}
                    <StarBorderRounded style={{}} />
                  </div>
                </div>
              </div>
              <div className="item-details">
                <h3 className="item-name">{movie.title}</h3>
                <div className="genres">
                  <ul className="genre-list">
                    <li>{movie.genre}</li>
                  </ul>
                  <span className="item-age-limit">{movie.ageLimit}+</span>
                  <span className="item-year">{movie.year}</span>
                </div>
                <div className="item-description">{movie.description}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
});
