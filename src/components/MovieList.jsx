import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../context/MoviesContext";

const MovieList = () => {
  const { movies } = useContext(MoviesContext);
  const [search, setSearch] = useState("");
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      {/* Container for "Now Showing" heading and search bar */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 40 }}>
        {/* "Now Showing" heading */}
        <h1 style={{ margin: "0 0 10px 0", color: "#222" }}>Now Showing</h1>

        {/* Search Input with a clean, modern style */}
        <input
          type="text"
          placeholder="Search for movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: "100%",
            maxWidth: 400,
            borderRadius: 8,
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
            fontSize: "1rem",
            outline: "none",
          }}
        />
      </div>

      {/* Movie Cards Container with flex-start alignment */}
      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              style={{
                width: 220,
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: 15,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.12)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                transform: hoveredMovieId === movie._id ? "scale(1.05)" : "scale(1)",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
              onMouseEnter={() => setHoveredMovieId(movie._id)}
              onMouseLeave={() => setHoveredMovieId(null)}
            >
              {/* Movie Poster */}
              <img
                src={movie.poster || "https://via.placeholder.com/220x330"}
                alt={movie.title || "No title"}
                style={{
                  width: "100%",
                  height: 330,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 15,
                }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/220x330")}
              />

              {/* Movie Title */}
              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "700",
                  color: "#333",
                  margin: "0 0 5px 0",
                  lineHeight: "1.3",
                }}
              >
                {movie.title || "Untitled Movie"}
              </h3>

              {/* Movie Description */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  flexGrow: 1,
                  lineHeight: "1.4",
                }}
              >
                {(movie.description || "").substring(0, 80)}...
              </p>

              {/* View Details Button */}
              <Link
                to={`/movie/${movie._id}`}
                style={{
                  display: "inline-block",
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "12px 20px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontWeight: "bold",
                  marginTop: 15,
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", color: "#888" }}>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;