import React, { useState, useContext } from "react";
import { ShowsContext } from "../context/showsContext";
import { MoviesContext } from "../context/MoviesContext";
import { useNavigate } from "react-router-dom";

const ManageShows = () => {
  const { shows, addShow, deleteShow } = useContext(ShowsContext);
  const { movies } = useContext(MoviesContext);
  const navigate = useNavigate();

  const [newShow, setNewShow] = useState({
    movieId: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const handleAddShow = (e) => {
    e.preventDefault();
    const { movieId, date, time } = newShow;
    if (!movieId || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    addShow({ movieId, date, time });
    setNewShow({ movieId: "", date: "", time: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this show?")) {
      deleteShow(id);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Segoe UI" }}>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Manage Shows</h2>

      <button
        onClick={goBackToDashboard}
        style={{
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ← Back to Dashboard
      </button>

      {/* Add Show Form */}
      <form
        onSubmit={handleAddShow}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Movie Dropdown */}
        <select
          name="movieId"
          value={newShow.movieId}
          onChange={handleChange}
          style={{ padding: 12, fontSize: 16, borderRadius: 5 }}
        >
          <option value="">Select Movie</option>
          {movies.map((movie) => (
            <option key={movie._id || movie.id} value={movie._id || movie.id}>
              {movie.title}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={newShow.date}
          onChange={handleChange}
          style={{ padding: 12, fontSize: 16, borderRadius: 5 }}
        />

        {/* Time */}
        <input
          type="time"
          name="time"
          value={newShow.time}
          onChange={handleChange}
          style={{ padding: 12, fontSize: 16, borderRadius: 5 }}
        />

        <button
          type="submit"
          style={{
            padding: 12,
            backgroundColor: "#28a745",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Add Show
        </button>
      </form>

      {/* Existing Shows Section */}
      <h3 style={{ marginTop: 30 }}>Existing Shows</h3>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {movies.map((movie) => {
          const movieShows = shows.filter(
            (show) => show.movieId === movie._id || show.movieId === movie.id
          );

          return (
            <li key={movie._id || movie.id} style={{ marginBottom: 25 }}>
              <h4 style={{ marginBottom: 10 }}>{movie.title}</h4>

              {movieShows.length === 0 ? (
                <p style={{ fontStyle: "italic", color: "#777" }}>
                  No shows for this movie.
                </p>
              ) : (
                movieShows.map((show) => (
                  <div
                    key={show._id || `${show.movieId}-${show.date}-${show.time}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 8,
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <span>
                      {show.date} @ {show.time}
                    </span>
                    <button
                      onClick={() => handleDelete(show._id)}
                      style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        padding: "6px 12px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageShows;
