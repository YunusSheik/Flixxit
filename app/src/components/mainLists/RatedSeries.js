import React, { useRef, useState } from "react";
import "../listItemsMain/ListItemsMain.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ListItemsMain from "../listItemsMain/ListItemsMain";
import { useSelector } from "react-redux";

export default function RatedSeries() {
  const [isMoved, setIsMoved] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const ratedSeries = useSelector((state) => state.flixxit.ratedSeries);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 40;

    if (direction === "left" && cardNumber > 0) {
      setCardNumber(cardNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }

    if (direction === "right" && cardNumber < 10 - clickLimit) {
      setCardNumber(cardNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="content-list">
      <span className="list-titles">Top-rated Series</span>
      <div className="slides">
        <ArrowBackIos
          className="slider-arrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="content-list-container" ref={listRef}>
          {ratedSeries.slice(0, 10).map((movie, index) => (
            <ListItemsMain movieData={movie} index={index} key={movie.id} />
          ))}
        </div>

        <ArrowForwardIos
          className="slider-arrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
