import { InfoOutlined, PlayCircleOutline } from "@mui/icons-material";
import "./UpComing.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDBjZDdhMjdmNThlOTBmNjdmNGQ4OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MjEwNDU1MywiZXhwIjoxNjkyNzA5MzUzfQ.wSBVpHSRSsylZ8NhB5qt9e6ggpdMjR0npBBnwjrV8Xg",
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
    <div className="featured">
      {type && (
        <div className="category">
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
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.description}</span>
        <div className="buttons">
          <button className="play">
            <PlayCircleOutline />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
