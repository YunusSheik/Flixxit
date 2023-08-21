import { useEffect, useState } from "react";
import "./ListItems.css";
import {
  Add,
  PlayCircleOutline,
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  StarBorderRounded,
} from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItems({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDBjZDdhMjdmNThlOTBmNjdmNGQ4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjE2MTE2MCwiZXhwIjoxNjkyNzY1OTYwfQ.o0vlALohBdtMvvSnPWgIAi-9SwopPCOOOScuKIgoLmI",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

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
                  <Add className="item-icon" />
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
}
