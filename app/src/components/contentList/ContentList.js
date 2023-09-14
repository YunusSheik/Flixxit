import React, { useRef, useState } from "react";
import "./ContentList.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ListItems from "../listItems/ListItems";

// CONTENT LIST - to get list of movies or series created by admin
export default function ContentList({ list }) {
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
      <span className="content-list-titles">{list.title}</span>
      <div className="content-list-slides">
        <ArrowBackIos
          className="content-list-slider-arrow-left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="content-list-container" ref={listRef}>
          {list.content.slice(0, 10).map((item, i) => (
            <ListItems index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIos
          className="content-list-slider-arrow-right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
