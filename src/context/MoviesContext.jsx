// context/MoviesContext.js
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  // Fetch movies from backend
  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    fetchMovies(); // fetch once on app load
  }, []);

  const addMovie = async (movieData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/movies", movieData);
      // after successful post, fetch movies again
      fetchMovies();
    } catch (error) {
      console.error("Failed to add movie", error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      fetchMovies();
    } catch (error) {
      console.error("Failed to delete movie", error);
    }
  };

  return (
    <MoviesContext.Provider value={{ movies, addMovie, deleteMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};
