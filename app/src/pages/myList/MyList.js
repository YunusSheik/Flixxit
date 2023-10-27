import React, { useContext, useEffect, useState } from "react";
import "./mylist.css";
import { Navbar } from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUsersLikedMovies } from "../../store";

import { AuthContext } from "../../authContext/AuthContext";
import ListItemsMain from "../../components/listItemsMain/ListItemsMain";

export default function MyList() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const movies = useSelector((state) => state.flixxit.likedMovies);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.email) {
      dispatch(getUsersLikedMovies(user.email));
    }
  }, [user.email]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="home">
        <div className="mylist-content">
          <h1>My List</h1>
          <div className="mylist-data">
            {movies.map((movie, index) => {
              return (
                <ListItemsMain
                  movieData={movie}
                  index={index}
                  key={movie.id}
                  isLiked={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
