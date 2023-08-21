import React from "react";
import "./PlayItem.css";
import { ReplyOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function PlayItem() {
  const location = useLocation();
  const movie = location.state.movie;

  return (
    <div className="item-play">
      <Link to="/">
        <div className="return">
          <ReplyOutlined />
          Home
        </div>
      </Link>
      <video className="video" src={movie.trailer} autoPlay progress controls />
    </div>
  );
}
