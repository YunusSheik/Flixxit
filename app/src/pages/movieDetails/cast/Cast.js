import React from "react";
import "./Cast.css";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data }) => {
  return (
    <div className="castSection">
      <div className="sectionHeading">Top Cast</div>
      <div className="listItems">
        {data?.map((item) => {
          let imgUrl = item.profile_path
            ? `https://image.tmdb.org/t/p/original//${item.profile_path}`
            : avatar;
          return (
            <div key={item.id} className="listItem">
              <div className="profileImg">
                <img src={imgUrl} />
              </div>
              <div className="name">{item.name}</div>
              <div className="character">{item.character}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cast;
