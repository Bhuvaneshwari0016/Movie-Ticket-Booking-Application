import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useContext(MoviesContext);
  const [movieShows, setMovieShows] = useState([]);

  const movie = movies.find((m) => m._id === id);

 useEffect(() => {
  fetch(`http://localhost:5000/api/shows?movieId=${id}`) 
    .then((res) => res.json())
    .then((data) => {
      const uniqueTimes = new Set();
      const uniqueShows = data.filter((show) => {
        if (uniqueTimes.has(show.time)) return false;
        uniqueTimes.add(show.time);
        return true;
      });
      setMovieShows(uniqueShows);
    })
    .catch((err) => console.error("Failed to fetch movie shows", err));
}, [id]);

  if (!movie) return <div style={{ padding: 20 }}>Movie not found</div>;

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: "0 auto", fontFamily: "Segoe UI" }}>
      <h1 style={{ marginBottom: 20 }}>{movie.title}</h1>

      <img
        src={movie.poster || "https://via.placeholder.com/300x450"}
        alt={movie.title}
        style={{ width: 300, borderRadius: 8, marginBottom: 20 }}
        onError={(e) => (e.target.src = "https://via.placeholder.com/300x450")}
      />

      <p style={{ fontSize: 16, marginBottom: 30 }}>{movie.description}</p>

      <h3 style={{ marginBottom: 10 }}>Select Show Time</h3>
      {movieShows.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 30 }}>
          {movieShows.map((show) => (
            <Link
              key={show._id}
              to={`/booking/${show._id}`}
              state={{ selectedSeats: [],   selectedMovie: movie.title,           // ✅ MATCH this
    selectedShowtime: show.time,      }}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: 5,
                fontSize: 15,
              }}
            >
              {show.time} 
            </Link>
          ))}
        </div>
      ) : (
        <p style={{ marginBottom: 30 }}>No shows available</p>
      )}

      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          textDecoration: "none",
          borderRadius: 5,
          fontSize: 15,
        }}
      >
        ⬅ Back to Movies
      </Link>
    </div>
  );
};

export default MovieDetails;
