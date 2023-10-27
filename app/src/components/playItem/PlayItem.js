// import React from "react";
// import "./PlayItem.css";
// import { ReplyOutlined } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";

// export default function PlayItem() {
//   const location = useLocation();
//   const movie = location.state.movie;

//   return (
//     <div className="item-play">
//       <Link to="/">
//         <div className="return">
//           <ReplyOutlined />
//           Home
//         </div>
//       </Link>
//       <video className="video" src={movie.trailer} autoPlay progress controls />
//     </div>
//   );
// }

import React from "react";
import ReactPlayer from "react-player/youtube";
import "./PlayItem.css";

const PlayItem = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={hidePopup}></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PlayItem;
