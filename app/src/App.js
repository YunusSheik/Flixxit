import React, { useContext } from "react";
import "./App.css";
import LogIn from "./pages/login/LogIn";
import Home from "./pages/home/Home";
import PlayItem from "./pages/playItem/PlayItem";
import SignUp from "./pages/signup/SIgnUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";
import MoviePage from "./pages/movies/MoviePage";
import SeriesPage from "./pages/series/SeriesPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        {user && (
          <>
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/play" element={<PlayItem />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
