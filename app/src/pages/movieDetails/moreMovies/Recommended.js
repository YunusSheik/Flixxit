import React, { useEffect, useRef, useState } from "react";
import "../../../components/listItemsMain/ListItemsMain.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ListItemsMain from "../../../components/listItemsMain/ListItemsMain";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedMovies } from "../../../store";
import { useParams } from "react-router-dom";
import NoContent from "../../../components/NoContent";

export default function RecommendedMovies() {
  const [isMoved, setIsMoved] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const recommendedMovies = useSelector(
    (state) => state.flixxit.recommendedMovies
  );
  let { type, id } = useParams();
  const listRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedMovies({ type, id }));
  }, [id]);

  const headTitle =
    type === "movie" ? "Recommended Movies" : "Recommended TV Shows";

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
    <>
      <div className="content-list-page">
        <span className="content-list-titles">{headTitle}</span>
        {recommendedMovies[0] != undefined ? (
          <div className="content-list-slides">
            <ArrowBackIos
              className="content-list-slider-arrow-left"
              onClick={() => handleClick("left")}
              style={{ display: !isMoved && "none" }}
            />
            <div className="content-list-container" ref={listRef}>
              {recommendedMovies.slice(0, 10).map((movie, index) => (
                <ListItemsMain movieData={movie} index={index} key={movie.id} />
              ))}
            </div>
            <ArrowForwardIos
              className="content-list-slider-arrow-right"
              onClick={() => handleClick("right")}
            />
          </div>
        ) : (
          <NoContent />
        )}
      </div>
    </>
  );
}
