import React, { useRef, useState } from "react";
import "../listItemsMain/ListItemsMain.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ListItemsMain from "../listItemsMain/ListItemsMain";

export default function FlixxitMovies({ movies }) {
  const [isMoved, setIsMoved] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

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
    <div className="content-list-page">
      <span className="content-list-titles">Flixxit Movies</span>
      <div className="content-list-slides">
        <ArrowBackIos
          className="content-list-slider-arrow-left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        {movies !== null && (
          <div className="content-list-container" ref={listRef}>
            {movies.slice(10, 20).map((movie, index) => (
              <ListItemsMain movieData={movie} index={index} key={movie.id} />
            ))}
          </div>
        )}

        <ArrowForwardIos
          className="content-list-slider-arrow-right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
