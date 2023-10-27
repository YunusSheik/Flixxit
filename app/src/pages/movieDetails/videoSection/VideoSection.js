import React, { useState } from "react";
import "./VideoSection.css";
import { PlayIcon } from "../PlayBtn";
import PlayItem from "../../../components/playItem/PlayItem";

const VideosSection = ({ data }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  return (
    <div className="videosSection">
      <div className="sectionHeading">Official Videos</div>

      <div className="videos">
        {data?.results?.map((video) => (
          <div
            key={video.id}
            className="videoItem"
            onClick={() => {
              setVideoId(video.key);
              setShow(true);
            }}
          >
            <div className="videoThumbnail">
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
              />
              <PlayIcon />
            </div>
            <div className="videoTitle">{video.name}</div>
          </div>
        ))}
      </div>
      <PlayItem
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideosSection;
