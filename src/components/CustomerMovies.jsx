import React, { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

const CustomerMovies = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <div>
      <h2>Available Movies</h2>
      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <img
                src={movie.poster}
                alt={movie.title}
                width={100}
                onError={(e) => (e.target.src = "https://via.placeholder.com/100x150")}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerMovies;
