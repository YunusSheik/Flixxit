import React, { useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogIn from "./pages/login/LogIn";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SIgnUp";
import { AuthContext } from "./authContext/AuthContext";
import MoviePage from "./pages/movies/MoviePage";
import SeriesPage from "./pages/series/SeriesPage";
import MyList from "./pages/myList/MyList";
import SearchResult from "./pages/searchResult/SearchResult";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import ForgotPassword from "./pages/login/ForgotPassowrd";
import { UserProfile } from "./pages/userProfile/UserProfile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LogIn /> : <Navigate to="/" />}
        />
        <Route
          path="/forgotPassword"
          element={!user ? <ForgotPassword /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <UserProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/movies"
          element={user ? <MoviePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/series"
          element={user ? <SeriesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-list"
          element={user ? <MyList /> : <Navigate to="/login" />}
        />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route
          path=":type/:id"
          element={user ? <MovieDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
