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
  const movies = useSelector((state) => state.flixxit.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.email) {
      dispatch(getUsersLikedMovies(user.email));
    }
  }, [user.email]);

  // useEffect(() => {
  //   const getRandomLists = async () => {
  //     try {
  //       const res = await axios.get(
  //         `lists${type ? "?type=" + type : ""}${
  //           genre ? "&genre=" + genre : ""
  //         }`,
  //         {
  //           headers: {
  //             token:
  //               "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //           },
  //         }
  //       );
  //       for (let i = 0; i < res.data.length; i++) {
  //         if (res.data[i].type === "movies") {
  //           moviesListInfo.push(res.data[i]);
  //           setLists(moviesListInfo);
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getRandomLists();
  // }, [type, genre]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="home">
      <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="content">
        <h1>My List</h1>
        <div className="data">
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
  );
}
