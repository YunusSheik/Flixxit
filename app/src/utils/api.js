import axios from "axios";

export const API_KEY = "61b39ac0a54c2900a09f2a99aea4b449";
export const TMDB_URL = "https://api.themoviedb.org/3";
export const BASE_URL = "https://backend-3x8q.onrender.com/";

const headers = {
  Authorization:
    "bearer " +
    `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWIzOWFjMGE1NGMyOTAwYTA5ZjJhOTlhZWE0YjQ0OSIsInN1YiI6IjY0YzBmM2E5ZWRlMWIwMDEzYzZlNTcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4SymeajCQSijaBtGzfkW1qTf48WmIKXfQ7YDP0oifvQ`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(TMDB_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
